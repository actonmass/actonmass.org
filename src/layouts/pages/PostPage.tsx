import React from "react";
import { PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import moment from "moment";

import { BreadCrum } from "../../components";
import BaseLayout from "../BaseLayout";

import "./default.scss";
import "./post.scss";

type PageContext = {
  title: string;
  date: any;
  image?: string;
  previous?: { title: string; url: string };
  next?: { title: string; url: string };
} & ({ html: string; body: undefined } | { body: any; html: undefined });

export default function PostPage({ pageContext: page }: PageProps<{}, PageContext>) {
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
                {/*  TODO: need smartify? */}
                <h2 className="fUppercase fExbold">{page.title}</h2>
                <p className="post-date fLight">Posted on {formatDate(page.date)}</p>
              </div>
              <div className="post-content">
                {page.body != null ? (
                  <div>
                    <MDXRenderer>{page.body}</MDXRenderer>
                  </div>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: page.html }} />
                )}
              </div>
            </div>
            <ul className="pager">
              <li>
                {page.next && (
                  <a href={page.next.url} title={page.next.title}>
                    &larr; Next Post
                  </a>
                )}
              </li>
              <li>
                <a href="/blog">All posts</a>
              </li>
              <li>
                {page.previous && (
                  <a href={page.previous.url} title={page.previous.title}>
                    Previous Post &rarr;
                  </a>
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
