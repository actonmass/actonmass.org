import React from "react";
import _ from "lodash";
import { graphql } from "gatsby";

import NewsPageComponent from "../layouts/pages/NewsPage";

export default function IssuePage({ data }) {
  return <NewsPageComponent articles={data.allNews.nodes} />;
}

export const query = graphql`
  query {
    allNews(sort: { fields: [date], order: DESC }) {
      nodes {
        title
        author
        date
        href
        category
        extract
      }
    }
  }
`;
