// @ts-check

/**
 * @type {import("@babel/core").ConfigFunction}
 */
const createConfig = (api) => {
  api.cache.forever()
  return {
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            assets: "./assets",
            src: "./src",
          },
        },
      ],
    ],
    presets: ["babel-preset-expo"],
  }
}

module.exports = createConfig
