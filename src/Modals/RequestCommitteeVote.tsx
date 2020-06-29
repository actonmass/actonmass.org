import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import { Bill, Scripts, Committee, LegBase, enrichLeg } from "../types";
import useSessionLegs from "../FindMyReps/useSessionLegs";

import { ContactLegModal } from "./ContactLegModal";
import { evalScripts } from "./evalScripts";

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

function RequestCommitteeVote({ bill, committee, scripts: defaultRawScripts }: Props) {
  const legInfo = useSessionLegs();
  if (legInfo == null) {
    return null;
  }
  const rawScripts = _.merge({}, defaultRawScripts, bill.scripts_com_vote);
  const { senator, representative } = _.mapValues(legInfo, enrichLeg);
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

function renderRequestCommitteeVote(targetID: string, data: Props) {
  const targetEl = document.getElementById(targetID);
  ReactDOM.render(<RequestCommitteeVote {...data} />, targetEl);
}

export default { renderRequestCommitteeVote };
