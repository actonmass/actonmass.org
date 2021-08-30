import React from "react";
import _ from "lodash";
import { graphql, PageProps } from "gatsby";

import LegislatorPageComponent from "../../layouts/pages/LegislatorPage";

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
          twitter_bill_name
          senate_no
          house_no
          hidden
          no_sponsorship_data
          scripts {
            call_thanks
            call_request
            tweet_thanks
            tweet_request
            tweet_after_thanks_email
            tweet_after_thanks_call
            tweet_after_request_email
            tweet_after_request_call
            email_thanks {
              subject
              body
            }
            email_request {
              subject
              body
            }
          }
        }
      }
    }
  }
`;
