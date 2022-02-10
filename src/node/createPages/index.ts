import _ from "lodash";

import buildAdminConfig from "../admin";

import createLegData from "./createLegData";
import createPagePages from "./createPagePages";
import createPostPages from "./createPostPages";
import createBlogPages from "./createBlogPages";
import createNewsPages from "./createNewsPages";

export default async function createPages({ graphql, actions }) {
  const { createPage, createRedirect } = actions;
  buildAdminConfig();
  await createLegData(graphql);
  await createPagePages(graphql, createPage);
  await createPostPages(graphql, createPage, createRedirect);
  await createBlogPages(graphql, createPage);
  await createNewsPages(graphql, createPage);
}
