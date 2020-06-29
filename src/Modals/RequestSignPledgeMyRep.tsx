import React from "react";
import ReactDOM from "react-dom";

import { Scripts, LegBase, enrichLeg } from "../types";
import getSessionLegs from "../FindMyReps/getSessionLegs";

import { RequestSignPledge } from "./RequestSignPledge";
import { evalScripts } from "./evalScripts";

import scrollTo from "../scrollTo";

type Props = {
  scripts: Scripts;
};

export function RequestSignPledgeMyRep({ scripts: rawScripts }: Props) {
  const legInfo = getSessionLegs();
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
  const leg = enrichLeg(legInfo.representative);
  const scripts = evalScripts(rawScripts, { leg });
  return <RequestSignPledge txt={txt} leg={leg} scripts={scripts} />;
}

function renderRequestSignPledgeMyRep(targetID: string, data: Props) {
  const targetEl = document.getElementById(targetID);
  ReactDOM.render(<RequestSignPledgeMyRep {...data} />, targetEl);
}

export default { renderRequestSignPledgeMyRep };
