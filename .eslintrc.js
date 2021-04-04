module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  plugins: ['react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '17',
    },
  },
  rules: {},
}
