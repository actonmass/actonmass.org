import _ from "lodash";

type Collections = {
  [dirName: string]: {
    name: string;
    process: (rawItem) => any;
  };
};

const collections: Collections = {
  legislators: {
    name: "Legislator",
    process: (rawLeg) => {
      return {
        ...rawLeg,
        supports_the_campaign: rawLeg.supports_the_campaign ?? false,
        pledge: rawLeg.pledge ?? false,
        start_date: rawLeg.start_date || null,
        end_date: rawLeg.end_date || null,
        chamber: rawLeg.district.startsWith("house") ? "house" : "senate",
      };
    },
  },
  districts: {
    name: "District",
    process: _.identity,
  },
  issues: {
    name: "Issue",
    process: (issue) => ({
      ...issue,
      learn_more: issue.learn_more ?? [],
      references: issue.references ?? [],
      failures: issue.failures ?? [],
      questions: issue.questions ?? [],
    }),
  },
  bills: {
    name: "Bill",
    process: _.identity,
  },
  committees: {
    name: "Committee",
    process: _.identity,
  },
  pages: {
    name: "Page",
    process: (page) => ({
      ...page,
      id: page.permalink.replace(/\//g, "-").replace(/^-/, "").replace(/-$/, ""),
    }),
  },
  posts: {
    name: "Post",
    process: (post) => ({
      ...post,
      id: post.fileName,
    }),
  },
  bill_events: {
    name: "BillEvent",
    process: _.identity,
  },
};

export default collections;
