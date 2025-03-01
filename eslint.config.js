// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import { flatConfigs as importFlatConfigs } from 'eslint-plugin-import'
import globals from 'globals'
import reactCompiler from 'eslint-plugin-react-compiler'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import compat from 'eslint-plugin-compat'
import jsxA11y from 'eslint-plugin-jsx-a11y'

const conf = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [importFlatConfigs.recommended, importFlatConfigs.typescript],
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.recommended,
  // @ts-ignore
  reactCompiler.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    ...compat.configs['flat/recommended'],
    settings: {
      browserslistOpts: {
        env: 'production',
      },
    },
  },
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'jsx-a11y/no-access-key': 'off',
    },
  },
  {
    ignores: [
      '.github/',
      '.vscode/',
      'assets/',
      'coverage/',
      'dist/',
      'dev-dist/',
      'misc/',
      'node_modules/',
      'others/',
      'src-tauri/',
      '*.*',
      '**/*.d.ts',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 6,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  // {
  //   files: ['src/**/*.{ts,tsx,js,jsx,mjs,mjsx,cjs,cjsx}'],
  // },
)

// console.dir(conf, { depth: 2 })

export default conf
