import React from "react";
import _ from "lodash";
import { graphql } from "gatsby";

import { BillPage as BillPageComponent } from "../../layouts";

export default function BillPage({ data }) {
  return <BillPageComponent bill={data.bill} />;
}

export const query = graphql`
  query($id: String) {
    bill(id: { eq: $id }) {
      issue {
        title
        href
      }
      full_title
      history {
        bill_event {
          date
          description
          type
        }
        date
        description
        type
      }
      committee {
        title
        chamber
        senate_chair {
          id
          href
          square_picture
          first_name
          last_name
          party
          hometown
        }
        senate_vice_chair {
          id
          href
          square_picture
          first_name
          last_name
          party
          hometown
        }
        senate_members {
          id
          href
          square_picture
          first_name
          last_name
          party
          hometown
        }
        house_chair {
          id
          href
          square_picture
          first_name
          last_name
          party
          hometown
        }
        house_vice_chair {
          id
          href
          square_picture
          first_name
          last_name
          party
          hometown
        }
        house_members {
          id
          href
          square_picture
          first_name
          last_name
          party
          hometown
        }
      }
      house_link
      house_no
      img
      senate_link
      senate_no
      summary
      text
      title
      co_sponsors {
        id
      }
    }
  }
`;
