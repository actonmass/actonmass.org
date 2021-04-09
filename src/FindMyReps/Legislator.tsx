import React, { useState } from "react";

import { RequestSupportCampaign } from "../Modals/RequestSupportCampaign";
import { RequestSignPledge } from "../Modals/RequestSignPledge";
import { RequestCosponsorship } from "../Modals/RequestCosponsorship";
import { Leg, Bill, Scripts } from "../types";

type Props = {
  leg: Leg | null | undefined;
  chamber: "house" | "senate";
  bill?: Bill;
  scripts: Scripts;
  mode?: "pledge" | "campaign" | "bill";
};

export default function Legislator({ leg, chamber, bill, scripts, mode }: Props) {
  const legTitle = chamber === "house" ? "rep" : "senator";
  if (leg == null) {
    return <UnkonwnLeg legTitle={legTitle} />;
  }
  const sponsored = bill != null && (bill.co_sponsors ?? []).includes(leg.aom_id);

  const getStatus = () => {
    switch (mode) {
      case "bill":
        return {
          status: sponsored,
          txt: sponsored ? "Co-sponsored the bill" : "Did not co-sponsored the bill",
        };
      case "pledge":
        return {
          status: leg.pledge,
          txt: leg.pledge ? "Signed the pledge" : "Did not sign the pledge",
        };
      default:
      case "campaign":
        return {
          status: leg.supports_the_campaign,
          txt: leg.supports_the_campaign
            ? "Supports the campaign"
            : "Does not support the campaign",
        };
    }
  };

  const { status, txt: statusText } = getStatus();
  const iconClass = status ? "fas fa-check-circle fa-2x" : "fas fa-times-circle fa-2x";

  return (
    <div>
      <a href={leg.href} className="legislator">
        <h3 className="fUppercase fRegular">Your {legTitle}:</h3>
        <LegCircle leg={leg} status={status} />
        <p className="fRoboto fLight">{leg.districtName}</p>
        <p className="fUppercase">
          <i className={iconClass}></i>
          {statusText}
        </p>
      </a>
      <div className="cbox btn-container">
        {bill == null ? (
          mode === "pledge" ? (
            <RequestSignPledge leg={leg} scripts={scripts} />
          ) : (
            <RequestSupportCampaign leg={leg} scripts={scripts} />
          )
        ) : (
          <RequestCosponsorship leg={leg} bill={bill} scripts={scripts} />
        )}
      </div>
    </div>
  );
}

function LegCircle({ leg, status }) {
  const statusClass = status ? "ok" : "ko";
  const icon = status ? (
    <img className="leg_circ_check" src="/img/green_check.png" alt="green check" />
  ) : (
    <img className="leg_circ_x" src="/img/red_x.png" alt="red x" />
  );

  return (
    <div className="leg_circ XL">
      <div className="cbox">
        <div className="image-with-check">
          <div className={`leg_circ_img ${statusClass}`}>
            <img src={leg.img} alt={getFullName(leg)} />
          </div>
          {icon}
        </div>
      </div>
      <h4 className="fRoboto fBold">
        {getFullName(leg)} ({leg.party})
      </h4>
    </div>
  );
}

function UnkonwnLeg({ legTitle }) {
  return (
    <div className="legislator">
      <h3 className="fUppercase fRegular">Your {legTitle}:</h3>
      <i className="fas fa-question-circle" style={{ fontSize: "17rem" }}></i>
      <p style={{ maxWidth: "30rem", marginTop: "2rem" }}>
        We were not able to identify your {legTitle}. The seat may be vacant, or maybe we're just
        not up to date with the latest special election. If you know who is your {legTitle}, please
        contact tech@actonmass.org and we'll fix this asap!
      </p>
    </div>
  );
}

function getFullName(leg) {
  return `${leg.first_name} ${leg.last_name}`;
}
