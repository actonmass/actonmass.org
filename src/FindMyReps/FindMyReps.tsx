import React, { useState } from "react";
import ReactDOM from "react-dom";

import findReps, { Query, QueryResult } from "./findReps";
import LoadingSpinner from "./LoadingSpinner";
import Results from "./Results";
import getSessionLegs from "./getSessionLegs";

import { LegBase as Leg, Bill, Scripts } from "../types";
import scrollTo from "../scrollTo";

export type Props = {
  title: string;
  text?: string;
  theme?: string;
  showResultIfEmpty: boolean;
  bill?: Bill;
  scripts: Scripts;
};

type InnerProps = Props & {
  onQueryReps: (query: Query) => Promise<QueryResult>;
};

function FindMyReps({ onQueryReps, title, text, theme, bill, showResultIfEmpty, scripts }: InnerProps) {
  const [repInfo, setRepInfo] = useState<QueryResult | null>(getSessionLegs());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const clearQuery = () => {
    window.sessionStorage.removeItem("repQuery");
    setRepInfo(null);
  };

  function handleQueryReps(newQuery) {
    setLoading(true);
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
        bill={bill}
        theme={theme}
        showResultIfEmpty={showResultIfEmpty}
        error={error}
        scripts={scripts}
      />
    </>
  );
}

type FormProps = Pick<Props, "title" | "text" | "theme"> & {
  loading: boolean;
  onSubmit: (query: Query) => void;
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
    <section className={`${theme || ""} cbox leg-search`} id="leg-search">
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
