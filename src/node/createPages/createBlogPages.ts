import path from "path";
import { paginate } from "gatsby-awesome-pagination";

export default async function createBlogPages(graphql, createPage) {
  return graphql(
    `
      {
        allPost {
          nodes {
            id
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    const component = path.resolve(`src/layouts/pages/BlogPage.tsx`);

    paginate({
      createPage,
      items: result.data.allPost.nodes, // An array of objects
      itemsPerPage: 12,
      pathPrefix: "/blog",
      component,
    });
  });
}
