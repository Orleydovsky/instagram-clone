module.exports = {
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true

  },
  globals: {
    JSX: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:cypress/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'cypress'
  ],
  rules: {
    'react/no-unescaped-entities': 0,
    'react/react-in-jsx-scope': 0
  }
}
