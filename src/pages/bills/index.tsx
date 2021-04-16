import React from "react";
import { graphql, PageProps } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";

import { BreadCrum } from "../../components";
import { BaseLayout } from "../../layouts";
import "../../styles/pages/bills.scss";

type QueryProps = {
  allIssue: { nodes: GatsbyTypes.Issue[] };
};

export default function BillsPage({ data }: PageProps<QueryProps>) {
  const issues = data.allIssue.nodes;
  return (
    <BaseLayout>
      <main className="bills-page">
        <section className="cbox headline">
          <div className="w1400">
            <BreadCrum title="Bills" links={[]} />
            <h1 className="fUppercase fBold">progressive bills</h1>
            <div className="list-bills">
              {issues.map((issue) => {
                if (_.isEmpty(issue.bills)) {
                  return null;
                }
                return (
                  <div className="issue hbox">
                    <div className="logo cbox desktop-only">
                      <div className="logo-inner cbox">
                        <FontAwesomeIcon icon={["fas", `${issue.logo}` as any]} />
                      </div>
                    </div>
                    <div className="content">
                      <div className="issue-title-wrapper">
                        <h2 className="issue-title">
                          <FontAwesomeIcon icon={["fas", `${issue.logo}` as any]} />
                          {issue.title}
                        </h2>
                      </div>
                      {issue.bills.map(
                        (bill) =>
                          !bill.hidden && (
                            <h4 className="bill fRoboto">
                              <a href={bill.id}>{bill.title}</a>
                            </h4>
                          )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </BaseLayout>
  );
}

export const query = graphql`
  query {
    allIssue(sort: { fields: order }) {
      nodes {
        title
        logo
        bills {
          id
          href
          title
          hidden
        }
      }
    }
  }
`;
