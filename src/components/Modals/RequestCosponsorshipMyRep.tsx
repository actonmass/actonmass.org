import React from "react";
import ReactDOM from "react-dom";

import { Scripts, enrichLeg, Bill } from "../types";
import useSessionLegs from "../FindMyReps/useSessionLegs";

import { RequestCosponsorship } from "./RequestCosponsorship";

type Props = {
  scripts: Scripts;
  bill: Bill;
};

export function RequestCosponsorshipMyRep({ scripts, bill }: Props) {
  const legInfo = useSessionLegs();
  if (
    legInfo == null ||
    legInfo.representative == null ||
    (bill.co_sponsors ?? []).includes(legInfo.representative.aom_id)
  ) {
    return null;
  }
  return <RequestCosponsorship leg={legInfo.representative} bill={bill} scripts={scripts} />;
}

function renderRequestCosponsorshipMyRep(targetID: string, data: Props) {
  const targetEl = document.getElementById(targetID);
  ReactDOM.render(<RequestCosponsorshipMyRep {...data} />, targetEl);
}

export default { renderRequestCosponsorshipMyRep };
