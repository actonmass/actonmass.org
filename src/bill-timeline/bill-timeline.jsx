import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import moment from "moment";

function useTargetWidth() {
  const targetRef = useRef();
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

const Symbol = ({ symbol, x, lineLevel }) => {
  if (symbol === "small") {
    return <circle cx={x} cy={lineLevel} r={7} style={{ fill: "#e59626" }} />;
  }
  if (symbol === "target") {
    return (
      <g>
        <circle cx={x} cy={lineLevel} r={10} style={{ fill: "#e59626" }} />;
        <circle cx={x} cy={lineLevel} r={6} style={{ fill: "#d8e5fd" }} />;
        <circle cx={x} cy={lineLevel} r={3} style={{ fill: "#e59626" }} />;
      </g>
    );
  }
  if (symbol === "big") {
    return <circle cx={x} cy={lineLevel} r={10} style={{ fill: "#123e83" }} />;
  }
  if (symbol === "heartbeat") {
    return <circle className="today-dot" cx={x} cy={lineLevel} r={10} style={{ fill: "#eca632" }} />;
  }
  if (symbol === "session-over") {
    return <circle cx={x} cy={lineLevel} r={10} style={{ fill: "#780116" }} />;
  }
};

const Label = ({ text, date, x, boundary, lineLevel }) => {
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: boundary }}>
      <div style={{ position: "absolute", left: x, top: 0 }}>
        <h4 className="fRoboto fRegular">{text}</h4>
        <p className="fRoboto fLight">{moment(date).format("MM.YYYY")}</p>
      </div>
    </div>
  );
};

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

const Timeline = ({ width, margin, events }) => {
  const sortedEvents = [...events].sort((a, b) => {
    moment(a.date) - moment(b.date);
  });

  const firstEvent = sortedEvents[0];
  const lastEvent = sortedEvents[sortedEvents.length - 1];
  const today = moment();

  const dateToPixel = (date) => {
    const pixel =
      margin + (width * (date - moment(firstEvent.date))) / (moment(lastEvent.date) - moment(firstEvent.date));
    return pixel;
  };

  let symbols = [];
  let spans = [];
  let labels = [];

  const lineLevel = 50;

  sortedEvents.forEach((event, i) => {
    const dateMoment = moment(event.date);
    symbols.push(<Symbol key={i} x={dateToPixel(dateMoment)} lineLevel={lineLevel} {...event} />);

    if (event.showDurationFromToday) {
      spans.push(
        <TimeSpan
          key={i}
          x1={dateToPixel(dateMoment)}
          x2={dateToPixel(today)}
          lineLevel={lineLevel}
          text={`${today.diff(dateMoment, "days")} days...`}
        />
      );
    }
  });
  symbols.push(<Symbol key={"today"} x={dateToPixel(today)} lineLevel={lineLevel} symbol="heartbeat" />);

  let labelDetails = sortedEvents.map((event) => ({
    date: event.date,
    x: dateToPixel(moment(event.date)) - 10,
    text: event.text,
  }));
  labelDetails.push({ date: today.format("YYYY-MM-DD"), x: dateToPixel(today) - 10, text: "Today" });
  labelDetails
    .sort((a, b) => {
      return moment(a.date) - moment(b.date);
    })
    .reverse();

  let labelWidth = width + margin * 2;
  labelDetails.forEach((labelDetails, i) => {
    const dateMoment = moment(labelDetails.date);
    labels.push(<Label key={i} x={labelDetails.x} boundary={labelWidth} lineLevel={lineLevel} {...labelDetails} />);
    labelWidth = labelDetails.x;
  });

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
        {symbols}
      </svg>
      <div style={{ width: width + margin * 2, position: "relative", height: 80 }}>{labels}</div>
    </div>
  );
};

const BillTimeline = ({ filingDate, sessionEndDate, events }) => {
  const { targetRef, dimensions } = useTargetWidth();

  let allEvents = events.map((event) => {
    return { date: event.date, showDurationFromToday: false, text: event.text, symbol: "target" };
  });
  allEvents.unshift({
    date: filingDate,
    showDurationFromToday: true,
    text: "Bill billed",
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
        <Timeline events={allEvents} width={dimensions.width * 0.7} margin={50} />
      </div>
    </div>
  );
};

const renderBillTimeline = (targetID, data) => {
  const targetEl = document.getElementById(targetID);
  render(<BillTimeline {...data} />, targetEl);
};

export default { renderBillTimeline };
