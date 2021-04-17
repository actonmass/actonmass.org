require("source-map-support").install();
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2017",
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
  },
});

module.exports = require("./src/node");
