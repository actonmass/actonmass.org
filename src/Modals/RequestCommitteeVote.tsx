import React from "react";
import ReactDOM from "react-dom";

import { Bill, Scripts, Committee, LegBase } from "../types";
import getSessionLegs from "../FindMyReps/getSessionLegs";

import { ContactLegModal } from "./ContactLegModal";

type Props = {
  bill: Bill;
  scripts: Scripts;
  committee: Committee;
};

function isOnCommittee(committee: Committee, leg: LegBase | null | undefined) {
  if (leg == null) {
    return false;
  }
  const legId = leg.aom_id;
  return [
    committee.house_chair,
    committee.house_vice_chair,
    committee.senate_chair,
    committee.senate_vice_chair,
    ...(committee.senate_members ?? []),
    ...(committee.house_members ?? []),
  ].includes(legId);
}

function RequestCommitteeVote({ bill, committee, scripts }: Props) {
  const legInfo = getSessionLegs();
  if (legInfo == null) {
    return null;
  }
  const { senator, representative } = legInfo;
  return (
    <div className="hbox" style={{ justifyContent: "space-evenly" }}>
      {isOnCommittee(committee, senator) && (
        <ContactLegModal txt={`Tell your senator to hold a vote`} leg={senator!} bill={bill} scripts={scripts} />
      )}
      {isOnCommittee(committee, representative) && (
        <ContactLegModal txt={`Tell your rep to hold a vote`} leg={representative!} bill={bill} scripts={scripts} />
      )}
    </div>
  );
}

function renderRequestCommitteeVote(targetID: string, data: Props) {
  const targetEl = document.getElementById(targetID);
  ReactDOM.render(<RequestCommitteeVote {...data} />, targetEl);
}

export default { renderRequestCommitteeVote };
