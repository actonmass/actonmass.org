var webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/js/",
    filename: "bundle.js",
    libraryTarget: "var",
    library: "AOM"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    ]
  },
  externals: {
    leaflet: "L"
  }
};
