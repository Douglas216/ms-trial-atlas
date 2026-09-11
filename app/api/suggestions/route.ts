import { getRawDb } from "../../../db";
import { isSuggestionSource } from "../../lib/suggestions";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const reader = request.body?.getReader();
    if (!reader) return Response.json({ error: "Invalid submission." }, { status: 400 });
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 30000) {
        await reader.cancel();
        return Response.json({ error: "Submission is too large." }, { status: 413 });
      }
      chunks.push(value);
    }
    const buffer = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) { buffer.set(chunk, offset); offset += chunk.byteLength; }
    const raw = new TextDecoder().decode(buffer);
    let body: Record<string, unknown>;
    try { body = JSON.parse(raw); } catch { return Response.json({ error: "Invalid submission." }, { status: 400 }); }
    if (!body || typeof body !== "object" || Array.isArray(body)) return Response.json({ error: "Invalid submission." }, { status: 400 });
    const sourcePath = typeof body.sourcePath === "string" ? body.sourcePath : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const comment = typeof body.comment === "string" ? body.comment.trim() : "";
    const anonymous = body.anonymous === true;

    if (!isSuggestionSource(sourcePath) || email.length > 254 || !emailPattern.test(email) || !comment || comment.length > 6000 || name.length > 100 || typeof body.anonymous !== "boolean" || typeof body.submissionId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.submissionId)) {
      return Response.json({ error: "Please check the form fields and try again." }, { status: 400 });
    }

    const db = getRawDb();
    await db.prepare("INSERT OR IGNORE INTO suggestions (id, source_path, name, email, comment, anonymous, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .bind(body.submissionId, sourcePath, anonymous ? null : (name || null), email, comment, anonymous ? 1 : 0, Date.now())
      .run();
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    console.error("Suggestion storage unavailable");
    return Response.json({ error: "Your suggestion could not be saved." }, { status: 503 });
  }
}
