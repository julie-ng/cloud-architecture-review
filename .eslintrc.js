module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    indent: ['error', 2],
    semi: ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    'comma-dangle': ['warn', 'never'],
    'dot-notation': ['error', { allowPattern: '^[A-Z]+' }],
    'unicorn/prefer-includes': 'off',
    'no-console': 'off'
  }
}
