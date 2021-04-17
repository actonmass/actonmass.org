import React from "react";
import _ from "lodash";

import { enrichLeg } from "../../types";

import { ContactLegModal } from "./ContactLegModal";
import { evalScripts, merge } from "./evalScripts";
import { default_bill_scripts } from "../../content";

type Props = {
  leg: GatsbyTypes.Legislator;
  bill: GatsbyTypes.Bill;
  style?: string;
  txt?: string;
};

export function RequestCosponsorship({ leg: legBase, bill, style, txt: customTxt }: Props) {
  const leg = enrichLeg(legBase);
  const isThanks = (_.map(bill.co_sponsors, "id") ?? []).includes(leg.aom_id);
  const rawScripts = merge(default_bill_scripts, bill.scripts);
  const scripts = evalScripts(rawScripts, { leg, bill });
  const legTitleShort = leg.chamber === "house" ? "rep" : "sen.";
  const txt =
    customTxt ??
    (isThanks ? `Thank your ${legTitleShort}` : `Tell your ${legTitleShort} to co-sponsor!`);
  return (
    <ContactLegModal txt={txt} leg={leg} scripts={scripts} isThanks={isThanks} style={style} />
  );
}
