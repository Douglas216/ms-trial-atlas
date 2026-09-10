import { env } from "cloudflare:workers";
import { trials } from "../../data/trials";
const paths = new Set(["/", ...trials.map((trial) => `/trials/${trial.slug}`)]);
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export async function POST(request: Request) {
  const headers = new Headers({ "Cache-Control": "no-store" });
  if (request.headers.get("origin") !== new URL(request.url).origin) return new Response(null, { status: 403 });
  if (/bot|crawler|spider|headless/i.test(request.headers.get("user-agent") || "")) return new Response(null, { status: 204 });
  if (Number(request.headers.get("content-length")) > 1024) return new Response(null, { status: 413 });
  try {
    const { path, eventId } = await request.json() as { path: string; eventId: string };
    if (!paths.has(path) || !uuid.test(eventId)) return new Response(null, { status: 400 });
    const db = (env as unknown as { DB: D1Database }).DB;
    const cookie = request.headers.get("cookie")?.match(/(?:^|;\s*)atlas_visitor=([^;]+)/)?.[1];
    const visitor = cookie && uuid.test(cookie) ? cookie : crypto.randomUUID();
    const now = Date.now();
    const result = await db.batch([
      db.prepare(`INSERT INTO traffic_visitors (id, last_seen, sessions)
        SELECT ?, ?, 1 WHERE NOT EXISTS (SELECT 1 FROM traffic_events WHERE id = ?)
        ON CONFLICT(id) DO UPDATE SET sessions = sessions + CASE WHEN excluded.last_seen - last_seen >= 1800000 THEN 1 ELSE 0 END, last_seen = excluded.last_seen`).bind(visitor, now, eventId),
      db.prepare("INSERT OR IGNORE INTO traffic_events (id, path, created) VALUES (?, ?, ?)").bind(eventId, path, now),
      db.prepare("SELECT COUNT(*) AS visitors, COALESCE(SUM(sessions), 0) AS sessions FROM traffic_visitors"),
      db.prepare("SELECT COUNT(*) AS views FROM traffic_events WHERE path = ?").bind(path),
      db.prepare("SELECT MIN(created) AS since FROM traffic_events"),
    ]);
    headers.set("Set-Cookie", `atlas_visitor=${visitor}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`);
    return Response.json({ ...(result[2].results[0] as Record<string, number>), ...(result[3].results[0] as Record<string, number>), ...(result[4].results[0] as Record<string, number>) }, { headers });
  } catch {
    return Response.json({ error: "Traffic statistics unavailable" }, { status: 503, headers });
  }
}
