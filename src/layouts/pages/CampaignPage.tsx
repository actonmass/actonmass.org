import React, { useMemo } from "react";
import { PageProps, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import BaseLayout from "../BaseLayout";
import LegislatorSearch from "../../components/FindMyReps";
import LegCircle from "../../components/LegCircle";

import "./base.scss";

type PageContext = { title: string } & (
  | { html: string; body: undefined }
  | { body: any; html: undefined }
);

type Data = {
  allLegislator: { nodes: GatsbyTypes.Legislator[] };
};

export default function CampaignPage({ pageContext, data }: PageProps<Data, PageContext>) {
  const components = useMemo(
    () => ({
      LegislatorSearch,
      SupportingReps: () => <SupporterList reps={data.allLegislator.nodes} />,
    }),
    []
  );
  return (
    <BaseLayout title={pageContext.title}>
      <main className="base_page">
        <MDXProvider components={components}>
          <MDXRenderer
            scope={{
              legs: data.allLegislator.nodes[0].last_name,
            }}
          >
            {pageContext.body}
          </MDXRenderer>
        </MDXProvider>
        ;
      </main>
    </BaseLayout>
  );
}

const SupporterList = ({ reps }) => (
  <div className="leg-grid">
    {reps.map((rep) => {
      const commitments = [
        rep.supports_the_campaign_committee_votes && "1",
        rep.supports_the_campaign_public_bills && "2",
        rep.supports_the_campaign_term_limits && "3",
      ].filter((i) => i);
      const msg = `Amendment${commitments.length > 1 ? "s" : ""} ${commitments.join(", ")}`;
      return <LegCircle key={rep.href} rep={rep} status="ok" size="XS" msg={msg} />;
    })}
  </div>
);

export const query = graphql`
  {
    allLegislator(sort: { fields: last_name }, filter: { supports_the_campaign: { eq: true } }) {
      nodes {
        href
        first_name
        last_name
        party
        square_picture
        supports_the_campaign_public_bills
        supports_the_campaign_term_limits
        supports_the_campaign_committee_votes
        district {
          name
        }
      }
    }
  }
`;
