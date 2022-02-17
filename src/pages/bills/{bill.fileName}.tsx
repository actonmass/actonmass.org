import React from "react";
import _ from "lodash";
import { graphql } from "gatsby";

import BillPageComponent from "../../layouts/pages/BillPage";

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
      no_sponsorship_data
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
      scripts_com_vote {
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
      twitter_bill_name
      co_sponsors {
        id
      }
      orgs {
        img
        title
        link
      }
    }
  }
`;
