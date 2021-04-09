var webpack = require("webpack");

module.exports = [
  {
    entry: "./src/index.js",
    output: {
      path: __dirname + "/js/",
      filename: "bundle.js",
      libraryTarget: "var",
      library: "AOM",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
    externals: {
      leaflet: "L",
    },
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    ],
  },
  {
    target: "node",
    entry: "./_admin/index.ts",
    output: {
      path: __dirname + "/_admin/",
      filename: "build-config.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
  },
];
