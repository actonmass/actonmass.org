import React from "react";
import { render } from "react-dom";
import moment from "moment";

function BillHistory({ data }) {
  const eventsByYear = _(data)
    .map((event, idx) => ({ ...event, idx: data.length - idx }))
    .groupBy((event) => moment(event.date).year())
    .toPairs()
    .map(([year, events]) => ({ year, events }))
    .sortBy("year")
    .reverse()
    .value();

  return (
    <div className="bill-history-container">
      {renderYear({ year: Number(eventsByYear[0].year) + 1, events: [] })}
      {eventsByYear.map(renderYear)}
    </div>
  );
}

function renderYear({ year, events }) {
  const isOdd = Number(year) % 2 != 0;
  return (
    <React.Fragment key={year}>
      {events.map((event, idx) => renderEvent(event, idx))}
      <div className="year-container">
        <div className={`year-rect fRoboto fWhite fRegular cbox ${isOdd ? "" : "small"}`}>{year}</div>
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
        {event.type == "death" && <i className="fas fa-skull-crossbones fa-4x" aria-hidden="true"></i>}
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

function renderHistory(targetID, data) {
  const targetEl = document.getElementById(targetID);
  render(<BillHistory data={data} />, targetEl);
}

export default { renderHistory };
