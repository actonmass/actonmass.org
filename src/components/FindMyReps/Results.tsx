import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faSearchLocation } from "@fortawesome/free-solid-svg-icons";

import { QueryResult } from "./findReps";
import Legislator from "./Legislator";
import { Props as FindMyRepsProps } from "./FindMyReps";

type Props = Pick<FindMyRepsProps, "bill" | "theme" | "showResultIfEmpty" | "scripts" | "mode"> & {
  legInfo: QueryResult | null;
  error: string | null;
};

export default function Results({
  legInfo,
  bill,
  theme,
  showResultIfEmpty,
  error,
  scripts,
  mode,
}: Props) {
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
            <LegResults legInfo={legInfo} bill={bill} scripts={scripts} mode={mode} />
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

function LegResults({
  legInfo,
  bill,
  scripts,
  mode,
}: Pick<Props, "bill" | "scripts" | "mode"> & { legInfo: QueryResult }) {
  const rep = legInfo.representative && {
    chamber: "house" as const,
    title: "rep",
    ...legInfo.representative,
  };
  const senator = legInfo.senator && {
    chamber: "senate" as const,
    title: "sen",
    ...legInfo.senator,
  };
  return (
    <div className="legislators">
      <Legislator leg={rep} bill={bill} scripts={scripts} mode={mode} chamber="house" />
      <Legislator leg={senator} bill={bill} scripts={scripts} mode={mode} chamber="senate" />
    </div>
  );
}

function EmptyResults() {
  return (
    <div className="empty_state_container">
      <div className="empty_state">
        <FontAwesomeIcon icon={faSearchLocation} size="10x" className="empt_st" />
        <h4 className="fRaleway fUppercase">no results</h4>
        <p className="fRaleway">
          Enter your address above to <br />
          see your legislators
        </p>
      </div>
    </div>
  );
}

type ErrorResultsProps = {
  errorCode: string;
};

function ErrorResults({ errorCode }: ErrorResultsProps) {
  const messages = {
    couldNotLocateAddressInMa: "We were not able to locate your address in Massachusetts.",
    unexpectedError:
      "Something unexpected happened. If the issue persists, please let tech@actonmass.org know!",
  };
  return (
    <div className="empty_state_container">
      <div className="empty_state">
        <FontAwesomeIcon icon={faExclamationCircle} size="10x" className="empt_st" />
        <h4 className="fRaleway fUppercase">Error</h4>
        <p className="fRaleway">{messages[errorCode]}</p>
      </div>
    </div>
  );
}
