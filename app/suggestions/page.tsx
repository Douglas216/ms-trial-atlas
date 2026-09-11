import Link from "next/link";
import { SuggestionForm } from "../components/SuggestionForm";
import { isSuggestionSource } from "../lib/suggestions";

type SuggestionPageProps = { searchParams: Promise<{ source?: string }> };

export default async function SuggestionsPage({ searchParams }: SuggestionPageProps) {
  const { source } = await searchParams;
  const sourcePath = isSuggestionSource(source) ? source : "/";

  return (
    <main className="suggestions-page">
      <Link className="back-link" href={sourcePath}><span aria-hidden="true">←</span> Back to the atlas</Link>
      <section className="suggestions-card">
        <p className="section-label">Suggestion</p>
        <h1>Help improve the atlas</h1>
        <p>Share a correction, a source, or an idea for this reference.</p>
        <SuggestionForm sourcePath={sourcePath} />
      </section>
    </main>
  );
}
