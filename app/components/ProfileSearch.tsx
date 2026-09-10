"use client";
import { useEffect, useRef, useState } from "react";
export function ProfileSearch() {
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [position, setPosition] = useState(0);
  const ranges = useRef<Range[]>([]);
  useEffect(() => {
    const registry = (CSS as unknown as { highlights?: Map<string, unknown> }).highlights;
    registry?.delete("atlas-matches");
    ranges.current = [];
    if (!query.trim()) return;
    const root = document.querySelector(".trial-profile");
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const needle = query.toLowerCase();
    let node: Node | null;
    while ((node = walker.nextNode())) {
      if (node.parentElement?.closest("script, style, button, input, .profile-search")) continue;
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
  }, [query]);
  function go(direction: number) {
    if (!ranges.current.length) return;
    const next = (position + direction + ranges.current.length) % ranges.current.length;
    setPosition(next);
    const range = ranges.current[next];
    range.startContainer.parentElement?.scrollIntoView({ block: "center", behavior: "smooth" });
    window.getSelection()?.removeAllRanges(); window.getSelection()?.addRange(range);
  }
  return <div className="profile-search atlas-search">
    <label className="sr-only" htmlFor="profile-search">Find a keyword within this trial</label>
    <div className="search-row">
    <input id="profile-search" type="search" value={query} placeholder="Find a keyword…" onChange={(event) => { setQuery(event.target.value); setTotal(0); }} onKeyDown={(event) => { if (event.key === "Enter") go(event.shiftKey ? -1 : 1); }} /></div>
    {query.trim() && <div className="find-controls"><span role="status">{total ? `${position + 1} of ${total} matches` : "No matches"}</span><button disabled={!total} onClick={() => go(-1)}>Previous</button><button disabled={!total} onClick={() => go(1)}>Next</button></div>}
  </div>;
}
