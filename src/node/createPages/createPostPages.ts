import path from "path";
import _ from "lodash";

export default async function createPostPages(graphql, createPage) {
  return graphql(
    `
      {
        allPost {
          nodes {
            id
            title
            date
            fileName
            href
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

    const component = path.resolve(`src/layouts/pages/PostPage.tsx`);

    result.data.allPost.nodes.forEach((post, idx) => {
      const prevPost = result.data.allPost.nodes[idx - 1];
      const nextPost = result.data.allPost.nodes[idx + 1];

      const context = {
        body: post.parent.body,
        html: post.parent.html,
        date: post.date,
        title: post.title,
        ...(prevPost && { previous: { title: prevPost.title, url: prevPost.href } }),
        ...(nextPost && { next: { title: nextPost.title, url: nextPost.href } }),
      };

      createPage({
        path: post.href,
        component,
        context,
      });
    });
  });
}
