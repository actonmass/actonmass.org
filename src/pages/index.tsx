import React from "react";
import { graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { BaseLayout } from "../layouts";
import { HeroImage, SignupForm, FindMyReps } from "../components";
import "../styles/pages/home.scss";

type Data = {
  issues: {
    nodes: {
      frontmatter: {
        aom_id: string;
        img: string;
        subtitle: string;
        title: string;
        logo: string;
      };
    }[];
  };
};

export default function Home({ data }: { data: Data }) {
  const issues = getIssues(data);
  return (
    <BaseLayout>
      <main className="homepage_wrapper">
        <section className="darker cbox">
          <div className="hero w1400">
            <div className="hero_left">
              <HeroImage
                img="/img/home-v2.jpg"
                alt="Young people protesting holding signs"
              />
            </div>
            <div className="hero_text">
              <h4 className="header1 fRaleway fWhite fUppercase fBold">
                act on mass
              </h4>
              <svg className="smLine" width="50" height="3">
                <rect
                  width="300"
                  height="100"
                  style={{ fill: "rgb(108,212,255)" }}
                />
              </svg>
              <h6 className="header4 fRaleway fWhite fBold">
                Fighting corruption and inaction in the Massachusetts State
                House.
              </h6>
              <h6 className="header4 fRaleway fWhite fBold">
                Empowering constituents to hold their legislators accountable.
              </h6>
              <h6 className="header4 fRaleway fWhite fBold">
                Organizing to build a functioning democracy.
              </h6>
              <SignupForm />
            </div>
          </div>
        </section>

        <section className="take_action hbox" id="sign-up-form">
          <div className="learn vbox action">
            <h3 className="take_action_txt fExbold">What We Do</h3>
            <h4 className="take_action_txt fRoboto fLight">
              We're building a democracy that answers to the many.
            </h4>
            <div className="btn-container">
              <a href="/about-us" className="fRoboto fExbold fUppercase btn">
                Explore our work
              </a>
            </div>
          </div>
          <div className="act vbox action">
            <h3 className="take_action_txt fExbold">Join our campaign</h3>
            <h4 className="take_action_txt fRoboto fLight">
              Join your district team. Advocate for a transparent and
              functioning state house
            </h4>
            <div className="btn-container">
              <a
                href="/the-campaign"
                className="fRoboto fExbold fUppercase btn"
              >
                Join our campaign
              </a>
            </div>
          </div>
        </section>

        <section id="issues" className="issues">
          <div className="rect rect1"></div>
          <h2 className="issues_title fUppercase">key progressive issues:</h2>
          <div className="issues_grid">
            {issues.map((issue) => (
              <a
                key={issue.aom_id}
                href={`/issues/${issue.aom_id}`}
                className="issue-container issues_img hvr-float"
                style={{ backgroundImage: `url('${issue.img}')` }}
              >
                <div className="issue-content">
                  <FontAwesomeIcon icon={["fas", `${issue.logo}` as any]} />
                  <i className="fa fa-{{ issue.logo }}"></i>
                  {/* TODO: needs smartify ? */}
                  <h3>{issue.title}</h3>
                  <p>{issue.subtitle}</p>
                </div>
              </a>
            ))}

            <a
              href="/the-campaign"
              className="issue-container issues_img hvr-float"
              style={{
                backgroundImage: "url('/img/issue-transparency.jpg')",
              }}
            >
              <div className="issue-content">
                <FontAwesomeIcon icon={faSearch} />
                <h3>Transparency</h3>
              </div>
            </a>
          </div>
        </section>

        <section className="accountability dark">
          <div className="rect rect1"></div>
          <h2 className="account_title fUppercase fWhite">
            the transparency campaign:
          </h2>
          <div className="pledge_left">
            <HeroImage
              img="/img/the-campaign.jpg"
              alt="Protesters in front of the Massachusetts State House"
            />
          </div>
          <div className="account_text">
            <h3 className="account_text1 fUppercase fWhite fExbold">
              Demand transparency
            </h3>
            <h4 className="account_text2 fRoboto fWhite fLight">
              At the start of every legislative session, the State House writes
              its own rulebook. Join your district team to demand that our
              legislators change the broken, anti-democratic rules in the State
              House.
            </h4>
            <a
              href="/the-campaign"
              className="fRoboto fExbold fUppercase btn btn_pledge"
            >
              the campaign
            </a>
          </div>
        </section>

        <section className="pledge accountability light-blue">
          <div className="rect rect1"></div>
          <h2 className="account_title fUppercase">the transparency pledge:</h2>
          <div className="pledge_left">
            <HeroImage
              img="/img/pledge_img.png"
              alt="Rep Gouveia signed the pledge!"
            />
          </div>
          <div className="account_text">
            <h3 className="account_text1 fUppercase fExbold">
              Together we can create change.
            </h3>
            <h4 className="account_text2 fRoboto fLight">
              We can ask our elected legislators to take action to create
              transparency today so important progressive bills don’t die in
              darkness.
            </h4>
            <a
              href="/pledge"
              className="fRoboto fExbold fUppercase btn btn_pledge"
            >
              the pledge
            </a>
          </div>
        </section>
        <FindMyReps theme="light" mode="campaign" />

        {/* {% include find-my-rep.html theme="light" mode='campaign' %} */}
      </main>
    </BaseLayout>
  );
}

export const query = graphql`
  query getAllIssues {
    issues: allMarkdownRemark(
      filter: { parent: {}, fileAbsolutePath: { regex: "/issues/" } }
      sort: { fields: frontmatter___order }
    ) {
      nodes {
        frontmatter {
          aom_id
          title
          subtitle
          img
          logo
        }
      }
    }
  }
`;

function getIssues(data: Data) {
  return data.issues.nodes.map((issueNode) => issueNode.frontmatter);
}
