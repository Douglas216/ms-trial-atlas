import type { Trial } from "../data/trials";
export function normalizeSearch(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/β/g, "beta").replace(/[^a-z0-9]/g, "");
}
export function matchesTrial(trial: Pick<Trial, "studyName" | "drug" | "nctIds">, query: string) {
  const haystack = normalizeSearch([trial.studyName, trial.drug, ...trial.nctIds].join(" "));
  return query.trim().split(/\s+/).every((word) => haystack.includes(normalizeSearch(word)));
}
