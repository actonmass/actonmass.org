/*
What is exported by this module will be available as a `AOM` global variable in page scripts.
We have to use CommonJS here, but other files should be written using ES6 modules.
*/

const { renderMap } = require("./Map").default;
const { renderRequestCommitteeVote } = require("./Modals/RequestCommitteeVote.tsx").default;
const { renderRequestCosponsorship } = require("./Modals/RequestCosponsorship.tsx").default;
const { renderRequestSignPledge } = require("./Modals/RequestSignPledge.tsx").default;
const { renderHistory } = require("./History").default;
const { renderFindMyReps } = require("./FindMyReps/FindMyReps.tsx").default;
const { renderBillTimeline } = require("./bill-timeline/bill-timeline").default;

module.exports = {
  renderMap,
  renderRequestCommitteeVote,
  renderRequestCosponsorship,
  renderRequestSignPledge,
  renderFindMyReps,
  renderBillTimeline,
  renderHistory,
};
