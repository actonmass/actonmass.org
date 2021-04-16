import React from "react";
import _ from "lodash";
import { graphql, PageProps } from "gatsby";

import { LegislatorPage as LegislatorPageComponent } from "../../layouts";
import { faCpanel } from "@fortawesome/free-brands-svg-icons";

type QueryProps = {
  legislator: GatsbyTypes.Legislator;
  comWhereHouseChair: { nodes: GatsbyTypes.Committee[] };
  comWhereSenateChair: { nodes: GatsbyTypes.Committee[] };
  comWhereHouseViceChair: { nodes: GatsbyTypes.Committee[] };
  comWhereSenateViceChair: { nodes: GatsbyTypes.Committee[] };
  comWhereHouseMember: { nodes: GatsbyTypes.Committee[] };
  comWhereSenateMember: { nodes: GatsbyTypes.Committee[] };
};

export default function LegislatorPage({ data }: PageProps<QueryProps>) {
  console.log(data);

  const {
    comWhereHouseChair,
    comWhereSenateChair,
    comWhereHouseViceChair,
    comWhereSenateViceChair,
    comWhereHouseMember,
    comWhereSenateMember,
  } = data;

  const committees = [
    ...[...comWhereHouseChair.nodes, ...comWhereSenateChair.nodes].map((com) => ({
      ...com,
      role: "Chair" as const,
    })),
    ...[...comWhereHouseViceChair.nodes, ...comWhereSenateViceChair.nodes].map((com) => ({
      ...com,
      role: "Vice-chair" as const,
    })),
    ...[...comWhereHouseMember.nodes, ...comWhereSenateMember.nodes].map((com) => ({
      ...com,
      role: "Member" as const,
    })),
  ];

  return <LegislatorPageComponent leg={data.legislator} committees={committees} />;
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
    comWhereHouseChair: allCommittee(filter: { house_chair: { id: { eq: $id } } }) {
      nodes {
        title
      }
    }
    comWhereSenateChair: allCommittee(filter: { senate_chair: { id: { eq: $id } } }) {
      nodes {
        title
      }
    }
    comWhereHouseViceChair: allCommittee(filter: { house_vice_chair: { id: { eq: $id } } }) {
      nodes {
        title
      }
    }
    comWhereSenateViceChair: allCommittee(filter: { senate_vice_chair: { id: { eq: $id } } }) {
      nodes {
        title
      }
    }
    comWhereHouseMember: allCommittee(
      filter: { house_members: { elemMatch: { id: { eq: $id } } } }
    ) {
      nodes {
        title
      }
    }
    comWhereSenateMember: allCommittee(
      filter: { senate_members: { elemMatch: { id: { eq: $id } } } }
    ) {
      nodes {
        title
      }
    }
  }
`;
