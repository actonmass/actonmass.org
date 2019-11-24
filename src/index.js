/*
What is exported by this module will be available as a `AOM` global variable in page scripts.
We have to use CommonJS here, but other files should be written using ES6 modules.
*/

const { renderMap } = require("./Map").default;

module.exports = {
  renderMap
};
