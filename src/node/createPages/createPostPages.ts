import path from "path";
import _ from "lodash";

export default async function createPostPages(graphql, createPage, createRedirect) {
  return graphql(
    `
      {
        allPost {
          nodes {
            id
            title
            href
            redirect_from
            parent {
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
        id: post.id,
        ...(prevPost && { previous: { title: prevPost.title, url: prevPost.href } }),
        ...(nextPost && { next: { title: nextPost.title, url: nextPost.href } }),
      };

      createPage({
        path: post.href,
        component,
        context,
      });

      if (!_.isEmpty(post.redirect_from)) {
        post.redirect_from.forEach((redir) => {
          createRedirect({
            fromPath: redir,
            toPath: post.href,
            isPermanent: true,
            redirectInBrowser: true,
          });
        });
      }
    });
  });
}
