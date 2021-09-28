const obj = {
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-typescript',
    'prettier',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.json', './tools/tsconfig.json'],
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },
  rules: {
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        modifiers: ['destructured'],
        format: null,
      },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'jsx-a11y/no-access-key': 'off',
    'jsx-a11y/accessible-emoji': 'off', // deprecated
    'jsx-a11y/no-onchange': 'off', // deprecated
    '@typescript-eslint/no-loop-func': 'off',
    'import/no-named-as-default': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['./tools/**', './__test__/**'] },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

module.exports = {
  ...obj,
  root: true,
  overrides: [
    {
      ...obj,
      files: ['./__test__/**'],
      env: {
        es6: true,
        jest: true,
      },
      extends: [...obj.extends, 'plugin:jest/recommended'],
      parserOptions: {
        ...obj.parserOptions,
        project: ['./__test__/tsconfig.json'],
      },
    },
  ],
}
