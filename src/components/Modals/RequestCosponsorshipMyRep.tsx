import React from "react";

import { Scripts, Bill } from "../../types";
import useSessionLegs from "../FindMyReps/useSessionLegs";

import { RequestCosponsorship } from "./RequestCosponsorship";

type Props = {
  scripts: Scripts;
  bill: Bill;
};

export function RequestCosponsorshipMyRep({ bill }: Props) {
  const legInfo = useSessionLegs();
  if (
    legInfo == null ||
    legInfo.representative == null ||
    (bill.co_sponsors ?? []).includes(legInfo.representative.aom_id)
  ) {
    return null;
  }
  return <RequestCosponsorship leg={legInfo.representative} bill={bill} />;
}
