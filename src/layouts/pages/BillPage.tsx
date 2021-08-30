import React from "react";
import _ from "lodash";
import ReactMarkdown from "react-markdown";

import { HeroImage, LegCircle, FindMyReps, BreadCrum, BillHistory, Map } from "../../components";
import { RequestCommitteeVote } from "../../components/Modals/RequestCommitteeVote";
import { RequestCosponsorshipMyRep } from "../../components/Modals/RequestCosponsorshipMyRep";
import BaseLayout from "../BaseLayout";

import "./bill.scss";

type Props = {
  bill: GatsbyTypes.Bill;
};

export default function BillPage({ bill }: Props) {
  const shouldShowSponsors = !bill.no_sponsorship_data;
  const co_sponsors = new Set((bill.co_sponsors ?? []).map((leg) => leg.id));
  const committee = bill.committee;
  return (
    <BaseLayout title={bill.title}>
      <main className="bill-page">
        <section className="headline dark cbox">
          <div className="w1400">
            <BreadCrum
              title={bill.title}
              links={[
                { text: "Bills", href: "/bills" },
                {
                  text: bill.issue?.title?.toUpperCase() ?? "",
                  href: bill.issue?.href ?? "",
                },
              ]}
            />
            <div className="headline-container">
              <div className="billpg_title">
                <h2 className="billpg_title fExbold">{bill.title}</h2>
                <p>
                  {bill.full_title} -{" "}
                  <a href={bill.house_link} target="_blank">
                    {bill.house_no}
                  </a>{" "}
                  -{" "}
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
        {bill.committee != null && (
          <section className="decision-makers dark cbox">
            <div className="w1400">
              <h2 className="billpg_decision_header fWhite fBold fUppercase">
                the decision makers
              </h2>
              <h3 className="billpg_decision_header1  fWhite fRegular">{bill.committee.title}</h3>
              <div className="cbox">
                <div className="rect_underline1"></div>
              </div>
              <h4 className="billpg_decision_header2 fUppercase fWhite fRaleway fBold">
                Who on committee has co-sponsored:
              </h4>
              <div className={`committee-block ${committee.chamber}`}>
                {bill.committee.chamber !== "house" && (
                  <div className="senators vbox">
                    <h4 className="fUppercase fWhite fRaleway fRegular">state senators:</h4>

                    <div className="chairs hbox">
                      {committee.senate_chair && (
                        <div className="vbox">
                          <LegCircle
                            rep={committee.senate_chair}
                            status={
                              bill.no_sponsorship_data
                                ? null
                                : co_sponsors.has(committee.senate_chair.id)
                                ? "ok"
                                : "ko"
                            }
                            size="L"
                          />
                          <p className="fRoboto fWhite fBold fUppercase">chair</p>
                        </div>
                      )}

                      {committee.senate_vice_chair && (
                        <div className="vbox">
                          <LegCircle
                            rep={committee.senate_vice_chair}
                            status={
                              bill.no_sponsorship_data
                                ? null
                                : co_sponsors.has(committee.senate_vice_chair.id)
                                ? "ok"
                                : "ko"
                            }
                            size="L"
                          />
                          <p className="fRoboto fWhite fBold fUppercase">chair</p>
                        </div>
                      )}
                    </div>

                    <div className="members">
                      {committee.senate_members.map((member) => (
                        <LegCircle
                          key={member.id}
                          rep={member}
                          status={
                            bill.no_sponsorship_data
                              ? null
                              : co_sponsors.has(member.id)
                              ? "ok"
                              : "ko"
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}
                {bill.committee.chamber !== "senate" && (
                  <div className="reps vbox">
                    <h4 className="fUppercase fWhite fRaleway fRegular">state representatives:</h4>

                    <div className="chairs hbox">
                      {committee.house_chair && (
                        <div className="vbox">
                          <LegCircle
                            rep={committee.house_chair}
                            status={
                              bill.no_sponsorship_data
                                ? null
                                : co_sponsors.has(committee.house_chair.id)
                                ? "ok"
                                : "ko"
                            }
                            size="L"
                          />
                          <p className="fRoboto fWhite fBold fUppercase">chair</p>
                        </div>
                      )}

                      {committee.house_vice_chair && (
                        <div className="vbox">
                          <LegCircle
                            rep={committee.house_vice_chair}
                            status={
                              bill.no_sponsorship_data
                                ? null
                                : co_sponsors.has(committee.house_vice_chair.id)
                                ? "ok"
                                : "ko"
                            }
                            size="L"
                          />
                          <p className="fRoboto fWhite fBold fUppercase">chair</p>
                        </div>
                      )}
                    </div>

                    <div className="members">
                      {committee.house_members.map((member) => (
                        <LegCircle
                          key={member.id}
                          rep={member}
                          status={
                            bill.no_sponsorship_data
                              ? null
                              : co_sponsors.has(member.id)
                              ? "ok"
                              : "ko"
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <RequestCommitteeVote bill={bill} />
            </div>
          </section>
        )}
        {shouldShowSponsors && (
          <section className="map cbox">
            <div className="w1400">
              <h3 className="fUppercase fExbold">Who has co-sponsored:</h3>
              <div className="map-block dark">
                <Map bill={bill} />
              </div>
              <div className="cbox">
                <RequestCosponsorshipMyRep bill={bill} />
              </div>
            </div>
          </section>
        )}
        {false && (
          <section className="timeline light-blue cbox">
            <div className="w1400">
              <h3 className="billpg_timeln_header fUppercase fExbold">
                Timeline of bill during this session:
              </h3>
              {/* DISABLED FOR NOW
              {% include bill-timeline.html timeline = bill.timeline %} */}
            </div>
          </section>
        )}
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
