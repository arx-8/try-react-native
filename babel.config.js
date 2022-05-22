// @ts-check

/**
 * @type {import("@babel/core").ConfigFunction}
 */
const createConfig = (api) => {
  api.cache.forever()
  return {
    presets: ["babel-preset-expo"],
  }
}

module.exports = createConfig
