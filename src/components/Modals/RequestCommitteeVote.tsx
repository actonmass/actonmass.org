import React from "react";
import mapValues from "lodash/mapValues";
import _ from "lodash";

import { enrichLeg } from "../../types";
import useSessionLegs from "../FindMyReps/useSessionLegs";
import { default_bill_scripts_com_vote } from "../../content";

import { ContactLegModal } from "./ContactLegModal";
import { evalScripts, merge } from "./evalScripts";

type Props = {
  bill: GatsbyTypes.Bill;
};

function isOnCommittee(
  committee: GatsbyTypes.Committee,
  leg: GatsbyTypes.Legislator | null | undefined
) {
  if (leg == null) {
    return false;
  }
  const legId = leg.aom_id;
  return [
    committee.house_chair.id,
    committee.house_vice_chair.id,
    committee.senate_chair.id,
    committee.senate_vice_chair.id,
    ...(_.map(committee.senate_members, "id") ?? []),
    ...(_.map(committee.house_members, "id") ?? []),
  ].includes(legId);
}

export function RequestCommitteeVote({ bill }: Props) {
  const legInfo = useSessionLegs();
  if (legInfo == null) {
    return null;
  }
  const committee = bill.committee;
  const rawScripts = merge(default_bill_scripts_com_vote, bill.scripts_com_vote);
  const { senator, representative } = mapValues(legInfo, enrichLeg);
  return (
    <div className="hbox" style={{ justifyContent: "space-evenly" }}>
      {isOnCommittee(committee, senator) && (
        <ContactLegModal
          txt={`Tell your senator to hold a vote`}
          leg={senator!}
          scripts={evalScripts(rawScripts, { leg: senator!, bill, committee })}
        />
      )}
      {isOnCommittee(committee, representative) && (
        <ContactLegModal
          txt={`Tell your rep to hold a vote`}
          leg={representative!}
          scripts={evalScripts(rawScripts, { leg: representative!, bill, committee })}
        />
      )}
    </div>
  );
}
