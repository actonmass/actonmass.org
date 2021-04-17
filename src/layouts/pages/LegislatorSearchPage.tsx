import React from "react";
import { graphql, PageProps } from "gatsby";

import BaseLayout from "../BaseLayout";
import { BreadCrum, FindMyReps } from "../../components";

import "./legislator-search.scss";

type DataProps = {
  page: { title: string };
};

export default function LegislatorSearchPage({ data }: PageProps<DataProps>) {
  return (
    <BaseLayout>
      <div className="search-page">
        <section className="breadcrum dark cbox">
          <div className="w1400">
            <BreadCrum title={data.page.title} />
          </div>
        </section>
        <FindMyReps theme="dark" showResultsIfEmpty={true} mode="campaign" />
      </div>
    </BaseLayout>
  );
}

export const query = graphql`
  query {
    page(id: { eq: "/legislator-search/" }) {
      title
    }
  }
`;
