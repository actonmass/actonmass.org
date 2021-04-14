import { useStaticQuery, graphql } from "gatsby";

import { flattenQueryResult } from "../../utils";

type Leg = {
  first_name: string;
  last_name: string;
  href: string;
  chamber: "house" | "senate";
};

export default function useAllCurrentLegislators(): Leg[] {
  return useStaticQuery(graphql`
    query legislators {
      allLegislators(filter: { end_date: { eq: "" } }) {
        nodes {
          href
          first_name
          last_name
          chamber
        }
      }
    }
  `).allLegislators.nodes;
}
