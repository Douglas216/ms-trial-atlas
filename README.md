# MS Trial Atlas

[**Explore the live atlas → mstrialatlas.com**](https://mstrialatlas.com)

MS Trial Atlas is a curated educational reference for the landmark Phase III
clinical trials that shaped modern multiple sclerosis treatment. It places
pivotal controlled-trial periods on an interactive timeline and pairs each
entry with a focused scientific profile for rapid clinical orientation and
teaching.

The atlas is designed for MS clinicians, researchers, fellows, residents,
medical students, and other trainees. It is a historical and educational
resource, not a comprehensive trial registry, recruitment tool, or substitute
for clinical decision-making.

## What the site includes

- An interactive interval timeline of 27 curated landmark Phase III trials.
- Search by trial name, therapy, or registry identifier from the homepage.
- One educational profile per trial, covering study design, population,
  intervention and comparator, primary results, selected secondary outcomes,
  controlled-phase safety, interpretation, and source provenance.
- Keyword search within individual trial profiles.
- Public readership statistics and page-view counts.
- A public suggestion form for corrections or additions, with an owner-only
  review inbox.

## Scientific approach

Each timeline bar represents the controlled pivotal period: official study
start (or first participant enrolled) through primary completion or the end of
the randomized controlled phase used for the primary analysis. Open-label
extensions are not included in those intervals.

The content is locally curated from primary records wherever possible,
including trial registries, peer-reviewed publications, and regulatory source
documents. Details and sourcing standards are documented in
[AGENTS.md](AGENTS.md).

## Local development

Requires Node.js 22 or later.

```bash
npm install
npm run dev
```

Build the production bundle with:

```bash
npm run build
```

## Project structure

```text
app/data/trials.ts                 Timeline trial data
app/data/trialProfiles.ts          Curated profile content
app/data/trialOutcomeFigures.ts    Typed primary-outcome figure data
app/components/TrialTimeline.tsx   Interactive timeline
app/trials/[slug]/page.tsx         Trial profile route
app/suggestions/                   Public form and private review inbox
```

## Contributing

Suggestions for factual corrections and potential additions are welcome through
the [live site’s suggestion form](https://mstrialatlas.com/suggestions). Please
provide a primary source or registry link when suggesting a scientific update.
