import React, { useState } from "react";

export default function Legislator({ leg, chamber, mode }) {
  const legTitle = chamber === "House" ? "rep" : "senator";
  const legTitleShort = chamber === "House" ? "rep" : "sen.";

  if (leg == null) {
    return <UnkonwnLeg legTitle={legTitle} />;
  }

  const statusText = () => {
    if (mode === "pledge") {
      return leg.pledge ? "Signed the pledge" : "Did not sign the pledge";
    }
    return leg.sponsored ? "Co-sponsored the bill" : "Did not co-sponsored the bill";
  };

  const status = mode === "pledge" ? leg.pledge : leg.sponsored;
  const action =
    mode === "pledge" ? `Tell your ${legTitleShort} to sign!` : `Tell your ${legTitleShort} to co-sponsor!`;
  const imgClass = status ? "" : "red-x";
  const iconClass = status ? "fas fa-check-circle fa-2x" : "fas fa-times-circle fa-2x";

  return (
    <div>
      <a href={leg.href} className="legislator">
        <h3 className="fUppercase fRegular">Your {legTitle}:</h3>
        <LegCircle leg={leg} status={status} />
        <p className="fRoboto fLight">{leg.district}</p>
        <p className="fUppercase">
          <i className={iconClass}></i>
          {statusText()}
        </p>
      </a>
      <div className="cbox btn-container">
        <a className="btn">{status ? `Thank your ${legTitleShort}` : action}</a>
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
        We were not able to identify your {legTitle}. The seat may be vacant, or maybe we're just not up to date with
        the latest special election. If you know who is your {legTitle}, please contact tech@actonmass.org and we'll fix
        this asap!
      </p>
    </div>
  );
}

function getFullName(leg) {
  return `${leg.first_name} ${leg.last_name}`;
}
