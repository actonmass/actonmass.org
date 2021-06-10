import React, { useMemo } from "react";
import { PageProps, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import BaseLayout from "../BaseLayout";
import LegislatorSearch from "../../components/FindMyReps";
import LegCircle from "../../components/LegCircle";

import "./base.scss";

type Data = {
  page: {
    title: string;
    parent: { body: any };
  };
  allLegislator: { nodes: GatsbyTypes.Legislator[] };
};

export default function CampaignPage({ data }: PageProps<Data>) {
  const page = data.page;
  const components = useMemo(
    () => ({
      LegislatorSearch,
      SupportingReps: () => <SupportingReps reps={data.allLegislator.nodes} />,
    }),
    []
  );
  return (
    <BaseLayout title={page.title}>
      <main className="base_page">
        <MDXProvider components={components}>
          <MDXRenderer
            scope={{
              legs: data.allLegislator.nodes[0].last_name,
            }}
          >
            {page.parent.body}
          </MDXRenderer>
        </MDXProvider>
      </main>
    </BaseLayout>
  );
}

const SupportingReps = ({ reps }) => (
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
  query($id: String) {
    page(id: { eq: $id }) {
      title
      parent {
        ... on Mdx {
          body
        }
      }
    }

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
