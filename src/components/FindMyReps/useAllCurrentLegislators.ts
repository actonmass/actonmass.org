import { useStaticQuery, graphql } from "gatsby";

type Leg = {
  first_name: string;
  last_name: string;
  href: string;
  chamber: "house" | "senate";
};

export default function useAllCurrentLegislators(): Leg[] {
  return useStaticQuery<GatsbyTypes.legislatorsQuery>(graphql`
    query legislators {
      allLegislator(filter: { end_date: { eq: null } }) {
        nodes {
          href
          first_name
          last_name
          chamber
        }
      }
    }
  `).allLegislator.nodes;
}
