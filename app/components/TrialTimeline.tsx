"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FocusEvent, MouseEvent } from "react";
import type { Publication, Trial } from "../data/trials";

type TooltipPosition = {
  left: number;
  top: number;
  placement: "above" | "below";
};

type TooltipState =
  | ({ kind: "trial"; trial: Trial } & TooltipPosition)
  | ({
      kind: "publication";
      trial: Trial;
      publication: Publication;
    } & TooltipPosition)
  | null;

const YEAR_WIDTH = 92;
const ROW_HEIGHT = 58;
const TRIAL_TOOLTIP_WIDTH = 316;
const PUBLICATION_TOOLTIP_WIDTH = 360;

function parseDate(value: string) {
  const normalized =
    value.length === 4
      ? `${value}-01-01`
      : value.length === 7
        ? `${value}-01`
        : value;
  return new Date(`${normalized}T00:00:00Z`);
}

function formatDate(value: string | null) {
  if (!value) return "Being verified";
  const date = parseDate(value);
  if (value.length === 4) return value;
  if (value.length === 7) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatComparator(value: Trial["comparatorType"]) {
  if (!value) return "Being verified";
  return {
    placebo: "Placebo",
    "active-comparator": "Active comparator",
    "active-reference": "Active reference",
    "historical-other": "Historical / other",
  }[value];
}

function formatEndpoint(value: Trial["primaryEndpointCategory"]) {
  if (!value) return "Being verified";
  return {
    relapse: "Relapse",
    "disability-progression": "Disability progression",
    "conversion-to-MS": "Conversion to MS",
    composite: "Composite",
    other: "Other",
  }[value];
}

function TrialTooltip({
  state,
}: {
  state: Extract<NonNullable<TooltipState>, { kind: "trial" }>;
}) {
  const { trial, left, top, placement } = state;
  return (
    <div
      className={`trial-tooltip trial-tooltip--${placement}`}
      role="tooltip"
      id={`trial-tooltip-${trial.id}`}
      style={{ left, top, width: TRIAL_TOOLTIP_WIDTH }}
    >
      <p className="tooltip-title">{trial.studyName}</p>
      <dl>
        <div>
          <dt>Drug</dt>
          <dd>{trial.drug}</dd>
        </div>
        <div>
          <dt>Disease population</dt>
          <dd>{trial.diseasePopulation ?? "Being verified"}</dd>
        </div>
        <div>
          <dt>Comparator type</dt>
          <dd>{formatComparator(trial.comparatorType)}</dd>
        </div>
        <div>
          <dt>Primary endpoint category</dt>
          <dd>{formatEndpoint(trial.primaryEndpointCategory)}</dd>
        </div>
        <div>
          <dt>Trial period</dt>
          <dd>
            {trial.startDate && trial.primaryCompletionDate
              ? `${formatDate(trial.startDate)}–${formatDate(trial.primaryCompletionDate)}`
              : "Being verified"}
          </dd>
        </div>
        <div>
          <dt>Publication year</dt>
          <dd>{trial.publicationYear ?? "Being verified"}</dd>
        </div>
      </dl>
    </div>
  );
}

function PublicationTooltip({
  state,
  cancelHide,
  scheduleHide,
}: {
  state: Extract<NonNullable<TooltipState>, { kind: "publication" }>;
  cancelHide: () => void;
  scheduleHide: () => void;
}) {
  const { trial, publication, left, top, placement } = state;
  return (
    <div
      className={`publication-tooltip publication-tooltip--${placement}`}
      role="tooltip"
      id={`publication-tooltip-${trial.id}`}
      style={{ left, top, width: PUBLICATION_TOOLTIP_WIDTH }}
      onMouseEnter={cancelHide}
      onMouseLeave={scheduleHide}
      onFocus={cancelHide}
      onBlur={scheduleHide}
    >
      <p className="publication-tooltip-title">{publication.title}</p>
      <p className="publication-tooltip-byline">{publication.firstAuthor} et al.</p>
      <p className="publication-tooltip-journal">
        {publication.journal}, {publication.year}
      </p>
      <a
        className="publication-tooltip-doi"
        href={publication.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        DOI: {publication.doi}
      </a>
      <a
        className="publication-tooltip-open"
        href={publication.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        Open publication <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}

export function TrialTimeline({ trials }: { trials: Trial[] }) {
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const datedTrials = useMemo(
    () =>
      trials
        .filter(
          (trial) => trial.startDate !== null && trial.primaryCompletionDate !== null,
        )
        .sort(
          (a, b) =>
            parseDate(a.startDate!).getTime() - parseDate(b.startDate!).getTime(),
        ),
    [trials],
  );

  const undatedTrials = useMemo(
    () => trials.filter((trial) => !trial.startDate || !trial.primaryCompletionDate),
    [trials],
  );

  const { minYear, maxYear, minTime, maxTime, years, plotWidth } = useMemo(() => {
    const allTimes = datedTrials.flatMap((trial) => [
      parseDate(trial.startDate!).getTime(),
      parseDate(trial.primaryCompletionDate!).getTime(),
      trial.publication
        ? Date.UTC(trial.publication.year, 6, 1)
        : parseDate(trial.primaryCompletionDate!).getTime(),
    ]);
    const firstYear = new Date(Math.min(...allTimes)).getUTCFullYear();
    const lastYear = new Date(Math.max(...allTimes)).getUTCFullYear() + 1;
    const tickYears = Array.from(
      { length: lastYear - firstYear + 1 },
      (_, index) => firstYear + index,
    );
    return {
      minYear: firstYear,
      maxYear: lastYear,
      minTime: Date.UTC(firstYear, 0, 1),
      maxTime: Date.UTC(lastYear, 0, 1),
      years: tickYears,
      plotWidth: (lastYear - firstYear) * YEAR_WIDTH,
    };
  }, [datedTrials]);

  const position = (date: string | number) => {
    const time = typeof date === "number" ? date : parseDate(date).getTime();
    return ((time - minTime) / (maxTime - minTime)) * plotWidth;
  };

  const tooltipPosition = (
    event:
      | MouseEvent<HTMLAnchorElement>
      | FocusEvent<HTMLAnchorElement>,
    width: number,
  ): TooltipPosition => {
    const rect = event.currentTarget.getBoundingClientRect();
    const left = Math.max(
      12,
      Math.min(
        window.innerWidth - width - 12,
        rect.left + rect.width / 2 - width / 2,
      ),
    );
    const spaceAbove = rect.top;
    const placement = spaceAbove > 370 ? "above" : "below";
    return {
      left,
      top: placement === "above" ? rect.top - 12 : rect.bottom + 12,
      placement,
    };
  };

  const cancelHide = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const hideTooltip = () => {
    cancelHide();
    setTooltip(null);
  };

  const scheduleHide = () => {
    cancelHide();
    hideTimer.current = setTimeout(() => setTooltip(null), 180);
  };

  const showTrialTooltip = (
    trial: Trial,
    event:
      | MouseEvent<HTMLAnchorElement>
      | FocusEvent<HTMLAnchorElement>,
  ) => {
    cancelHide();
    setTooltip({
      kind: "trial",
      trial,
      ...tooltipPosition(event, TRIAL_TOOLTIP_WIDTH),
    });
  };

  const showPublicationTooltip = (
    trial: Trial,
    publication: Publication,
    event:
      | MouseEvent<HTMLAnchorElement>
      | FocusEvent<HTMLAnchorElement>,
  ) => {
    cancelHide();
    setTooltip({
      kind: "publication",
      trial,
      publication,
      ...tooltipPosition(event, PUBLICATION_TOOLTIP_WIDTH),
    });
  };

  useEffect(() => {
    const hide = () => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
      setTooltip(null);
    };
    window.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
    return () => {
      window.removeEventListener("scroll", hide, true);
      window.removeEventListener("resize", hide);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <section className="timeline-figure" aria-label="Pivotal MS trial timeline">
      <div className="timeline-caption">
        <div>
          <p className="section-label">Pivotal randomized periods</p>
          <p className="section-note">
            Solid bars show official study start through primary completion of the
            pivotal controlled phase. Comparator type is listed in trial details.
          </p>
        </div>
        <div className="publication-key">
          <span aria-hidden="true" />
          Publication year
        </div>
      </div>

      <div className="timeline-frame">
        <div className="study-column" aria-hidden="true">
          <div className="column-heading">
            <span>Study</span>
            <span>Therapy</span>
          </div>
          {datedTrials.map((trial) => (
            <div className="study-label" style={{ height: ROW_HEIGHT }} key={trial.id}>
              <span>{trial.studyName}</span>
              <small>{trial.drug}</small>
            </div>
          ))}
        </div>

        <div className="plot-scroller" tabIndex={0} aria-label="Scrollable year axis">
          <div className="plot" style={{ width: plotWidth }}>
            <div className="axis" style={{ width: plotWidth }}>
              {years.map((year) => {
                const tickLeft = position(Date.UTC(year, 0, 1));
                return (
                  <div
                    className="axis-tick"
                    key={year}
                    style={{ left: tickLeft }}
                  >
                    <span>{year}</span>
                  </div>
                );
              })}
            </div>

            <div className="dated-rows">
              {datedTrials.map((trial) => {
                const left = position(trial.startDate!);
                const completion = position(trial.primaryCompletionDate!);
                const width = Math.max(completion - left, 26);
                const publicationLeft = trial.publication
                  ? position(Date.UTC(trial.publication.year, 6, 1))
                  : null;
                const barStyle = {
                  "--bar-left": `${left}px`,
                  "--bar-width": `${width}px`,
                  height: ROW_HEIGHT,
                } as CSSProperties;

                return (
                  <div className="plot-row" style={barStyle} key={trial.id}>
                    <Link
                      className="trial-interval"
                      href={`/trials/${trial.slug}`}
                      aria-label={`${trial.studyName}, ${trial.drug}. ${formatDate(
                        trial.startDate,
                      )} to ${formatDate(
                        trial.primaryCompletionDate,
                      )}. Open trial profile.`}
                      aria-describedby={
                        tooltip?.kind === "trial" && tooltip.trial.id === trial.id
                          ? `trial-tooltip-${trial.id}`
                          : undefined
                      }
                      onMouseEnter={(event) => showTrialTooltip(trial, event)}
                      onMouseLeave={hideTooltip}
                      onFocus={(event) => showTrialTooltip(trial, event)}
                      onBlur={hideTooltip}
                    >
                      <span className="interval-cap interval-cap--start" />
                      <span className="interval-line" />
                      <span className="interval-cap interval-cap--end" />
                    </Link>
                    {publicationLeft !== null && trial.publication && (
                      <a
                        className="publication-marker"
                        style={{ left: publicationLeft }}
                        href={trial.publication.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${trial.publication.title}. ${trial.publication.firstAuthor} et al. ${trial.publication.journal}, ${trial.publication.year}. Open publication in a new tab.`}
                        aria-describedby={
                          tooltip?.kind === "publication" &&
                          tooltip.trial.id === trial.id
                            ? `publication-tooltip-${trial.id}`
                            : undefined
                        }
                        onMouseEnter={(event) =>
                          showPublicationTooltip(trial, trial.publication!, event)
                        }
                        onMouseLeave={scheduleHide}
                        onFocus={(event) =>
                          showPublicationTooltip(trial, trial.publication!, event)
                        }
                        onBlur={scheduleHide}
                      >
                        <span className="publication-diamond" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="verification-heading">
        <span>Timeline dates being verified</span>
        <span>{undatedTrials.length} entries</span>
      </div>

      <div className="verification-list">
        {undatedTrials.map((trial) => (
          <div className="verification-row" key={trial.id}>
            <div className="study-label">
              <span>{trial.studyName}</span>
              <small>{trial.drug}</small>
            </div>
            <Link
              className="verification-lane"
              href={`/trials/${trial.slug}`}
              aria-label={`${trial.studyName}, ${trial.drug}. Timeline dates being verified. Open trial profile.`}
              aria-describedby={
                tooltip?.kind === "trial" && tooltip.trial.id === trial.id
                  ? `trial-tooltip-${trial.id}`
                  : undefined
              }
              onMouseEnter={(event) => showTrialTooltip(trial, event)}
              onMouseLeave={hideTooltip}
              onFocus={(event) => showTrialTooltip(trial, event)}
              onBlur={hideTooltip}
            >
              <span>Dates being verified</span>
            </Link>
          </div>
        ))}
      </div>

      {tooltip?.kind === "trial" && <TrialTooltip state={tooltip} />}
      {tooltip?.kind === "publication" && (
        <PublicationTooltip
          state={tooltip}
          cancelHide={cancelHide}
          scheduleHide={scheduleHide}
        />
      )}
      <span className="sr-only">
        Timeline range {minYear} through {maxYear}.
      </span>
    </section>
  );
}
