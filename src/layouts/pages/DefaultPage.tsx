import React from "react";
import { PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import { BreadCrum } from "../../components";
import BaseLayout from "../BaseLayout";

import "./default.scss";

type PageContext = { title: string } & (
  | { html: string; body: undefined }
  | { body: any; html: undefined }
);

export default function DefaultPage({ pageContext }: PageProps<{}, PageContext>) {
  return (
    <BaseLayout title={pageContext.title}>
      <main className="default-page cbox light-blue">
        <div className="w1400">
          <BreadCrum title={pageContext.title} links={[]} />
        </div>
        <div className="w1200 cbox">
          {pageContext.body != null ? (
            <div className="w1000 content">
              <MDXRenderer>{pageContext.body}</MDXRenderer>
            </div>
          ) : (
            <div className="w1000 content" dangerouslySetInnerHTML={{ __html: pageContext.html }} />
          )}
        </div>
      </main>
    </BaseLayout>
  );
}
