import React from "react";
import ReactDOM from "react-dom";

import { Scripts, LegBase, enrichLeg } from "../../types/types";

import { ContactLegModal } from "./ContactLegModal";
import { evalScripts } from "./evalScripts";

type Props = {
  leg: LegBase;
  scripts: Scripts;
  txt?: string;
};

export function RequestSupportCampaign({
  leg: legBase,
  scripts: rawScripts,
  txt: customTxt,
}: Props) {
  const leg = enrichLeg(legBase);
  const isThanks = leg.supports_the_campaign;
  const scripts = evalScripts(rawScripts, { leg });
  const legTitleShort = leg.chamber === "house" ? "rep" : "sen.";
  const txt =
    customTxt ??
    (isThanks
      ? `Thank your ${legTitleShort}`
      : `Ask your ${legTitleShort} to support the campaign!`);
  return <ContactLegModal txt={txt} leg={leg} scripts={scripts} isThanks={isThanks} />;
}

function renderRequestSupportCampaign(targetID: string, data: Props) {
  const targetEl = document.getElementById(targetID);
  ReactDOM.render(<RequestSupportCampaign {...data} />, targetEl);
}

export default { renderRequestSupportCampaign };
