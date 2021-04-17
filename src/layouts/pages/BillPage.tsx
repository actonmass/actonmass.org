import React from "react";
import _ from "lodash";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { HeroImage, SignupForm, FindMyReps, BreadCrum, BillHistory } from "../../components";
import BaseLayout from "../BaseLayout";

import "./bill.scss";
import { text } from "@fortawesome/fontawesome-svg-core";

type Props = {
  bill: GatsbyTypes.Bill;
};

export default function BillPage({ bill }: Props) {
  return (
    <BaseLayout>
      <main className="bill-page">
        <section className="headline dark cbox">
          <div className="w1400">
            <BreadCrum
              title={bill.title}
              links={[
                { text: "Bills", href: "/bills" },
                {
                  text: bill.issue.title.toUpperCase(),
                  href: bill.issue.href,
                },
              ]}
            />
            <div className="headline-container">
              <div className="billpg_title">
                <h2 className="billpg_title fExbold">{bill.title}</h2>
                <p>
                  {bill.full_title} -
                  <a href={bill.house_link} target="_blank">
                    {bill.house_no}
                  </a>
                  -
                  <a href={bill.senate_link} target="_blank">
                    {bill.senate_no}
                  </a>
                </p>
              </div>
              <div className="billpg_hero_a">{bill.img && <HeroImage img={bill.img} alt="" />}</div>
              <ul className="billpg_hero_b">
                {bill.summary.map((point) => (
                  <li key={point}>
                    <h4 className="fRaleway fWhite fRegular">{point}</h4>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {bill.text && (
          <section className="light-blue cbox">
            <div className="w1400">
              <ReactMarkdown source={bill.text} />
            </div>
          </section>
        )}

        <FindMyReps
          text="Please enter your address so we can help you contact your legislator."
          bill={bill}
          mode="bill"
        />

        {/* {% if committee %}
  <section className="decision-makers dark cbox">
    <div className="w1400">
      <h2 className="billpg_decision_header fWhite fBold fUppercase">the decision makers</h2>
      <h3 className="billpg_decision_header1  fWhite fRegular">{{committee.title}}</h3>
      <div className="cbox">
        <div className="rect_underline1"></div>
      </div>
      <h4 className="billpg_decision_header2 fUppercase fWhite fRaleway fBold">Who on committee has co-sponsored:</h4>
      <div className="committee-block {{committee.chamber}}">
        {% if committee.chamber != "house" %}
        <div className="senators vbox">
          <h4 className="fUppercase fWhite fRaleway fRegular">state senators:</h4>
          {% assign senate_chair = site.data.cache.legislators_by_id[committee.senate_chair] %}
          {% if  bill.co_sponsors contains committee.senate_chair %}
              {% assign senate_chair_status = 'ok' %}
          {% else %}
              {% assign senate_chair_status = 'ko' %}
          {% endif %}

          {% assign senate_vice_chair = site.data.cache.legislators_by_id[committee.senate_vice_chair] %}
          {% if  bill.co_sponsors contains committee.senate_vice_chair %}
          {% assign senate_vice_chair_status = 'ok' %}
          {% else %}
          {% assign senate_vice_chair_status = 'ko' %}
          {% endif %}

          <div className="chairs hbox">
            {% if senate_chair %}
              <div className="vbox">
                {% include leg-circle.html rep=senate_chair status=senate_chair_status size='L' %}
                <p className="fRoboto fWhite fBold fUppercase">chair</p>
              </div>
            {% endif %}
            {% if senate_vice_chair %}
              <div className="vbox">
                {% include leg-circle.html rep=senate_vice_chair status=senate_vice_chair_status size='L' %}
                <p className="fRoboto fWhite fBold fUppercase">vice-chair</p>
              </div>
            {% endif %}
          </div>


          <div className="members">
            {% for member_id in committee.senate_members %}
            {% assign rep = site.data.cache.legislators_by_id[member_id] %}
              {% if bill.co_sponsors contains member_id %}
                {% assign status = 'ok' %}
              {% else %}
                {% assign status = 'ko' %}
              {% endif %}
              {% include leg-circle.html rep=rep status=status %}
            {% endfor %}
          </div>
        </div>
        {% endif %}
        {% if committee.chamber != "senate" %}
        <div className="reps vbox">
          <h4 className="fUppercase fWhite fRaleway fRegular">state representatives:</h4>

          {% assign house_chair = site.data.cache.legislators_by_id[committee.house_chair] %}
          {% if  bill.co_sponsors contains committee.house_chair %}
              {% assign house_chair_status = 'ok' %}
          {% else %}
              {% assign house_chair_status = 'ko' %}
          {% endif %}

          {% assign house_vice_chair = site.data.cache.legislators_by_id[committee.house_vice_chair] %}
          {% if  bill.co_sponsors contains committee.house_vice_chair %}
          {% assign house_vice_chair_status = 'ok' %}
          {% else %}
          {% assign house_vice_chair_status = 'ko' %}
          {% endif %}

          <div className="chairs hbox">
            {% if house_chair %}
              <div className="vbox">
                {% include leg-circle.html rep=house_chair status=house_chair_status size='L' %}
                <p className="fRoboto fWhite fBold fUppercase">chair</p>
              </div>
            {% endif %}
            {% if house_vice_chair %}
              <div className="vbox">
                {% include leg-circle.html rep=house_vice_chair status=house_vice_chair_status size='L' %}
                <p className="fRoboto fWhite fBold fUppercase">vice-chair</p>
              </div>
            {% endif %}
          </div>

          <div className="members">
            {% for member_id in committee.house_members %}
            {% assign rep = site.data.cache.legislators_by_id[member_id] %}
              {% if bill.co_sponsors contains member_id %}
                {% assign status = 'ok' %}
              {% else %}
                {% assign status = 'ko' %}
              {% endif %}
              {% include leg-circle.html rep=rep status=status %}
            {% endfor %}

          </div>

        </div>
        {% endif %}
      </div>
      {% include modals/request-committee-vote.html bill=bill committee=committee %}
    </div>
  </section>
  {% endif %} */}

        <section className="map cbox">
          <div className="w1400">
            <h3 className="fUppercase fExbold">Who has co-sponsored:</h3>
            <div className="map-block dark">
              {/* {% include map.html greens = bill.co_sponsors %} */}
            </div>
            <div className="cbox">
              {/* {% include modals/request-co-sponsorship-my-rep.html bill=bill %} */}
            </div>
          </div>
        </section>

        <section className="timeline light-blue cbox">
          <div className="w1400">
            <h3 className="billpg_timeln_header fUppercase fExbold">
              Timeline of bill during this session:
            </h3>
            {/* {% include bill-timeline.html timeline = bill.timeline %} */}
          </div>
        </section>
        {!_.isEmpty(bill.history) && (
          <section className="history medium-blue cbox">
            <div className="w1400">
              <h2 className="fUppercase fExbold">History of the bill</h2>
              <BillHistory bill={bill} />
            </div>
          </section>
        )}
      </main>
    </BaseLayout>
  );
}
