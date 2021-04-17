import React from "react";
import { graphql, PageProps } from "gatsby";

import BaseLayout from "../BaseLayout";
import { BreadCrum, FindMyReps } from "../../components";

import "./legislator-search.scss";

export default function LegislatorSearchPage({ pageContext }: PageProps<{}, { title?: string }>) {
  return (
    <BaseLayout title={pageContext.title}>
      <div className="search-page">
        <section className="breadcrum dark cbox">
          <div className="w1400">
            <BreadCrum title={pageContext.title} />
          </div>
        </section>
        <FindMyReps theme="dark" showResultsIfEmpty={true} mode="campaign" allowSelect={true} />
      </div>
    </BaseLayout>
  );
}
