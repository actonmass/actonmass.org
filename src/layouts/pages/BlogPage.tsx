import React from "react";
import { graphql, PageProps, Link } from "gatsby";
import moment from "moment";

import BaseLayout from "../BaseLayout";
import { BreadCrum } from "../../components";

import "./blog.scss";

type DataProps = {
  allPost: { nodes: Queries.Post[] };
};

type PageContext = {
  humanPageNumber: number;
  limit: number;
  nextPagePath: string;
  numberOfPages: number;
  pageNumber: number;
  previousPagePath: string;
  skip: number;
};

export default function BlogPage({ data, pageContext }: PageProps<DataProps, PageContext>) {
  const posts = data.allPost.nodes;
  return (
    <BaseLayout title="Blog">
      <main className="blog-page medium-blue cbox">
        <div className="w1400">
          <BreadCrum title="Blog" links={[]} />
          <h1 className="blog_title fUppercase fExbold">latest updates</h1>
          <div className="posts-container hbox">
            {posts.map((post) => (
              <div className="blog-post">
                {post.image && <img className="blog_img" src={post.image} alt="" />}
                <div className="date_rect">
                  <p className="blog_date fLight fWhite">Posted on {formatDate(post.date)}</p>
                </div>
                <Link to={post.href} className="post-text dark">
                  <div className="post-text-container">
                    <div className="title-container">
                      <h4 className="blog_post_title fUppercase fWhite fRaleway fRegular">
                        {post.title}
                      </h4>
                      <div className="blog_title_rect"></div>
                    </div>
                    <p className="fRoboto fWhite fLight">
                      {(post.parent as any).mdExcerpt ?? (post.parent as any).mdxExcerpt}.
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {pageContext.numberOfPages > 1 && (
            <ul className="pager">
              <li>
                {pageContext.previousPagePath && (
                  <Link to={pageContext.previousPagePath}>&larr; Newer Posts</Link>
                )}
              </li>
              <li>
                {pageContext.nextPagePath && (
                  <Link to={pageContext.nextPagePath}>Older Posts &rarr;</Link>
                )}
              </li>
            </ul>
          )}
        </div>
      </main>
    </BaseLayout>
  );
}

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allPost(sort: { date: DESC }, skip: $skip, limit: $limit) {
      nodes {
        date
        image
        title
        href
        parent {
          ... on MarkdownRemark {
            id
            mdExcerpt: excerpt
          }
          ... on Mdx {
            id
            mdxExcerpt: excerpt
          }
        }
      }
    }
  }
`;

function formatDate(date: string) {
  return moment(date).format("MMMM DD, y");
}
