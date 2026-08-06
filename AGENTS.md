# MS Trial Atlas: Durable Project Context

Last updated: 2026-07-30

This file is the source of truth for product intent, scientific-data rules, and
decisions that should survive across Codex tasks. Read it before making changes.

## Maintenance rule

Update this file in the same change whenever work materially changes:

- product scope, audience, or positioning;
- scientific inclusion criteria or date interpretation;
- the timeline's visual or interaction conventions;
- the data model, sourcing policy, routes, or architecture;
- a decision recorded below.

Do not add routine implementation details or temporary debugging notes. Preserve
the rationale behind decisions, not just the latest UI state. A direct user
instruction always takes precedence over this document.

## Project identity

MS Trial Atlas is a standalone project and codebase. It is related to, but must
remain separate from, MS Trials Hub.

- **MS Trials Hub:** broad clinical-trial discovery, recruitment, eligibility,
  location, phase, sponsor, and ClinicalTrials.gov-oriented filtering.
- **MS Trial Atlas:** a small, curated educational reference about landmark
  pivotal trials that shaped modern multiple sclerosis treatment.

Never modify, overwrite, import from, or tightly couple this project to the MS
Trials Hub codebase.

## Problem being solved

The MS literature contains pivotal treatment trials spread across decades,
registries, publications, regulatory reviews, and inconsistent historical
records. Clinicians and trainees need a fast way to understand:

- when the landmark controlled trials occurred;
- how the trials overlapped historically;
- which therapy each trial studied;
- when each landmark publication appeared;
- the essential design context behind each trial.

MS Trial Atlas turns those records into an elegant, interactive scientific
timeline. It is a study guide and clinical reference, not a comprehensive trial
database or a patient recruitment tool.

Core product statement:

> A beautiful interactive reference that places the pivotal Phase III trials
> that shaped modern multiple sclerosis treatment at clinicians' fingertips.

## Target users

Primary users:

- MS neurologists and other clinicians;
- MS researchers;
- neurology fellows and fellowship directors;
- residents, medical students, and other clinical trainees.

The experience should support rapid orientation and teaching. It should feel
credible to an expert while remaining understandable to a trainee.

## Current scope

The initial atlas contains exactly 22 curated landmark entries, derived from
Table 1, "Overview of pivotal clinical trials for approved disease-modifying MS
therapies," in the review "Thinking outside the box: non-canonical targets in
multiple sclerosis."

1. IFNβ-1b subcutaneous pivotal trial
2. Copolymer 1 pivotal trial
3. MSCRG
4. PRISMS
5. MIMS
6. AFFIRM
7. FREEDOMS
8. TRANSFORMS
9. FREEDOMS II
10. CLARITY
11. TEMSO
12. TOPIC
13. TOWER
14. CONFIRM
15. DEFINE
16. CAMMS223
17. CARE-MS I
18. EXPAND
19. OPERA I & II
20. ORATORIO
21. SUNBEAM
22. OPTIMUM

The current product consists of:

- a homepage with the title, subtitle, and interactive interval timeline;
- one complete educational profile route per trial;
- locally curated structured data shared by the timeline and profiles.

Do not expand the product without a user request. Current non-goals include:

- cataloging every MS trial;
- search, filters, or comparison tools;
- card grids, glossary, or educational summary panels;
- authentication or user accounts;
- a database, backend API, or live ClinicalTrials.gov integration;
- AI features;
- exhaustive protocol reproductions, investigator directories, or regulatory
  dossiers.

## Scientific-data rules

Scientific accuracy is more important than visual completeness.

Never invent a date, publication, disease population, comparator, endpoint,
identifier, protocol number, result, sample size, or scientific claim.

Preferred source order:

1. ClinicalTrials.gov or another official trial registry;
2. the primary peer-reviewed trial publication;
3. FDA or EMA reviews and approval documents;
4. official protocols and supplementary appendices;
5. high-quality systematic reviews only when primary records are insufficient.

Store source URLs with each trial. When sources disagree, document the conflict
and do not silently choose a convenient value.

Use the most precise verified ISO date available:

- `YYYY-MM-DD` when the exact day is known;
- `YYYY-MM` when only the month is defensible;
- `YYYY` only when greater precision would be invented.

Use `dateNote` to disclose a reconstructed or approximate boundary. A dated
entry can remain `needs-verification` when the interval is useful but not exact.

### Trial profile evidence

Trial profiles are curated interpretations of the pivotal controlled phase.
They are not registry mirrors and must not imply that abbreviated eligibility
criteria are sufficient for clinical screening.

- Distinguish baseline cohort values from eligibility ranges. Label an age
  range as eligible rather than presenting it as an observed range.
- Show arm-level outcome values when the primary source reports them; do not
  present a relative effect without its underlying comparison when those values
  are available.
- Identify the exact endpoint definition and prespecified timepoint. For
  coprimary endpoints, preserve both outcomes, including a negative result.
- Limit secondary outcomes to a small set that materially aids interpretation.
- Label inclusion and exclusion lists as `Key` criteria and disclose that they
  are not the complete protocol.
- Keep controlled-trial safety separate from extension and post-marketing
  knowledge. A limitation may explain that the pivotal trial could not
  characterize rare or delayed risks, but do not silently merge later events
  into the controlled results.
- Sponsorship and source provenance are scientific context, not decorative
  metadata. Prefer the registry record for modern sponsor names and disclose
  when an older record depends on FDA or publication-era documentation.

### Meaning of an interval

Every horizontal bar represents:

> official study start or first participant enrolled → primary completion or
> completion of the pivotal randomized/controlled phase used for the primary
> analysis.

Do not extend a bar through a long open-label extension. Extensions may be
represented later, but no extension styling is implemented now.

Important historical interpretations currently in the data:

- IFNβ-1b ends after the FDA-recorded 104-week controlled phase.
- Copolymer 1 uses exact FDA first-enrollment and last-observation dates.
- MSCRG ends in early 1993 and remains explicitly approximate.
- PRISMS ends after the last recruitment month plus its fixed two-year phase.
- MIMS uses exact FDA first-randomization and last-completion dates.
- TRANSFORMS ends after its 12-month randomized core; the registry's 2011 date
  includes the extension and must not be used as the core interval endpoint.
- FREEDOMS II uses the registry's actual primary-completion month.

## Timeline and interaction decisions

- The timeline is an interval/Gantt-like scientific figure, not a point
  timeline.
- The left column contains study name and smaller therapy text.
- The left column remains aligned with its interval row while the fitted year
  plot stays fully visible.
- The default row order is newest trial start to oldest, with a visible control
  for newest-first, oldest-first, and alphabetical sorting.
- Divide the year plot into five-year major cells with faint one-year minor
  ticks. Fit the complete range to the available width without horizontal
  scrolling; on narrow screens, reduce label frequency while preserving every
  grid division.
- The range begins with the earliest trial, currently 1988, and extends through
  the present.
- A labeled vertical `Today` rule marks the current date.
- All controlled-phase interval bars use the same solid treatment. Do not
  reintroduce stripes, empty fills, or comparator-based bar patterns.
- Comparator information belongs in the trial tooltip/details, not bar fill.
- Start and end caps mark interval boundaries.
- Every interval is keyboard-focusable and links to `/trials/[slug]`.
- Every study/therapy cell in the left column is also keyboard-focusable and
  links to the same trial profile, giving each row a second clear navigation
  target. A persistent directional cue makes this navigation affordance visible
  before hover or focus.

### Trial interval tooltip

Keep the compact trial tooltip limited to:

- study name;
- drug;
- disease population;
- comparator type;
- primary endpoint category;
- trial period;
- publication year;
- a short provenance note only when a date is derived or approximate.

### Landmark publication marker

- A small diamond marks the landmark publication year.
- The diamond is vertically centered on the corresponding trial row.
- The sole timeline legend reads `Landmark publication`.
- Hover or keyboard focus shows publication title, compact author line, journal
  and year, and one `Open publication ↗` action.
- Do not show a separate DOI row when it points to the same destination as the
  open-publication action. The DOI remains stored in data.
- Use `FirstAuthor et al.` for authored papers. Use the study-group name without
  `et al.` for group-authored papers.
- Publication actions open the DOI or publisher page in a new tab.

## Visual direction

The intended character is:

- modern medical atlas;
- premium educational reference;
- interactive scientific figure;
- museum exhibition of landmark trials.

Use restrained off-white surfaces, dark navy/charcoal text, one muted clinical
green accent, precise typography, subtle rules, and generous but purposeful
whitespace.

Current hero decisions:

- title: `MS Trial Atlas`;
- subtitle: `The pivotal Phase III trials that shaped modern multiple sclerosis treatment.`;
- no kicker above the title;
- keep the subtitle on one line at the primary desktop viewport when space
  allows, but permit wrapping responsively;
- keep the gap between the subtitle and timeline rule compact.

Avoid generic dashboard chrome, decorative imagery, navigation menus, and
unrequested content modules.

### Trial profile visual hierarchy

Each profile should read like a carefully annotated journal abstract rather
than a registry dump. Preserve this order:

1. trial identity and a neutral one-sentence significance statement;
2. a visually dominant intervention-versus-comparator block;
3. study population and key eligibility;
4. primary endpoint with arm-level results, followed by selected secondary
   outcomes;
5. controlled-phase safety;
6. why the trial mattered and one important limitation.

On desktop, keep identifiers, sponsor, landmark citation, scientific sources,
and provenance in a quieter sticky side rail. On small screens, move that
record below the scientific narrative. Keep neighboring-trial navigation at
the end of every profile. Do not repeat the homepage timeline or add a
`Position in the atlas` strip to individual profiles; the trial dates in the
hero and record rail provide sufficient historical context.

Within the significance statement, bold named therapies when they are being
contrasted. When the comparator is placebo, keep the word `placebo` at regular
weight while retaining emphasis on the named therapy.

## Architecture

Key files:

- `app/data/trials.ts`: canonical local trial data and types;
- `app/data/trialProfiles.ts`: curated profile content and profile-specific
  types;
- `app/components/TrialTimeline.tsx`: timeline, tooltips, markers, and date axis;
- `app/page.tsx`: homepage composition and current-date value;
- `app/trials/[slug]/page.tsx`: reusable, statically generated trial profiles;
- `app/globals.css`: visual system and responsive behavior;
- `.openai/hosting.json`: existing Sites project binding; reuse it.

The project uses Next-style routes through vinext and is deployed with Sites.
The production site is:

`https://ms-trial-atlas.artful-tuna-9970.chatgpt.site/`

Do not add a database or live data fetch merely because starter D1 files exist.
The current data set is intentionally local and curated.

## Working conventions

- Preserve the centralized data model; do not duplicate trial facts in
  components.
- Keep OPERA I & II grouped on the homepage while retaining both identifiers.
- Preserve hover, focus, and keyboard accessibility when changing interactions.
- Keep the fitted five-year grid visible on mobile; reduce axis-label frequency
  before removing annual subdivisions.
- Run `npm run build` after implementation changes.
- Run `npm run lint` when TypeScript, JSX, or CSS-adjacent component code
  changes.
- The existing `tests/rendered-html.test.mjs` is leftover starter coverage and
  is not currently authoritative for the atlas UI. Replace it with product
  tests before relying on `npm test`.
- Because `.openai/hosting.json` exists, follow the Sites build and hosting
  workflow for deployable site changes and reuse the existing project.

## Decision log

- **2026-07-30 — Separate product:** Created MS Trial Atlas as a standalone
  curated reference rather than extending MS Trials Hub.
- **2026-07-30 — Homepage-only first version:** Limited the product to the hero,
  interactive timeline, and placeholder trial routes.
- **2026-07-30 — Local curated data:** Chose one structured local TypeScript file
  instead of a database or live registry integration.
- **2026-07-30 — Controlled-phase intervals:** Defined bars as study start
  through primary completion of the pivotal controlled phase, excluding
  open-label extensions.
- **2026-07-30 — Unified bars:** Removed comparator-driven solid/striped/empty
  fills; all intervals now share one solid treatment.
- **2026-07-30 — Publication interaction:** Centered diamonds on rows and added
  compact publication tooltips with a single external action, omitting the
  redundant DOI row.
- **2026-07-30 — Historical coverage:** Researched and added the seven formerly
  undated entries, moving the visible start of the atlas to 1988.
- **2026-07-30 — Present-time context:** Added a dynamic `Today` marker and
  extended the axis through the current year.
- **2026-07-30 — Hero refinement:** Removed the kicker, kept the desktop
  subtitle on one line, and reduced excess spacing before the timeline.
- **2026-07-30 — Complete trial profiles:** Replaced placeholder routes with a
  consistent scientific narrative covering study design, population, key
  eligibility, endpoints, arm-level results, controlled-phase safety,
  interpretation, limitations, identifiers, sponsorship, and source
  provenance. Kept complete protocols and later safety evidence out of the
  profile summaries.
- **2026-07-31 — Profile hierarchy refinement:** Removed the repeated
  `Position in the atlas` strip from individual profiles so the page moves
  directly from trial identity into the intervention-versus-comparator design.
- **2026-07-31 — Significance treatment emphasis:** Bold named therapies in
  profile significance statements, while leaving placebo unbolded to preserve
  visual focus on the named treatment.
- **2026-08-04 — Persistent timeline orientation:** Keep the study/therapy
  heading and year axis visible as one sticky header while the user scrolls
  through trial rows, with the year axis synchronized to horizontal timeline
  scrolling.
- **2026-08-04 — Atlas site icon:** Use a restrained, text-free timeline mark
  in the established paper, navy, and clinical-green palette for browser and
  home-screen icons.
- **2026-08-04 — Linked study labels:** Make every study/therapy cell in the
  timeline's left column a full-cell link to its trial profile, with visible
  hover and keyboard-focus treatment.
- **2026-08-06 — Recent-first timeline orientation:** Default trial rows to
  newest-first, retain selectable oldest-first and alphabetical orders, open
  the plot at the recent-year end, and show a horizontal-scroll cue rather than
  compressing the scientifically meaningful year scale or adding zoom controls.
- **2026-08-06 — Visible profile affordance:** Add a persistent directional cue
  to linked study/therapy cells so their profile navigation is apparent without
  relying on hover discovery.
- **2026-08-06 — Fitted five-year axis:** Superseded the horizontal-scroll
  orientation with a full-width scale divided into five-year major cells and
  faint annual subdivisions. Removed the scroll cue because the complete range
  now remains visible at once.
- **2026-08-06 — Profile legibility:** Removed the repetitive landmark-trial
  kicker and the study-design section number from all profiles, tightened the
  hero's top spacing, and enlarged profile navigation, hero facts, design-role
  labels, arm sample sizes, and the design summary for faster reading.
- **2026-08-06 — Simplified profile headings:** Removed the numbered and
  uppercase kickers above every main scientific section, enlarged the central
  versus marker while removing its vertical dividers, and consistently added
  standard MS-course abbreviations to profile population labels.
