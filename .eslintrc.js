module.exports = {
  env: {
    node: true,
    es6: true,
  },
  'parserOptions': { 'ecmaVersion': 8 },
  extends: [ 'eslint:recommended' ],
  rules: {
    'no-console': 'error',
    'no-unused-vars': [ 'error', { 'args': 'none' } ],
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': [ 'error', { 'max': 1, 'maxEOF': 0 } ],
    'no-multi-spaces': 'error',
    'no-extra-parens': 'error',
    'no-extra-semi': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-tabs': 'error',
    'indent': [
      'error',
      2
    ],
    'semi': [
      'error',
      'always'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'space-before-function-paren': [
      'error',
      'always'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'array-bracket-spacing': [
      'error',
      'always'
    ],
    'comma-spacing': [
      'error',
      {
        'before': false,
        'after': true
      }
    ],
    'key-spacing': [
      'error',
      {
        'beforeColon': false,
        'afterColon': true
      }
    ]
  },
};