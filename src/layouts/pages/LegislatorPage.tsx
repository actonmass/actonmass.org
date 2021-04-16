import React from "react";
import _ from "lodash";

import BaseLayout from "../BaseLayout";

import "./legislator.scss";

type Props = {
  leg: GatsbyTypes.Legislator;
  committees: {
    title: string;
    role: "Chair" | "Vice-chair" | "Member";
  }[];
};

export default function LegislatorPage({ leg, committees }: Props) {
  const legTitle = leg.chamber === "house" ? "Rep." : "Sen";
  return (
    <BaseLayout>
      <main className="legislator-page">
        <div className="cbox">
          <div className="w1400">{/* {% include breadcrum.html %} */}</div>
        </div>
        <div className="cbox">
          <div className="w1400 top-container">
            <section className="rep-info top-box dark cbox">
              <div className="rep-info-container">
                {leg.square_picture && (
                  <img src={leg.square_picture} alt={`${leg.first_name} ${leg.last_name}`} />
                )}

                <p className="fRoboto fLight fWhite">
                  {legTitle} {leg.first_name}
                  {leg.last_name} - {leg.party}
                </p>
                <div className="icons">
                  {!_.isEmpty(leg.email) && (
                    <a href="mailto:{{leg.email}}">
                      <i className="far fa-envelope fa-2x"></i>
                    </a>
                  )}
                  {!_.isEmpty(leg.facebook) && (
                    <a href="{{leg.facebook}}" target="_blank">
                      <i className="fab fa-facebook-f fa-2x"></i>
                    </a>
                  )}
                  {!_.isEmpty(leg.twitter) && (
                    <a href="https://twitter.com/{{leg.twitter}}" target="_blank">
                      <i className="fab fa-twitter fa-2x"></i>
                    </a>
                  )}
                  {!_.isEmpty(leg.website) && (
                    <a href="{{leg.website}}" target="_blank">
                      <i className="far fa-window-maximize fa-2x"></i>
                    </a>
                  )}
                  {!_.isEmpty(leg.phone) && (
                    <a href="tel:{{leg.phone | uri_escape}}">
                      <i className="fas fa-phone fa-2x"></i>
                    </a>
                  )}
                </div>
              </div>
            </section>
            {leg.chamber === "senate" ? (
              <section className="top-box top-box-b dark">
                <h4 className="leg_pledge fUppercase fWhite fRaleway fRegular">
                  transparency pledge
                </h4>
                <div className="rect6">
                  {!leg.pledge ? (
                    <>
                      <img className="red_x" src="/img/red_x.png" alt="red X" />
                      <h5 className="leg_pledge_txt fWhite fRoboto fLight">
                        Ask {legTitle}
                        {leg.last_name} to sign the pledge!
                      </h5>
                    </>
                  ) : (
                    <>
                      <img className="green_check" src="/img/green_check.png " alt="green check" />
                      <h5 className="leg_pledge_txt fWhite fRoboto fLight">
                        {legTitle}
                        {leg.last_name} signed the pledge!
                      </h5>
                    </>
                  )}
                </div>
                {/* {% if leg.pledge == false %}
          {% capture btn_txt %}contact {legTitle}{% endcapture %}
            {% include modals/request-sign-pledge.html txt=btn_txt leg=leg %}
          {% endif %} */}
              </section>
            ) : (
              <section className="top-box top-box-b dark">
                <h4 className="leg_pledge fUppercase fWhite fRaleway fRegular">
                  The People's House
                </h4>
                <div className="rect6">
                  {!leg.supports_the_campaign ? (
                    <>
                      {/* <img className="red_x" src="/img/red_x.png" alt="red X" /> */}
                      <h5 className="leg_pledge_txt fWhite fRoboto fLight">
                        Ask {legTitle}
                        {leg.last_name} to support the campaign!
                      </h5>
                    </>
                  ) : (
                    <>
                      <img className="green_check" src="/img/green_check.png " alt="green check" />
                      <h5 className="leg_pledge_txt fWhite fRoboto fLight">
                        {legTitle}
                        {leg.last_name} supports the campaign!
                      </h5>
                    </>
                  )}
                </div>
                {/* {% if leg.supports_the_campaign != true %}
          {% capture btn_txt %}contact {legTitle}{% endcapture %}
            {% include modals/request-support-campaign.html txt=btn_txt leg=leg %}
          {% endif %} */}
              </section>
            )}

            <section className="top-box leg-committees cbox dark">
              <div className="leg-committees-container">
                <h4 className="leg_committ fRaleway fWhite fUppercase fRegular">Committees</h4>
                {!_.isEmpty(committees) && (
                  <div className="leg-list-committees">
                    {committees.map((committee) =>
                      committee.role !== "Member" ? (
                        <div className="rect7 chair">
                          <p className="fWhite fRegular">{committee.role}</p>
                          <h5 className="fWhite fRoboto fLight">{committee.title}</h5>
                        </div>
                      ) : (
                        <div className="rect7">
                          <h5 className="fWhite fRoboto fLight">{committee.title}</h5>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
        {/* <div className="cbox">
    <div className="w1400 bottom-container">
      <ul className="tabs dark">
        <li data-tab-target="#tab1" className="fInactive fUppercase fRaleway active tab dark">Progressive History</li>
        <li data-tab-target="#tab2" className="fInactive fUppercase fRaleway tab dark">Co-Sponsored Bills</li>
        <li data-tab-target="#tab3" className="fInactive fUppercase fRaleway tab dark">{leg.first_name} Says...</li>
      </ul>

      <div className="tab-content darker">
        <div id="tab1" data-tab-content className="active">
          {% assign votes = leg.votes | sort:"date" | reverse %}
          {% for vote in votes %}
          <div className="item_1">
          {% case vote.is_progressive %}
            {% when true %}
              <img className="green_check" src="/img/green_check.png" alt="green check">
              <p className="fWhite fLight">{{vote.date | date: "%Y" }} - {{ vote.description | markdownify | remove: "<p>" | remove: "</p>" }}</p>
            {% when false %}
              <img className="red_x" src="/img/red_x.png" alt="red x">
              <p className="fWhite fLight">{{vote.date | date: "%Y" }} - {{ vote.description | markdownify | remove: "<p>" | remove: "</p>" }}</p>
            {% else %}
              <div className="grey_question">
                <i className="fas fa-question-circle"></i>
              </div>
              <p className="fWhite fLight">{{vote.date | date: "%Y" }} - {{ vote.description | markdownify | remove: "<p>" | remove: "</p>" }}</p>
          {% endcase %}
          </div>
          {% endfor %}
        </div>
        <div id="tab2" data-tab-content>
          {% for issue in site.issues %}
          {% assign short_id = issue.id | replace: "/issues/", "" %}
          {% assign bills = site.data.cache.issues_by_id[short_id].bills %}
          {% if bills %}
            <h3 className="cosponsor_title fWhite fRoboto fRegular">{{issue.title}}</h3>
            {% for bill_id in bills %}
            {% assign bill = site.data.cache.bills_by_id[bill_id] %}
            <div className="item_1">
              {% if leg.cosponsored_bills contains bill_id %}
                <img className="green_check" src="/img/green_check.png" alt="green check">
              {% else %}
                <img className="red_x" src="/img/red_x.png" alt="red x">
              {% endif %}
              <p className="fWhite fLight"><a href="{{bill.id}}">{{bill.title}}</a></p>
              {% unless leg.cosponsored_bills contains bill_id %}
                {% include modals/request-co-sponsorship.html txt="request co-sponsorship" style="S" leg=leg bill=bill %}
              {% endunless %}
            </div>
            {% endfor %}
          {% endif %}
          {% endfor %}
        </div>
        <div id="tab3" data-tab-content>
          <p className="quote_text fWhite fRegular">No quote yet!</p>
        </div>
      </div>
    </div>
  </div> */}
      </main>
    </BaseLayout>
  );
}
