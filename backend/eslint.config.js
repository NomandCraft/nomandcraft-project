const globals = require("globals");
const pluginJs = require("@eslint/js");
const pluginVue = require("eslint-plugin-vue");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  { files: ["**/*.{js,mjs,cjs,vue}"] },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    languageOptions: {
      globals: globals.node, // ⬅️ Добавляем поддержку Node.js
    },
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.test.js", "**/__tests__/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
