const _ = require("lodash");
const fs = require("fs");

const COLLECTIONS = ["legislators", "districts"];

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const typeDefs = [
    schema.buildObjectType({
      name: "legislators",
      fields: {
        aom_id: "String!",
        first_name: "String!",
        last_name: "String!",
        party: "String!",
        phone: "String",
        email: "String",
        hometown: "String",
        href: "String",
        square_picture: "String",
        malegislature_url: "String",
        website: "String",
        facebook: "String",
        ocd_id: "String",
        twitter: "String",
        supports_the_campaign: {
          type: "Boolean",
          resolve: (source) => source.supports_the_campaign || false,
        },
        pledge: {
          type: "Boolean",
          resolve: (source) => source.pledge || false,
        },
        start_date: {
          type: "String",
          resolve: (source) => source.end_date || "",
        },
        end_date: {
          type: "String",
          resolve: (source) => source.end_date || "",
        },
        chamber: {
          type: "String",
          resolve: (source) =>
            source.district.startsWith("house") ? "house" : "senate",
        },
        district_id: {
          type: "String!",
          resolve: (source) => source.district,
        },
        district: {
          type: "districts",
          resolve(source, args, context, info) {
            return context.nodeModel.getNodeById({
              id: source.district,
              type: "districts",
            });
          },
        },
      },
      interfaces: ["Node"],
    }),
    schema.buildObjectType({
      name: "districts",
      fields: {
        aom_id: "String!",
        chamber: "String!",
        lat: "Float",
        lng: "Float",
        name: "String",
        van_id: "String",
      },
      interfaces: ["Node"],
    }),
  ];
  createTypes(typeDefs);
};

exports.onCreateNode = ({
  node,
  createNodeId,
  createContentDigest,
  getNode,
  actions,
}) => {
  const { createNode } = actions;

  if (node.internal.type !== `MarkdownRemark`) {
    return null;
  }

  const parent = getNode(node.parent);
  const [collection, fileName] = parent.relativePath.split("/");

  if (COLLECTIONS.includes(collection)) {
    const fields = node.frontmatter;
    const baseName = fileName.replace(/\.md$/, "");
    createNode({
      ...fields,
      id: fields.aom_id,
      href: `/${collection}/${baseName}/`, // TODO: use type-level resolver ?
      parent: null,
      children: [],
      internal: {
        type: collection,
        contentDigest: createContentDigest(fields),
      },
    });
  }
};

exports.onPostBuild = async ({ graphql }) => {
  // Run the GraphQL query (from example above).
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
};
