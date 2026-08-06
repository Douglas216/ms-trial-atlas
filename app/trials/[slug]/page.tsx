import type { Metadata } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrialProfile } from "../../data/trialProfiles";
import { getTrialBySlug, trials } from "../../data/trials";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return trials.map((trial) => ({ slug: trial.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const trial = getTrialBySlug(slug);

  if (!trial) {
    return {};
  }

  return {
    title: `${trial.studyName} · MS Trial Atlas`,
    description: `${trial.studyName}: pivotal ${trial.drug} trial design, population, outcomes, safety, and sources.`,
  };
}

function formatAtlasDate(value: string | null) {
  if (!value) return "Not established";
  const parts = value.split("-").map(Number);
  if (parts.length === 1) return value;

  const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] ?? 1));
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    ...(parts.length === 3 ? { day: "numeric" as const } : {}),
    timeZone: "UTC",
  }).format(date);
}

function sourceLabel(url: string) {
  if (url.includes("clinicaltrials.gov")) return "ClinicalTrials.gov record";
  if (url.includes("pubmed.ncbi.nlm.nih.gov")) return "Primary publication on PubMed";
  if (url.includes("accessdata.fda.gov")) return "FDA review";
  if (url.includes("sciencedirect.com")) return "Publisher record";
  if (url.includes("onlinelibrary.wiley.com")) return "Publisher record";
  if (url.includes("pmc.ncbi.nlm.nih.gov")) return "Peer-reviewed source";
  return "Scientific source";
}

function externalLinkProps() {
  return { target: "_blank", rel: "noreferrer" };
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function treatmentNamesInSignificance(significance: string, names: string[]) {
  const treatments = [...new Set(names)]
    .filter((name) => name.toLowerCase() !== "placebo")
    .sort((first, second) => second.length - first.length);

  if (!treatments.length) return significance;

  const pattern = new RegExp(`(${treatments.map(escapeRegExp).join("|")})`, "gi");
  const treatmentSet = new Set(treatments.map((name) => name.toLowerCase()));

  return significance.split(pattern).map((part, index) =>
    treatmentSet.has(part.toLowerCase()) ? <strong key={index}>{part}</strong> : part,
  );
}

export default async function TrialProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const trial = getTrialBySlug(slug);
  const profile = getTrialProfile(slug);

  if (!trial || !profile) {
    notFound();
  }

  const trialIndex = trials.findIndex((candidate) => candidate.slug === slug);
  const previousTrial = trials[trialIndex - 1];
  const nextTrial = trials[trialIndex + 1];
  const significance = treatmentNamesInSignificance(profile.significance, [
    trial.drug,
    profile.intervention.label,
    profile.comparator.label,
  ]);

  return (
    <main className="profile-page">
      <nav className="profile-topbar" aria-label="Trial profile navigation">
        <Link className="back-link" href="/">
          <span aria-hidden="true">←</span> Back to the atlas
        </Link>
        <span className="profile-position">
          {String(trialIndex + 1).padStart(2, "0")} / {trials.length}
        </span>
      </nav>

      <article className="trial-profile">
        <header className="profile-hero">
          <div className="profile-hero-main">
            <h1>{trial.studyName}</h1>
            <p className="profile-drug">{trial.drug}</p>
            <p className="profile-significance">{significance}</p>
          </div>

          <dl className="hero-facts">
            <div>
              <dt>Phase</dt>
              <dd>{profile.phase}</dd>
            </div>
            <div>
              <dt>Population</dt>
              <dd>{trial.diseasePopulation}</dd>
            </div>
            <div>
              <dt>Controlled period</dt>
              <dd>
                {formatAtlasDate(trial.startDate)} —{" "}
                {formatAtlasDate(trial.primaryCompletionDate)}
              </dd>
            </div>
          </dl>
        </header>

        <section className="comparison-section" aria-labelledby="comparison-title">
          <div className="section-heading">
            <h2 id="comparison-title">What was compared</h2>
          </div>

          <div className="design-tags" aria-label="Trial design">
            {profile.design.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="arm-comparison">
            <div className="trial-arm trial-arm--treatment">
              <span className="arm-role">Intervention</span>
              <h3>{profile.intervention.label}</h3>
              <p>{profile.intervention.regimen}</p>
              {profile.intervention.participants && (
                <small>{profile.intervention.participants}</small>
              )}
            </div>
            <div className="comparison-versus" aria-hidden="true">
              <span>vs</span>
            </div>
            <div className="trial-arm">
              <span className="arm-role">Comparator</span>
              <h3>{profile.comparator.label}</h3>
              <p>{profile.comparator.regimen}</p>
              {profile.comparator.participants && (
                <small>{profile.comparator.participants}</small>
              )}
            </div>
          </div>

          {profile.additionalArms && (
            <div className="additional-arms">
              <p>Additional randomized {profile.additionalArms.length === 1 ? "arm" : "arms"}</p>
              <div>
                {profile.additionalArms.map((arm) => (
                  <article key={`${arm.label}-${arm.regimen}`}>
                    <h3>{arm.label}</h3>
                    <span>{arm.regimen}</span>
                    {arm.participants && <small>{arm.participants}</small>}
                  </article>
                ))}
              </div>
            </div>
          )}

          <div className="design-summary">
            <span>{profile.enrollment}</span>
            <span>{profile.controlledDuration} controlled phase</span>
          </div>
        </section>

        <div className="profile-body">
          <div className="profile-science">
            <section className="profile-section" aria-labelledby="population-title">
              <div className="section-heading">
                <h2 id="population-title">Study population</h2>
              </div>

              <dl className="population-grid">
                <div>
                  <dt>Randomized</dt>
                  <dd>{profile.enrollment}</dd>
                </div>
                <div>
                  <dt>Age</dt>
                  <dd>{profile.population.age}</dd>
                </div>
                {profile.population.sex && (
                  <div>
                    <dt>Sex</dt>
                    <dd>{profile.population.sex}</dd>
                  </div>
                )}
                <div>
                  <dt>Disability</dt>
                  <dd>{profile.population.edss}</dd>
                </div>
                <div className="population-grid-wide">
                  <dt>Disease definition</dt>
                  <dd>{profile.population.disease}</dd>
                </div>
              </dl>
            </section>

            <section className="profile-section" aria-labelledby="eligibility-title">
              <div className="section-heading">
                <h2 id="eligibility-title">Who entered the trial</h2>
              </div>

              <div className="criteria-grid">
                <div>
                  <h3>Key inclusion criteria</h3>
                  <ul>
                    {profile.keyInclusion.map((criterion) => (
                      <li key={criterion}>{criterion}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Key exclusion criteria</h3>
                  <ul>
                    {profile.keyExclusion.map((criterion) => (
                      <li key={criterion}>{criterion}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="criteria-note">
                Curated criteria for interpreting the study population—not a complete protocol
                eligibility list.
              </p>
            </section>

            <section className="profile-section result-section" aria-labelledby="result-title">
              <div className="section-heading">
                <h2 id="result-title">Primary endpoint</h2>
              </div>

              <div className="primary-result">
                <div className="primary-result-heading">
                  <div>
                    <span>Prespecified outcome</span>
                    <h3>{profile.primaryOutcome.name}</h3>
                  </div>
                  <p>{profile.primaryOutcome.timepoint}</p>
                </div>
                <div className="result-groups">
                  {profile.primaryOutcome.groups.map((group) => (
                    <div key={`${group.label}-${group.value}`}>
                      <span>{group.label}</span>
                      <strong>{group.value}</strong>
                    </div>
                  ))}
                </div>
                <p className="result-effect">{profile.primaryOutcome.effect}</p>
              </div>

              {profile.secondaryOutcomes.length > 0 && (
                <div className="secondary-results">
                  <h3>Selected secondary outcomes</h3>
                  {profile.secondaryOutcomes.map((outcome) => (
                    <div key={outcome.name}>
                      <span>{outcome.name}</span>
                      <p>{outcome.finding}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="profile-section" aria-labelledby="safety-title">
              <div className="section-heading">
                <h2 id="safety-title">Safety signal</h2>
              </div>
              <ul className="safety-list">
                {profile.safety.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="safety-boundary">
                This summary describes the pivotal controlled trial. It does not merge in
                extension or post-marketing safety evidence.
              </p>
            </section>

            <section className="profile-section" aria-labelledby="interpretation-title">
              <div className="section-heading">
                <h2 id="interpretation-title">Why it mattered</h2>
              </div>
              <div className="interpretation-grid">
                <div>
                  <p>{profile.whyItMattered}</p>
                </div>
                <div>
                  <h3>Important limitation</h3>
                  <p>{profile.limitation}</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="trial-record" aria-label="Trial record and sources">
            <div className="record-block">
              <p className="section-label">Trial record</p>
              <dl>
                <div>
                  <dt>Sponsor</dt>
                  <dd>{profile.sponsor}</dd>
                </div>
                <div>
                  <dt>Trial dates</dt>
                  <dd>
                    {formatAtlasDate(trial.startDate)} —{" "}
                    {formatAtlasDate(trial.primaryCompletionDate)}
                  </dd>
                </div>
                <div>
                  <dt>Phase</dt>
                  <dd>{profile.phase}</dd>
                </div>
                <div>
                  <dt>Enrollment</dt>
                  <dd>{profile.enrollment}</dd>
                </div>
                <div>
                  <dt>Data status</dt>
                  <dd>
                    <span className={`data-status data-status--${trial.dataStatus}`}>
                      {trial.dataStatus === "verified" ? "Verified" : "Needs verification"}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            {(trial.nctIds.length > 0 || trial.protocolIds.length > 0) && (
              <div className="record-block">
                <p className="section-label">Identifiers</p>
                <dl>
                  {trial.nctIds.length > 0 && (
                    <div>
                      <dt>Registry</dt>
                      <dd className="identifier-list">
                        {trial.nctIds.map((nctId) => (
                          <a
                            key={nctId}
                            href={`https://clinicaltrials.gov/study/${nctId}`}
                            {...externalLinkProps()}
                          >
                            {nctId} ↗
                          </a>
                        ))}
                      </dd>
                    </div>
                  )}
                  {trial.protocolIds.length > 0 && (
                    <div>
                      <dt>Protocol</dt>
                      <dd>{trial.protocolIds.join(" · ")}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {trial.publication && (
              <div className="record-block publication-record">
                <p className="section-label">Landmark publication</p>
                <h3>{trial.publication.title}</h3>
                <p>
                  {trial.publication.firstAuthor} · {trial.publication.journal} ·{" "}
                  {trial.publication.year}
                </p>
                <a href={trial.publication.url} {...externalLinkProps()}>
                  Open publication <span aria-hidden="true">↗</span>
                </a>
                <small>DOI {trial.publication.doi}</small>
              </div>
            )}

            <div className="record-block">
              <p className="section-label">Sources</p>
              <ol className="source-list">
                {trial.sourceUrls.map((url, index) => (
                  <li key={url}>
                    <a href={url} {...externalLinkProps()}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {sourceLabel(url)} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            <div className="record-block provenance-note">
              <p className="section-label">Provenance note</p>
              <p>{profile.provenance}</p>
              {trial.dateNote && <p>{trial.dateNote}</p>}
            </div>
          </aside>
        </div>

        <nav className="profile-pagination" aria-label="Adjacent trial profiles">
          {previousTrial ? (
            <Link href={`/trials/${previousTrial.slug}`}>
              <span>Previous trial</span>
              <strong>← {previousTrial.studyName}</strong>
            </Link>
          ) : (
            <span />
          )}
          {nextTrial ? (
            <Link href={`/trials/${nextTrial.slug}`}>
              <span>Next trial</span>
              <strong>{nextTrial.studyName} →</strong>
            </Link>
          ) : (
            <Link href="/">
              <span>Return</span>
              <strong>Atlas timeline →</strong>
            </Link>
          )}
        </nav>
      </article>
    </main>
  );
}
