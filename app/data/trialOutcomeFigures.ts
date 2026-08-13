import { trials } from "./trials";

export type OutcomeFigureValue = {
  label: string;
  value: number;
  displayValue: string;
  reference?: boolean;
  ciLow?: number;
  ciHigh?: number;
};

type OutcomePanelBase = {
  title: string;
  timepoint: string;
  values: OutcomeFigureValue[];
};

export type BarOutcomePanel = OutcomePanelBase & {
  kind: "bars";
  axisMax: number;
  axisLabel: string;
  lowerIsBetter: boolean;
};

export type EffectOutcomePanel = OutcomePanelBase & {
  kind: "effect";
  axisMin: number;
  axisMax: number;
  nullValue: number;
  axisLabel: string;
  lowerLabel: string;
  upperLabel: string;
};

export type OutcomePanel = BarOutcomePanel | EffectOutcomePanel;

export type TrialOutcomeFigure = {
  panels: OutcomePanel[];
  note?: string;
};

export const trialOutcomeFigures: Record<string, TrialOutcomeFigure> = {
  "ifnb-1b-pivotal": {
    panels: [
      {
        kind: "bars",
        title: "Annualized exacerbation rate",
        timepoint: "2 years",
        axisMax: 1.5,
        axisLabel: "Exacerbations per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Interferon beta-1b 250 μg", value: 0.84, displayValue: "0.84" },
          { label: "Placebo", value: 1.27, displayValue: "1.27", reference: true },
        ],
      },
    ],
  },
  "copolymer-1": {
    panels: [
      {
        kind: "bars",
        title: "Annualized relapse rate",
        timepoint: "2 years",
        axisMax: 1,
        axisLabel: "Relapses per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Copolymer 1", value: 0.59, displayValue: "0.59" },
          { label: "Placebo", value: 0.84, displayValue: "0.84", reference: true },
        ],
      },
    ],
  },
  mscrg: {
    panels: [
      {
        kind: "bars",
        title: "Sustained disability progression",
        timepoint: "Kaplan–Meier estimate at 104 weeks",
        axisMax: 40,
        axisLabel: "Participants with progression (%)",
        lowerIsBetter: true,
        values: [
          { label: "Interferon beta-1a", value: 21.9, displayValue: "21.9%" },
          { label: "Placebo", value: 34.9, displayValue: "34.9%", reference: true },
        ],
      },
    ],
    note: "These are the published Kaplan–Meier estimates at 104 weeks, not raw participant proportions.",
  },
  prisms: {
    panels: [
      {
        kind: "bars",
        title: "Mean relapses per participant",
        timepoint: "2 years",
        axisMax: 3,
        axisLabel: "Mean relapses",
        lowerIsBetter: true,
        values: [
          { label: "Interferon beta-1a 44 μg", value: 1.73, displayValue: "1.73" },
          { label: "Interferon beta-1a 22 μg", value: 1.82, displayValue: "1.82" },
          { label: "Placebo", value: 2.56, displayValue: "2.56", reference: true },
        ],
      },
    ],
  },
  mims: {
    panels: [
      {
        kind: "effect",
        title: "Multivariate composite treatment difference",
        timepoint: "24 months",
        axisMin: -0.1,
        axisMax: 0.5,
        nullValue: 0,
        axisLabel: "Composite treatment difference (95% CI)",
        lowerLabel: "Favors placebo",
        upperLabel: "Favors mitoxantrone",
        values: [
          {
            label: "Mitoxantrone 12 mg/m² vs placebo",
            value: 0.3,
            displayValue: "0.30 (0.17–0.44)",
            ciLow: 0.17,
            ciHigh: 0.44,
          },
        ],
      },
    ],
    note: "The prespecified endpoint combined five clinical measures; the plotted estimate is the reported composite treatment difference.",
  },
  affirm: {
    panels: [
      {
        kind: "bars",
        title: "Annualized clinical relapse rate",
        timepoint: "1 year",
        axisMax: 1,
        axisLabel: "Relapses per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Natalizumab", value: 0.26, displayValue: "0.26" },
          { label: "Placebo", value: 0.81, displayValue: "0.81", reference: true },
        ],
      },
      {
        kind: "bars",
        title: "12-week sustained disability progression",
        timepoint: "2 years",
        axisMax: 35,
        axisLabel: "Participants with progression (%)",
        lowerIsBetter: true,
        values: [
          { label: "Natalizumab", value: 17, displayValue: "17%" },
          { label: "Placebo", value: 29, displayValue: "29%", reference: true },
        ],
      },
    ],
    note: "AFFIRM had primary efficacy endpoints at different prespecified timepoints; both are retained here.",
  },
  freedoms: {
    panels: [
      {
        kind: "bars",
        title: "Annualized relapse rate",
        timepoint: "24 months",
        axisMax: 0.5,
        axisLabel: "Relapses per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Fingolimod 0.5 mg", value: 0.18, displayValue: "0.18" },
          { label: "Fingolimod 1.25 mg", value: 0.16, displayValue: "0.16" },
          { label: "Placebo", value: 0.4, displayValue: "0.40", reference: true },
        ],
      },
    ],
  },
  transforms: {
    panels: [
      {
        kind: "bars",
        title: "Annualized relapse rate",
        timepoint: "12 months",
        axisMax: 0.4,
        axisLabel: "Relapses per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Fingolimod 0.5 mg", value: 0.16, displayValue: "0.16" },
          { label: "Fingolimod 1.25 mg", value: 0.2, displayValue: "0.20" },
          { label: "Interferon beta-1a", value: 0.33, displayValue: "0.33", reference: true },
        ],
      },
    ],
  },
  "freedoms-ii": {
    panels: [
      {
        kind: "bars",
        title: "Annualized relapse rate",
        timepoint: "24 months",
        axisMax: 0.5,
        axisLabel: "Relapses per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Fingolimod 0.5 mg", value: 0.21, displayValue: "0.21" },
          { label: "Placebo", value: 0.4, displayValue: "0.40", reference: true },
        ],
      },
    ],
  },
  clarity: {
    panels: [
      {
        kind: "bars",
        title: "Annualized relapse rate",
        timepoint: "96 weeks",
        axisMax: 0.4,
        axisLabel: "Relapses per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Cladribine 3.5 mg/kg", value: 0.14, displayValue: "0.14" },
          { label: "Cladribine 5.25 mg/kg", value: 0.15, displayValue: "0.15" },
          { label: "Placebo", value: 0.33, displayValue: "0.33", reference: true },
        ],
      },
    ],
  },
  temso: {
    panels: [
      {
        kind: "bars",
        title: "Annualized relapse rate",
        timepoint: "108 weeks",
        axisMax: 0.6,
        axisLabel: "Relapses per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Teriflunomide 14 mg", value: 0.37, displayValue: "0.37" },
          { label: "Teriflunomide 7 mg", value: 0.37, displayValue: "0.37" },
          { label: "Placebo", value: 0.54, displayValue: "0.54", reference: true },
        ],
      },
    ],
  },
  topic: {
    panels: [
      {
        kind: "effect",
        title: "Risk of relapse defining clinically definite MS",
        timepoint: "Up to 108 weeks",
        axisMin: 0,
        axisMax: 1.1,
        nullValue: 1,
        axisLabel: "Hazard ratio (95% CI)",
        lowerLabel: "Favors teriflunomide",
        upperLabel: "Favors placebo",
        values: [
          {
            label: "Teriflunomide 14 mg vs placebo",
            value: 0.574,
            displayValue: "0.574 (0.379–0.869)",
            ciLow: 0.379,
            ciHigh: 0.869,
          },
          {
            label: "Teriflunomide 7 mg vs placebo",
            value: 0.628,
            displayValue: "0.628 (0.416–0.949)",
            ciLow: 0.416,
            ciHigh: 0.949,
          },
        ],
      },
    ],
  },
  tower: {
    panels: [
      {
        kind: "bars",
        title: "Annualized relapse rate",
        timepoint: "Variable-duration treatment period",
        axisMax: 0.6,
        axisLabel: "Relapses per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Teriflunomide 14 mg", value: 0.32, displayValue: "0.32" },
          { label: "Teriflunomide 7 mg", value: 0.39, displayValue: "0.39" },
          { label: "Placebo", value: 0.5, displayValue: "0.50", reference: true },
        ],
      },
    ],
  },
  confirm: {
    panels: [
      {
        kind: "bars",
        title: "Annualized relapse rate",
        timepoint: "2 years",
        axisMax: 0.5,
        axisLabel: "Relapses per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Dimethyl fumarate twice daily", value: 0.22, displayValue: "0.22" },
          { label: "Dimethyl fumarate three times daily", value: 0.2, displayValue: "0.20" },
          { label: "Glatiramer acetate", value: 0.29, displayValue: "0.29" },
          { label: "Placebo", value: 0.4, displayValue: "0.40", reference: true },
        ],
      },
    ],
    note: "Glatiramer acetate was an active reference arm; the trial was not designed for a direct superiority comparison against it.",
  },
  define: {
    panels: [
      {
        kind: "bars",
        title: "Participants with a relapse",
        timepoint: "2 years",
        axisMax: 50,
        axisLabel: "Participants with relapse (%)",
        lowerIsBetter: true,
        values: [
          { label: "Dimethyl fumarate twice daily", value: 27, displayValue: "27%" },
          { label: "Dimethyl fumarate three times daily", value: 26, displayValue: "26%" },
          { label: "Placebo", value: 46, displayValue: "46%", reference: true },
        ],
      },
    ],
  },
  camms223: {
    panels: [
      {
        kind: "bars",
        title: "Sustained disability accumulation",
        timepoint: "36 months",
        axisMax: 30,
        axisLabel: "Participants with progression (%)",
        lowerIsBetter: true,
        values: [
          { label: "Alemtuzumab", value: 9, displayValue: "9.0%" },
          { label: "Interferon beta-1a", value: 26.2, displayValue: "26.2%", reference: true },
        ],
      },
      {
        kind: "bars",
        title: "Annualized relapse rate",
        timepoint: "36 months",
        axisMax: 0.4,
        axisLabel: "Relapses per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Alemtuzumab", value: 0.1, displayValue: "0.10" },
          { label: "Interferon beta-1a", value: 0.36, displayValue: "0.36", reference: true },
        ],
      },
    ],
  },
  "care-ms-i": {
    panels: [
      {
        kind: "bars",
        title: "Participants with a relapse",
        timepoint: "2 years",
        axisMax: 50,
        axisLabel: "Participants with relapse (%)",
        lowerIsBetter: true,
        values: [
          { label: "Alemtuzumab", value: 22, displayValue: "22%" },
          { label: "Interferon beta-1a", value: 40, displayValue: "40%", reference: true },
        ],
      },
      {
        kind: "bars",
        title: "6-month sustained disability accumulation",
        timepoint: "2 years",
        axisMax: 15,
        axisLabel: "Participants with progression (%)",
        lowerIsBetter: true,
        values: [
          { label: "Alemtuzumab", value: 8, displayValue: "8%" },
          { label: "Interferon beta-1a", value: 11, displayValue: "11%", reference: true },
        ],
      },
    ],
    note: "The relapse endpoint was significant; the disability coprimary endpoint was not (P=0.22).",
  },
  expand: {
    panels: [
      {
        kind: "bars",
        title: "3-month confirmed disability progression",
        timepoint: "Event-driven follow-up, up to 3 years",
        axisMax: 40,
        axisLabel: "Participants with progression (%)",
        lowerIsBetter: true,
        values: [
          { label: "Siponimod", value: 26, displayValue: "26%" },
          { label: "Placebo", value: 32, displayValue: "32%", reference: true },
        ],
      },
    ],
  },
  opera: {
    panels: [
      {
        kind: "bars",
        title: "Annualized relapse rate in each OPERA trial",
        timepoint: "96 weeks",
        axisMax: 0.35,
        axisLabel: "Relapses per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Ocrelizumab", value: 0.16, displayValue: "0.16" },
          { label: "Interferon beta-1a", value: 0.29, displayValue: "0.29", reference: true },
        ],
      },
    ],
    note: "The rounded annualized relapse rates were the same in OPERA I and OPERA II; the trials were analyzed separately.",
  },
  oratorio: {
    panels: [
      {
        kind: "bars",
        title: "12-week confirmed disability progression",
        timepoint: "Event-driven follow-up",
        axisMax: 45,
        axisLabel: "Participants with progression (%)",
        lowerIsBetter: true,
        values: [
          { label: "Ocrelizumab", value: 32.9, displayValue: "32.9%" },
          { label: "Placebo", value: 39.3, displayValue: "39.3%", reference: true },
        ],
      },
    ],
  },
  sunbeam: {
    panels: [
      {
        kind: "bars",
        title: "Annualized relapse rate",
        timepoint: "Treatment period, minimum 12 months",
        axisMax: 0.4,
        axisLabel: "Relapses per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Ozanimod 1.0 mg", value: 0.18, displayValue: "0.18" },
          { label: "Ozanimod 0.5 mg", value: 0.24, displayValue: "0.24" },
          { label: "Interferon beta-1a", value: 0.35, displayValue: "0.35", reference: true },
        ],
      },
    ],
  },
  optimum: {
    panels: [
      {
        kind: "bars",
        title: "Annualized relapse rate",
        timepoint: "108 weeks",
        axisMax: 0.35,
        axisLabel: "Relapses per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Ponesimod", value: 0.202, displayValue: "0.202" },
          { label: "Teriflunomide", value: 0.29, displayValue: "0.290", reference: true },
        ],
      },
    ],
  },
  fenhance: {
    panels: [
      {
        kind: "bars",
        title: "FENhance 1 — annualized relapse rate",
        timepoint: "Minimum 96 weeks",
        axisMax: 0.15,
        axisLabel: "Adjusted relapses per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Fenebrutinib", value: 0.061, displayValue: "0.061" },
          { label: "Teriflunomide", value: 0.125, displayValue: "0.125", reference: true },
        ],
      },
      {
        kind: "bars",
        title: "FENhance 2 — annualized relapse rate",
        timepoint: "Minimum 96 weeks",
        axisMax: 0.15,
        axisLabel: "Adjusted relapses per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Fenebrutinib", value: 0.054, displayValue: "0.054" },
          { label: "Teriflunomide", value: 0.13, displayValue: "0.130", reference: true },
        ],
      },
    ],
    note:
      "Both trials met the primary endpoint. Values are from the AAN 2026 scientific presentation; a peer-reviewed primary paper has not yet been verified.",
  },
  fentrepid: {
    panels: [
      {
        kind: "effect",
        title: "12-week composite confirmed disability progression",
        timepoint: "Minimum 120 weeks",
        axisMin: 0.5,
        axisMax: 1.3,
        nullValue: 1,
        axisLabel: "Hazard ratio (95% CI)",
        lowerLabel: "Favors fenebrutinib",
        upperLabel: "Favors ocrelizumab",
        values: [
          {
            label: "Fenebrutinib vs ocrelizumab",
            value: 0.88,
            displayValue: "0.88 (0.75–1.03)",
            ciLow: 0.75,
            ciHigh: 1.03,
          },
        ],
      },
    ],
    note:
      "The prespecified non-inferiority criterion was met even though the confidence interval crosses the superiority null at 1.0; superiority was not established.",
  },
  gemini: {
    panels: [
      {
        kind: "bars",
        title: "GEMINI 1 — annualized relapse rate",
        timepoint: "Event-driven follow-up",
        axisMax: 0.16,
        axisLabel: "Adjusted relapses per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Tolebrutinib", value: 0.13, displayValue: "0.130" },
          { label: "Teriflunomide", value: 0.122, displayValue: "0.122", reference: true },
        ],
      },
      {
        kind: "bars",
        title: "GEMINI 2 — annualized relapse rate",
        timepoint: "Event-driven follow-up",
        axisMax: 0.16,
        axisLabel: "Adjusted relapses per participant-year",
        lowerIsBetter: true,
        values: [
          { label: "Tolebrutinib", value: 0.108, displayValue: "0.108" },
          { label: "Teriflunomide", value: 0.109, displayValue: "0.109", reference: true },
        ],
      },
    ],
    note:
      "Neither trial met the primary superiority endpoint; the near-equal bar lengths are the scientific result, not a display error.",
  },
  hercules: {
    panels: [
      {
        kind: "bars",
        title: "6-month confirmed disability progression",
        timepoint: "Median follow-up 133 weeks",
        axisMax: 35,
        axisLabel: "Participants with progression (%)",
        lowerIsBetter: true,
        values: [
          { label: "Tolebrutinib", value: 22.6, displayValue: "22.6%" },
          { label: "Placebo", value: 30.7, displayValue: "30.7%", reference: true },
        ],
      },
    ],
  },
  perseus: {
    panels: [
      {
        kind: "effect",
        title: "6-month composite confirmed disability progression",
        timepoint: "Up to approximately 60 months",
        axisMin: 0.7,
        axisMax: 1.3,
        nullValue: 1,
        axisLabel: "Hazard ratio (95% CI)",
        lowerLabel: "Favors tolebrutinib",
        upperLabel: "Favors placebo",
        values: [
          {
            label: "Tolebrutinib vs placebo",
            value: 1.01,
            displayValue: "1.01 (0.81–1.26)",
            ciLow: 0.81,
            ciHigh: 1.26,
          },
        ],
      },
    ],
    note:
      "The primary endpoint was not met (P=0.94). Values are from the ACTRIMS 2026 scientific presentation; no peer-reviewed primary paper has been verified.",
  },
};

function validateOutcomeFigures() {
  const slugs = new Set(trials.map((trial) => trial.slug));
  const figureSlugs = Object.keys(trialOutcomeFigures);

  if (figureSlugs.length !== trials.length) {
    throw new Error(`Expected ${trials.length} outcome figures, found ${figureSlugs.length}.`);
  }

  for (const trial of trials) {
    const figure = trialOutcomeFigures[trial.slug];
    if (!figure || figure.panels.length === 0) {
      throw new Error(`Missing outcome figure for ${trial.slug}.`);
    }

    for (const panel of figure.panels) {
      if (panel.values.length === 0) {
        throw new Error(`Outcome panel has no values for ${trial.slug}.`);
      }

      for (const item of panel.values) {
        if (!Number.isFinite(item.value)) {
          throw new Error(`Non-numeric outcome value for ${trial.slug}: ${item.label}.`);
        }

        const min = panel.kind === "bars" ? 0 : panel.axisMin;
        if (item.value < min || item.value > panel.axisMax) {
          throw new Error(`Outcome value falls outside its axis for ${trial.slug}: ${item.label}.`);
        }

        if ((item.ciLow === undefined) !== (item.ciHigh === undefined)) {
          throw new Error(`Incomplete confidence interval for ${trial.slug}: ${item.label}.`);
        }

        if (
          item.ciLow !== undefined &&
          item.ciHigh !== undefined &&
          (item.ciLow > item.value || item.ciHigh < item.value)
        ) {
          throw new Error(`Confidence interval excludes its estimate for ${trial.slug}: ${item.label}.`);
        }
      }

      if (
        panel.kind === "effect" &&
        (panel.nullValue < panel.axisMin || panel.nullValue > panel.axisMax)
      ) {
        throw new Error(`Null value falls outside its axis for ${trial.slug}.`);
      }
    }
  }

  for (const slug of figureSlugs) {
    if (!slugs.has(slug)) {
      throw new Error(`Outcome figure has no matching trial: ${slug}.`);
    }
  }
}

validateOutcomeFigures();

export function getTrialOutcomeFigure(slug: string) {
  return trialOutcomeFigures[slug];
}
