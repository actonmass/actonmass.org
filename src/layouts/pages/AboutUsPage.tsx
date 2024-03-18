import React from "react";
import { graphql, PageProps } from "gatsby";
import _ from "lodash";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BreadCrum, YoutubeVideo } from "../../components";

import { BaseLayout } from "..";

import "./about.scss";

type QueryProps = {
  page: Queries.Page;
  allTeamMember: { nodes: Queries.TeamMember[] };
};

export default function AboutUsPage({ data }: PageProps<QueryProps>) {
  const page = data.page;
  const allTeamMember = data.allTeamMember.nodes;
  const frontmatter = (data.page.parent as any).frontmatter;
  return (
    <BaseLayout title={page.title}>
      <div id="about_wrapper">
        <section className="headline dark cbox">
          <div className="w1400">
            <BreadCrum title={page.title} />

            <h2 className="about_title fWhite fRegular fUppercase">what we do:</h2>
            <div className="top-container">
              {frontmatter.header.map((section, idx) => (
                <div className={`about_top top_box_${idx + 1}`}>
                  <div className="about_rect">
                    <FontAwesomeIcon
                      icon={["fas", `${section.icon}` as any]}
                      className="about_icon"
                      size="3x"
                    />
                    <h3 className="fWhite fRegular fUppercase">{section.title}</h3>
                    <div className="about_rect1"></div>
                    <div className="fWhite fLight fRoboto">
                      <ReactMarkdown>{section.description} </ReactMarkdown>
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
            <div id="team_members">
              {allTeamMember.map((person) => (
                <div className="person">
                  <img src={person.photo} alt={person.name} />
                  <p className="fRoboto fBold fUppercase">{person.name}</p>
                  <p className="fRoboto fLight">
                    <ReactMarkdown>{person.body}</ReactMarkdown>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}

export const query = graphql`
  query {
    allTeamMember(sort: { order: ASC }, filter: { hidden: { eq: false } }) {
      nodes {
        name
        body
        photo
        link
      }
    }
    page(id: { eq: "/about-us/" }) {
      id
      title
      parent {
        id
        ... on Mdx {
          frontmatter {
            header {
              title
              description
              icon
            }
            video
          }
        }
      }
    }
  }
`;
