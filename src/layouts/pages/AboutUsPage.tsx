import React from "react";
import { graphql, PageProps } from "gatsby";
import _ from "lodash";
import ReactMarkdown from "react-markdown";

import { BreadCrum, YoutubeVideo } from "../../components";
import { BaseLayout } from "..";

import "./about.scss";

type QueryProps = {
  page: GatsbyTypes.Page;
};

export default function BillsPage({ data }: PageProps<QueryProps>) {
  const page = data.page;
  const frontmatter = (data.page.parent as any).frontmatter;
  return (
    <BaseLayout>
      <div id="about_wrapper">
        <section className="headline dark cbox">
          <div className="w1400">
            <BreadCrum title={page.title} />

            <h2 className="about_title fWhite fRegular fUppercase">what we do:</h2>
            <div className="top-container">
              {frontmatter.map((section) => (
                <div className="about_top top_box_{{forloop.index}}">
                  <div className="about_rect">
                    <i className="about_icon fas fa-{{section.icon}} fa-3x"></i>
                    <h3 className="fWhite fRegular fUppercase">{section.title}</h3>
                    <div className="about_rect1"></div>
                    <div className="fWhite fLight fRoboto">
                      <ReactMarkdown source="section.description" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="medium-blue cbox">
          <div className="w1400">
            <YoutubeVideo src={frontmatter.video} />
          </div>
        </section>
        <section className="cbox">
          <div className="w1400">
            <h2 className="who_title fRegular fUppercase">our team:</h2>
            <div id="bot_container">
              {frontmatter.team.map((person) => (
                <div className="person">
                  <img src="{{person.photo}}" alt="{{person.name}}" />
                  <p className="fRoboto fBold fUppercase">{person.name}</p>
                  <p className="fRoboto fLight">{person.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}

// TODO: will need to adapt when we switch to MDX
export const query = graphql`
  query {
    page(id: { eq: "about-us" }) {
      id
      title
      parent {
        id
        ... on MarkdownRemark {
          frontmatter {
            header {
              title
              description
            }
            team {
              link
              name
              photo
              text
            }
            video
          }
        }
      }
    }
  }
`;
