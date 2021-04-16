import React from "react";
import _ from "lodash";
import { graphql, PageProps } from "gatsby";

import { LegislatorPage as LegislatorPageComponent } from "../../layouts";

type QueryProps = {
  legislator: GatsbyTypes.Legislator;
  allIssue: { nodes: GatsbyTypes.Issue[] };
};

export default function LegislatorPage({ data }: PageProps<QueryProps>) {
  return <LegislatorPageComponent leg={data.legislator} issues={data.allIssue.nodes} />;
}

export const query = graphql`
  query($id: String) {
    legislator(id: { eq: $id }) {
      last_name
      first_name
      chamber
      party
      email
      facebook
      twitter
      website
      phone
      square_picture
      pledge
      supports_the_campaign
      committees {
        role
        committee {
          title
        }
      }
      cosponsored_bills {
        id
      }
    }

    allIssue(sort: { fields: order }) {
      nodes {
        title
        bills {
          id
          href
          title
        }
      }
    }
  }
`;
