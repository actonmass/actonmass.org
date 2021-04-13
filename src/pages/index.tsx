import React from "react";
import { graphql } from "gatsby";

import { BaseLayout } from "../layouts";

export default function Home({ data }) {
  return <BaseLayout>Placeholder for home page</BaseLayout>;
}

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        description
      }
    }
  }
`;
