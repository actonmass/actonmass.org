import { useStaticQuery, graphql } from "gatsby";

type Leg = {
  first_name: string;
  last_name: string;
  href: string;
  chamber: "house" | "senate";
};

export default function useAllCurrentLegislators(): Leg[] {
  return useStaticQuery<GatsbyTypes.allLegislatorQuery>(graphql`
    query allLegislator {
      allLegislator(filter: { end_date: { eq: null } }) {
        nodes {
          id
          href
          first_name
          last_name
          chamber
          party
          square_picture
          district {
            lat
            lng
          }
        }
      }
    }
  `).allLegislator.nodes;
}
