import React from "react";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Link } from "gatsby";

import BaseLayout from "../BaseLayout";
import { BreadCrum } from "../../components";
import { RequestSignPledge } from "../../components/Modals/RequestSignPledge";
import { RequestSupportCampaign } from "../../components/Modals/RequestSupportCampaign";
import { RequestCosponsorship } from "../../components/Modals/RequestCosponsorship";

import "./legislator.scss";

type Props = {
  leg: Queries.Legislator;
  issues: Queries.Issue[];
};

export default function LegislatorPage({ leg, issues }: Props) {
  const cosponsoredBillIds = leg.cosponsored_bills.map((bill) => bill.id);
  const legTitle = leg.chamber === "house" ? "Rep." : "Sen";
  const pageTitle = `${leg.first_name} ${leg.last_name}`;
  return (
    <BaseLayout title={pageTitle}>
      <main className="legislator-page">
        <div className="cbox">
          <div className="w1400">
            <BreadCrum
              title={pageTitle}
              links={[
                {
                  text: "Legislator Search",
                  href: "/legislator-search",
                },
              ]}
            />
          </div>
        </div>
        <div className="cbox">
          <div className="w1400 top-container">
            <section className="rep-info top-box dark cbox">
              <div className="rep-info-container">
                {leg.square_picture && (
                  <img src={leg.square_picture} alt={`${leg.first_name} ${leg.last_name}`} />
                )}

                <p className="fRoboto fLight fWhite">
                  {legTitle} {leg.first_name} {leg.last_name}
                  {leg.party && <> - {leg.party}</>}
                </p>
                <div className="icons">
                  {!_.isEmpty(leg.email) && (
                    <a href={`mailto:${leg.email}`}>
                      <FontAwesomeIcon icon={faEnvelope} size="2x" />
                    </a>
                  )}
                  {!_.isEmpty(leg.facebook) && (
                    <a href={leg.facebook} target="_blank">
                      <FontAwesomeIcon icon={faFacebookF} size="2x" />
                    </a>
                  )}
                  {!_.isEmpty(leg.twitter) && (
                    <a href={`https://twitter.com/${leg.twitter}`} target="_blank">
                      <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </a>
                  )}
                  {!_.isEmpty(leg.website) && (
                    <a href={leg.website} target="_blank">
                      <FontAwesomeIcon icon={faWindowMaximize} size="2x" />
                    </a>
                  )}
                  {!_.isEmpty(leg.phone) && (
                    <a href={`tel:${encodeURIComponent(leg.phone)}`}>
                      <FontAwesomeIcon icon={faPhone} size="2x" />
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
                        Ask {legTitle} {leg.last_name} to sign the pledge!
                      </h5>
                    </>
                  ) : (
                    <>
                      <img className="green_check" src="/img/green_check.png " alt="green check" />
                      <h5 className="leg_pledge_txt fWhite fRoboto fLight">
                        {legTitle} {leg.last_name} signed the pledge!
                      </h5>
                    </>
                  )}
                </div>
                {!leg.pledge && <RequestSignPledge leg={leg} txt={`Contact ${legTitle}`} />}
              </section>
            ) : (
              <section className="top-box top-box-b dark">
                <h4 className="leg_pledge fUppercase fWhite fRaleway fRegular">
                  The People's House
                </h4>
                <div className="rect6">
                  {!leg.supports_the_campaign ? (
                    <>
                      {false && <img className="red_x" src="/img/red_x.png" alt="red X" />}
                      <h5 className="leg_pledge_txt fWhite fRoboto fLight">
                        Ask {legTitle} {leg.last_name} to support the campaign!
                      </h5>
                    </>
                  ) : (
                    <>
                      <img className="green_check" src="/img/green_check.png " alt="green check" />
                      <h5 className="leg_pledge_txt fWhite fRoboto fLight">
                        {legTitle} {leg.last_name} supports the campaign!
                      </h5>
                    </>
                  )}
                </div>
                {!leg.supports_the_campaign && (
                  <RequestSupportCampaign leg={leg} txt={`Contact ${legTitle}`} />
                )}
              </section>
            )}

            <section className="top-box leg-committees cbox dark">
              <div className="leg-committees-container">
                <h4 className="leg_committ fRaleway fWhite fUppercase fRegular">Committees</h4>
                {!_.isEmpty(leg.committees) && (
                  <div className="leg-list-committees">
                    {leg.committees.map((legCom) =>
                      legCom.role !== "Member" ? (
                        <div className="rect7 chair">
                          <p className="fWhite fRegular">{legCom.role}</p>
                          <h5 className="fWhite fRoboto fLight">{legCom.committee.title}</h5>
                        </div>
                      ) : (
                        <div className="rect7">
                          <h5 className="fWhite fRoboto fLight">{legCom.committee.title}</h5>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
        <div className="cbox">
          <div className="w1400 bottom-container">
            <ul className="tabs dark">
              {false && (
                <li data-tab-target="#tab1" className="fInactive fUppercase fRaleway tab dark">
                  Progressive History
                </li>
              )}
              <li data-tab-target="#tab2" className="fInactive active fUppercase fRaleway tab dark">
                Co-Sponsored Bills
              </li>
              {false && (
                <li data-tab-target="#tab3" className="fInactive fUppercase fRaleway tab dark">
                  {leg.first_name} Says...
                </li>
              )}
            </ul>

            <div className="tab-content darker">
              {/* DISABLED FOR NOW
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
                <FontAwesomeIcon icon={faQuestionCircle}/>
              </div>
              <p className="fWhite fLight">{{vote.date | date: "%Y" }} - {{ vote.description | markdownify | remove: "<p>" | remove: "</p>" }}</p>
          {% endcase %}
          </div>
          {% endfor %}
              </div> */}
              <div id="tab2" data-tab-content>
                {issues.map((issue) => {
                  if (_.isEmpty(issue.bills)) {
                    return null;
                  }
                  return (
                    <>
                      <h3 className="cosponsor_title fWhite fRoboto fRegular">{issue.title}</h3>
                      {issue.bills
                        .filter((bill) => !bill.hidden && !bill.no_sponsorship_data)
                        .map((bill) => {
                          const sponsored = cosponsoredBillIds.includes(bill.id);
                          return (
                            <div className="item_1">
                              {sponsored ? (
                                <img
                                  className="green_check"
                                  src="/img/green_check.png"
                                  alt="green check"
                                />
                              ) : (
                                <img className="red_x" src="/img/red_x.png" alt="red x"></img>
                              )}
                              <p className="fWhite fLight">
                                <Link to={bill.href}>{bill.title}</Link>
                              </p>

                              {!sponsored && (
                                <RequestCosponsorship
                                  bill={bill}
                                  style="S"
                                  leg={leg}
                                  txt="Request co-sponsorship"
                                />
                              )}
                            </div>
                          );
                        })}
                    </>
                  );
                })}
              </div>

              {/*  DISABLED FOR NOW
              <div id="tab3" data-tab-content>
                <p className="quote_text fWhite fRegular">No quote yet!</p>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </BaseLayout>
  );
}
