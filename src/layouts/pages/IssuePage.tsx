import React from "react";
import _ from "lodash";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { HeroImage, SignupForm, BreadCrum } from "../../components";
import BaseLayout from "../BaseLayout";

import "./issue.scss";

type Props = {
  issue: GatsbyTypes.Issue;
};

export default function IssuePage({ issue }: Props) {
  return (
    <BaseLayout title={issue.title}>
      <main className="issue-page">
        <section className="headline dark cbox">
          <div className="w1400">
            <BreadCrum
              title={issue.title}
              links={[
                {
                  text: "ISSUES",
                  href: "/#issues",
                },
              ]}
            />
            <div className="headline-container">
              <h1 className="hero_title fBold">{issue.title}</h1>
              <div className="issues_hero_a">
                {issue.page_img && <HeroImage img={issue.page_img} alt="" />}
              </div>
              <div className="issues_hero_c">
                <h2 className="hero_quote_txt fWhite fRegular">{issue.catchphrase}</h2>
              </div>
            </div>
          </div>
        </section>

        {issue.text && (
          <section className="light-blue cbox">
            <div className="w1400">
              <ReactMarkdown source={issue.text} />
            </div>
          </section>
        )}

        <section className="failures cbox light">
          <div className="w1400">
            <h3 className="fRaleway fExbold fUppercase">{issue.failures_block_title}</h3>
            <div className="failures-container hbox">
              {issue.failures.map((failure) => (
                <div className="failure" key={failure.title}>
                  <div className="rect_sideline"></div>
                  <h4 className="fRoboto fBold fUppercase">{failure.title}</h4>
                  <div className="fRoboto fLight">
                    <ReactMarkdown source={failure.text} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bills dark cbox">
          <div className="w1400">
            <h3 className="issues_bill_header fUppercase fExbold">
              bills to support {issue.bills_to_support_title}
            </h3>
            <div className="bill-container">
              {issue.highlighted_bills
                .filter((bill) => !bill.hidden)
                .map((bill) => (
                  <div className="bill vbox" key={bill.href}>
                    <div className="bill-text">
                      <h4 className="issues_bill_title fRaleway fExbold fUppercase">
                        {bill.title}
                      </h4>
                      <div className="rect_underline"></div>
                      <ul className="issues_bills_bullets">
                        {bill.summary.map((point) => (
                          <li key={point}>
                            <p className="fRoboto fRegular">{point}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bill-btn-container">
                      <a href={bill.href} className="btn billbtn fRoboto fBold fUppercase">
                        read more
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
        <section className="signup cbox">
          <div className="signup-container w1400">
            <h1 className="act1 fExbold fUppercase">act now</h1>
            <p className="signup_volunteer fLight">
              Sign up for email notifications so we can contact you when your voice is needed
            </p>
            <SignupForm />
          </div>
        </section>
        {!_.isEmpty(issue.questions) && (
          <section className="questions cbox medium-blue">
            <div className="w1400">
              <h3 className="issues_faq_header fExbold fUppercase">common questions:</h3>
              {issue.questions.map((question) => (
                <React.Fragment key={question.title}>
                  <a className="accordion">
                    <h4 className="accordian_question fRaleway fRegular">{question.title}</h4>
                    <FontAwesomeIcon icon={faPlus} size="2x" className="plus" />
                  </a>
                  <div className="panel">
                    <div className="fRoboto fLight">
                      <ReactMarkdown source={question.text} />
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>
        )}
        <section className="learn-more cbox light-blue">
          <div className="w1400">
            <h3 className="issues_learn_header fExbold fUppercase">learn more:</h3>
            <div className="hbox learn-more-container">
              {issue.learn_more.map((learn_more_link) => (
                <div key={learn_more_link.title}>
                  <a href={learn_more_link.link} target="_blank">
                    {learn_more_link.img ? (
                      <img
                        className="sca_learn_icon"
                        src={learn_more_link.img}
                        alt={learn_more_link.title}
                      />
                    ) : (
                      <p>{learn_more_link.title}</p>
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {!_.isEmpty(issue.references) && (
          <section className="references cbox">
            <div className="w1400">
              <h3 className="issues_ref_header fExbold fUppercase">References:</h3>
              <ul className="issues_references_list">
                {issue.references.map((reference) => (
                  <li
                    id={`reference-${reference.key}`}
                    className="fRoboto fLight"
                    key={reference.key}
                  >
                    <a href={reference.link} target="_blank">
                      {reference.key}. {reference.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
    </BaseLayout>
  );
}
