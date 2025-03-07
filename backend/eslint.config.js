const js = require('@eslint/js');
const vue = require('eslint-plugin-vue');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const globals = require('globals');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      sourceType: 'commonjs',
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      vue,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...vue.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
    ignores: ['node_modules/', 'dist/', 'build/', '.env', 'public/'],
  },
  {
    files: ['tests/**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
