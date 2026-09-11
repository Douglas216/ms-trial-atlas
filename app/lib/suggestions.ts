import { trials } from "../data/trials";

const sources = new Set(["/", ...trials.map((trial) => `/trials/${trial.slug}`)]);
export function isSuggestionSource(value: unknown): value is string {
  return typeof value === "string" && sources.has(value);
}

export function isSuggestionOwner(email: string | null | undefined, adminEmail: string | undefined) {
  return !!email?.trim() && !!adminEmail?.trim() && email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
}
