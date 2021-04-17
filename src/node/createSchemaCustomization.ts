import fs from "fs";

export default function createSchemaCustomization({ actions, schema }) {
  const { createTypes } = actions;
  const types = fs.readFileSync(`${__dirname}/types.gql`, "utf8");
  createTypes(types);
}
