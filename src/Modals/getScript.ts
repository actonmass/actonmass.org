import doT from "dot";

import { Leg, Bill, EmailScript } from "../types";

doT.templateSettings.interpolate = /\{([\s\S]+?)\}/g;
doT.templateSettings.varname = "leg, bill";

export default function getScript(script: string, leg: Leg, bill: Bill | undefined, md: boolean = false) {
  return doT.template(script)(leg, { title: bill?.title });
}

export function getEmailScript({ subject, body }: EmailScript, leg: Leg, bill: Bill | undefined) {
  return {
    subject: getScript(subject, leg, bill),
    body: getScript(body, leg, bill, true),
  };
}
