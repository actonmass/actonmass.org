import React from "react";
import { graphql, PageProps } from "gatsby";
import { Helmet } from "react-helmet";

import BaseLayout from "../BaseLayout";
import { generalSettings } from "../../content";

import "./climate.scss";

const img_folder = "/img/climate-ballot/";
const formatted_url = "ActOnMass.org";

type Data = {
  page: { title: string };
};

export default function ClimatePage({ data }: PageProps<Data>) {
  return (
    <BaseLayout title={data.page.title}>
      <Helmet>
        <script defer charSet="utf-8" type="text/javascript" src="/js/anima.js"></script>
      </Helmet>
      <main>
        <div className="actonmass anima-word-break">
          <div className="rectangle"></div>
          <section className="headline">
            <div className="section-container">
              <div className="a100renewablestr">100% RENEWABLES &amp; TRANSPARENT LEADERSHIP</div>
            </div>
          </section>
          <section className="the-problem">
            <div className="section-container cbox">
              <div className="theproblem">THE PROBLEM</div>
              <div className="staterepresentative">
                State Representatives tell us they support <br />
                100% renewables, but then the bill dies in committee. <br />
                How did they actually vote? No one knows!
              </div>
            </div>
          </section>
          <section className="tofight">
            <div className="section-container">
              <div className="tofightthisweu2019re">
                <span className="span1">To fight this, we’re </span>
                <span className="span2">proposing</span>
                <span className="span3"> </span>
                <span className="span4">two ballot measures</span>
                <span className="span5">:</span>
              </div>
              <div className="rectangle3"></div>
            </div>
          </section>
          <section className="voting">
            <div className="section-container hbox">
              <div className="cbox">
                <img
                  alt="Image"
                  anima-src={`${img_folder}act-on-mass-vote-3@2x.png`}
                  className="vote3"
                  src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                />
                <div className="transparentvoting">Transparent voting</div>
                <div className="sorepsknowwecan">so Reps know we can hold them accountable</div>
              </div>
              <div className="group13">
                <div className="rectangle5"></div>
                <img
                  alt="Image"
                  anima-src={`${img_folder}maclimated-democracy-triangle@2x.png`}
                  className="triangle"
                  src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                />
              </div>
              <div className="cbox">
                <img
                  alt="Image"
                  anima-src={`${img_folder}act-on-mass-renew-3@2x.png`}
                  className="renew3"
                  src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                />
                <div className="a100renewables">100% Renewables</div>
                <div className="withajusttransiti">with a just transition</div>
              </div>
            </div>
          </section>
          <section className="these-will-pass">
            <div className="section-container cbox">
              <div className="thesewillpasswith">
                <span className="span1">These will pass with </span>
                <span className="span2">broad support</span>
                <span className="span3"> so we can push for</span>
                <span className="span4"> broad reform</span>
                <span className="span5">. </span>
              </div>
              <div className="thenboldclimatea">
                Then, bold climate action and other popular legislation <br />
                will have a fighting chance in the statehouse.
              </div>
            </div>
          </section>
          <section className="form" id="sign">
            <div className="section-container">
              <div className="joinusbysigningt">JOIN US BY SIGNING THE APPLICATION FORM</div>
              <div className="grid">
                <CircledNumber number="1" />

                <div>
                  <div className="printyourformata">
                    <span className="span1">Print your form at </span>
                    <span className="span2">
                      <a href="https://actonmass.org/print">ActOnMass.org/print</a>
                    </span>
                  </div>
                  <div className="subtitle">It must be double-sided.</div>
                  <div className="noprintervisitac">
                    <span className="span1">No printer? Visit </span>
                    <span className="span2">
                      <a href="https://actonmass.org/mail">ActOnMass.org/mail</a>
                    </span>
                    <span className="span3"> to request a paper form.</span>
                  </div>
                </div>
                <CircledNumber number="2" />
                <div>
                  <div className="completeyourform">Complete your form</div>
                  <div className="subtitle">
                    Make sure there are no extra markings of any kind on the page.
                  </div>
                  <div className="hbox" style={{ justifyContent: "start" }}>
                    <div>
                      <div className="instruction hbox" style={{ justifyContent: "start" }}>
                        Add your state representative district
                        <img
                          alt="Image"
                          anima-src={`${img_folder}act-on-mass-line@2x.png`}
                          className="line"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                        />
                      </div>
                      <img
                        alt="Image"
                        anima-src={`${img_folder}act-on-mass-bitmap-3.png`}
                        className="bitmap2"
                        src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                      />
                    </div>
                    <div>
                      <div className="instruction fRegular">
                        <span className="span1">Visit </span>
                        <span className="fDemiBold">WhereDoIVoteMA.com</span>
                        <span className="span3"> to find yours</span>
                      </div>
                      <img
                        alt="Image"
                        anima-src={`${img_folder}act-on-mass-bitmap-1.png`}
                        className="bitmap4"
                        src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                      />
                      <div className="fRegular">If you still aren’t sure, just leave it blank.</div>
                    </div>
                  </div>
                  <div className="instruction">
                    <span className="span1">Fill in your name and address</span>
                    <span className="fRegular">(leave the ward and precinct blank)</span>
                  </div>
                  <img
                    alt="Image"
                    anima-src={`${img_folder}maclimated-democracy-bitmap-4.png`}
                    className="bitmap3"
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                  />
                  <div className="instruction">Add your city or town name</div>
                  <img
                    alt="Image"
                    anima-src={`${img_folder}maclimated-democracy-bitmap.png`}
                    className="bitmap"
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                  />
                </div>
                <CircledNumber number="3" />
                <div>
                  <div className="mailyourform">Mail your form to:</div>
                  <div className="actonmass11beaco">
                    Act on Mass
                    <br />
                    11 Beacon St STE 510
                    <br />
                    Boston, MA 02108
                  </div>
                </div>
              </div>
              <div className="ifyouhaveanyques">
                <span className="span1">If you have any questions, email </span>
                <span className="span2">
                  <a href="mailto:BallotQuestion@BetterFutureProject.org">
                    BallotQuestion@BetterFutureProject.org
                  </a>
                </span>
              </div>
            </div>
          </section>
          <section className="next-steps">
            <div className="section-container">
              <div className="nextsteps">NEXT STEPS</div>
              <div className="hbox next-step-actions">
                <div className="cbox">
                  <div className="group9 action-logo">
                    <img
                      alt="Image"
                      anima-src={`${img_folder}maclimated-democracy-oval-3@2x.png`}
                      className="oval"
                      src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                    />
                    <img
                      alt="Image"
                      anima-src={`${img_folder}maclimated-democracy-oval-4@2x.png`}
                      className="oval1"
                      src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                    />
                    <div className="rectangle5"></div>
                  </div>
                  <div className="learnmoreatactonm">
                    <span className="span1">
                      Learn more at
                      <br />
                    </span>
                    <span className="span2">
                      <a href="/info">{formatted_url}/info</a>
                    </span>
                  </div>
                </div>
                <div className="cbox">
                  <img
                    alt="Image"
                    anima-src={`${img_folder}act-on-mass-mail-3@2x.png`}
                    className="mail3 action-logo"
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                  />
                  <div className="sendthistoyourfr">
                    Send this to your <br />
                    friends and family
                  </div>
                </div>
                <div className="cbox">
                  <div className="group4 action-logo">
                    <div className="group7">
                      <div className="rectangle7"></div>
                    </div>
                    <div className="rectangle6"></div>
                    <div className="rectangle11"></div>
                    <div className="rectangle21"></div>
                    <div className="rectangle31"></div>
                    <div className="rectangle41"></div>
                    <div className="rectangle5"></div>
                  </div>
                  <div className="signuptovolunteer">
                    <span className="span1">
                      Sign up to volunteer <br />
                      at{" "}
                    </span>
                    <span className="span2">
                      <a href="/vol">{formatted_url}/VOL</a>
                    </span>
                  </div>
                </div>
                <div className="cbox">
                  <img
                    alt="Image"
                    anima-src={`${img_folder}maclimated-democracy-donate-3@2x.png`}
                    className="donate3 action-logo"
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                  />
                  <div className="donatetoactonmas">
                    <span className="span1">Donate to </span>
                    <span className="span2">
                      <a href={generalSettings.donate_button_url}>Act On Mass</a>
                    </span>
                    <span className="span3">
                      {" "}
                      &amp; <br />
                    </span>
                    <span className="span4">
                      <a href="https://www.betterfutureaction.org/350massactiondonate">350 Mass</a>
                    </span>
                    <span className="span5"> if you are able</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="logos hbox">
            <img
              alt="Image"
              anima-src={`${img_folder}maclimated-democracy-logos-3@2x.png`}
              className="logos3"
              src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            />
            <img
              alt="Image"
              anima-src={`${img_folder}act-on-mass-350-logo@2x.png`}
              className="a350logo"
              src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            />
          </section>
        </div>
      </main>
    </BaseLayout>
  );
}

function CircledNumber({ number }: { number: string }) {
  return (
    <div className="circled-number">
      <img
        alt="Image"
        anima-src={`${img_folder}maclimated-democracy-oval@2x.png`}
        className="oval"
        src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
      />
      <div className="a1">{number}</div>
    </div>
  );
}

export const query = graphql`
  query($id: String) {
    page(id: { eq: $id }) {
      title
    }
  }
`;
