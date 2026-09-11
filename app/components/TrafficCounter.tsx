"use client";
import { useEffect, useRef, useState } from "react";
type Counts = { visitors: number; sessions: number; views: number };
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
  </aside>;
}
