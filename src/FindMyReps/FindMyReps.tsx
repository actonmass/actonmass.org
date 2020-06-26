import React, { useState } from "react";
import ReactDOM from "react-dom";

import { findReps } from "./findReps";
import LoadingSpinner from "./LoadingSpinner";
import Legislator from "./Legislator.tsx";

import { Leg } from "../types";

type Props = {
  legislatorsInfo: { [ocdId: string]: Leg };
  title: string;
  text?: string;
  theme?: string;
  mode: "bill" | "pledge";
  showResultIfEmpty: boolean;
};

type InnerProps = Props & {
  onQueryReps: Function;
};

function FindMyReps({ onQueryReps, legislatorsInfo, title, text, theme, mode, showResultIfEmpty }: InnerProps) {
  const sessionQuery = JSON.parse(window.sessionStorage.getItem("repQuery"));
  const [query, setQuery] = useState(sessionQuery !== null ? sessionQuery.query : null);
  const [repInfo, setRepInfo] = useState(sessionQuery !== null ? sessionQuery.repInfo : null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const clearQuery = () => {
    window.sessionStorage.removeItem("repQuery");
    setQuery(null);
    setRepInfo(null);
  };

  function handleQueryReps(newQuery) {
    setLoading(true);
    setQuery(newQuery);
    setError(null);
    onQueryReps(newQuery)
      .then((repInfo) => {
        setRepInfo(repInfo);
        persistQueryResults(newQuery, repInfo);
      })
      .catch((err) => {
        setError(err.response.data.errorCode);
        clearQuery();
      })
      .finally(() => {
        scrollTo("leg-search-results");
        setLoading(false);
      });
  }

  return (
    <>
      <Form title={title} text={text} onSubmit={handleQueryReps} theme={theme} loading={loading} />
      <Results
        legInfo={repInfo}
        legislatorsInfo={legislatorsInfo}
        mode={mode}
        theme={theme}
        showResultIfEmpty={showResultIfEmpty}
        error={error}
      />
    </>
  );
}

type FormProps = Pick<Props, "title" | "text" | "theme"> & {
  loading: boolean;
  onSubmit: Function;
};

function Form({ title, text, onSubmit, theme, loading }: FormProps) {
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city === "" && streetAddress === "") {
      return null;
    }
    onSubmit({ city, streetAddress });
  };

  return (
    <section className={`${theme || ""} cbox leg-search`}>
      <div className="w1400">
        <div className="legislator-search">
          {title && <h1 className="fRaleway fExbold">{title}</h1>}
          {text && <h3 className="text fRaleway fExbold">{text}</h3>}
          <form className="form-block">
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
              <a className="btn btn_search" onClick={handleSubmit}>
                <span className="hbox centered">
                  <span>Submit</span>
                  {loading && <LoadingSpinner />}
                </span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Results({ legInfo, legislatorsInfo, mode, theme, showResultIfEmpty, error }) {
  const rep = {
    chamber: "house",
    ...(legInfo && legislatorsInfo[legInfo.representative]),
  };
  const senator = {
    chamber: "senate",
    ...(legInfo && legislatorsInfo[legInfo.senator]),
  };
  if (!legInfo && !error && !showResultIfEmpty) {
    return null;
  }
  return (
    <section className={`results-container cbox ${theme !== "dark" ? "light-blue" : ""}`}>
      <div className="w1400">
        <div className="results">
          <h2 className="fRaleway fUppercase fRegular" id="leg-search-results">
            Your legislators
          </h2>
          {legInfo ? (
            <div className="legislators">
              <Legislator leg={rep} mode={mode} chamber="House" />
              <Legislator leg={senator} mode={mode} chamber="Senate" />
            </div>
          ) : error ? (
            <ErrorResults errorCode={error} />
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

function ErrorResults({ errorCode }) {
  const messages = {
    couldNotLocateAddressInMa: "We were not able to locate your address in Massachusetts.",
    unexpectedError: "Something unexpected happened. If the issue persists, please let tech@actonmass.org know!",
  };
  return (
    <div className="empty_state_container">
      <div className="empty_state">
        <i className="fas empt_st fa-exclamation-circle fa-10x"></i>
        <h4 className="fRaleway fUppercase">Error</h4>
        <p className="fRaleway">{messages[errorCode]}</p>
      </div>
    </div>
  );
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

function renderFindMyReps(targetID: string, data: Props) {
  const targetEl = document.getElementById(targetID);
  ReactDOM.render(<FindMyReps onQueryReps={findReps} {...data} />, targetEl);
}

export default { renderFindMyReps };
