import fs from "fs";
import _ from "lodash";

export default async function createLegData(graphql) {
  await graphql(`
    {
      allLegislator(filter: { end_date: { eq: null } }) {
        nodes {
          aom_id
          party
          first_name
          last_name
          href
          chamber
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
    const legs = result.data.allLegislator.nodes;
    const legByOCDId = _.keyBy(legs, "ocd_id");
    fs.writeFileSync(legJsonPath, JSON.stringify(legByOCDId));
  });
}
