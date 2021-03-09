import React from "react";

type Props = { symbol: string; lineLevel: number; x: number };

export default function Symbol({ symbol, x, lineLevel, ...otherProps }: Props) {
  if (symbol === "small") {
    return (
      <g {...otherProps}>
        <circle cx={x} cy={lineLevel} r={7} style={{ fill: "#e59626" }} />;
      </g>
    );
  }
  if (symbol === "target") {
    return (
      <g {...otherProps}>
        <circle cx={x} cy={lineLevel} r={10} style={{ fill: "#e59626" }} />;
        <circle cx={x} cy={lineLevel} r={6} style={{ fill: "#d8e5fd" }} className="not-filled" />;
        <circle cx={x} cy={lineLevel} r={3} style={{ fill: "#e59626" }} />;
      </g>
    );
  }
  if (symbol === "big") {
    return (
      <g {...otherProps}>
        <circle cx={x} cy={lineLevel} r={10} style={{ fill: "#123e83" }} />
      </g>
    );
  }
  if (symbol === "heartbeat") {
    return (
      <g {...otherProps}>
        <circle className="today-dot" cx={x} cy={lineLevel} r={10} style={{ fill: "#eca632" }} />
      </g>
    );
  }
  if (symbol === "session-over") {
    return (
      <g {...otherProps}>
        <circle cx={x} cy={lineLevel} r={10} style={{ fill: "#780116" }} />
      </g>
    );
  }
  return null;
}
