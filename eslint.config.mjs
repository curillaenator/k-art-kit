import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import google from 'eslint-config-google';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    plugins: {
      react,
      'react-hooks': reactHooks,
      google,
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: ['./tsconfig.json'],

        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    files: [
      'base/**/*.js',
      'base/**/*.ts',
      'base/**/*.jsx',
      'base/**/*.tsx',
      'packages/**/*.js',
      'packages/**/*.ts',
      'packages/**/*.jsx',
      'packages/**/*.tsx',
    ],

    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-console': 'warn',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/ban-types': 'off',
      // 'import/no-unresolved': 'warn',
      // 'require-jsdoc': 'off',
      // 'valid-jsdoc': 'off',
    },

    ignores: [
      //
      '.husky/*',
      '.yarn/*',
      '**/node_modules/*',
      '**/build/**',
      '**/*.config.mjs',
      '**/*.config.js',
    ],
  },
];
