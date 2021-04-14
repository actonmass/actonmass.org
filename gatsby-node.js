const COLLECTIONS = ["legislators"];

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const typeDefs = [
    schema.buildObjectType({
      name: "legislators",
      fields: {
        aom_id: "String!",
        first_name: "String!",
        last_name: "String!",
        district: "String!",
        party: "String!",
        phone: "String",
        email: "String",
        hometown: "String",
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
  let collection = parent.relativePath.split("/")[0];

  if (COLLECTIONS.includes(collection)) {
    const fields = node.frontmatter;
    createNode({
      ...fields,
      id: createNodeId(`${collection}-${node.frontmatter.aom_id}`), // hashes the inputs into an ID
      parent: null,
      children: [],
      internal: {
        type: collection,
        contentDigest: createContentDigest(fields),
      },
    });
  }
};
