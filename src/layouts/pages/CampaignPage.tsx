import React, { useMemo } from "react";
import { PageProps, graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";

import BaseLayout from "../BaseLayout";
import LegislatorSearch from "../../components/FindMyReps";
import LegCircle from "../../components/LegCircle";
import "./campaign.scss";
import { campaign } from "../../content";
// A little hacky... Ideally we should properly put this data in GQL
const {
  campaign_message: campaignMainMessage,
  campaign_problem_and_solution: campaignProblemAndSolution,
  campaign_priority_message: campaignPriorityMessage,
  campaign_transparency_message: campaignTransparencyMessage,
  campaign_letter_message: campaignLetterMessage,
} = campaign;

type Data = {
  page: {
    title: string;
    parent: { body: any };
  };
  allLegislator: { nodes: Queries.Legislator[] };
};

export default function CampaignPage({ data, children }: PageProps<Data>) {
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
            <h2 className="campaign_title">{campaignMainMessage[0].title}</h2>
            <p className="supporting_text">{campaignMainMessage[0].main_text}</p>
          </div>
          <img
            className="campaign_main_image"
            src={campaignMainMessage[0].main_image}
            alt="State House"
          ></img>
          <div className="campaign_main_container">
            <div className="campaign_starter_text">
              <p className="campaign_text_block">{campaignMainMessage[0].first_main_paragraph}</p>
              <br />
              <p className="campaign_text_block">{campaignMainMessage[0].second_main_paragraph}</p>
            </div>
            <div className="campaign_main_buttons">
              <a href={campaignMainMessage[0].first_href} className="campaign_btn btn">
                Join the campaign!
              </a>
              <br />
              <a href={campaignMainMessage[0].second_href} className="campaign_btn btn learn_more">
                Learn more about state house reform
              </a>
            </div>
          </div>
        </section>
        <section className="write_a_letter light-blue cbox">
          <div>
            <h2 className="campaign_title">{campaignLetterMessage[0].letter_title}</h2>
          </div>
          <div className="campaign_main_container">
            <div className="campaign_letter_container two-blocks rev">
              <div className="hero_box_a ">
                <p>{campaignLetterMessage[0].letter_main_text}</p>
              </div>
              <div className="hero_box_b">
                <img
                  className="campaign_transparency_image"
                  src={campaignLetterMessage[0].letter_image}
                  alt="State House"
                  width="500px"
                ></img>
              </div>
            </div>
          </div>
          <a href={campaignLetterMessage[0].letter_href} className="campaign_btn btn">
            Check out our LTE Toolkit
          </a>
        </section>
        <section className="problem_and_solution medium-blue">
          <div className="campaign_blocks hbox">
            <div className="campaign_ps dark">
              <h3>{campaignProblemAndSolution[0].problem_title}:</h3>
              <h4>{campaignProblemAndSolution[0].problem_main_text}</h4>
              <ul>
                <li>{campaignProblemAndSolution[0].first_problem}</li>
                <li>{campaignProblemAndSolution[0].second_problem}</li>
                <li>{campaignProblemAndSolution[0].third_problem}</li>
              </ul>
              <a href={campaignProblemAndSolution[0].problem_href}>
                Learn more about the need for State House reform.
              </a>
            </div>
            <div className="campaign_ps dark">
              <h3>{campaignProblemAndSolution[0].solution_title}:</h3>
              <h4>{campaignProblemAndSolution[0].solution_main_text}</h4>
              <ul>
                <li>{campaignProblemAndSolution[0].first_solution}</li>
                <li>{campaignProblemAndSolution[0].second_solution}</li>
                <li>{campaignProblemAndSolution[0].third_solution}</li>
              </ul>
            </div>
          </div>
          <div className="campaign_ps_image_container cbox">
            <img
              className="campaign_ps_image"
              src={campaignProblemAndSolution[0].problem_and_solution_image}
              alt="People holding signs"
              width="500px"
            ></img>
          </div>
        </section>
        <section className="public_committee_votes dark">
          <div className="campaign_title_div">
            <h2 className="campaign_title">{campaignPriorityMessage[0].priority_title}</h2>
          </div>
          <div className="campaign_info_boxes_containter cbox">
            <div className="info_box medium-blue">
              <p>{campaignPriorityMessage[0].priority_first_main_paragraph}</p>
              {/* make below link an accordian in the future */}
              <a href={campaignPriorityMessage[0].priority_href} style={{ color: "black" }}>
                {campaignPriorityMessage[0].priority_second_main_paragraph}
              </a>
            </div>
            <div className="info_box medium-blue">
              <p>{campaignPriorityMessage[0].priority_third_main_paragraph}</p>
              <br />
              <p>{campaignPriorityMessage[0].priority_fourth_main_paragraph}</p>
            </div>
          </div>
        </section>
        <section className="transparency_captain medium-blue cbox">
          <div>
            <h2 className="campaign_title_dark">
              {campaignTransparencyMessage[0].transparency_title}
            </h2>
          </div>
          <div className="campaign_main_container">
            <div className="campaign_transparency_container two-blocks">
              <div className="hero_box_a ">
                <p>{campaignTransparencyMessage[0].transparency_main_text}</p>
              </div>
              <div className="hero_box_b">
                <img
                  className="campaign_transparency_image"
                  src={campaignTransparencyMessage[0].transparency_image}
                  alt="People smiling with protest signs"
                  width="500px"
                ></img>
              </div>
            </div>
            <a href={campaignTransparencyMessage[0].transparency_href} className="campaign_btn btn">
              Become a Transparency Captain
            </a>
          </div>
        </section>

        <MDXProvider components={components}>{children}</MDXProvider>
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
  query ($id: String) {
    page(id: { eq: $id }) {
      title
    }
    allLegislator(sort: { last_name: ASC }, filter: { supports_the_campaign: { eq: true } }) {
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
