import { TrialTimeline } from "./components/TrialTimeline";
import { trials } from "./data/trials";

export default function HomePage() {
  return (
    <main className="atlas-page">
      <header className="hero">
        <p className="hero-kicker">A curated clinical reference</p>
        <h1>MS Trial Atlas</h1>
        <p className="hero-subtitle">
          The pivotal Phase III trials that shaped modern multiple sclerosis
          treatment.
        </p>
      </header>

      <TrialTimeline trials={trials} />
    </main>
  );
}
