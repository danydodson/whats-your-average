const path = require("path")
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [new NodePolyfillPlugin()],
  })
}
