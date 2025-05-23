const path = require('path');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript', 'plugin:prettier/recommended'],
  env: {
    jest: true,
  },
  rules: {
    // Make prettier code formatting suggestions more verbose.
    'prettier/prettier': ['warn'],
    // Disable <Fragment> => <> replacement. Feel free to change
    'react/jsx-fragments': 'off',
    // Disable prefer default export
    'import/prefer-default-export': 'off',
    '@typescript-eslint/object-curly-spacing': 'off',
    'react/jsx-filename-extension': [0],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        ecmaVersion: 12,
        tsconfigRootDir: __dirname,
        project: path.join(__dirname, 'tsconfig.json'),
      },
    },
  ],
};