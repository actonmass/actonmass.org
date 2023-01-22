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
            <h2 className="campaign_title">{page.title}</h2>
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
        <section className="problem_and_solution medium-blue">
          <div className="campaign_blocks hbox">
              <div className="campaign_ps dark">
                <h3>The Problem:</h3>
                <h4>A legislature that de-centers and devalues constituent voices</h4>
                <ul>
                  <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                  </li>
                  <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                  </li>
                  <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                  </li>
                </ul>
                <a href="https://actonmass.org/about-us">Learn more about the need for State House reform.</a>
              </div>
              <div className="campaign_ps dark">
                <h3>Our Solution:</h3>
                <h4>Build grassroots power to reform the broken State House</h4>
                <ul>
                  <li>
                  Recruit and organize District Teams in State House districts across the Commonwealth
                  </li>
                  <li>
                  Meet with state legislators to request that they vote for state house reform when the new House and Joint Rules are written
                  </li>
                  <li>
                  Escalate pressure alongside District Teans
                  </li>
                </ul>
              </div>
            </div>
          {/* change image */}
          <div className="campaign_ps_image_container cbox">
            <img className="campaign_ps_image" src="https://d33wubrfki0l68.cloudfront.net/35ebe6a915c3cbb8337a5d629e6fe5df99eda82c/770cf/img/newcampaign1.jpg" alt="State House" width="500px"></img>
          </div>
        </section>
        <section className="public_committee_votes dark">
          <div className="campaign_title_div">
            <h2 className="campaign_title">Our 2023 priority: Public Committee Votes</h2>
          </div>
          <div className="campaign_info_boxes_containter cbox">
            <div className="info_box medium-blue">
              <p>The Legislature starts every new session by writing their own rulebook. Every two years the legislature adopts anti-transparent rules that deliberately exclude the public from participating in the lawmaking process. Namely, the House and Joint rules do not require that votes taken in legislative committees be made public. This is disastrous for democracy--how can we hold our legislators accountable when we can't see how they're voting?</p>
              {/* make below an accordian */}
              <p>Read more about why making public committee votes is so crucial</p>  
            </div>
            <div className="info_box medium-blue">
              <p>Our aim is the adoption of an amendment to make all committee votes public. This is an exceptionally popular piece of legislation: since 2020, our <span className="campaign_underline">non-binding ballot question </span> for public committee votes received an average of <span className="campaign_underline">87% approval among the electorate</span>
              . Despite an overwhelming mandate for public committee votes, the legislature has, until now, refused to show us how they vote.</p>
              <br />
              <p>That's where you come in.</p>
            </div>
          </div>
        </section>
        <section className="transparency_captain dark cbox">
          <div>
            <h2 className="campaign_title">Become a Transparency Captain!</h2>
          </div>
          <div className="campaign_transparency_container two-blocks">
              <div className="hero_box_a ">
                <p>Our strategy is to organize across the Commonwealth to hold as many grassroots lobby meetings with legislators as possible where their constituents ask them to support public committee votes when it comes to a vote in January. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip e</p>
              </div>
              <div className="hero_box_b">
                <img className="campaign_transparency_image" src="https://d33wubrfki0l68.cloudfront.net/35ebe6a915c3cbb8337a5d629e6fe5df99eda82c/770cf/img/newcampaign1.jpg" alt="State House" width="500px"></img>
              </div>
          </div>
          <a href="https://actonmass.org/transparency/" className="campaign_btn btn">
            Become a Transparency Captain
          </a>
        </section>
        <section className="write_a_letter dark cbox">
          <div>
            <h2 className="campaign_title">Write a Letter to the Editor!</h2>
          </div>
          <div className="campaign_main_container">
            <div className="campaign_letter_container two-blocks rev">
              <div className="hero_box_a ">
                <p>Our strategy is to organize across the Commonwealth to hold as many grassroots lobby meetings with legislators as possible where their constituents ask them to support public committee votes when it comes to a vote in January. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip e</p>
              </div>
              <div className="hero_box_b">
                <img className="campaign_transparency_image" src="https://d33wubrfki0l68.cloudfront.net/35ebe6a915c3cbb8337a5d629e6fe5df99eda82c/770cf/img/newcampaign1.jpg" alt="State House" width="500px"></img>
              </div>
            </div>
          </div>
          <a href="https://actonmass.org/transparency/" className="campaign_btn btn">
            Check out our LTE Toolkit
          </a>
        </section>
        <MDXProvider components={components}>
          <MDXRenderer
            scope={{
              legs: data.allLegislator.nodes[0].last_name,
            }}
          >
            {page.parent.body}
          </MDXRenderer>
        </MDXProvider>
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
