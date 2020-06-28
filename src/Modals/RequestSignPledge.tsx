import React from "react";
import ReactDOM from "react-dom";

import { Scripts, LegBase, enrichLeg } from "../types";

import { ContactLegModal } from "./ContactLegModal";
import { evalScripts } from "./evalScripts";

type Props = {
  leg: LegBase;
  scripts: Scripts;
};

export function RequestSignPledge({ leg: legBase, scripts: rawScripts }: Props) {
  const leg = enrichLeg(legBase);
  const isThanks = leg.pledge;
  const scripts = evalScripts(rawScripts, { leg });
  const legTitleShort = leg.chamber === "house" ? "rep" : "sen.";
  const txt = isThanks ? `Thank your ${legTitleShort}` : `Tell your ${legTitleShort} to sign!`;
  return <ContactLegModal txt={txt} leg={leg} scripts={scripts} isThanks={isThanks} />;
}

function renderRequestSignPledge(targetID: string, data: Props) {
  const targetEl = document.getElementById(targetID);
  ReactDOM.render(<RequestSignPledge {...data} />, targetEl);
}

export default { renderRequestSignPledge };
