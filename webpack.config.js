const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  entry: "/dist/bootstrap.bbcode.js",
  mode: "production",
  output: {
    filename: "bootstrap.bbcode.min.js",
    path: __dirname + "/dist",
    library: "bootstrap-bbcode",
    libraryTarget: "umd"
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          },
          output: {
            comments: false
          }
        }
      })
    ]
  }
};
