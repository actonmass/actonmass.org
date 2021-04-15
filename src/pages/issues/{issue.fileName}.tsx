import React from "react";
import _ from "lodash";
import { graphql } from "gatsby";

import { IssuePage as IssuePageComponent } from "../../layouts";

export default function IssuePage({ data }) {
  return <IssuePageComponent issue={data.issue} />;
}

export const query = graphql`
  query($id: String) {
    issue(id: { eq: $id }) {
      title
      page_img
      catchphrase
      text
      failures_block_title
      bills_to_support_title
      questions {
        title
        text
      }
      learn_more {
        title
        img
        link
      }
      failures {
        text
        title
      }
      highlighted_bills {
        href
        title
        summary
      }
      references {
        key
        title
        link
      }
    }
  }
`;
