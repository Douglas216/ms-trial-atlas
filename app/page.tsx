import { TrialTimeline } from "./components/TrialTimeline";
import { trials } from "./data/trials";

export default function HomePage() {
  const now = new Date().toISOString().slice(0, 10);

  return (
    <main className="atlas-page">
      <header className="hero">
        <h1>MS Trial Atlas</h1>
        <p className="hero-subtitle">
          The pivotal Phase III trials that shaped modern multiple sclerosis treatment.
        </p>
      </header>

      <TrialTimeline trials={trials} now={now} />
    </main>
  );
}
