import React from "react";
import _ from "lodash";
import { graphql } from "gatsby";

import { IssuePage as IssuePageComponent } from "../../layouts";

export default function IssuePage({ data }) {
  console.log(data);
  return <IssuePageComponent />;
}

export const query = graphql`
  query($id: String) {
    legislators(id: { eq: $id }) {
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
    }
  }
`;
