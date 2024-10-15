import React from "react";
import { graphql, PageProps, Link } from "gatsby";

import BaseLayout from "../BaseLayout";
import { BreadCrum } from "../../components";

import "./news.scss";

type DataProps = {
  allNews: { nodes: Queries.News[] };
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

export default function NewsPage({ data, pageContext }: PageProps<DataProps, PageContext>) {
  const articles = data.allNews.nodes;
  return (
    <BaseLayout title="News">
      <div className="news-page">
        <section className="headline dark cbox">
          <div className="w1400">
            <BreadCrum title="News" />
            <div className="centered">
              <div className="w1000">
                <h1>
                  NEWS &amp; MEDIA
                  <span className="subheading">
                    Latest updates from Act on Mass and the fight for transparency in the State
                    House
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="news-articles light-blue cbox">
          <div className="w1200">
            <ul className="articles">
              {articles.map((article) => {
                return (
                  <a href={article.link} target="_blank">
                    <li>
                      <div className="category fBold fDark fUppercase">
                        {article.category.replace("_", " ")}
                      </div>
                      <h3 className="fExbold fMainColor fCapitalize">{article.title}</h3>
                      <div className="byline fDark small">
                        <span>{article.author}</span> |{" "}
                        <span>
                          {new Date(Number(article.date)).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="extract fDark">{article.extract}</div>
                    </li>
                  </a>
                );
              })}
            </ul>

            {pageContext.numberOfPages > 1 && (
              <ul className="pager">
                <li>
                  {pageContext.previousPagePath && (
                    <Link to={pageContext.previousPagePath}>&larr; See Newer</Link>
                  )}
                </li>
                <li>
                  {pageContext.nextPagePath && (
                    <Link to={pageContext.nextPagePath}>See Older &rarr;</Link>
                  )}
                </li>
              </ul>
            )}
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allNews(sort: { date: DESC }, skip: $skip, limit: $limit) {
      nodes {
        title
        author
        date
        link
        category
        extract
      }
    }
  }
`;
