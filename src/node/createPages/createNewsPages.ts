import path from "path";
import { paginate } from "gatsby-awesome-pagination";

export default async function createNewsPages(graphql, createPage) {
  return graphql(
    `
      {
        allNews {
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

    const component = path.resolve(`src/layouts/pages/NewsPage.tsx`);

    paginate({
      createPage,
      items: result.data.allNews.nodes, // An array of objects
      itemsPerPage: 10,
      pathPrefix: "/news",
      component,
    });
  });
}
