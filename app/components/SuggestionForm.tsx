"use client";

import { type FormEvent, useRef, useState } from "react";

export function SuggestionForm({ sourcePath }: { sourcePath: string }) {
  const [anonymous, setAnonymous] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const submissionId = useRef<string | null>(null);
  const sending = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setStatus("sending");
    setMessage("");
    const element = event.currentTarget;
    const form = new FormData(element);
    submissionId.current ??= crypto.randomUUID();
    try {
    const response = await fetch("/api/suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submissionId: submissionId.current,
        sourcePath,
        name: form.get("name"),
        email: form.get("email"),
        comment: form.get("comment"),
        anonymous,
      }),
    });
    if (response.ok) {
      setStatus("sent");
      setMessage("Thank you. Your suggestion has been received.");
      element.reset();
      submissionId.current = null;
      setAnonymous(false);
      return;
    }
    throw new Error("Suggestion not saved");
    } catch {
      setStatus("error");
      setMessage("Your suggestion could not be sent. Your text is still here—please try again.");
    } finally {
      sending.current = false;
    }
  }

  return (
    <form className="suggestion-form" onSubmit={submit} onChange={() => { submissionId.current = null; }}>
      <fieldset disabled={status === "sending"}>
      <label>
        Name <span>Optional</span>
        <input name="name" disabled={anonymous} maxLength={100} autoComplete="name" />
      </label>
      <label className="suggestion-anonymous">
        <input type="checkbox" checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} />
        Anonymous (omit my name)
      </label>
      <label>
        Email
        <input name="email" type="email" required maxLength={254} autoComplete="email" aria-describedby="suggestion-privacy" />
      </label>
      <p id="suggestion-privacy" className="suggestion-privacy">Only the atlas owner can read your submission. Anonymous omits your name; your email is still shared privately so the owner can reply.</p>
      <label>
        Comment
        <textarea name="comment" required maxLength={6000} rows={8} />
      </label>
      <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send suggestion"}</button>
      </fieldset>
      {message && <p className={`suggestion-status suggestion-status--${status}`} role="status">{message}</p>}
    </form>
  );
}
