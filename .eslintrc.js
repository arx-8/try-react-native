// @ts-check

/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  env: {
    browser: false,
  },
  extends: [
    "eslint:recommended",
    "standard",
    "plugin:promise/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:typescript-sort-keys/recommended",
    "prettier",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["sort-destructure-keys", "sort-keys-fix", "typescript-sort-keys"],
  rules: {
    "react/react-in-jsx-scope": 0,
  },
}

module.exports = config
