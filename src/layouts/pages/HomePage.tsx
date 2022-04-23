import React from "react";
import { graphql, Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import BaseLayout from "../BaseLayout";
import { HeroImage, SignupForm, FindMyReps, YoutubeVideo } from "../../components";
import HeroContainer from "../../components/HeroImage/HeroContainer";
import "./home.scss";
import ModalForm from "../../components/ModalForm";

type Issue = GatsbyTypes.Issue;

export default function Home({ data }) {
  const issues = data.allIssue.nodes as Issue[];
  return (
    <BaseLayout>
      <main className="homepage_wrapper">
        <section className="darker cbox">
          <div className="hero w1400">
            <div className="hero_left">
              <HeroContainer>
                <YoutubeVideo src="https://www.youtube.com/embed/xflRK0RWOZ4" />
              </HeroContainer>
            </div>
            <div className="hero_text">
              <h4 className="header1 fRaleway fWhite fUppercase fBold">act on mass</h4>
              <svg className="smLine" width="50" height="3">
                <rect width="300" height="100" style={{ fill: "rgb(108,212,255)" }} />
              </svg>
              <h6 className="header4 fRaleway fWhite fBold">
                Fighting corruption and inaction in the Massachusetts State House.
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
              <Link to="/about-us" className="fRoboto fExbold fUppercase btn">
                Explore our work
              </Link>
            </div>
          </div>
          <div className="act vbox action">
            <h3 className="take_action_txt fExbold">Join our campaign</h3>
            <h4 className="take_action_txt fRoboto fLight">
              Join your district team. Advocate for a transparent and functioning state house
            </h4>
            <div className="btn-container">
              <Link to="/the-campaign" className="fRoboto fExbold fUppercase btn">
                Join our campaign
              </Link>
            </div>
          </div>
        </section>

        <section className="accountability light-blue">
          <div className="rect rect1"></div>
          <h2 className="account_title fUppercase">The People's House</h2>
          <div className="pledge_left">
            <HeroImage
              img="/img/the-campaign.jpg"
              alt="Protesters in front of the Massachusetts State House"
            />
          </div>
          <div className="account_text">
            <h3 className="account_text1 fUppercase fExbold">A Campaign for Democracy</h3>
            <h4 className="account_text2 fRoboto fLight">
              This July, the State House will be writing its own rulebook. Join your district team
              to demand that our legislators change the broken, anti-democratic rules in the State
              House.
            </h4>
            <Link to="/the-campaign" className="fRoboto fExbold fUppercase btn btn_pledge">
              the campaign
            </Link>
          </div>
        </section>

        <section className="pledge accountability dark">
          <div className="rect rect1"></div>
          <h2 className="account_title fUppercase">the transparency pledge:</h2>
          <div className="pledge_left">
            <HeroImage img="/img/pledge_img.png" alt="Rep Gouveia signed the pledge!" />
          </div>
          <div className="account_text">
            <h3 className="account_text1 fUppercase fExbold">Together we can create change.</h3>
            <h4 className="account_text2 fRoboto fLight">
              We can ask our elected legislators to take action to create transparency today so
              important progressive bills don’t die in darkness.
            </h4>
            <Link to="/pledge" className="fRoboto fExbold fUppercase btn btn_pledge">
              the pledge
            </Link>
          </div>
        </section>

        <section className="accountability light-blue">
          <div className="rect rect1"></div>
          <h2 className="account_title fUppercase">Saturday Scoop</h2>
          <div className="pledge_left">
            <HeroImage img="/img/saturday-scoop-logo.png" alt="Saturday scoop ice cream" />
          </div>
          <div className="account_text">
            {/* <h3 className="account_text1 fUppercase fExbold">A Campaign for Democracy</h3> */}
            <h4 className="account_text2 fRoboto fLight">
              Sign up for the Saturday Scoop: the weekly newsletter with our breakdown & analysis
              what's happening on Beacon Hill, and how to take action.
            </h4>
            <ModalForm
              formId="https://secure.everyaction.com/v1/Forms/89W8SSTEgESvjQcBrZD_3Q2"
              title="Sign up"
            />
            {/* <button to="/the-campaign" className="fRoboto fExbold fUppercase btn btn_pledge">
              Sign up for the scoop
            </button> */}
          </div>
        </section>

        <section id="issues" className="issues light">
          <div className="rect rect1"></div>
          <h2 className="issues_title fUppercase">key progressive issues:</h2>
          <p>
            There's a lot at stake when it comes to reforming the State House. Explore these
            progressive issue areas to see where Massachusetts is falling short, and what bills
            advocates and experts are fighting for.
          </p>
          <div className="issues_grid">
            {issues.map((issue) => (
              <Link
                key={issue.aom_id}
                to={issue.href}
                className="issue-container issues_img hvr-float"
                style={{ backgroundImage: `url('${issue.img}')` }}
              >
                <div className="issue-content">
                  <FontAwesomeIcon icon={["fas", `${issue.logo}` as any]} />
                  <h3>{issue.title}</h3>
                  <p>{issue.subtitle}</p>
                </div>
              </Link>
            ))}

            <Link
              to="/the-campaign"
              className="issue-container issues_img hvr-float"
              style={{
                backgroundImage: "url('/img/issue-transparency.jpg')",
              }}
            >
              <div className="issue-content">
                <FontAwesomeIcon icon={faSearch} />
                <h3>Transparency</h3>
              </div>
            </Link>
          </div>
        </section>
        <FindMyReps theme="dark" mode="campaign" allowSelect={true} />
      </main>
    </BaseLayout>
  );
}

export const query = graphql`
  {
    allIssue(sort: { fields: order }) {
      nodes {
        aom_id
        href
        title
        subtitle
        img
        logo
      }
    }
  }
`;
