import React from "react";
import doT from "dot";
import ReactMarkdown from "react-markdown";

import { Leg, Bill, EmailScript } from "../types";

type MaybeBill = Bill | undefined;

doT.templateSettings.interpolate = /\{([\s\S]+?)\}/g;
doT.templateSettings.varname = "leg, bill";
doT.templateSettings.strip = false;

export default function getScript(script: string, leg: Leg, bill: MaybeBill): string;
export default function getScript(script: string, leg: Leg, bill: MaybeBill, md: false): string;
export default function getScript(script: string, leg: Leg, bill: MaybeBill, md: true): JSX.Element;
export default function getScript(script: string, leg: Leg, bill: MaybeBill, md: boolean = false) {
  const interpolated = doT.template(script)(leg, { title: bill?.title ?? "" });
  if (!md) {
    return interpolated;
  }
  return <ReactMarkdown source={interpolated} />;
}

export function getEmailScript({ subject, body }: EmailScript, leg: Leg, bill: MaybeBill) {
  return {
    subject: getScript(subject, leg, bill),
    body: getScript(body, leg, bill, true),
  };
}
