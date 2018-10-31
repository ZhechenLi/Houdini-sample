const path = require("path");
// TODO: use another static server
module.exports = {
  devServer: {
    open: true,
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 9001,
    https: true
  }
};
