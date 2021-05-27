#!node

require("source-map-support").install();
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2017",
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
  },
});

const build = require("../src/node/admin").default;

build();
