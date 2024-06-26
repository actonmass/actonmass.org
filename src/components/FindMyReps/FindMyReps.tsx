import _ from "lodash";
import React, { useState } from "react";

import scrollTo from "../../utils/scrollTo";
import useAllCurrentLegislators from "../useAllCurrentLegislators";

import findReps, { Query, QueryResult } from "./findReps";
import LoadingSpinner from "./LoadingSpinner";
import Results from "./Results";
import useSessionLegs from "./useSessionLegs";
import LegDropdown from "./LegDropdown";
import "./legislator-search.scss";

export type Props = {
  title?: string;
  text?: string;
  theme?: string;
  allowSelect?: boolean;
  showResultIfEmpty?: boolean;
  bill?: Queries.Bill;
  mode?: "pledge" | "campaign" | "bill";
  width?: string;
  hideSenator?: boolean;
};

const isBrowser = typeof window != "undefined" && window != null;

export default function FindMyReps({
  title,
  text,
  theme,
  bill,
  showResultIfEmpty,
  mode,
  allowSelect,
  width,
  hideSenator,
}: Props) {
  const repInfo = useSessionLegs();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const clearQuery = () => {
    window.sessionStorage.removeItem("repQuery");
  };

  function handleQueryReps(newQuery) {
    setLoading(true);
    setError(null);
    findReps(newQuery)
      .then((repInfo) => {
        dispatchResults(repInfo);
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
    <div id="find-my-reps">
      <Form
        title={title}
        text={text}
        onSubmit={handleQueryReps}
        theme={theme}
        loading={loading}
        allowSelect={allowSelect}
        width={width}
      />
      <Results
        legInfo={repInfo}
        bill={bill}
        theme={theme}
        showResultIfEmpty={showResultIfEmpty}
        error={error}
        mode={mode}
        width={width}
        hideSenator={hideSenator}
      />
    </div>
  );
}

type FormProps = Pick<Props, "title" | "text" | "theme" | "allowSelect" | "width"> & {
  loading: boolean;
  onSubmit: (query: Query) => void;
};

function Form({ title, text, onSubmit, theme, loading, allowSelect, width }: FormProps) {
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const legislators = useAllCurrentLegislators();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city === "" && streetAddress === "") {
      return null;
    }
    onSubmit({ city, streetAddress });
  };

  const titleToDisplay = title ?? (_.isEmpty(text) ? "legislator search" : "");
  const w = width === "1200" ? "w1200" : width === "1000" ? "w1000" : "w1400";

  return (
    <section className={`${theme || ""} cbox leg-search`} id="leg-search">
      <div className={w}>
        <div className="legislator-search">
          {titleToDisplay && <h1 className="fRaleway fExbold">{titleToDisplay}</h1>}
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
            {allowSelect && (
              <>
                Or search a legislator by name:
                <LegDropdown legislators={legislators} />
              </>
            )}
            <div className="cbox btn-container">
              <a className="btn btn_search cbox" onClick={handleSubmit}>
                <div className="hbox vcenter">
                  <span>Submit</span>
                  {loading && (
                    <span style={{ marginLeft: "1rem" }}>
                      <LoadingSpinner />
                    </span>
                  )}
                </div>
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

function dispatchResults(results: QueryResult) {
  const event = new CustomEvent<QueryResult>("leg-search-results", {
    detail: results,
  });
  document.dispatchEvent(event);
}
