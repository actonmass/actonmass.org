import React from "react";
import _ from "lodash";
import { graphql, PageProps } from "gatsby";

import { LegislatorPage as LegislatorPageComponent } from "../../layouts";

type QueryProps = {
  legislator: GatsbyTypes.Legislator;
};

export default function LegislatorPage({ data }: PageProps<QueryProps>) {
  return <LegislatorPageComponent leg={data.legislator} />;
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
    }
  }
`;

// Query to get the bill events. Very inefficient without a custom resolver so skipping for now since we're not displaying anyway
// allBillEvent(filter: {votes: {elemMatch: {legislator: {id: {eq: $id}}}}}) {
//   nodes {
//     aom_id
//     votes {
//       vote
//       legislator {
//         aom_id
//       }
//     }
//     vote_descriptions {
//       no
//       unk
//       yes
//     }
//     type
//     progressive_vote
//     description
//   }
// }
