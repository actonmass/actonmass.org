/*
What is exported by this module will be available as a `AOM` global variable in page scripts.
We have to use CommonJS here, but other files should be written using ES6 modules.
*/

const { renderMap } = require("./Map").default;
const { renderModal } = require("./Modals/ContactLegModal.tsx").default;
const { renderHistory } = require("./History").default;
const { renderFindMyReps } = require("./find-my-reps/find-my-reps.tsx").default;
const { renderBillTimeline } = require("./bill-timeline/bill-timeline").default;

module.exports = {
  renderMap,
  renderModal,
  renderFindMyReps,
  renderBillTimeline,
  renderHistory,
};
