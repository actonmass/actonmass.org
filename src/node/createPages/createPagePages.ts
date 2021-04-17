import path from "path";

export default async function createPagePages(graphql, createPage) {
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
      bills: path.resolve(`src/layouts/pages/BillsPage.tsx`),
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
