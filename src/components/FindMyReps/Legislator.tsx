import React from "react";
import _ from "lodash";
import { Link } from "gatsby";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faQuestionCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import { RequestSupportCampaign } from "../Modals/RequestSupportCampaign";
import { RequestSignPledge } from "../Modals/RequestSignPledge";
import { RequestCosponsorship } from "../Modals/RequestCosponsorship";

type Props = {
  leg: Queries.Legislator;
  chamber: "house" | "senate";
  bill?: Queries.Bill;
  mode?: "pledge" | "campaign" | "bill";
};

export default function Legislator({ leg, chamber, bill, mode }: Props) {
  const legTitle = chamber === "house" ? "rep" : "senator";
  if (leg == null) {
    return <UnkonwnLeg legTitle={legTitle} />;
  }
  const sponsored = bill != null && _.map(bill.co_sponsors, "id").includes(leg.aom_id);

  const getStatus = () => {
    switch (mode) {
      case "bill":
        return {
          status: bill.no_sponsorship_data ? null : sponsored,
          txt: sponsored ? "Co-sponsored the bill" : "Did not co-sponsored the bill",
        };
      case "pledge":
        return {
          status: leg.pledge,
          txt: leg.pledge ? "Signed the pledge" : "Did not sign the pledge",
        };
      default:
      case "campaign":
        if (chamber === "house") {
          return {
            status: leg.supports_the_campaign,
            txt: leg.supports_the_campaign
              ? "Supports the campaign"
              : "Does not support the campaign",
          };
        }
        return { status: null };
    }
  };

  const { status, txt: statusText } = getStatus();
  const icon = status ? faCheckCircle : faTimesCircle;

  return (
    <div>
      <Link to={leg.href} className="legislator">
        <h3 className="fUppercase fRegular">Your {legTitle}:</h3>
        <LegCircle leg={leg} status={status} />
        <p className="fRoboto fLight">{leg.district.name}</p>
        {status != null && (
          <p className="fUppercase">
            <FontAwesomeIcon icon={icon} />
            {statusText}
          </p>
        )}
      </Link>
      {status != null && (
        <div className="cbox btn-container">
          {bill == null ? (
            mode === "pledge" ? (
              <RequestSignPledge leg={leg} />
            ) : (
              <RequestSupportCampaign leg={leg} />
            )
          ) : (
            <RequestCosponsorship leg={leg} bill={bill} />
          )}
        </div>
      )}
    </div>
  );
}

function LegCircle({ leg, status }) {
  const getStatusClass = () => {
    if (status == null) {
      return "";
    }
    return status ? "ok" : "ko";
  };

  const getStatusIcon = () => {
    if (status == null) {
      return null;
    }
    return status ? (
      <img className="leg_circ_check" src="/img/green_check.png" alt="green check" />
    ) : (
      <img className="leg_circ_x" src="/img/red_x.png" alt="red x" />
    );
  };

  const statusClass = getStatusClass();
  const icon = getStatusIcon();

  return (
    <div className="leg_circ XL">
      <div className="cbox">
        <div className="image-with-check">
          <div className={`leg_circ_img ${statusClass}`}>
            <img src={leg.img ?? "/img/person-icon.png"} alt={getFullName(leg)} />
          </div>
          {icon}
        </div>
      </div>
      <h4 className="fRoboto fBold">
        {getFullName(leg)} {leg.party && `(${leg.party})`}
      </h4>
    </div>
  );
}

function UnkonwnLeg({ legTitle }) {
  return (
    <div className="legislator">
      <h3 className="fUppercase fRegular">Your {legTitle}:</h3>
      <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: "17rem" }} />
      <p style={{ maxWidth: "30rem", marginTop: "2rem" }}>
        We were not able to identify your {legTitle}. The seat may be vacant, or maybe there was a
        special election and your legislator has not been sworn it yet. If you know who is your{" "}
        {legTitle}, please contact tech@actonmass.org and we'll fix this asap!
      </p>
    </div>
  );
}

function getFullName(leg) {
  return `${leg.first_name} ${leg.last_name}`;
}
