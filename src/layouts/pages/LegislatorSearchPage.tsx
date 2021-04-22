import React from "react";
import { graphql, PageProps } from "gatsby";

import BaseLayout from "../BaseLayout";
import { BreadCrum, FindMyReps } from "../../components";

import "./legislator-search.scss";

type Data = {
  page: { title: string };
};

export default function LegislatorSearchPage({ data }: PageProps<Data>) {
  return (
    <BaseLayout title={data.page.title}>
      <div className="search-page">
        <section className="breadcrum dark cbox">
          <div className="w1400">
            <BreadCrum title={data.page.title} />
          </div>
        </section>
        <FindMyReps theme="dark" showResultsIfEmpty={true} mode="campaign" allowSelect={true} />
      </div>
    </BaseLayout>
  );
}

export const query = graphql`
  query($id: String) {
    page(id: { eq: $id }) {
      title
    }
  }
`;
