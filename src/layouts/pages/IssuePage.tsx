import React from "react";
import _ from "lodash";
import ReactMarkdown from "react-markdown";

import { HeroImage } from "../../components";
import BaseLayout from "../BaseLayout";

import "./issue.scss";

type Props = {
  issue: GatsbyTypes.Issue;
};

export default function IssuePage({ issue }: Props) {
  return (
    <BaseLayout>
      <main className="issue-page">
        <section className="headline dark cbox">
          <div className="w1400">
            {/* {% include breadcrum.html %} */}
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
                <div className="failure">
                  <div className="rect_sideline"></div>
                  <h4 className="fRoboto fBold fUppercase">{failure.title}</h4>
                  <p className="fRoboto fLight">
                    <ReactMarkdown source={failure.text} />
                    {/* TODO: we used to remove <p> and </p> in Liquid. Need something similar? */}
                  </p>
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
              {issue.highlighted_bills.map((bill) => null)}
              {/* {% for bill_id in issue.highlighted_bills%}
        <div className="bill vbox">
          {% assign bill = site.data.cache.bills_by_id[bill_id] %}
          <div className="bill-text">
            <h4 className="issues_bill_title fRaleway fExbold fUppercase">{{bill.title}}</h4>
            <div className="rect_underline"></div>
            <ul className="issues_bills_bullets">
              {% for point in bill.summary %}
              <li><p className="fRoboto fRegular">{{point}}</p></li>
              {% endfor %}
            </ul>
          </div>
          <div className="bill-btn-container">
            <a href="{{bill.id}}" className="btn billbtn fRoboto fBold fUppercase">read more</a>
          </div>
        </div>
        {% endfor %} */}
            </div>
          </div>
        </section>
        {/* <section className="signup cbox">
    <div className="signup-container w1400">
      <h1 className="act1 fExbold fUppercase">act now</h1>
      <p className="signup_volunteer fLight">Sign up for email notifications so we can contact you when your voice is needed</p>
      {% include signup-form.html %}
    </div>
  </section> */}
        {/* <section className="questions cbox medium-blue">
    <div className="w1400">
      <h3 className="issues_faq_header fExbold fUppercase">common questions:</h3>
      {% for question in issue.questions %}
        <a className="accordion">
          <h4 className="accordian_question fRaleway fRegular">{{ question.title }}</h4>
          <i className="plus fas fa-plus fa-2x"></i>
        </a>
        <div className="panel">
          <div className="fRoboto fLight">{{ question.text | markdownify }}</div>
        </div>
      {% endfor %}
    </div>
  </section> */}
        {/* <section className="learn-more cbox light-blue">
    <div className="w1400">
      <h3 className="issues_learn_header fExbold fUppercase">learn more:</h3>
      <div className="hbox learn-more-container">
        {% for learn_more_link in issue.learn_more %}
        <div>
          <a href="{{learn_more_link.link}}" target="_blank">
            {% if learn_more_link.img %}
            <img className="sca_learn_icon" src="{{learn_more_link.img}}" alt="{{learn_more_link.title}}"/>
            {% else %}
            <p>{{learn_more_link.title}}</p>
            {% endif %}
          </a>
        </div>
        {% endfor %}
      </div>
    </div>
  </section> */}
        {/* <section className="references cbox">
    <div className="w1400">
      <h3 className="issues_ref_header fExbold fUppercase">References:</h3>
      <ul className="issues_references_list">
        {% for reference in issue.references %}
          <li id="reference-{{ reference.key }}" className="fRoboto fLight">
            <a href="{{ reference.link }}" target="_blank">{{ reference.key }}. {{ reference.title }}</a>
          </li>
        {% endfor %}
      </ul>
    </div>
  </section> */}
      </main>
    </BaseLayout>
  );
}
