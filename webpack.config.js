const path = require("path");

module.exports = {
  entry: "./src/index",
  output: {
    filename: "./dist/bundle.js"
  },
  devServer: {
    open: true,
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 9001,
    https: true
  }
};
