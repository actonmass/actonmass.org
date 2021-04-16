import React from "react";
import { PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import HubspotForm from "react-hubspot-form";

import { BreadCrum } from "../../components";
import BaseLayout from "../BaseLayout";

import "./default.scss";

type PageContext = { title: string } & (
  | { html: string; body: undefined }
  | { body: any; html: undefined }
);

const CenteredBlock = ({ children }) => <div className="centered">{children}</div>;
const CenteredImage = ({ img, alt }) => (
  <p className="centered">
    <img src={img} alt={alt ?? ""} />
  </p>
);

const components = { CenteredBlock, HubspotForm, CenteredImage };

export default function DefaultPage({ pageContext }: PageProps<{}, PageContext>) {
  console.log(pageContext);
  return (
    <BaseLayout>
      <MDXProvider components={components}>
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
              <div
                className="w1000 content"
                dangerouslySetInnerHTML={{ __html: pageContext.html }}
              />
            )}
          </div>
        </main>
      </MDXProvider>
    </BaseLayout>
  );
}
