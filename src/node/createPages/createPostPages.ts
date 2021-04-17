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

      const [year, month, day, ...other] = post.fileName.split("-");

      const context = {
        body: post.parent.body,
        html: post.parent.html,
        date: post.date ?? [year, month, day].join("-"),
        title: post.title,
        ...(prevPost && { previous: { title: prevPost.title, url: getPath(prevPost) } }),
        ...(nextPost && { next: { title: nextPost.title, url: getPath(nextPost) } }),
      };

      createPage({
        path: getPath(post),
        component,
        context,
      });
    });
  });
}

function getPath(post) {
  const [year, month, day, ...titleBits] = post.fileName.split("-");
  const title = _.kebabCase(titleBits.join("-"));
  return `/post/${year}/${month}/${day}/${title}`;
}
