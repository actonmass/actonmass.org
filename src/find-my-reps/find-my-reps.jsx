import React, { useState } from "react";
import { render } from "react-dom";
import findReps from "./findReps";
import { findRepsMock } from "./findReps";

export default { renderFindMyReps };

function renderFindMyReps(targetID, data) {
  const targetEl = document.getElementById(targetID);
  render(<FindMyReps onQueryReps={findRepsMock} {...data} />, targetEl);
}

function FindMyReps({ onQueryReps, legislatorsInfo, title, text, theme }) {
  const sessionQuery = JSON.parse(window.sessionStorage.getItem("repQuery"));
  const [query, setQuery] = useState(sessionQuery !== null ? sessionQuery.query : null);
  const [repInfo, setRepInfo] = useState(sessionQuery !== null ? sessionQuery.repInfo : null);
  const [error, setError] = useState(false);

  const clearQuery = () => {
    window.sessionStorage.removeItem("repQuery");
    setQuery(null);
    setRepInfo(null);
  };

  function handleQueryReps(newQuery) {
    setQuery(newQuery);
    setError(false);
    onQueryReps(newQuery)
      .then((repInfo) => {
        setRepInfo(repInfo);
        persistQueryResults(newQuery, repInfo);
        setError(false);
        scrollTo("leg-search-results");
      })
      .catch((err) => {
        console.error("Query failed:", newQuery);
        clearQuery();
        setError(true);
      });
  }

  return (
    <>
      <Form title={title} text={text} onSubmit={handleQueryReps} theme={theme} />
      <Results legInfo={repInfo} legislatorsInfo={legislatorsInfo} />
    </>
  );
}

function Form({ title, text, onSubmit, theme }) {
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ city, streetAddress });
  };

  return (
    <section className={`${theme || ""} cbox leg-search`}>
      <div className="w1400">
        <div className="legislator-search">
          {title && <h1 className="fRaleway fExbold">{title}</h1>}
          {text && <h3 className="text fRaleway fExbold">{text}</h3>}
          <form className="form-block" onSubmit={handleSubmit}>
            <div className="entry_2">
              <label className="search_text fRoboto fLight" htmlFor="address">
                Street Address
              </label>
              <input
                className="search_rect"
                type="text"
                id="address"
                name="address"
                value={streetAddress}
                onChange={(e) => {
                  setStreetAddress(e.target.value);
                }}
              />
            </div>
            <div className="entry_3">
              <label className="search_text fRoboto fLight" htmlFor="city">
                City
              </label>
              <input
                className="search_rect"
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <div className="cbox btn-container">
              <input type="submit" className="btn btn_search" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Results({ legInfo, legislatorsInfo }) {
  const rep = legInfo && legislatorsInfo[legInfo.representative];
  const senator = legInfo && legislatorsInfo[legInfo.senator];

  return (
    <section className="results-container cbox">
      <div className="w1400">
        <div className="results">
          <h2 className="fRaleway fUppercase fRegular" id="leg-search-results">
            Your legislators
          </h2>
          {legInfo ? (
            <div className="legislators">
              <Legislator leg={rep} chamber="House" />
              <Legislator leg={senator} chamber="Senate" />
            </div>
          ) : (
            <EmptyResults />
          )}
        </div>
      </div>
    </section>
  );
}

function EmptyResults() {
  return (
    <div className="empty_state_container">
      <div className="empty_state">
        <i className="fas empt_st fa-search-location fa-10x"></i>
        <h4 className="fRaleway fUppercase">no results</h4>
        <p className="fRaleway">
          Enter your address above to <br />
          see your legislators
        </p>
      </div>
    </div>
  );
}

function Legislator({ leg, chamber }) {
  const imgClass = leg.pledge ? "" : "red-x";
  const legTitle = chamber === "House" ? "rep" : "senator";
  const legTitleShort = chamber === "House" ? "rep" : "sen.";
  const iconClass = leg.pledge ? "fas fa-check-circle fa-2x" : "fas fa-times-circle fa-2x";

  return (
    <a href={leg.href} className="legislator">
      <h3 className="fUppercase fRegular">Your {legTitle}:</h3>
      <LegCircle leg={leg} />
      <p className="fRoboto fLight">{leg.district}</p>
      <p className="fUppercase">
        <i className={iconClass}></i>
        {leg.pledge ? "Signed the pledge" : "Did not sign the pledge"}
      </p>
      <div className="cbox btn-container">
        <input
          type="submit"
          className="btn"
          value={leg.pledge ? `Thank your ${legTitleShort}` : `Tell your ${legTitleShort} to sign!`}
        />
      </div>
    </a>
  );
}

function LegCircle({ leg }) {
  const status = leg.pledge ? "ok" : "ko";
  const icon = leg.pledge ? (
    <img className="leg_circ_check" src="/img/green_check.png" alt="green check" />
  ) : (
    <img className="leg_circ_x" src="/img/red_x.png" alt="red x" />
  );

  return (
    <div className="leg_circ XL">
      <div className="cbox">
        <div className="image-with-check">
          <div className={`leg_circ_img ${status}`}>
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

function getFullName(leg) {
  return `${leg.first_name} ${leg.last_name}`;
}

function getPartyIcon(party) {
  switch (party) {
    case "D":
      return "fas fa-democrat fa-4x";
    case "R":
      return "fas fa-republican fa-4x";
    default:
      return "";
  }
}

function scrollTo(hashName) {
  document.getElementById(hashName).scrollIntoView({ behavior: "smooth" });
}

function persistQueryResults(query, repInfo) {
  window.sessionStorage.setItem(
    "repQuery",
    JSON.stringify({
      query,
      repInfo,
    })
  );
}
