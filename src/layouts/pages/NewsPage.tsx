import React from "react";

import BaseLayout from "../BaseLayout";
import { BreadCrum } from "../../components";

import "./news.scss";

type Data = {
  articles: GatsbyTypes.News[];
};

export default function NewsPage({ articles }: Data) {
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
                  <a href={article.href}>
                    <li>
                      <div className="category fBold fDark fUppercase">
                        {article.category.replace("_", " ")}
                      </div>
                      <h3 className="fExbold fMainColor fCapitalize">{article.title}</h3>
                      <div className="byline fDark small">
                        <span>{article.author}</span> |{" "}
                        <span>
                          {new Date(article.date).toLocaleDateString("en-US", {
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
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}
