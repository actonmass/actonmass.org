import fs from "fs";
import _ from "lodash";
import path from "path";

import buildAdminConfig from "./admin";

export default async function createPages({ graphql, actions }) {
  const { createPage } = actions;
  buildAdminConfig();
  await graphql(`
    {
      allLegislator(filter: { end_date: { eq: null } }) {
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
    const legs = result.data.allLegislator.nodes;
    const legByOCDId = _.keyBy(legs, "ocd_id");
    fs.writeFileSync(legJsonPath, JSON.stringify(legByOCDId));
  });

  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(
    `
      {
        allPage {
          nodes {
            id
            layout
            permalink
            title
            parent {
              ... on MarkdownRemark {
                html
              }
              ... on Mdx {
                body
              }
            }
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    const layouts = {
      default: path.resolve(`src/layouts/pages/DefaultPage.tsx`),
    };

    result.data.allPage.nodes.forEach((page) => {
      const layout = layouts[page.layout];
      if (layout == null) {
        console.error("Unexpected layout:", page.layout);
        return;
      }
      if (page.permalink == "" || page.permalink == null) {
        console.error("Unexpected empty path:", page.id);
        return;
      }
      createPage({
        path: page.permalink,
        component: layout,
        context: {
          body: page.parent.body,
          html: page.parent.html,
          title: page.title,
        },
      });
    });
  });
}
