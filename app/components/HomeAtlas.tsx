"use client";

import { useState } from "react";
import type { Trial } from "../data/trials";
import { TrialTimeline } from "./TrialTimeline";

export function HomeAtlas({ trials, now }: { trials: Trial[]; now: string }) {
  const [query, setQuery] = useState("");

  return (
    <>
      <header className="hero">
        <div className="hero-title-row">
          <h1>MS Trial Atlas</h1>
          <div className="hero-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
            <input
              aria-label="Search trials or therapies"
              type="search"
              value={query}
              placeholder="Trial name or drug…"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
        <p className="hero-subtitle">
          The pivotal Phase III trials that shaped modern multiple sclerosis treatment.
        </p>
      </header>
      <TrialTimeline trials={trials} now={now} query={query} />
    </>
  );
}
