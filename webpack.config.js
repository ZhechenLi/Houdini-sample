var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");

module.exports = {
  entry: "./src/index",
  output: {
    filename: "./dist/bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 9001
    // https: true
  }
  //   plugins: [new HtmlWebpackPlugin()]
};
