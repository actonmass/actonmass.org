import React from "react";

import useSessionLegs from "../FindMyReps/useSessionLegs";
import scrollTo from "../../utils/scrollTo";
import { pledge_scripts } from "../../content";

import { RequestSignPledge } from "./RequestSignPledge";

export function RequestSignPledgeMyRep() {
  const legInfo = useSessionLegs();
  const txt = "Ask your rep to sign";

  if (legInfo == null) {
    return (
      <div>
        <a className="btn" onClick={() => scrollTo("leg-search")}>
          {txt}
        </a>
      </div>
    );
  }
  if (legInfo.representative == null || legInfo.representative.pledge) {
    return null;
  }
  return <RequestSignPledge txt={txt} leg={legInfo.representative} scripts={pledge_scripts} />;
}
