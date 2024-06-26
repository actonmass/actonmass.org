import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";

import map from "lodash/fp/map";
import groupBy from "lodash/fp/groupBy";
import toPairs from "lodash/fp/toPairs";
import sortBy from "lodash/fp/sortBy";
import reverse from "lodash/fp/reverse";
import flow from "lodash/fp/flow";

type HistoryEvent = { date: string; description: string; event?: string };

export default function BillHistory({ data }: { data: HistoryEvent[] }) {
  const eventsByYear = groupByYear(data);

  return (
    <div className="bill-history-container">
      <HistoryYear year={Number(eventsByYear[0].year) + 1} events={[]} />
      {eventsByYear.map(({ events, year }) => (
        <HistoryYear key={year} year={year} events={events} />
      ))}
    </div>
  );
}

function HistoryYear({ year, events }: { year: string | number; events: HistoryEvent[] }) {
  const isOdd = Number(year) % 2 != 0;
  return (
    <React.Fragment key={year}>
      {events.map((event, idx) => renderEvent(event, idx))}
      <div className="year-container">
        <div className={`year-rect fRoboto fWhite fRegular cbox ${isOdd ? "" : "small"}`}>
          {year}
        </div>
      </div>
    </React.Fragment>
  );
}

function renderEvent(event, idx) {
  const eventMoment = moment(event.date);
  const isOdd = event.idx % 2 != 0;
  return (
    <div key={idx} className={`event-container ${isOdd ? "odd" : ""}`}>
      <div className="history-line">
        <div className="cbox">
          <div className="bill_hist_circ"></div>
        </div>
        <div className="cbox">
          <div className="hist_line"></div>
        </div>
      </div>
      <div className={`event-description hbox ${event.type || ""}`}>
        <div className="event-text">
          <h4 className="fRaleway fBold fUppercase">{eventMoment.format("MMM YYYY")}</h4>
          <p className="fRoboto fLight">{addLineBreaks(event.description)}</p>
        </div>
        {event.type == "death" && (
          <FontAwesomeIcon icon={faSkullCrossbones} size="4x" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

function addLineBreaks(text) {
  return text
    .trim()
    .split("\n")
    .map((item, idx) => {
      return (
        <span key={idx}>
          {item}
          <br />
        </span>
      );
    });
}

function groupByYear(
  data: HistoryEvent[]
): {
  year: number;
  events: HistoryEvent[];
}[] {
  return flow(
    sortBy("date"),
    reverse,
    toPairs,
    map(([idx, event]: [string, HistoryEvent]) => ({ ...event, idx: data.length - Number(idx) })),
    groupBy((event) => moment(event.date).year()),
    toPairs,
    map(([year, events]) => ({ year, events })),
    sortBy("year"),
    reverse
  )(data);
}
