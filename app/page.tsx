import { TrafficCounter } from "./components/TrafficCounter";
import { HomeAtlas } from "./components/HomeAtlas";
import { trials } from "./data/trials";

export default function HomePage() {
  const now = new Date().toISOString().slice(0, 10);

  return (
    <main className="atlas-page">
      <HomeAtlas trials={trials} now={now} />
      <TrafficCounter path="/" />
    </main>
  );
}
