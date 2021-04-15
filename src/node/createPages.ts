import fs from "fs";
import _ from "lodash";

import buildAdminConfig from "./admin";

export default async function createPages({ graphql, actions }) {
  buildAdminConfig();
  await graphql(`
    {
      allLegislators(filter: { end_date: { eq: "" } }) {
        nodes {
          aom_id
          party
          first_name
          last_name
          href
          district {
            name
          }
          img: square_picture
          phone
          email
          facebook
          twitter
          supports_the_campaign
          pledge
          ocd_id
        }
      }
    }
  `).then((result) => {
    const legJsonPath = "./functions/findMyReps/leg-data.json";
    const legs = result.data.allLegislators.nodes;
    const legByOCDId = _.keyBy(legs, "ocd_id");
    fs.writeFileSync(legJsonPath, JSON.stringify(legByOCDId));
  });
}
