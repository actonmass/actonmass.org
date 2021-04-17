import React from "react";
import { graphql, PageProps } from "gatsby";
import _ from "lodash";

import { BreadCrum, HeroImage, FindMyReps, LegCircle } from "../../components";
import { RequestSignPledgeMyRep } from "../../components/Modals";
import { BaseLayout } from "..";

import "./pledge.scss";

type QueryProps = {
  page: GatsbyTypes.Page;
  legs: { nodes: GatsbyTypes.Legislator[] };
};

export default function PledgePage({ data }: PageProps<QueryProps>) {
  const page = data.page;
  const frontmatter = (data.page.parent as any).frontmatter;
  const [reps, sens] = _.partition(data.legs.nodes, (leg) => leg.chamber === "house");

  return (
    <BaseLayout title={page.title}>
      <main className="pledge-page">
        <section className="headline dark cbox">
          <div className="w1400">
            <BreadCrum title={page.title} />
            <h1 className="pledge_title fBold">voters deserve to know pledge</h1>
            <div className="two-blocks rev">
              <div className="hero_box_a">
                <HeroImage img="/img/pledge_img.png" alt="Rep Gouveia signed the pledge!" />
              </div>
              <div className="hero_box_b">
                <div className="pledge_hero_text">
                  <h2 className="hero_quote_txt fWhite fRegular">
                    Massachusetts’ legislature is one of the most secretive in the country.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="the-pledge medium-blue cbox">
          <div className="w1400 two-blocks">
            <div className="pledge_box_a">
              <img className="pledge" src="/img/pledge-doc.png" alt="pledge print" />
            </div>
            <div className="pledge_box_b">
              <div className="small_rect"></div>
              <h3 className="fRaleway fUppercase fDark fBold">the transparency pledge:</h3>
              <h4 className="fRoboto fLight fDark">
                Massachusetts’ legislature is one of the most secretive in the country. Important
                progressive legislation is killed year after year in back rooms without any public
                record. But together we can change this. We can ask our elected legislators to take
                action to create transparency today so important progressive bills don’t die in
                darkness.
              </h4>
              <RequestSignPledgeMyRep />
            </div>
          </div>
        </section>

        <FindMyReps theme="dark" text="Did your legislator sign the pledge?" mode="pledge" />

        <section className="pledge_reps cbox light-blue">
          <div className="w1400">
            <h6 className="pledge_leg_title fRaleway fUppercase fExbold">Current signatories</h6>
            <h4 className="pledge_leg_subtitle fRaleway fUppercase fRegular">
              state representatives:
            </h4>
            <div className="legislator-grid">
              {reps.map((rep) => (
                <LegCircle key={rep.href} rep={rep} size="L" status="ok" />
              ))}
            </div>
            <h4 className="pledge_leg_subtitle fRaleway fUppercase fRegular">state senators:</h4>
            <div className="legislator-grid">
              {sens.map((sen) => (
                <LegCircle key={sen.href} rep={sen} size="L" status="ok" />
              ))}
            </div>
            <div className="cbox">
              <RequestSignPledgeMyRep />
            </div>
          </div>
        </section>

        <section className="pledge_endorse cbox">
          <div className="w1400">
            <h3 className="pledge_endorse_title fUppercase fBold">endorsing organizations:</h3>
            <div className="pledge-endorse-container">
              {frontmatter.endorsing_orgs.map((org) => (
                <img key={org.img} className="endorse_img" src={org.img} alt={org.title} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </BaseLayout>
  );
}

// TODO: will need to adapt when we switch to MDX
export const query = graphql`
  query {
    page(id: { eq: "/pledge/" }) {
      id
      title
      parent {
        id
        ... on MarkdownRemark {
          frontmatter {
            endorsing_orgs {
              title
              img
            }
          }
        }
      }
    }
    legs: allLegislator(filter: { pledge: { eq: true } }, sort: { fields: last_name }) {
      nodes {
        square_picture
        last_name
        first_name
        href
        party
        hometown
        chamber
      }
    }
  }
`;
