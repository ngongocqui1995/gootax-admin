module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/eslint')],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'no-console': ['error', { allow: ['warn'] }],
    'no-underscore-dangle': ['error', { allow: ['_id'], allowAfterThis: true }],
    'react-hooks/rules-of-hooks': 'off',
    'no-case-declarations': 'off',
  },
};
