import React from "react";

import { enrichLeg } from "../../types";
import { pledge_scripts } from "../../content";

import { ContactLegModal } from "./ContactLegModal";
import { evalScripts } from "./evalScripts";

type Props = {
  leg: Queries.Legislator;
  txt?: string;
};

export function RequestSignPledge({ leg: legBase, txt: customTxt }: Props) {
  const leg = enrichLeg(legBase);
  const isThanks = leg.pledge;
  const scripts = evalScripts(pledge_scripts, { leg });
  const legTitleShort = leg.chamber === "house" ? "rep" : "sen.";
  const txt =
    customTxt ?? (isThanks ? `Thank your ${legTitleShort}` : `Tell your ${legTitleShort} to sign!`);
  return <ContactLegModal txt={txt} leg={leg} scripts={scripts} isThanks={isThanks} />;
}
