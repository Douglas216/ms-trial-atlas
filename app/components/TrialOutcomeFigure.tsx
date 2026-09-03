import type { CSSProperties } from "react";
import type {
  BarOutcomePanel,
  EffectOutcomePanel,
  TrialOutcomeFigure as TrialOutcomeFigureData,
} from "../data/trialOutcomeFigures";

type FigureStyle = CSSProperties & Record<`--${string}`, string>;

type TrialOutcomeFigureProps = {
  figure: TrialOutcomeFigureData;
  studyName: string;
  sourceUrl: string;
  sourceLabel: string;
};

function axisNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: value < 1 ? 3 : 1,
  }).format(value);
}

function BarPanel({ panel }: { panel: BarOutcomePanel }) {
  return (
    <section className="outcome-panel" aria-label={`${panel.title}, ${panel.timepoint}`}>
      <header className="outcome-panel-heading">
        <div>
          <h4>{panel.title}</h4>
          <p>{panel.axisLabel}</p>
        </div>
        <span>{panel.timepoint}</span>
      </header>

      <div className="outcome-bar-plot">
        {panel.values.map((item) => {
          const barStyle: FigureStyle = {
            "--bar-size": `${Math.max((item.value / panel.axisMax) * 100, 1.5)}%`,
          };

          return (
            <div className="outcome-bar-row" key={`${panel.title}-${item.label}`}>
              <span className="outcome-value-label">{item.label}</span>
              <div className="outcome-bar-field">
                <div
                  className={`outcome-bar ${item.reference ? "outcome-bar--reference" : ""}`}
                  style={barStyle}
                  aria-hidden="true"
                />
              </div>
              <strong>{item.displayValue}</strong>
            </div>
          );
        })}
      </div>

    </section>
  );
}

function EffectPanel({ panel }: { panel: EffectOutcomePanel }) {
  const span = panel.axisMax - panel.axisMin;
  const nullPosition = ((panel.nullValue - panel.axisMin) / span) * 100;
  const trackStyle: FigureStyle = { "--null-position": `${nullPosition}%` };

  return (
    <section className="outcome-panel" aria-label={`${panel.title}, ${panel.timepoint}`}>
      <header className="outcome-panel-heading">
        <div>
          <h4>{panel.title}</h4>
          <p>{panel.axisLabel}</p>
        </div>
        <span>{panel.timepoint}</span>
      </header>

      <div className="effect-direction" aria-hidden="true">
        <span>{panel.lowerLabel}</span>
        <span>{panel.upperLabel}</span>
      </div>
      <div className="effect-plot">
        {panel.values.map((item) => {
          const pointPosition = ((item.value - panel.axisMin) / span) * 100;
          const ciStart = item.ciLow === undefined ? pointPosition : ((item.ciLow - panel.axisMin) / span) * 100;
          const ciEnd = item.ciHigh === undefined ? pointPosition : ((item.ciHigh - panel.axisMin) / span) * 100;
          const rowStyle: FigureStyle = {
            ...trackStyle,
            "--point-position": `${pointPosition}%`,
            "--ci-start": `${ciStart}%`,
            "--ci-width": `${Math.max(ciEnd - ciStart, 0)}%`,
          };

          return (
            <div className="effect-row" key={`${panel.title}-${item.label}`}>
              <span className="outcome-value-label">{item.label}</span>
              <div className="effect-track" style={rowStyle} aria-hidden="true">
                <span className="effect-null" />
                {item.ciLow !== undefined && item.ciHigh !== undefined && (
                  <span className="effect-ci">
                    <i />
                    <i />
                  </span>
                )}
                <span className="effect-point" />
              </div>
              <strong>{item.displayValue}</strong>
            </div>
          );
        })}
      </div>

      <div className="effect-axis" style={trackStyle} aria-hidden="true">
        <span>{axisNumber(panel.axisMin)}</span>
        <span className="effect-axis-null">Null {axisNumber(panel.nullValue)}</span>
        <span>{axisNumber(panel.axisMax)}</span>
      </div>
    </section>
  );
}

export default function TrialOutcomeFigure({
  figure,
  studyName,
  sourceUrl,
  sourceLabel,
}: TrialOutcomeFigureProps) {
  return (
    <figure
      className={`trial-outcome-figure ${figure.panels.length > 1 ? "trial-outcome-figure--multi" : ""}`}
      aria-label={`Primary endpoint outcome figure for ${studyName}`}
      data-outcome-figure={studyName}
    >
      <div className="outcome-figure-title">
        <div>
          <span>Outcome figure</span>
          <h3>Primary endpoint results</h3>
        </div>
        <div className="outcome-legend" aria-label="Figure legend">
          <span><i /> Intervention</span>
          <span><i /> Comparator or reference</span>
        </div>
      </div>

      <div className="outcome-panels">
        {figure.panels.map((panel) =>
          panel.kind === "bars" ? (
            <BarPanel panel={panel} key={`${panel.title}-${panel.timepoint}`} />
          ) : (
            <EffectPanel panel={panel} key={`${panel.title}-${panel.timepoint}`} />
          ),
        )}
      </div>

      <figcaption>
        <p>
          Exact values are printed beside each mark. Scales are specific to this endpoint and should
          not be used for comparisons between trials.
          {figure.note && <> {figure.note}</>}
        </p>
        <a href={sourceUrl} target="_blank" rel="noreferrer">
          Source: {sourceLabel} <span aria-hidden="true">↗</span>
        </a>
      </figcaption>
    </figure>
  );
}
