module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: [
    'react',
  ],
  rules: {
    'indent': ['warn', 2],
    'linebreak-style': ['warn', 'unix'],
    'no-console': 'warn',
    'no-mixed-spaces-and-tabs': 'warn',
    'no-unused-vars': 'warn',
    'react/prop-types': ['warn', { 'skipUndeclared': true }],
    'quotes': ['warn', 'single'],
    'semi': ['warn', 'always'],
    'react/react-in-jsx-scope': 'off', // Disable the rule to prevent errors if using React 18+
  },
};
