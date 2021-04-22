import React from "react";
import { PageProps, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import BaseLayout from "../BaseLayout";

import "./base.scss";

type Data = {
  page: {
    title: string;
    parent: { body: any };
  };
};

export default function BasePage({ data }: PageProps<Data>) {
  const page = data.page;
  return (
    <BaseLayout title={page.title}>
      <main className="base_page">
        <MDXRenderer>{page.parent.body}</MDXRenderer>
      </main>
    </BaseLayout>
  );
}

export const query = graphql`
  query($id: String) {
    page(id: { eq: $id }) {
      title
      parent {
        ... on Mdx {
          body
        }
      }
    }
  }
`;
