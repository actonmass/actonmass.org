import { useStaticQuery, graphql } from "gatsby";

import { flattenQueryResult } from "../../utils";

type RawLeg = {
  aom_id: string;
  first_name: string;
  last_name: string;
  district: string;
  href: string;
};

type Leg = RawLeg & {
  chamber: "house" | "senate";
};

export default function useAllCurrentLegislators(): Leg[] {
  const data = useStaticQuery(query);
  const rawLegs = flattenQueryResult(data) as RawLeg[];

  return rawLegs.map((leg) => ({
    ...leg,
    // TODO: ideally this should be done server-side when generating the node
    chamber: leg.district.startsWith("house") ? "house" : "senate",
    href: `/legislators/${leg.aom_id}`,
  }));
}

const query = graphql`
  query getCurrentLegislators {
    allMarkdownRemark(
      sort: { fields: frontmatter___last_name }
      filter: {
        parent: {}
        fileAbsolutePath: { regex: "/legislators/" }
        frontmatter: { end_date: { in: [null, ""] } }
      }
    ) {
      nodes {
        frontmatter {
          aom_id
          first_name
          last_name
          district
          end_date
        }
        id
      }
    }
  }
`;
