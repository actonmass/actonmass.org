import React from "react";

import { enrichLeg } from "../../types";
import { campaign_scripts } from "../../content";

import { ContactLegModal } from "./ContactLegModal";
import { evalScripts } from "./evalScripts";

type Props = {
  leg: Queries.Legislator;
  txt?: string;
};

export function RequestSupportCampaign({ leg: legBase, txt: customTxt }: Props) {
  const leg = enrichLeg(legBase);
  const isThanks = leg.supports_the_campaign;
  const scripts = evalScripts(campaign_scripts, { leg });
  const legTitleShort = leg.chamber === "house" ? "rep" : "sen.";
  const txt =
    customTxt ??
    (isThanks
      ? `Thank your ${legTitleShort}`
      : `Ask your ${legTitleShort} to support the campaign!`);
  return <ContactLegModal txt={txt} leg={leg} scripts={scripts} isThanks={isThanks} />;
}
