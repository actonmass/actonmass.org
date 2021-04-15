export default function createSchemaCustomization({ actions, schema }) {
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
}
