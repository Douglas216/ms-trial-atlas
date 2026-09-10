"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { matchesTrial } from "../lib/search";
type Entry = { slug: string; studyName: string; drug: string; nctIds: string[] };
export function ProfileSearch({ entries }: { entries: Entry[] }) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("page");
  const [total, setTotal] = useState(0);
  const [position, setPosition] = useState(0);
  const ranges = useRef<Range[]>([]);
  useEffect(() => {
    const registry = (CSS as unknown as { highlights?: Map<string, unknown> }).highlights;
    registry?.delete("atlas-matches");
    ranges.current = [];
    if (mode !== "page" || !query.trim()) return;
    const root = document.querySelector(".trial-profile");
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const needle = query.toLowerCase();
    let node: Node | null;
    while ((node = walker.nextNode())) {
      if (node.parentElement?.closest("script, style, button, input")) continue;
      const value = (node.textContent || "").toLowerCase();
      let offset = value.indexOf(needle);
      while (offset !== -1) {
        const range = document.createRange();
        range.setStart(node, offset); range.setEnd(node, offset + needle.length);
        ranges.current.push(range);
        offset = value.indexOf(needle, offset + needle.length);
      }
    }
    const HighlightClass = (window as unknown as { Highlight?: new (...ranges: Range[]) => unknown }).Highlight;
    if (HighlightClass) registry?.set("atlas-matches", new HighlightClass(...ranges.current));
    // Update result counts after collecting the rendered profile's text.
    queueMicrotask(() => { setTotal(ranges.current.length); setPosition(0); });
    return () => { registry?.delete("atlas-matches"); };
  }, [mode, query]);
  function go(direction: number) {
    if (!ranges.current.length) return;
    const next = (position + direction + ranges.current.length) % ranges.current.length;
    setPosition(next);
    const range = ranges.current[next];
    range.startContainer.parentElement?.scrollIntoView({ block: "center", behavior: "smooth" });
    window.getSelection()?.removeAllRanges(); window.getSelection()?.addRange(range);
  }
  const results = entries.filter((trial) => matchesTrial(trial, query));
  return <div className="profile-search atlas-search">
    <label htmlFor="profile-search">Search</label>
    <div className="search-row"><select aria-label="Search scope" value={mode} onChange={(event) => { setMode(event.target.value); setTotal(0); }}><option value="page">Within this trial</option><option value="atlas">All trials</option></select>
    <input id="profile-search" type="search" value={query} placeholder={mode === "page" ? "Find a keyword…" : "Trial name or drug…"} onChange={(event) => { setQuery(event.target.value); setTotal(0); }} onKeyDown={(event) => { if (event.key === "Enter" && mode === "page") go(event.shiftKey ? -1 : 1); }} /></div>
    {query.trim() && (mode === "atlas" ? <div className="search-results"><span role="status">{results.length} matching trials</span>{results.map((trial) => <Link key={trial.slug} href={`/trials/${trial.slug}`}>{trial.studyName}<small>{trial.drug}</small></Link>)}</div> : <div className="find-controls"><span role="status">{total ? `${position + 1} of ${total} matches` : "No matches"}</span><button disabled={!total} onClick={() => go(-1)}>Previous</button><button disabled={!total} onClick={() => go(1)}>Next</button></div>)}
  </div>;
}
