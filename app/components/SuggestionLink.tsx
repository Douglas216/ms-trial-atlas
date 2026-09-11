"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SuggestionLink() {
  const pathname = usePathname();
  if (pathname.startsWith("/suggestions")) return null;

  return (
    <Link className="suggestion-link" href={`/suggestions?source=${encodeURIComponent(pathname)}`}>
      Suggest an update
    </Link>
  );
}
