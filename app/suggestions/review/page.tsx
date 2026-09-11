import { env } from "cloudflare:workers";
import { notFound } from "next/navigation";
import { requireChatGPTUser } from "../../chatgpt-auth";
import { chatGPTSignOutPath } from "../../chatgpt-auth";
import { isSuggestionOwner } from "../../lib/suggestions";
import { getRawDb } from "../../../db";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata = { title: "Private suggestions · MS Trial Atlas", robots: { index: false, follow: false } };

type Suggestion = {
  id: string;
  source_path: string;
  name: string | null;
  email: string;
  comment: string;
  anonymous: number;
  created_at: number;
};

export default async function SuggestionReviewPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const page = /^\d{1,6}$/.test(params.page || "") ? Math.max(1, Number(params.page)) : 1;
  return <PrivateSuggestions page={page} />;
}

async function PrivateSuggestions({ page }: { page: number }) {
  const user = await requireChatGPTUser("/suggestions/review");
  const adminEmail = (env as unknown as { SUGGESTIONS_ADMIN_EMAIL?: string }).SUGGESTIONS_ADMIN_EMAIL;
  if (!isSuggestionOwner(user.email, adminEmail)) notFound();

  let results: Suggestion[] = [];
  let unavailable = false;
  try {
    const db = getRawDb();
    results = (await db.prepare("SELECT id, source_path, name, email, comment, anonymous, created_at FROM suggestions ORDER BY created_at DESC, id DESC LIMIT 51 OFFSET ?").bind((page - 1) * 50).all<Suggestion>()).results;
  } catch {
    console.error("Suggestion inbox storage unavailable");
    unavailable = true;
  }

  return (
    <main className="suggestion-review-page">
      <nav className="suggestion-review-nav"><Link href="/">← Back to the atlas</Link><a href={chatGPTSignOutPath()} target="_top">Sign out</a></nav>
      <header><p className="section-label">Private review</p><h1>Suggestions</h1></header>
      {unavailable ? <p role="alert">Suggestions could not be loaded. Please reload to try again.</p> : results.length ? <div className="suggestion-list">{results.slice(0, 50).map((suggestion) => <article key={suggestion.id}>
        <div><strong>{suggestion.anonymous ? "Anonymous" : suggestion.name || "Name not provided"}</strong><a href={`mailto:${encodeURIComponent(suggestion.email)}`}>{suggestion.email}</a></div>
        <p>{suggestion.comment}</p>
        <footer><Link href={suggestion.source_path}>{suggestion.source_path === "/" ? "Homepage" : suggestion.source_path}</Link><time dateTime={new Date(suggestion.created_at).toISOString()}>{new Date(suggestion.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })}</time></footer>
      </article>)}</div> : <p className="suggestion-empty">{page === 1 ? "No suggestions have been received yet." : "No more suggestions."}</p>}
      {!unavailable && <nav className="suggestion-review-nav" aria-label="Suggestion pages">{page > 1 && <Link href={`/suggestions/review?page=${page - 1}`}>Newer suggestions</Link>}{results.length > 50 && <Link href={`/suggestions/review?page=${page + 1}`}>Older suggestions</Link>}</nav>}
    </main>
  );
}
