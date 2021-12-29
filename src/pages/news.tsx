import React from "react";
import _ from "lodash";
import { graphql } from "gatsby";

export default function IssuePage({ data }) {
  return <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data.allNews.nodes)}</pre>;
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
