import _ from "lodash";

import buildAdminConfig from "../admin";

import createLegData from "./createLegData";
import createPagePages from "./createPagePages";
import createPostPages from "./createPostPages";

export default async function createPages({ graphql, actions }) {
  const { createPage } = actions;
  buildAdminConfig();
  await createLegData(graphql);
  await createPagePages(graphql, createPage);
  await createPostPages(graphql, createPage);
}
