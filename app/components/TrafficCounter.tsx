"use client";
import { useEffect, useRef, useState } from "react";
type Counts = { visitors: number; sessions: number; views: number; since: number };
export function TrafficCounter({ path }: { path: string }) {
  const event = useRef({ path: "", id: "" });
  const [counts, setCounts] = useState<Counts | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (event.current.path !== path) event.current = { path, id: crypto.randomUUID() };
    let active = true;
    fetch("/api/traffic", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path, eventId: event.current.id }) })
      .then((response) => { if (!response.ok || response.status === 204) throw new Error(); return response.json() as Promise<Counts>; })
      .then((data: Counts) => { if (active) setCounts(data); })
      .catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, [path]);
  return <aside className="traffic-counter" aria-label="Public traffic statistics">
    <div>{counts ? path === "/" ? <><strong>{counts.visitors.toLocaleString()}</strong> unique visitors <span>·</span> <strong>{counts.sessions.toLocaleString()}</strong> sessions</> : <><strong>{counts.views.toLocaleString()}</strong> page views</> : failed ? "Statistics unavailable" : "Loading statistics…"}</div>
    <details><summary>About these counts</summary><p>{counts ? `Since ${new Date(counts.since).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}. ` : ""}Unique visitors estimate distinct browsers using a first-party cookie retained for up to one year. Sessions restart after 30 minutes without a page view. Repeat page views count. Clearing cookies or switching browsers can count you again. No IP addresses are stored. Automated traffic is filtered on a best-effort basis.</p></details>
  </aside>;
}
