// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path")

/**
 * @type {import("@expo/webpack-config/webpack").default}
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const createExpoWebpackConfigAsync = require("@expo/webpack-config")

/**
 *
 * @param {import("@expo/webpack-config/webpack/types").Environment} env
 * @param {import("@expo/webpack-config/webpack/types").Arguments} argv
 * @returns
 */
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)

  // Customize the config before returning it.
  config.module?.rules.push({
    // exclude: /node_modules/,
    // include: path.resolve(__dirname, "node_modules/kysely"),
    loader: "babel-loader",
    query: {
      // plugins: [
      //   "@babel/plugin-proposal-class-properties",
      //   "@babel/plugin-proposal-private-methods",
      // ],
      presets: ["babel-preset-expo"],
    },
    test: /.js$/,
  })

  return config
}
