import eslintJs from '@eslint/js';
import vue from 'eslint-plugin-vue';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: {
        node: true,
        browser: true,
        process: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      vue,
      prettier: prettierPlugin,
    },
    rules: {
      ...eslintJs.configs.recommended.rules,
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
        jest: 'readonly',
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        afterAll: 'readonly',
      },
    },
  },
];
