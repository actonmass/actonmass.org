import React from "react";
import { PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import BaseLayout from "../BaseLayout";

import "./base.scss";

type PageContext = { title: string } & (
  | { html: string; body: undefined }
  | { body: any; html: undefined }
);

export default function DefaultPage({ pageContext }: PageProps<{}, PageContext>) {
  return (
    <BaseLayout title={pageContext.title}>
      <main className="base_page">
        <MDXRenderer>{pageContext.body}</MDXRenderer>
      </main>
    </BaseLayout>
  );
}
