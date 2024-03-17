import React from "react";
import { PageProps, graphql } from "gatsby";

import { BreadCrum } from "../../components";
import BaseLayout from "../BaseLayout";

import "./default.scss";

type Data = {
  page: {
    title: string;
    parent: { body: any };
  };
};

export default function DefaultPage({ data, children }: PageProps<Data>) {
  const page = data.page;
  return (
    <BaseLayout title={page.title}>
      <main className="default-page cbox light-blue">
        <div className="w1400">
          <BreadCrum title={page.title} links={[]} />
        </div>
        <div className="w1200 cbox">
          <div className="w1000 content">{children}</div>
        </div>
      </main>
    </BaseLayout>
  );
}

export const query = graphql`
  query ($id: String) {
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
