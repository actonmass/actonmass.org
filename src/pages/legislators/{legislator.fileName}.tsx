import React from "react";
import _ from "lodash";
import { graphql } from "gatsby";

import { LegislatorPage as LegislatorPageComponent } from "../../layouts";

export default function LegislatorPage({ data }) {
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
    }
  }
`;
