import React from "react";
import { PageProps, Link, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import moment from "moment";

import { BreadCrum } from "../../components";
import BaseLayout from "../BaseLayout";

import "./default.scss";
import "./post.scss";

type PageContext = {
  previous?: { title: string; url: string };
  next?: { title: string; url: string };
};

type Data = {
  post: {
    title: string;
    parent: { body: any };
    image?: string;
    date: any;
  };
};

export default function PostPage({
  pageContext,
  data: { post: page },
}: PageProps<Data, PageContext>) {
  return (
    <BaseLayout title={page.title} image={page.image}>
      <main className="default-page cbox light-blue">
        <div className="w1400">
          <BreadCrum title={page.title} links={[{ text: "BLOG", href: "/blog" }]} />
        </div>
        <div className="w1200 cbox">
          <div className="w1000 content">
            <div className="blog-post">
              <div className="post-header">
                <h2 className="fUppercase fExbold">{page.title}</h2>
                <p className="post-date fLight">Posted on {formatDate(page.date)}</p>
              </div>
              <div className="post-content">
                <div>
                  <MDXRenderer>{page.parent.body}</MDXRenderer>
                </div>
              </div>
            </div>
            <ul className="pager">
              <li>
                {pageContext.next && (
                  <Link to={pageContext.next.url} title={pageContext.next.title}>
                    &larr; Next Post
                  </Link>
                )}
              </li>
              <li>
                <Link to="/blog">All posts</Link>
              </li>
              <li>
                {pageContext.previous && (
                  <Link to={pageContext.previous.url} title={pageContext.previous.title}>
                    Previous Post &rarr;
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </main>
    </BaseLayout>
  );
}

function formatDate(date: string) {
  return moment(date).format("MMMM DD, y");
}

export const query = graphql`
  query($id: String) {
    post(id: { eq: $id }) {
      title
      date
      image
      parent {
        ... on Mdx {
          body
        }
      }
    }
  }
`;
