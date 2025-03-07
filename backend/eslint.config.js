export default [
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: {
        node: true,
        browser: true,
      },
    },
    plugins: {
      vue: require('eslint-plugin-vue'),
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      ...require('@eslint/js').configs.recommended.rules,
      ...require('eslint-plugin-vue').configs.recommended.rules,
      'prettier/prettier': 'error',
    },
    ignores: ['node_modules/', 'dist/', 'build/', '.env', 'public/'],
  },
  {
    files: ['tests/**/*.test.js'],
    languageOptions: {
      globals: {
        jest: true,
      },
    },
  },
];
