export type TrialArm = {
  label: string;
  regimen: string;
  participants?: string;
};

export type ResultGroup = {
  label: string;
  value: string;
};

export type TrialProfile = {
  phase: string;
  significance: string;
  design: string[];
  controlledDuration: string;
  enrollment: string;
  population: {
    age: string;
    sex?: string;
    edss: string;
    disease: string;
  };
  intervention: TrialArm;
  comparator: TrialArm;
  additionalArms?: TrialArm[];
  keyInclusion: string[];
  keyExclusion: string[];
  primaryOutcome: {
    name: string;
    timepoint: string;
    groups: ResultGroup[];
    effect: string;
  };
  secondaryOutcomes: {
    name: string;
    finding: string;
  }[];
  safety: string[];
  whyItMattered: string;
  limitation: string;
  sponsor: string;
  provenance: string;
};

export const trialProfiles: Record<string, TrialProfile> = {
  "ifnb-1b-pivotal": {
    phase: "Phase III",
    significance:
      "The trial established subcutaneous interferon beta-1b as an effective relapse-reducing therapy for ambulatory people with relapsing-remitting multiple sclerosis.",
    design: ["Randomized", "Double-blind", "Placebo-controlled", "Multicenter"],
    controlledDuration: "2 years",
    enrollment: "372 randomized",
    population: {
      age: "18–50 years eligible",
      edss: "EDSS 0–5.5",
      disease: "Ambulatory relapsing-remitting multiple sclerosis",
    },
    intervention: {
      label: "Interferon beta-1b",
      regimen: "250 μg (8 MIU) subcutaneously every other day",
      participants: "n=124",
    },
    comparator: {
      label: "Placebo",
      regimen: "Matching subcutaneous injection every other day",
      participants: "n=123",
    },
    additionalArms: [
      {
        label: "Lower-dose interferon beta-1b",
        regimen: "50 μg (1.6 MIU) subcutaneously every other day",
        participants: "n=125",
      },
    ],
    keyInclusion: [
      "Ambulatory relapsing-remitting multiple sclerosis",
      "At least two exacerbations during the previous 2 years",
      "Baseline EDSS no higher than 5.5",
    ],
    keyExclusion: [
      "Progressive disease without relapses",
      "Major illness or treatment likely to confound immune or neurologic assessment",
      "Pregnancy",
    ],
    primaryOutcome: {
      name: "Annualized exacerbation rate",
      timepoint: "2 years",
      groups: [
        { label: "Interferon beta-1b 250 μg", value: "0.84" },
        { label: "Placebo", value: "1.27" },
      ],
      effect: "34% lower annual exacerbation rate with the approved high dose (P<0.001).",
    },
    secondaryOutcomes: [
      {
        name: "Exacerbation-free status",
        finding: "31% with high-dose interferon beta-1b versus 16% with placebo at 2 years.",
      },
      {
        name: "Disability",
        finding: "The 2-year trial was not conclusive for disability progression.",
      },
    ],
    safety: [
      "Injection-site reactions and influenza-like symptoms were characteristic treatment-emergent effects.",
      "Laboratory monitoring identified treatment-related hematologic and hepatic abnormalities.",
    ],
    whyItMattered:
      "This was the pivotal evidence behind the first interferon beta treatment for MS and helped establish relapse rate as a central controlled-trial outcome.",
    limitation:
      "The trial was powered around relapses, not long-term disability. Its 2-year controlled phase could not establish the durability of benefit or uncommon harms.",
    sponsor: "Berlex Laboratories / Schering",
    provenance:
      "Design and outcomes are summarized from the primary publication and FDA review. The controlled-phase end is reconstructed from the FDA-recorded start and 104-week duration.",
  },
  "copolymer-1": {
    phase: "Phase III",
    significance:
      "This trial showed that daily subcutaneous copolymer 1—later named glatiramer acetate—reduced relapses in relapsing-remitting multiple sclerosis.",
    design: ["Randomized", "Double-blind", "Placebo-controlled", "11 centers"],
    controlledDuration: "2 years",
    enrollment: "251 randomized",
    population: {
      age: "18–45 years eligible",
      edss: "EDSS 0–5.0",
      disease: "Relapsing-remitting multiple sclerosis",
    },
    intervention: {
      label: "Copolymer 1",
      regimen: "20 mg subcutaneously once daily",
      participants: "n=125",
    },
    comparator: {
      label: "Placebo",
      regimen: "Matching subcutaneous injection once daily",
      participants: "n=126",
    },
    keyInclusion: [
      "Definite relapsing-remitting multiple sclerosis",
      "At least two relapses during the previous 2 years",
      "Ambulatory disability range, EDSS 0–5.0",
    ],
    keyExclusion: [
      "Progressive disease without a relapsing course",
      "Recent immunosuppressive treatment",
      "Clinically important comorbidity that could confound evaluation",
    ],
    primaryOutcome: {
      name: "Annualized relapse rate",
      timepoint: "2 years",
      groups: [
        { label: "Copolymer 1", value: "0.59" },
        { label: "Placebo", value: "0.84" },
      ],
      effect: "29% lower relapse rate with copolymer 1 (P=0.007).",
    },
    secondaryOutcomes: [
      {
        name: "EDSS change",
        finding:
          "The distribution of patients who improved, remained unchanged, or worsened favored copolymer 1 (P=0.037).",
      },
      {
        name: "Withdrawals",
        finding: "15.2% with copolymer 1 and 13.5% with placebo.",
      },
    ],
    safety: [
      "Injection-site reaction was the most common adverse experience.",
      "A transient self-limited post-injection systemic reaction occurred in 15.2% with copolymer 1 and 3.2% with placebo.",
    ],
    whyItMattered:
      "The study established a non-interferon immunomodulatory option and introduced one of the longest-used platform therapies in relapsing MS.",
    limitation:
      "The modest sample and 2-year follow-up were suited to relapse detection but not uncommon safety events or long-term disability effects.",
    sponsor: "Teva Pharmaceutical Industries",
    provenance:
      "Enrollment, regimen, efficacy, and safety are from the primary publication; dates are from the FDA review.",
  },
  mscrg: {
    phase: "Phase III",
    significance:
      "MSCRG tested whether once-weekly intramuscular interferon beta-1a could delay sustained disability progression in relapsing multiple sclerosis.",
    design: ["Randomized", "Double-blind", "Placebo-controlled", "Multicenter"],
    controlledDuration: "Up to 104 weeks",
    enrollment: "301 randomized",
    population: {
      age: "18–55 years eligible",
      edss: "EDSS 1.0–3.5",
      disease: "Relapsing multiple sclerosis",
    },
    intervention: {
      label: "Interferon beta-1a",
      regimen: "30 μg intramuscularly once weekly",
      participants: "n=158",
    },
    comparator: {
      label: "Placebo",
      regimen: "Matching intramuscular injection once weekly",
      participants: "n=143",
    },
    keyInclusion: [
      "Definite relapsing multiple sclerosis",
      "At least two exacerbations in the preceding 3 years",
      "Mild-to-moderate baseline disability",
    ],
    keyExclusion: [
      "Chronic progressive disease without relapses",
      "Recent immunosuppressive or interferon therapy",
      "Other illness that could compromise neurologic assessment",
    ],
    primaryOutcome: {
      name: "Sustained disability progression",
      timepoint: "Kaplan–Meier estimate at 104 weeks",
      groups: [
        { label: "Interferon beta-1a", value: "21.9%" },
        { label: "Placebo", value: "34.9%" },
      ],
      effect: "Time to sustained EDSS progression was significantly delayed (P=0.02).",
    },
    secondaryOutcomes: [
      {
        name: "Relapses among 2-year completers",
        finding: "Annual relapse rate was 0.61 with interferon beta-1a and 0.90 with placebo.",
      },
      {
        name: "MRI activity",
        finding: "Gadolinium-enhancing lesion activity favored interferon beta-1a.",
      },
    ],
    safety: [
      "Influenza-like symptoms, headache, muscle ache, and injection-related effects were associated with interferon treatment.",
      "Laboratory monitoring was required for blood counts and hepatic measures.",
    ],
    whyItMattered:
      "Unlike early trials centered mainly on relapses, MSCRG made sustained EDSS progression the primary clinical outcome.",
    limitation:
      "Enrollment ended before every participant could complete 2 years, producing variable follow-up and making the 104-week estimate dependent on time-to-event methods.",
    sponsor: "Biogen, with investigator and NIH support",
    provenance:
      "The primary publication and FDA-era records support the design and results. The early-1993 endpoint remains an approximate historical boundary.",
  },
  prisms: {
    phase: "Phase III",
    significance:
      "PRISMS demonstrated dose-related clinical and MRI efficacy of subcutaneous interferon beta-1a given three times weekly.",
    design: ["Randomized", "Double-blind", "Placebo-controlled", "22 centers"],
    controlledDuration: "2 years",
    enrollment: "560 randomized",
    population: {
      age: "18–50 years eligible",
      edss: "EDSS 0–5.0",
      disease: "Relapsing-remitting multiple sclerosis",
    },
    intervention: {
      label: "Interferon beta-1a 44 μg",
      regimen: "Subcutaneously three times weekly",
      participants: "n=184",
    },
    comparator: {
      label: "Placebo",
      regimen: "Matching subcutaneous injection three times weekly",
      participants: "n=187",
    },
    additionalArms: [
      {
        label: "Interferon beta-1a 22 μg",
        regimen: "Subcutaneously three times weekly",
        participants: "n=189",
      },
    ],
    keyInclusion: [
      "Relapsing-remitting multiple sclerosis",
      "At least two relapses during the previous 2 years",
      "Baseline EDSS 0–5.0",
    ],
    keyExclusion: [
      "Progressive MS without qualifying relapses",
      "Recent corticosteroid or immunosuppressive treatment",
      "Major systemic illness or pregnancy",
    ],
    primaryOutcome: {
      name: "Mean relapses per patient",
      timepoint: "2 years",
      groups: [
        { label: "Interferon beta-1a 44 μg", value: "1.73" },
        { label: "Interferon beta-1a 22 μg", value: "1.82" },
        { label: "Placebo", value: "2.56" },
      ],
      effect: "33% and 27% relative reductions for the 44 μg and 22 μg doses.",
    },
    secondaryOutcomes: [
      {
        name: "Disability",
        finding: "Both doses delayed defined disability progression versus placebo.",
      },
      {
        name: "MRI",
        finding: "Active lesions and accumulated burden of disease were lower with both doses.",
      },
    ],
    safety: [
      "The primary report described both regimens as generally well tolerated.",
      "Influenza-like symptoms, injection-site reactions, and laboratory abnormalities are central interferon-associated tolerability considerations.",
    ],
    whyItMattered:
      "PRISMS established the clinical and radiologic evidence base for a higher-frequency subcutaneous interferon regimen.",
    limitation:
      "The principal efficacy comparison involved two active doses and placebo; the study did not directly compare this regimen with other interferon products.",
    sponsor: "Ares-Serono",
    provenance:
      "Trial design and outcomes come from the primary publication. The controlled-phase end is derived from the final recruitment month plus the fixed 2-year phase.",
  },
  mims: {
    phase: "Phase III",
    significance:
      "MIMS evaluated an intensive immunosuppressive strategy in people with worsening relapsing-remitting or secondary progressive multiple sclerosis.",
    design: ["Randomized", "Double-blind", "Placebo-controlled", "Multicenter"],
    controlledDuration: "24 months",
    enrollment: "194 randomized; 188 assessable",
    population: {
      age: "18–65 years eligible",
      edss: "EDSS 3.0–6.0",
      disease: "Worsening relapsing-remitting or secondary progressive MS",
    },
    intervention: {
      label: "Mitoxantrone",
      regimen: "12 mg/m² intravenously every 3 months",
      participants: "n=60",
    },
    comparator: {
      label: "Placebo",
      regimen: "Matching intravenous infusion every 3 months",
      participants: "n=64",
    },
    additionalArms: [
      {
        label: "Exploratory mitoxantrone dose",
        regimen: "5 mg/m² intravenously every 3 months",
        participants: "n=70",
      },
    ],
    keyInclusion: [
      "Secondary progressive or worsening relapsing-remitting MS",
      "Documented neurologic deterioration before entry",
      "Baseline EDSS 3.0–6.0",
    ],
    keyExclusion: [
      "Clinically important cardiac dysfunction",
      "Bone-marrow compromise or major systemic illness",
      "Pregnancy or prior cumulative anthracenedione exposure that increased risk",
    ],
    primaryOutcome: {
      name: "Multivariate composite of five clinical measures",
      timepoint: "24 months",
      groups: [
        { label: "Mitoxantrone 12 mg/m²", value: "Favored treatment" },
        { label: "Placebo", value: "Reference" },
      ],
      effect: "Composite treatment difference 0.30 (95% CI 0.17–0.44; P<0.0001).",
    },
    secondaryOutcomes: [
      {
        name: "EDSS change",
        finding: "Preplanned univariate analysis favored mitoxantrone (P=0.0194).",
      },
      {
        name: "Treated relapses",
        finding: "Adjusted total treated relapses favored mitoxantrone (P=0.0002).",
      },
    ],
    safety: [
      "The controlled trial reported no drug-related serious adverse events or clinically significant cardiac dysfunction.",
      "The sample and follow-up were too limited to define delayed cumulative cardiotoxicity or therapy-related leukemia risk.",
    ],
    whyItMattered:
      "MIMS supplied controlled evidence for treatment in worsening and secondary progressive disease at a time when options were extremely limited.",
    limitation:
      "The primary endpoint was an unusual multivariate composite, and the 2-year observation could not characterize the major cumulative toxicities that constrain mitoxantrone use.",
    sponsor: "Immunex",
    provenance:
      "Design, efficacy, and controlled-phase safety are from the primary publication; exact trial boundaries are from the FDA medical review.",
  },
  affirm: {
    phase: "Phase III",
    significance:
      "AFFIRM showed large effects of natalizumab monotherapy on relapses, disability progression, and MRI activity in relapsing MS.",
    design: ["Randomized", "Double-blind", "Placebo-controlled", "Multicenter"],
    controlledDuration: "116 weeks",
    enrollment: "942 randomized",
    population: {
      age: "18–50 years eligible",
      edss: "EDSS 0–5.0",
      disease: "Relapsing-remitting multiple sclerosis with recent relapse",
    },
    intervention: {
      label: "Natalizumab",
      regimen: "300 mg intravenous infusion every 4 weeks",
      participants: "n=627",
    },
    comparator: {
      label: "Placebo",
      regimen: "Matching intravenous infusion every 4 weeks",
      participants: "n=315",
    },
    keyInclusion: [
      "McDonald-defined relapsing-remitting multiple sclerosis",
      "At least one relapse in the preceding 12 months",
      "MRI lesions consistent with MS and EDSS 0–5.0",
    ],
    keyExclusion: [
      "Primary progressive, secondary progressive, or progressive-relapsing MS",
      "Relapse within 50 days without subsequent stabilization",
      "Clinically important infection, immune disorder, or major systemic disease",
    ],
    primaryOutcome: {
      name: "Clinical relapse and sustained disability progression",
      timepoint: "Relapse at 1 year; disability at 2 years",
      groups: [
        { label: "Natalizumab", value: "17% progressed" },
        { label: "Placebo", value: "29% progressed" },
      ],
      effect:
        "68% lower clinical relapse rate at 1 year and 42% lower risk of sustained disability progression at 2 years.",
    },
    secondaryOutcomes: [
      {
        name: "New or enlarging T2 lesions",
        finding: "Mean 1.9 with natalizumab versus 11.0 with placebo over 2 years.",
      },
      {
        name: "Gadolinium-enhancing lesions",
        finding: "92% fewer with natalizumab at years 1 and 2.",
      },
    ],
    safety: [
      "Fatigue and allergic reactions were more frequent with natalizumab.",
      "Serious hypersensitivity occurred in 1% of natalizumab-treated participants.",
      "The controlled trial was not large or long enough to define rare opportunistic infection risk.",
    ],
    whyItMattered:
      "AFFIRM demonstrated that blocking leukocyte adhesion could produce substantially larger effects than the platform-therapy era had typically shown.",
    limitation:
      "Rare but serious risks cannot be inferred from AFFIRM alone; its efficacy findings must be separated from safety knowledge accumulated outside this monotherapy trial.",
    sponsor: "Biogen, with Elan Pharmaceuticals",
    provenance:
      "The primary publication is used for the randomized population and outcomes; the registry record supplies eligibility, sponsor, and protocol details.",
  },
  freedoms: {
    phase: "Phase III",
    significance:
      "FREEDOMS demonstrated that once-daily oral fingolimod reduced relapses, disability progression, and MRI activity versus placebo.",
    design: ["Randomized", "Double-blind", "Placebo-controlled", "Multicenter"],
    controlledDuration: "24 months",
    enrollment: "1,272 randomized",
    population: {
      age: "18–55 years eligible",
      sex: "889 women (70%)",
      edss: "EDSS 0–5.5",
      disease: "Relapsing-remitting MS with recent clinical activity",
    },
    intervention: {
      label: "Fingolimod 0.5 mg",
      regimen: "Orally once daily",
    },
    comparator: {
      label: "Placebo",
      regimen: "Matching oral capsule once daily",
    },
    additionalArms: [
      { label: "Fingolimod 1.25 mg", regimen: "Orally once daily" },
    ],
    keyInclusion: [
      "Relapsing-remitting multiple sclerosis",
      "At least one relapse in 1 year or two relapses in 2 years",
      "Baseline EDSS 0–5.5",
    ],
    keyExclusion: [
      "Other major immune, malignant, pulmonary, or cardiac disease",
      "Pregnancy or breastfeeding",
      "Other protocol-defined safety conditions affecting S1P-modulator treatment",
    ],
    primaryOutcome: {
      name: "Annualized relapse rate",
      timepoint: "24 months",
      groups: [
        { label: "Fingolimod 0.5 mg", value: "0.18" },
        { label: "Fingolimod 1.25 mg", value: "0.16" },
        { label: "Placebo", value: "0.40" },
      ],
      effect: "Both doses reduced relapse rate versus placebo (P<0.001).",
    },
    secondaryOutcomes: [
      {
        name: "3-month confirmed disability progression",
        finding: "17.7% with 0.5 mg versus 24.1% with placebo; HR 0.70 (P=0.02).",
      },
      {
        name: "MRI activity",
        finding: "Both doses were superior to placebo across prespecified MRI measures.",
      },
    ],
    safety: [
      "Bradycardia and atrioventricular conduction block occurred at treatment initiation.",
      "Macular edema, elevated liver enzymes, and mild hypertension contributed to adverse events and discontinuation.",
    ],
    whyItMattered:
      "FREEDOMS was central to establishing the first oral S1P-receptor modulator as an effective disease-modifying therapy.",
    limitation:
      "Two doses were tested, but only 0.5 mg became the standard MS dose; longer observation was needed to define infrequent and cumulative risks.",
    sponsor: "Novartis",
    provenance:
      "The primary publication supplies efficacy and safety; ClinicalTrials.gov supplies demographics, eligibility, and sponsor details.",
  },
  transforms: {
    phase: "Phase III",
    significance:
      "TRANSFORMS directly compared oral fingolimod with an established injectable interferon and showed superior control of relapses over 1 year.",
    design: ["Randomized", "Double-blind", "Double-dummy", "Active-controlled"],
    controlledDuration: "12 months",
    enrollment: "1,292 randomized",
    population: {
      age: "18–55 years eligible",
      edss: "EDSS 0–5.5",
      disease: "Relapsing-remitting MS with recent relapse activity",
    },
    intervention: {
      label: "Fingolimod 0.5 mg",
      regimen: "Orally once daily",
    },
    comparator: {
      label: "Interferon beta-1a",
      regimen: "30 μg intramuscularly once weekly",
    },
    additionalArms: [
      { label: "Fingolimod 1.25 mg", regimen: "Orally once daily" },
    ],
    keyInclusion: [
      "Relapsing-remitting multiple sclerosis",
      "Recent history of at least one relapse",
      "Baseline EDSS 0–5.5",
    ],
    keyExclusion: [
      "Inability to tolerate interferon beta-1a",
      "Major immune, malignant, pulmonary, or cardiac disease",
      "Pregnancy or breastfeeding",
    ],
    primaryOutcome: {
      name: "Annualized relapse rate",
      timepoint: "12 months",
      groups: [
        { label: "Fingolimod 0.5 mg", value: "0.16" },
        { label: "Fingolimod 1.25 mg", value: "0.20" },
        { label: "Interferon beta-1a", value: "0.33" },
      ],
      effect: "Both fingolimod doses were superior to interferon beta-1a (P<0.001).",
    },
    secondaryOutcomes: [
      {
        name: "MRI lesions",
        finding: "New or enlarged T2 lesions favored both fingolimod doses.",
      },
      {
        name: "Disability progression",
        finding: "No significant difference among groups during the 1-year core.",
      },
    ],
    safety: [
      "Fingolimod-associated events included bradyarrhythmia, macular edema, hypertension, herpesvirus infections, and liver-enzyme elevation.",
      "Two fatal infections occurred in the 1.25 mg group.",
    ],
    whyItMattered:
      "It was a pivotal active-comparator demonstration that an oral therapy could outperform a widely used injectable therapy on relapse and MRI outcomes.",
    limitation:
      "The controlled comparison lasted only 1 year and did not demonstrate a disability-progression difference. The registry’s later completion date includes extension follow-up.",
    sponsor: "Novartis",
    provenance:
      "The primary publication supports core design, efficacy, and safety. The interval ends after the 12-month randomized core, not the registry extension.",
  },
  "freedoms-ii": {
    phase: "Phase III",
    significance:
      "FREEDOMS II independently confirmed the relapse and MRI efficacy of fingolimod 0.5 mg versus placebo.",
    design: ["Randomized", "Double-blind", "Placebo-controlled", "Multicenter"],
    controlledDuration: "24 months",
    enrollment: "1,083 randomized",
    population: {
      age: "18–55 years eligible",
      edss: "EDSS 0–5.5",
      disease: "Relapsing-remitting multiple sclerosis",
    },
    intervention: {
      label: "Fingolimod 0.5 mg",
      regimen: "Orally once daily",
      participants: "n=358",
    },
    comparator: {
      label: "Placebo",
      regimen: "Matching oral capsule once daily",
      participants: "n=355",
    },
    additionalArms: [
      {
        label: "Fingolimod 1.25 mg",
        regimen: "Orally once daily; later switched to 0.5 mg by amendment",
        participants: "n=370",
      },
    ],
    keyInclusion: [
      "Relapsing-remitting multiple sclerosis",
      "Baseline EDSS 0–5.5",
      "Protocol-defined recent disease activity",
    ],
    keyExclusion: [
      "Major immune, malignant, pulmonary, or cardiac disease",
      "Pregnancy or breastfeeding",
      "Other protocol-defined contraindications to S1P-modulator treatment",
    ],
    primaryOutcome: {
      name: "Annualized relapse rate",
      timepoint: "24 months",
      groups: [
        { label: "Fingolimod 0.5 mg", value: "0.21" },
        { label: "Placebo", value: "0.40" },
      ],
      effect: "48% lower relapse rate; rate ratio 0.52 (95% CI 0.40–0.66; P<0.0001).",
    },
    secondaryOutcomes: [
      {
        name: "Brain volume",
        finding: "Percentage brain-volume loss favored fingolimod.",
      },
      {
        name: "Disability progression",
        finding: "The confirmatory disability endpoint was not significant.",
      },
    ],
    safety: [
      "Lymphopenia, liver-enzyme elevation, herpes zoster, hypertension, first-dose bradycardia, and atrioventricular block were more frequent with fingolimod.",
      "Serious adverse events occurred in 15% with fingolimod 0.5 mg and 13% with placebo.",
    ],
    whyItMattered:
      "FREEDOMS II confirmed that the relapse effect of fingolimod was reproducible in a separate large pivotal population.",
    limitation:
      "The trial did not reproduce a significant disability-progression benefit, emphasizing that consistent relapse efficacy does not guarantee concordant disability results.",
    sponsor: "Novartis",
    provenance:
      "The primary publication supplies efficacy and safety; ClinicalTrials.gov supplies eligibility and the actual primary-completion month.",
  },
  clarity: {
    phase: "Phase III",
    significance:
      "CLARITY showed that two short annual courses of oral cladribine produced sustained reductions in relapses, disability progression, and MRI activity.",
    design: ["Randomized", "Double-blind", "Placebo-controlled", "Multicenter"],
    controlledDuration: "96 weeks",
    enrollment: "1,326 randomized",
    population: {
      age: "Mean 38.6 years; eligible 18–65",
      sex: "898 women (68%)",
      edss: "EDSS 0–5.5",
      disease: "Relapsing-remitting MS with a relapse in the prior year",
    },
    intervention: {
      label: "Cladribine 3.5 mg/kg",
      regimen: "Cumulative oral dose delivered in short treatment courses",
    },
    comparator: {
      label: "Placebo",
      regimen: "Matching short oral courses",
    },
    additionalArms: [
      {
        label: "Cladribine 5.25 mg/kg",
        regimen: "Higher cumulative oral dose in short treatment courses",
      },
    ],
    keyInclusion: [
      "McDonald-defined relapsing-remitting multiple sclerosis",
      "At least one relapse in the preceding 12 months",
      "Baseline EDSS 0–5.5 and body weight 40–120 kg",
    ],
    keyExclusion: [
      "Clinically important infection or immunodeficiency",
      "Prior treatment that produced substantial immunosuppression",
      "Pregnancy, breastfeeding, or inability to use required contraception",
    ],
    primaryOutcome: {
      name: "Annualized relapse rate",
      timepoint: "96 weeks",
      groups: [
        { label: "Cladribine 3.5 mg/kg", value: "0.14" },
        { label: "Cladribine 5.25 mg/kg", value: "0.15" },
        { label: "Placebo", value: "0.33" },
      ],
      effect: "Both cumulative doses reduced relapse rate versus placebo (P<0.001).",
    },
    secondaryOutcomes: [
      {
        name: "3-month sustained disability progression",
        finding: "HR 0.67 for 3.5 mg/kg and 0.69 for 5.25 mg/kg versus placebo.",
      },
      {
        name: "Relapse-free status",
        finding: "79.7% and 78.9% versus 60.9% with placebo.",
      },
    ],
    safety: [
      "Lymphocytopenia occurred in 21.6% and 31.5% of the cladribine groups versus 1.8% with placebo.",
      "Herpes zoster occurred in 8 and 12 cladribine-treated participants and none receiving placebo.",
    ],
    whyItMattered:
      "CLARITY established an immune-reconstitution approach in which brief oral courses could produce efficacy extending beyond the dosing days.",
    limitation:
      "The 96-week trial could not settle long-latency safety questions; benefit–risk interpretation depends on careful attention to lymphocyte suppression and longer follow-up.",
    sponsor: "EMD Serono / Merck KGaA",
    provenance:
      "The primary publication supports efficacy and safety; ClinicalTrials.gov supplies demographics, eligibility, dosing detail, and sponsor.",
  },
  temso: {
    phase: "Phase III",
    significance:
      "TEMSO established once-daily oral teriflunomide as a relapse-reducing therapy and showed a disability effect at the 14 mg dose.",
    design: ["Randomized", "Double-blind", "Placebo-controlled", "Multicenter"],
    controlledDuration: "108 weeks",
    enrollment: "1,088 randomized",
    population: {
      age: "18–55 years eligible",
      sex: "783 women (72% of 1,086 with posted baseline data)",
      edss: "EDSS 0–5.5",
      disease: "Relapsing MS with recent clinical activity",
    },
    intervention: {
      label: "Teriflunomide 14 mg",
      regimen: "Orally once daily",
    },
    comparator: {
      label: "Placebo",
      regimen: "Matching oral tablet once daily",
    },
    additionalArms: [
      { label: "Teriflunomide 7 mg", regimen: "Orally once daily" },
    ],
    keyInclusion: [
      "Relapsing clinical course, with or without progression",
      "At least one relapse in 1 year or two relapses in 2 years",
      "Clinically stable before randomization and EDSS no higher than 5.5",
    ],
    keyExclusion: [
      "Clinically important cardiovascular, hepatic, neurologic, endocrine, or systemic disease",
      "Significantly impaired bone-marrow function",
      "Pregnancy, breastfeeding, or prior specified immunosuppressant use",
    ],
    primaryOutcome: {
      name: "Annualized relapse rate",
      timepoint: "108 weeks",
      groups: [
        { label: "Teriflunomide 14 mg", value: "0.37" },
        { label: "Teriflunomide 7 mg", value: "0.37" },
        { label: "Placebo", value: "0.54" },
      ],
      effect: "31.5% and 31.2% relative reductions (P<0.001 for both doses).",
    },
    secondaryOutcomes: [
      {
        name: "12-week confirmed disability progression",
        finding: "20.2% with 14 mg versus 27.3% with placebo (P=0.03).",
      },
      {
        name: "MRI",
        finding: "Both doses were superior to placebo across prespecified MRI outcomes.",
      },
    ],
    safety: [
      "Diarrhea, nausea, and hair thinning were more common with teriflunomide.",
      "Mild alanine aminotransferase elevation was more frequent; marked elevation and serious infection rates were similar among groups.",
    ],
    whyItMattered:
      "TEMSO provided pivotal evidence for a convenient oral immunomodulator with effects on relapses and, at the approved 14 mg dose, confirmed disability progression.",
    limitation:
      "The study tested two doses and several MS courses; interpretation of the disability result is specific to the 14 mg comparison.",
    sponsor: "Sanofi-Aventis",
    provenance:
      "The primary publication supplies efficacy and safety; ClinicalTrials.gov supplies demographics, key eligibility, and sponsor.",
  },
  topic: {
    phase: "Phase III",
    significance:
      "TOPIC tested early teriflunomide after a first demyelinating event and delayed a relapse defining clinically definite MS.",
    design: ["Randomized", "Double-blind", "Placebo-controlled", "112 centers"],
    controlledDuration: "Up to 108 weeks",
    enrollment: "618 randomized",
    population: {
      age: "Mean 32.7 years; eligible 18–55",
      sex: "419 women (68%)",
      edss: "First demyelinating event; ambulatory population",
      disease: "Clinically isolated syndrome with MRI lesions",
    },
    intervention: {
      label: "Teriflunomide 14 mg",
      regimen: "Orally once daily",
      participants: "n=216",
    },
    comparator: {
      label: "Placebo",
      regimen: "Matching oral tablet once daily",
      participants: "n=197",
    },
    additionalArms: [
      {
        label: "Teriflunomide 7 mg",
        regimen: "Orally once daily",
        participants: "n=205",
      },
    ],
    keyInclusion: [
      "First acute or subacute neurologic event consistent with demyelination",
      "Symptom onset within 90 days of randomization",
      "At least two characteristic T2 lesions measuring at least 3 mm",
    ],
    keyExclusion: [
      "Major cardiovascular, hepatic, neurologic, endocrine, or systemic disease",
      "Significant bone-marrow impairment",
      "Pregnancy, breastfeeding, or prior specified immunosuppressant use",
    ],
    primaryOutcome: {
      name: "Time to relapse defining clinically definite MS",
      timepoint: "Up to 108 weeks",
      groups: [
        { label: "Teriflunomide 14 mg", value: "HR 0.574" },
        { label: "Teriflunomide 7 mg", value: "HR 0.628" },
        { label: "Placebo", value: "Reference" },
      ],
      effect: "Risk reductions were significant for 14 mg (P=0.0087) and 7 mg (P=0.0271).",
    },
    secondaryOutcomes: [
      {
        name: "Relapse or new MRI lesion",
        finding: "HR 0.651 with 14 mg and 0.686 with 7 mg versus placebo.",
      },
    ],
    safety: [
      "Liver-enzyme elevation, hair thinning, diarrhea, paresthesia, and upper-respiratory infection were more frequent in at least one teriflunomide group.",
      "The most common serious adverse event was increased alanine aminotransferase.",
    ],
    whyItMattered:
      "TOPIC extended pivotal oral-therapy evidence to the earliest clinically recognizable stage of the MS disease course.",
    limitation:
      "The conversion endpoint reflects the diagnostic framework of its era; later McDonald criteria may classify some comparable patients as having MS at baseline.",
    sponsor: "Genzyme, a Sanofi company",
    provenance:
      "The primary publication and ClinicalTrials.gov record support the design, demographics, eligibility, efficacy, and safety summary.",
  },
  tower: {
    phase: "Phase III",
    significance:
      "TOWER independently confirmed the relapse efficacy of teriflunomide and showed reduced sustained disability accumulation with 14 mg.",
    design: ["Randomized", "Double-blind", "Placebo-controlled", "189 sites"],
    controlledDuration: "Variable; at least 48 weeks",
    enrollment: "1,169 randomized",
    population: {
      age: "Mean 37.9 years; eligible 18–55",
      sex: "831 women (71%)",
      edss: "Ambulatory relapsing MS",
      disease: "Relapsing MS with one relapse in 1 year or two in 2 years",
    },
    intervention: {
      label: "Teriflunomide 14 mg",
      regimen: "Orally once daily",
      participants: "n=372",
    },
    comparator: {
      label: "Placebo",
      regimen: "Matching oral tablet once daily",
      participants: "n=389",
    },
    additionalArms: [
      {
        label: "Teriflunomide 7 mg",
        regimen: "Orally once daily",
        participants: "n=408",
      },
    ],
    keyInclusion: [
      "Relapsing multiple sclerosis",
      "At least one relapse in the prior year or two in the prior 2 years",
      "Age 18–55 years",
    ],
    keyExclusion: [
      "Major cardiovascular, hepatic, neurologic, endocrine, or systemic disease",
      "Significant anemia, leukopenia, thrombocytopenia, or bone-marrow impairment",
      "Pregnancy, breastfeeding, or prior specified immunosuppressant use",
    ],
    primaryOutcome: {
      name: "Annualized relapse rate",
      timepoint: "Variable-duration treatment period",
      groups: [
        { label: "Teriflunomide 14 mg", value: "0.32" },
        { label: "Teriflunomide 7 mg", value: "0.39" },
        { label: "Placebo", value: "0.50" },
      ],
      effect: "36.3% lower with 14 mg (P=0.0001); the 7 mg reduction was smaller.",
    },
    secondaryOutcomes: [
      {
        name: "12-week sustained disability accumulation",
        finding: "Risk was reduced 31.5% with 14 mg versus placebo (P=0.0442).",
      },
      {
        name: "Severe relapses",
        finding: "The 14 mg dose reduced several prespecified measures of severe relapse burden.",
      },
    ],
    safety: [
      "Hair thinning and liver-enzyme elevation were among the characteristic teriflunomide-associated events.",
      "Serious adverse events were broadly similar across groups in the primary report.",
    ],
    whyItMattered:
      "Together with TEMSO, TOWER provided replicated evidence for the approved 14 mg dose across relapse and disability outcomes.",
    limitation:
      "Treatment duration varied because the study ended 48 weeks after the last participant enrolled, complicating simple cross-trial comparisons based on a fixed timepoint.",
    sponsor: "Sanofi",
    provenance:
      "The primary publication supports efficacy and safety; ClinicalTrials.gov supplies demographics and key eligibility.",
  },
  confirm: {
    phase: "Phase III",
    significance:
      "CONFIRM showed that oral dimethyl fumarate reduced relapses and MRI activity versus placebo while including glatiramer acetate as an active reference.",
    design: ["Randomized", "Double-blind", "Placebo-controlled", "Active reference"],
    controlledDuration: "96 weeks",
    enrollment: "1,417 randomized",
    population: {
      age: "Mean 37.3 years; eligible 18–55",
      sex: "993 women (70%)",
      edss: "EDSS 0–5.0",
      disease: "Relapsing-remitting multiple sclerosis",
    },
    intervention: {
      label: "Dimethyl fumarate 240 mg twice daily",
      regimen: "Orally twice daily",
      participants: "n=359",
    },
    comparator: {
      label: "Placebo",
      regimen: "Matching oral capsules",
      participants: "n=363",
    },
    additionalArms: [
      {
        label: "Dimethyl fumarate 240 mg three times daily",
        regimen: "Orally three times daily",
        participants: "n=345",
      },
      {
        label: "Glatiramer acetate",
        regimen: "20 mg subcutaneously once daily; active reference",
        participants: "n=350",
      },
    ],
    keyInclusion: [
      "McDonald-defined relapsing-remitting multiple sclerosis",
      "Relapsing-remitting clinical course",
      "Baseline EDSS 0–5.0",
    ],
    keyExclusion: [
      "Other chronic immune disease or malignancy",
      "Clinically important urologic, pulmonary, or gastrointestinal disease",
      "Pregnancy or breastfeeding",
    ],
    primaryOutcome: {
      name: "Annualized relapse rate",
      timepoint: "2 years",
      groups: [
        { label: "Dimethyl fumarate twice daily", value: "0.22" },
        { label: "Dimethyl fumarate three times daily", value: "0.20" },
        { label: "Glatiramer acetate", value: "0.29" },
        { label: "Placebo", value: "0.40" },
      ],
      effect: "44% and 51% lower with dimethyl fumarate; 29% lower with glatiramer acetate.",
    },
    secondaryOutcomes: [
      {
        name: "Disability progression",
        finding: "Reductions versus placebo were not statistically significant.",
      },
      {
        name: "MRI lesions",
        finding: "Both dimethyl fumarate regimens and glatiramer acetate improved key MRI outcomes.",
      },
    ],
    safety: [
      "Flushing and gastrointestinal events were more frequent with dimethyl fumarate.",
      "Lymphocyte counts decreased with dimethyl fumarate; injection-related events were more frequent with glatiramer acetate.",
    ],
    whyItMattered:
      "CONFIRM supplied a second large pivotal data set for dimethyl fumarate and contextualized its effect alongside a familiar active reference.",
    limitation:
      "The study was not designed or powered to establish superiority or noninferiority between dimethyl fumarate and glatiramer acetate.",
    sponsor: "Biogen Idec",
    provenance:
      "The primary publication and ClinicalTrials.gov record support the design, demographics, eligibility, outcomes, and sponsor.",
  },
  define: {
    phase: "Phase III",
    significance:
      "DEFINE demonstrated that oral dimethyl fumarate reduced the probability of relapse, disability progression, and MRI lesion activity versus placebo.",
    design: ["Randomized", "Double-blind", "Placebo-controlled", "Multicenter"],
    controlledDuration: "96 weeks",
    enrollment: "1,234 randomized",
    population: {
      age: "Mean 38.5 years; eligible 18–55",
      sex: "908 women (74%)",
      edss: "EDSS 0–5.0",
      disease: "Relapsing-remitting multiple sclerosis",
    },
    intervention: {
      label: "Dimethyl fumarate 240 mg twice daily",
      regimen: "Orally twice daily",
    },
    comparator: {
      label: "Placebo",
      regimen: "Matching oral capsules",
    },
    additionalArms: [
      {
        label: "Dimethyl fumarate 240 mg three times daily",
        regimen: "Orally three times daily",
      },
    ],
    keyInclusion: [
      "McDonald-defined relapsing-remitting multiple sclerosis",
      "Relapsing-remitting clinical course",
      "Baseline EDSS 0–5.0",
    ],
    keyExclusion: [
      "Other chronic immune disease or malignancy",
      "Clinically important urologic, pulmonary, or gastrointestinal disease",
      "Pregnancy or breastfeeding",
    ],
    primaryOutcome: {
      name: "Participants with a relapse",
      timepoint: "2 years",
      groups: [
        { label: "Dimethyl fumarate twice daily", value: "27%" },
        { label: "Dimethyl fumarate three times daily", value: "26%" },
        { label: "Placebo", value: "46%" },
      ],
      effect: "Both regimens reduced relapse risk by about half (P<0.001).",
    },
    secondaryOutcomes: [
      {
        name: "Annualized relapse rate",
        finding: "0.17 and 0.19 with dimethyl fumarate versus 0.36 with placebo.",
      },
      {
        name: "Disability and MRI",
        finding: "Confirmed disability progression and MRI activity both favored treatment.",
      },
    ],
    safety: [
      "Flushing and gastrointestinal events were most frequent early in treatment.",
      "Lymphocyte counts decreased and liver aminotransferase levels increased with dimethyl fumarate.",
    ],
    whyItMattered:
      "DEFINE was one of the two pivotal trials establishing an oral fumarate regimen as an effective option for relapsing-remitting MS.",
    limitation:
      "The placebo comparison did not answer relative efficacy against established disease-modifying therapies, and the controlled period was too short for rare delayed harms.",
    sponsor: "Biogen Idec",
    provenance:
      "The primary publication and ClinicalTrials.gov record support the design, demographics, eligibility, outcomes, and sponsor.",
  },
  camms223: {
    phase: "Phase II",
    significance:
      "CAMMS223 showed marked efficacy of annual alemtuzumab courses versus high-dose subcutaneous interferon beta-1a, while exposing important autoimmune risk.",
    design: ["Randomized", "Rater-blinded", "Active-controlled", "Multicenter"],
    controlledDuration: "36 months",
    enrollment: "334 randomized",
    population: {
      age: "Mean 32.3 years; eligible 18–50",
      sex: "214 women (64% of 333 with posted baseline data)",
      edss: "EDSS 0–3.0",
      disease: "Previously untreated, early active relapsing-remitting MS",
    },
    intervention: {
      label: "Alemtuzumab",
      regimen: "12 or 24 mg/day IV in annual treatment cycles",
    },
    comparator: {
      label: "Interferon beta-1a",
      regimen: "44 μg subcutaneously three times weekly",
    },
    keyInclusion: [
      "First MS symptoms within 3 years",
      "At least two clinical episodes in the preceding 2 years",
      "EDSS 0–3.0 plus at least one gadolinium-enhancing lesion during screening",
    ],
    keyExclusion: [
      "Prior MS immunotherapy other than corticosteroids",
      "Personal history of clinically important autoimmune disease",
      "Malignancy or non-MS disability that interfered with assessment",
    ],
    primaryOutcome: {
      name: "Sustained disability accumulation and annualized relapse rate",
      timepoint: "36 months",
      groups: [
        { label: "Alemtuzumab", value: "9.0% progressed; ARR 0.10" },
        { label: "Interferon beta-1a", value: "26.2% progressed; ARR 0.36" },
      ],
      effect: "HR 0.29 for disability and 0.26 for relapse rate (P<0.001 for both).",
    },
    secondaryOutcomes: [
      {
        name: "Mean EDSS",
        finding: "Improved 0.39 point with alemtuzumab and worsened 0.38 with interferon.",
      },
      {
        name: "MRI",
        finding: "T2 lesion burden and brain-volume change favored alemtuzumab.",
      },
    ],
    safety: [
      "Thyroid disorders occurred in 23% with alemtuzumab versus 3% with interferon.",
      "Immune thrombocytopenic purpura occurred in 3% versus 1%; one affected participant died.",
      "Infections occurred in 66% versus 47%, and alemtuzumab dosing was suspended during the trial.",
    ],
    whyItMattered:
      "The trial demonstrated the potential of pulsed immune depletion to produce unusually large efficacy effects, while making long-term autoimmune surveillance inseparable from the treatment concept.",
    limitation:
      "CAMMS223 was phase II, not phase III, and treatment suspension plus limited sample size complicate safety interpretation, especially for uncommon events.",
    sponsor: "Genzyme",
    provenance:
      "The primary publication and ClinicalTrials.gov record support the design, demographics, eligibility, outcomes, safety, and sponsor.",
  },
  "care-ms-i": {
    phase: "Phase III",
    significance:
      "CARE-MS I confirmed superior relapse control with two annual alemtuzumab courses versus subcutaneous interferon beta-1a in treatment-naïve early RRMS.",
    design: ["Randomized", "Rater-blinded", "Active-controlled", "Multicenter"],
    controlledDuration: "24 months",
    enrollment: "581 randomized; 563 in primary analyses",
    population: {
      age: "Mean 33.1 years; eligible 18–50",
      sex: "365 women (65% of primary-analysis population)",
      edss: "EDSS 0–3.0",
      disease: "Treatment-naïve, early active relapsing-remitting MS",
    },
    intervention: {
      label: "Alemtuzumab",
      regimen: "12 mg/day IV for 5 days at baseline and 3 days at month 12",
      participants: "n=386 randomized",
    },
    comparator: {
      label: "Interferon beta-1a",
      regimen: "44 μg subcutaneously three times weekly",
      participants: "n=195 randomized",
    },
    keyInclusion: [
      "MS symptom onset within 5 years",
      "At least two attacks in 2 years, including at least one in the prior year",
      "No prior disease-modifying therapy and baseline EDSS 0–3.0",
    ],
    keyExclusion: [
      "Any progressive form of MS",
      "Prior MS therapy other than corticosteroids or prior immunosuppression",
      "Significant autoimmune disease, cytopenia, bleeding disorder, or malignancy",
    ],
    primaryOutcome: {
      name: "Relapse and 6-month sustained disability accumulation",
      timepoint: "2 years",
      groups: [
        { label: "Alemtuzumab", value: "22% relapsed; 8% progressed" },
        { label: "Interferon beta-1a", value: "40% relapsed; 11% progressed" },
      ],
      effect:
        "Relapse rate was 54.9% lower (P<0.0001); disability accumulation did not differ significantly (HR 0.70; P=0.22).",
    },
    secondaryOutcomes: [
      {
        name: "Relapse-free status",
        finding: "78% with alemtuzumab versus 59% with interferon beta-1a at 2 years.",
      },
    ],
    safety: [
      "Infusion-associated reactions occurred in 90% of alemtuzumab-treated participants; 3% were serious.",
      "Infections and autoimmune thyroid events required structured long-term monitoring.",
    ],
    whyItMattered:
      "CARE-MS I translated the CAMMS223 efficacy signal into a phase III first-line population and established a two-course induction regimen.",
    limitation:
      "The trial met the relapse but not the disability coprimary endpoint, and rater blinding could not fully remove differences in treatment experience.",
    sponsor: "Genzyme, a Sanofi company",
    provenance:
      "The primary publication and ClinicalTrials.gov record support the design, demographics, eligibility, efficacy, safety, and sponsor.",
  },
  expand: {
    phase: "Phase III",
    significance:
      "EXPAND showed that siponimod modestly delayed confirmed disability progression in secondary progressive multiple sclerosis.",
    design: ["Randomized 2:1", "Double-blind", "Placebo-controlled", "Event-driven"],
    controlledDuration: "Up to 3 years",
    enrollment: "1,651 randomized; 1,645 analyzed",
    population: {
      age: "Mean 48.0 years; eligible 18–60",
      sex: "992 women (60%)",
      edss: "EDSS 3.0–6.5",
      disease: "Secondary progressive MS with progression for at least 6 months",
    },
    intervention: {
      label: "Siponimod",
      regimen: "2 mg orally once daily after dose titration",
      participants: "n=1,105 randomized",
    },
    comparator: {
      label: "Placebo",
      regimen: "Matching oral tablet once daily",
      participants: "n=546",
    },
    keyInclusion: [
      "Prior relapsing-remitting MS followed by secondary progressive disease",
      "Progressive disability for at least 6 months",
      "Baseline EDSS 3.0–6.5",
    ],
    keyExclusion: [
      "Recent relapse or corticosteroid treatment",
      "Macular edema identified during screening",
      "Medically unstable condition or inability to undergo MRI",
    ],
    primaryOutcome: {
      name: "3-month confirmed disability progression",
      timepoint: "Event-driven follow-up, up to 3 years",
      groups: [
        { label: "Siponimod", value: "26%" },
        { label: "Placebo", value: "32%" },
      ],
      effect: "21% relative risk reduction; HR 0.79 (95% CI 0.65–0.95; P=0.013).",
    },
    secondaryOutcomes: [
      {
        name: "Timed 25-foot walk",
        finding: "The key walking outcome did not show a significant treatment effect.",
      },
      {
        name: "MRI",
        finding: "T2 lesion-volume and inflammatory lesion outcomes favored siponimod.",
      },
    ],
    safety: [
      "Lymphopenia, liver-enzyme elevation, bradyarrhythmia, macular edema, hypertension, zoster reactivation, and convulsions were more frequent.",
      "Serious adverse events occurred in 18% with siponimod and 15% with placebo.",
    ],
    whyItMattered:
      "EXPAND was the first large modern pivotal trial to show a significant disability-progression effect for an oral therapy in SPMS.",
    limitation:
      "The absolute difference in 3-month progression was modest, the walking endpoint was negative, and eligibility selected a narrower population than the full clinical spectrum of SPMS.",
    sponsor: "Novartis Pharma AG",
    provenance:
      "The primary publication and ClinicalTrials.gov record support the design, demographics, eligibility, outcomes, safety, and sponsor.",
  },
  opera: {
    phase: "Phase III × 2",
    significance:
      "The identically designed OPERA I and II trials showed that ocrelizumab outperformed high-dose subcutaneous interferon beta-1a across relapse, disability, and MRI outcomes.",
    design: ["Two randomized trials", "Double-blind", "Double-dummy", "Active-controlled"],
    controlledDuration: "96 weeks",
    enrollment: "1,656 randomized across both trials",
    population: {
      age: "Mean about 37 years; eligible 18–55",
      sex: "1,093 women (66%)",
      edss: "EDSS 0–5.5",
      disease: "Relapsing multiple sclerosis with recent clinical activity",
    },
    intervention: {
      label: "Ocrelizumab",
      regimen: "600 mg intravenously every 24 weeks",
    },
    comparator: {
      label: "Interferon beta-1a",
      regimen: "44 μg subcutaneously three times weekly",
    },
    keyInclusion: [
      "2010 McDonald-defined relapsing multiple sclerosis",
      "At least two attacks in 2 years or one attack in the prior year",
      "Neurologic stability before baseline and EDSS 0–5.5",
    ],
    keyExclusion: [
      "Primary progressive MS",
      "Chronic immunosuppression, immunodeficiency, or active/recurrent infection",
      "Prior severe reaction to monoclonal antibodies or major MRI contraindication",
    ],
    primaryOutcome: {
      name: "Annualized relapse rate",
      timepoint: "96 weeks",
      groups: [
        { label: "Ocrelizumab", value: "0.16 in each trial" },
        { label: "Interferon beta-1a", value: "0.29 in each trial" },
      ],
      effect: "46% lower in OPERA I and 47% lower in OPERA II (P<0.001 for both).",
    },
    secondaryOutcomes: [
      {
        name: "12-week confirmed disability progression",
        finding: "9.1% versus 13.6% in pooled analysis; HR 0.60 (P<0.001).",
      },
      {
        name: "Gadolinium-enhancing lesions",
        finding: "94% and 95% lower with ocrelizumab in OPERA I and II.",
      },
    ],
    safety: [
      "Infusion-related reactions occurred in 34.3% with ocrelizumab.",
      "Serious infection occurred in 1.3% with ocrelizumab and 2.9% with interferon.",
      "Neoplasms occurred in 0.5% and 0.2%, respectively; longer observation was required.",
    ],
    whyItMattered:
      "Replicated superiority in two large trials established CD20-positive B-cell depletion as a major therapeutic strategy in relapsing MS.",
    limitation:
      "The 96-week trials could not define long-term immune, infection, or malignancy risk, and some secondary outcomes rely on prespecified pooled analysis.",
    sponsor: "F. Hoffmann-La Roche",
    provenance:
      "The primary publication reports both studies together; the two ClinicalTrials.gov records preserve their separate identifiers and baseline data.",
  },
  oratorio: {
    phase: "Phase III",
    significance:
      "ORATORIO showed that ocrelizumab delayed disability progression in primary progressive multiple sclerosis.",
    design: ["Randomized 2:1", "Double-blind", "Placebo-controlled", "Event-driven"],
    controlledDuration: "At least 120 weeks",
    enrollment: "732 randomized",
    population: {
      age: "Mean 44.6 years; eligible 18–55",
      sex: "361 women (49%)",
      edss: "EDSS 3.0–6.5",
      disease: "Primary progressive multiple sclerosis",
    },
    intervention: {
      label: "Ocrelizumab",
      regimen: "600 mg intravenously every 24 weeks",
      participants: "n=488",
    },
    comparator: {
      label: "Placebo",
      regimen: "Matching intravenous infusions every 24 weeks",
      participants: "n=244",
    },
    keyInclusion: [
      "McDonald-defined primary progressive MS",
      "Baseline EDSS 3.0–6.5",
      "Restricted disease duration based on baseline disability",
    ],
    keyExclusion: [
      "Relapsing-remitting, secondary progressive, or progressive-relapsing MS",
      "Prior B-cell therapy or specified potent immunosuppressive treatment",
      "Active or recurrent infection, malignancy, or inability to undergo MRI",
    ],
    primaryOutcome: {
      name: "12-week confirmed disability progression",
      timepoint: "Event-driven follow-up",
      groups: [
        { label: "Ocrelizumab", value: "32.9%" },
        { label: "Placebo", value: "39.3%" },
      ],
      effect: "HR 0.76 (95% CI 0.59–0.98; P=0.03).",
    },
    secondaryOutcomes: [
      {
        name: "24-week confirmed disability progression",
        finding: "29.6% versus 35.7%; HR 0.75 (P=0.04).",
      },
      {
        name: "Timed 25-foot walk and MRI",
        finding: "Walking deterioration and MRI lesion/brain-volume outcomes favored ocrelizumab.",
      },
    ],
    safety: [
      "Infusion reactions, upper-respiratory infections, and oral herpes were more frequent with ocrelizumab.",
      "Neoplasms occurred in 2.3% with ocrelizumab and 0.8% with placebo.",
    ],
    whyItMattered:
      "ORATORIO provided the first pivotal evidence supporting an approved disease-modifying therapy for primary progressive MS.",
    limitation:
      "Age, disability, and disease-duration criteria selected a narrower and generally earlier PPMS population than many patients seen in practice.",
    sponsor: "F. Hoffmann-La Roche",
    provenance:
      "The primary publication is used for the randomized population and outcomes; ClinicalTrials.gov supplies demographics, eligibility, and protocol details.",
  },
  sunbeam: {
    phase: "Phase III",
    significance:
      "SUNBEAM showed that once-daily ozanimod reduced relapses more than weekly intramuscular interferon beta-1a.",
    design: ["Randomized", "Double-blind", "Double-dummy", "Active-controlled"],
    controlledDuration: "Minimum 12 months",
    enrollment: "1,346 randomized",
    population: {
      age: "Mean 35.6 years; eligible 18–55",
      sex: "894 women (66%)",
      edss: "EDSS 0–5.0",
      disease: "Relapsing MS with recent clinical or MRI activity",
    },
    intervention: {
      label: "Ozanimod 1.0 mg",
      regimen: "Orally once daily",
      participants: "n=447",
    },
    comparator: {
      label: "Interferon beta-1a",
      regimen: "30 μg intramuscularly once weekly",
      participants: "n=448",
    },
    additionalArms: [
      {
        label: "Ozanimod 0.5 mg",
        regimen: "Orally once daily",
        participants: "n=451",
      },
    ],
    keyInclusion: [
      "2010 McDonald-defined relapsing multiple sclerosis",
      "EDSS 0–5.0",
      "Recent relapse or a combination of relapse and gadolinium-enhancing MRI activity",
    ],
    keyExclusion: [
      "Primary progressive multiple sclerosis",
      "Protocol-defined cardiac, hepatic, ophthalmic, immune, or infection risks",
      "Pregnancy or other contraindication to the study regimens",
    ],
    primaryOutcome: {
      name: "Annualized relapse rate",
      timepoint: "Treatment period, minimum 12 months",
      groups: [
        { label: "Ozanimod 1.0 mg", value: "0.18" },
        { label: "Ozanimod 0.5 mg", value: "0.24" },
        { label: "Interferon beta-1a", value: "0.35" },
      ],
      effect: "Rate ratios 0.52 (P<0.0001) and 0.69 (P=0.0013) versus interferon.",
    },
    secondaryOutcomes: [
      {
        name: "Treatment discontinuation",
        finding: "2.9%, 1.5%, and 3.6% discontinued for adverse events, respectively.",
      },
      {
        name: "MRI",
        finding: "Key inflammatory MRI outcomes favored ozanimod.",
      },
    ],
    safety: [
      "Serious adverse-event incidence was low and similar across groups.",
      "No clinically significant first-dose bradycardia, high-grade atrioventricular block, or serious opportunistic infection was reported in ozanimod-treated participants.",
    ],
    whyItMattered:
      "SUNBEAM supplied active-comparator pivotal evidence for a more receptor-selective oral S1P-modulator strategy.",
    limitation:
      "Follow-up varied with a minimum of 12 months, limiting disability and uncommon-safety conclusions compared with longer fixed-duration trials.",
    sponsor: "Celgene International II",
    provenance:
      "The primary publication and ClinicalTrials.gov record support the design, demographics, eligibility, outcomes, safety, and sponsor.",
  },
  optimum: {
    phase: "Phase III",
    significance:
      "OPTIMUM was the first phase III trial to compare two oral MS therapies directly, showing superior relapse and MRI control with ponesimod versus teriflunomide.",
    design: ["Randomized 1:1", "Double-blind", "Double-dummy", "Oral active comparator"],
    controlledDuration: "108 weeks",
    enrollment: "1,133 randomized",
    population: {
      age: "Mean 36.7 years; range 18–55",
      sex: "735 women (64.9%)",
      edss: "EDSS 0–5.5",
      disease: "Relapsing MS with recent clinical or MRI activity",
    },
    intervention: {
      label: "Ponesimod",
      regimen: "20 mg orally once daily after 14-day up-titration",
      participants: "n=567",
    },
    comparator: {
      label: "Teriflunomide",
      regimen: "14 mg orally once daily",
      participants: "n=566",
    },
    keyInclusion: [
      "2010 McDonald-defined MS with a relapsing course from onset",
      "Recent clinical attack or gadolinium-enhancing MRI activity",
      "Ambulatory, with EDSS no higher than 5.5",
    ],
    keyExclusion: [
      "Clinically important cardiovascular, pulmonary, immune, hepatic, or ophthalmic conditions",
      "Pregnancy or breastfeeding",
      "MRI contraindication or another condition creating unacceptable study risk",
    ],
    primaryOutcome: {
      name: "Annualized relapse rate",
      timepoint: "108 weeks",
      groups: [
        { label: "Ponesimod", value: "0.202" },
        { label: "Teriflunomide", value: "0.290" },
      ],
      effect: "30.5% relative rate reduction with ponesimod (P<0.001).",
    },
    secondaryOutcomes: [
      {
        name: "Combined unique active MRI lesions",
        finding: "56% lower with ponesimod (1.405 versus 3.164 per year; P<0.001).",
      },
      {
        name: "Confirmed disability accumulation",
        finding: "12- and 24-week disability outcomes did not differ significantly.",
      },
    ],
    safety: [
      "Treatment-emergent and serious adverse-event rates were similar between groups.",
      "Adverse-event discontinuation was more frequent with ponesimod: 8.7% versus 6.0%.",
    ],
    whyItMattered:
      "OPTIMUM moved pivotal evidence beyond placebo and injectable comparisons by directly testing two contemporary oral therapies.",
    limitation:
      "Superiority was demonstrated for relapse, fatigue, and MRI outcomes—not for confirmed disability accumulation during the controlled period.",
    sponsor: "Actelion",
    provenance:
      "The primary publication and ClinicalTrials.gov record support the design, demographics, eligibility, outcomes, safety, and sponsor.",
  },
};

export function getTrialProfile(slug: string) {
  return trialProfiles[slug];
}
