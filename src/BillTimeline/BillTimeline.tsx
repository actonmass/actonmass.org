import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import moment from "moment";
import { Popup } from "semantic-ui-react";

import Symbol from "./Symbol";

type Event = {
  text: string;
  date: string;
  showDurationFromToday?: boolean;
  symbol: string;
};

type BillTimelineProps = {
  filingDate: string;
  sessionEndDate: string;
  events: { text: string; date: string }[];
};

type TimelineProps = {
  width: number;
  margin: number;
  events: Event[];
  sessionEndDate: string;
};

const Timeline = ({ width, margin, events, sessionEndDate }: TimelineProps) => {
  const sortedEvents = [...events].sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf());

  const firstEvent = sortedEvents[0];
  const lastEvent = sortedEvents[sortedEvents.length - 1];
  const today = moment();

  const sessionEndMoment = moment(sessionEndDate);
  const isSessionOver = sessionEndMoment < today;

  const dateToPixel = (date) => {
    const pixel =
      margin +
      (width * (date - moment(firstEvent.date).valueOf())) /
        (moment(lastEvent.date).valueOf() - moment(firstEvent.date).valueOf());
    return pixel;
  };

  let items: { symbol: JSX.Element; label: string; date: any }[] = [];
  let spans: JSX.Element[] = [];

  const lineLevel = 50;

  const reference = isSessionOver ? sessionEndMoment : today;
  sortedEvents.forEach((event, i) => {
    const dateMoment = moment(event.date);
    items.push({
      symbol: <Symbol key={i} x={dateToPixel(dateMoment)} lineLevel={lineLevel} {...event} />,
      label: event.text,
      date: dateMoment,
    });

    if (event.showDurationFromToday) {
      spans.push(
        <TimeSpan
          key={i}
          x1={dateToPixel(dateMoment)}
          x2={dateToPixel(reference)}
          lineLevel={lineLevel}
          text={`${reference.diff(dateMoment, "days")} days...`}
        />
      );
    }
  });

  if (!isSessionOver) {
    items.push({
      symbol: <Symbol key={"today"} x={dateToPixel(today)} lineLevel={lineLevel} symbol="heartbeat" />,
      label: "Today",
      date: today,
    });
  }

  return (
    <div>
      <svg height={65} width={width + margin * 2}>
        <line
          x1={margin}
          y1={lineLevel}
          x2={width + margin}
          y2={lineLevel}
          style={{ stroke: "#123e83", strokeWidth: 4 }}
        />
        {spans}
        {items.map(({ symbol, label, date }) => {
          return (
            <Popup
              content={
                <div>
                  <strong>{date.format("MM.YYYY")}</strong>
                  <br />
                  <span>{label}</span>
                </div>
              }
              trigger={symbol}
              size="large"
              on={["hover", "click"]}
            />
          );
        })}
      </svg>
      <div style={{ width: width + margin * 2, position: "relative", height: 80 }}>
        <Label x={dateToPixel(moment(firstEvent.date)) - 10} text={firstEvent.text} date={firstEvent.date} />
        <Label x={dateToPixel(moment(lastEvent.date)) - 10} text={lastEvent.text} date={lastEvent.date} />
      </div>
    </div>
  );
};

const BillTimeline = ({ filingDate, sessionEndDate, events }: BillTimelineProps) => {
  const { targetRef, dimensions } = useTargetWidth();

  let allEvents = events.map((event) => {
    return { date: event.date, showDurationFromToday: false, text: event.text, symbol: "target" };
  });
  allEvents.unshift({
    date: filingDate,
    showDurationFromToday: true,
    text: "Bill filed",
    symbol: "big",
  });
  allEvents.push({ date: sessionEndDate, showDurationFromToday: false, text: "Session Over", symbol: "session-over" });

  return (
    <div
      ref={targetRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <Timeline events={allEvents} width={dimensions.width * 0.7} margin={50} sessionEndDate={sessionEndDate} />
        <div className="cbox" style={{ fontStyle: "italic" }}>
          Click on or hover events for more details
        </div>
      </div>
    </div>
  );
};

const Label = ({ text, date, x }) => {
  return (
    <div style={{ position: "absolute", left: 0, top: 0 }}>
      <div style={{ position: "absolute", left: x, top: 0 }}>
        <h4 className="fRoboto fRegular">{text}</h4>
        <p className="fRoboto fLight">{moment(date).format("MM.YYYY")}</p>
      </div>
    </div>
  );
};

function useTargetWidth() {
  const targetRef = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const handleResize = () => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  };
  useLayoutEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return { targetRef, dimensions };
}

const TimeSpan = ({ x1, x2, lineLevel, text }) => {
  const height = 30;
  const margin = 4;
  const strokeWidth = 1;
  return (
    <g>
      <line
        x1={x1}
        x2={x1}
        y1={lineLevel}
        y2={lineLevel - height}
        style={{ stroke: "#123e83", strokeWidth: strokeWidth }}
      />
      <line
        x1={x2}
        x2={x2}
        y1={lineLevel}
        y2={lineLevel - height}
        style={{ stroke: "#123e83", strokeWidth: strokeWidth }}
      />
      <line
        x1={x1}
        x2={x2}
        y1={lineLevel - height}
        y2={lineLevel - height}
        style={{ stroke: "#123e83", strokeWidth: strokeWidth }}
      />
      <text x={(x2 + x1) / 2} y={lineLevel - height - margin} style={{ font: `bold sans-serif` }} textAnchor={"middle"}>
        {text}
      </text>
    </g>
  );
};

const renderBillTimeline = (targetID, data) => {
  const targetEl = document.getElementById(targetID);
  render(<BillTimeline {...data} />, targetEl);
};

export default { renderBillTimeline };
