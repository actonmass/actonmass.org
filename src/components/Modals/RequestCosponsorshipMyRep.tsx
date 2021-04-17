import React from "react";
import _ from "lodash";

import useSessionLegs from "../FindMyReps/useSessionLegs";

import { RequestCosponsorship } from "./RequestCosponsorship";

type Props = {
  bill: GatsbyTypes.Bill;
};

export function RequestCosponsorshipMyRep({ bill }: Props) {
  const legInfo = useSessionLegs();
  if (
    legInfo == null ||
    legInfo.representative == null ||
    _.map(bill.co_sponsors, "id").includes(legInfo.representative.aom_id)
  ) {
    return null;
  }
  return <RequestCosponsorship leg={legInfo.representative} bill={bill} />;
}
