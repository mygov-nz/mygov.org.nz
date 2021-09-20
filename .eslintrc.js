'use strict';

module.exports = {

  env: {
    browser: true,
    ENVIRONMENT: true,
    es2020: true,
    'jest/globals': true,
    node: false
  },

  extends: [
    'plugin:jest/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:node/recommended',
    'standard',
    'plugin:security/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true
    },
    sourceType: 'module'
  },

  plugins: [
    '@typescript-eslint',
    'jest',
    'react',
    'security'
  ],

  rules: {
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'signature',

          // Fields
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          'public-abstract-field',
          'protected-abstract-field',
          'private-abstract-field',

          // Constructors
          'public-constructor',
          'protected-constructor',
          'private-constructor',

          // Methods
          'public-static-method',
          'protected-static-method',
          'private-static-method',
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
          'public-abstract-method',
          'protected-abstract-method',
          'private-abstract-method'
        ]
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc'
        },
        groups: [
          ['builtin', 'external'],
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always'
      }
    ],
    'no-unused-vars': 'off',
    'node/no-extraneous-import': 'off',
    'node/no-missing-import': 'off',
    'node/no-unsupported-features/es-builtins': [
      'error',
      {
        version: '>=16.0.0'
      }
    ],
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-unsupported-features/node-builtins': [
      'error',
      {
        version: '>=16.0.0'
      }
    ],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off'
  }

};
