import React from "react";
import ReactDOM from "react-dom";
import merge from "lodash/merge";

import { Scripts, LegBase, Bill, enrichLeg } from "../../types/types";

import { ContactLegModal } from "./ContactLegModal";
import { evalScripts } from "./evalScripts";

type Props = {
  leg: LegBase;
  bill: Bill;
  scripts: Scripts;
  style?: string;
  txt?: string;
};

export function RequestCosponsorship({
  leg: legBase,
  scripts: defaultRawScripts,
  bill,
  style,
  txt: customTxt,
}: Props) {
  const leg = enrichLeg(legBase);
  const isThanks = (bill.co_sponsors ?? []).includes(leg.aom_id);
  const rawScripts = merge({}, defaultRawScripts, bill.scripts);
  const scripts = evalScripts(rawScripts, { leg, bill });
  const legTitleShort = leg.chamber === "house" ? "rep" : "sen.";
  const txt =
    customTxt ??
    (isThanks ? `Thank your ${legTitleShort}` : `Tell your ${legTitleShort} to co-sponsor!`);
  return (
    <ContactLegModal txt={txt} leg={leg} scripts={scripts} isThanks={isThanks} style={style} />
  );
}

function renderRequestCosponsorship(targetID: string, data: Props) {
  const targetEl = document.getElementById(targetID);
  ReactDOM.render(<RequestCosponsorship {...data} />, targetEl);
}

export default { renderRequestCosponsorship };
