/*
What is exported by this module will be available as a `AOM` global variable in page scripts.
We have to use CommonJS here, but other files should be written using ES6 modules.
*/

const { renderSignupForm } = require("./SignupForm").default;
const { renderMap } = require("./Map").default;
const { renderRequestCommitteeVote } = require("./Modals/RequestCommitteeVote.tsx").default;
const { renderRequestCosponsorship } = require("./Modals/RequestCosponsorship.tsx").default;
const { renderRequestCosponsorshipMyRep } = require("./Modals/RequestCosponsorshipMyRep.tsx").default;
const { renderRequestSignPledge } = require("./Modals/RequestSignPledge.tsx").default;
const { renderRequestSignPledgeMyRep } = require("./Modals/RequestSignPledgeMyRep.tsx").default;
const { renderHistory } = require("./History").default;
const { renderFindMyReps } = require("./FindMyReps/FindMyReps.tsx").default;
const { renderBillTimeline } = require("./BillTimeline/BillTimeline").default;

module.exports = {
  renderSignupForm,
  renderMap,
  renderRequestCommitteeVote,
  renderRequestCosponsorship,
  renderRequestCosponsorshipMyRep,
  renderRequestSignPledge,
  renderRequestSignPledgeMyRep,
  renderFindMyReps,
  renderBillTimeline,
  renderHistory,
};
