import React, { useMemo } from "react";
import { PageProps, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import BaseLayout from "../BaseLayout";
import LegislatorSearch from "../../components/FindMyReps";
import LegCircle from "../../components/LegCircle";

import "./campaign.scss";

type Data = {
  page: {
    title: string;
    parent: { body: any };
  };
  allLegislator: { nodes: GatsbyTypes.Legislator[] };
};

export default function CampaignPage({ data }: PageProps<Data>) {
  const page = data.page;
  const components = useMemo(
    () => ({
      LegislatorSearch,
      SupportingReps: () => <SupportingReps reps={data.allLegislator.nodes} />,
    }),
    []
  );
  return (
    <BaseLayout>
      <main className="campaign-page">
        <section className="headline dark">
          <div className="campaign_title_div">
            <h2 className="campaign_title">{page.title} Campaign</h2>
            <p className="supporting_text">The MA State House is broken, and we need your help to fix it.</p>
          </div>
          <img className="campaign_main_image" src="https://d33wubrfki0l68.cloudfront.net/35ebe6a915c3cbb8337a5d629e6fe5df99eda82c/770cf/img/newcampaign1.jpg" alt="State House" width="500px"></img>
          <div className="campaign_main_container">
            <div className="campaign_starter_text">
              <p className="campaign_text_block">The Massachusetts State House is one of the least transparent in the country. When decisions about
  what bills will pass are made in backroom deals with a small handful of people, that’s not
  democracy. Bay Staters deserve a government that centers their voices - not one that bends over
  backwards to keep them out.</p>
              <br />
              <p className="campaign_text_block">Together, we can make the State House the People's House. Will you join us?</p>
            </div>
            <div className="campaign_main_buttons">
              <a href="https://secure.everyaction.com/oITinRw4Ck-JRO3NetrRFA2" className="campaign_btn btn">
                Join the campaign!
              </a>
              <br />
              <a href="https://actonmass.org/transparency/" className="campaign_btn btn learn_more">
                Learn more about state house reform 
              </a>
            </div>
          </div>
        </section>
        <section className="problem_and_solution">
          <div className="problem">
            <h1>text</h1>
          </div>
          <div className="solution">
            <h1>hi</h1>
          </div>
          {/* change image */}
          <img className="campaign_main_image" src="https://d33wubrfki0l68.cloudfront.net/35ebe6a915c3cbb8337a5d629e6fe5df99eda82c/770cf/img/newcampaign1.jpg" alt="State House" width="500px"></img>
        </section>
        <section className="public_committee_votes dark">
          <div className="campaign_title_div">
            <h2 className="campaign_title">Our 2023 priority: Public Committee Votes</h2>
          </div>
          <div className="campaign_info_boxes_containter">
            <div className="info_box">
              <p>test.</p>
            </div>
            <div className="info_box">
              <p>test </p>
            </div>
          </div>
        </section>
        <section className="transparency_captain dark">
          <div>
            <h2 className="campaign_title">Become a Transparency Captain!</h2>
          </div>
          <div className="campaign_main_container">
            <div className="campaign_starter_text">
              <p>Our strategy...</p>
            </div>
            <div className="captain_image">
              {/* chagne image */}
            <img className="campaign_main_image" src="https://d33wubrfki0l68.cloudfront.net/35ebe6a915c3cbb8337a5d629e6fe5df99eda82c/770cf/img/newcampaign1.jpg" alt="State House" width="500px"></img>
            </div>
          </div>
          <a href="https://actonmass.org/transparency/" className="btn">
            Become a Transparency Captain
          </a>
        </section>
        {/* place holder for write a letter to the editor!
        <section className="transparency_captain dark">
          <div>
            <h2 className="campaign_title">Become a Transparency Captain!</h2>
          </div>
          <div className="campaign_main_container">
            <div className="campaign_starter_text">
              <p>Our strategy...</p>
            </div>
            <div className="captain_image">
            <img className="campaign_main_image" src="https://d33wubrfki0l68.cloudfront.net/35ebe6a915c3cbb8337a5d629e6fe5df99eda82c/770cf/img/newcampaign1.jpg" alt="State House" width="500px"></img>
            </div>
          </div>
          <a href="https://actonmass.org/transparency/" className="btn">
            Become a Transparency Captain
          </a>
        </section> */}
        {/* placeholder for where does your rep stand on public committee votes */}
        {/* <MDXProvider components={components}>
          <MDXRenderer
            scope={{
              legs: data.allLegislator.nodes[0].last_name,
            }}
          >
            {page.parent.body}
          </MDXRenderer>
        </MDXProvider> */}
      </main>
    </BaseLayout>
  );
}

const SupportingReps = ({ reps }) => (
  <div className="leg-grid">
    {reps.map((rep) => {
      const commitments = [
        rep.supports_the_campaign_committee_votes && "1",
        rep.supports_the_campaign_public_bills && "2",
        rep.supports_the_campaign_term_limits && "3",
      ].filter((i) => i);
      const msg = `Amendment${commitments.length > 1 ? "s" : ""} ${commitments.join(", ")}`;
      return <LegCircle key={rep.href} rep={rep} status="ok" size="XS" msg={msg} />;
    })}
  </div>
);

export const query = graphql`
  query($id: String) {
    page(id: { eq: $id }) {
      title
      parent {
        ... on Mdx {
          body
        }
      }
    }

    allLegislator(sort: { fields: last_name }, filter: { supports_the_campaign: { eq: true } }) {
      nodes {
        href
        first_name
        last_name
        party
        square_picture
        supports_the_campaign_public_bills
        supports_the_campaign_term_limits
        supports_the_campaign_committee_votes
        district {
          name
        }
      }
    }
  }
`;
