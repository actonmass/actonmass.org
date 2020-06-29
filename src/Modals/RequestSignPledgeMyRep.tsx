import React from "react";
import ReactDOM from "react-dom";

import { Scripts, LegBase, enrichLeg } from "../types";
import useSessionLegs from "../FindMyReps/useSessionLegs";

import { RequestSignPledge } from "./RequestSignPledge";

import scrollTo from "../scrollTo";

type Props = {
  scripts: Scripts;
};

export function RequestSignPledgeMyRep({ scripts }: Props) {
  const legInfo = useSessionLegs();
  const txt = "Ask your rep to sign";
  if (legInfo == null) {
    return (
      <a className="btn" onClick={() => scrollTo("leg-search")}>
        {txt}
      </a>
    );
  }
  if (legInfo.representative == null || legInfo.representative.pledge) {
    return null;
  }
  return <RequestSignPledge txt={txt} leg={legInfo.representative} scripts={scripts} />;
}

function renderRequestSignPledgeMyRep(targetID: string, data: Props) {
  const targetEl = document.getElementById(targetID);
  ReactDOM.render(<RequestSignPledgeMyRep {...data} />, targetEl);
}

export default { renderRequestSignPledgeMyRep };
