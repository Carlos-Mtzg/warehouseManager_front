import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import airbnb from 'eslint-config-airbnb';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist', 'node_modules', 'vite.config.js'] },

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      prettier: prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...airbnb.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      'no-inline-comments': 'error',
      'no-warning-comments': ['error', { terms: [''], location: 'anywhere' }],

      'linebreak-style': 'off',

      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'import/no-extraneous-dependencies': 'off',
      'import/extensions': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
      'prettier/prettier': 'error',
      camelcase: ['error', { properties: 'always' }],
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
    },
  },
  eslintConfigPrettier,
];
