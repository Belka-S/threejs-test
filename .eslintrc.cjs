module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:eslint-plugin-import/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: { version: '18.2' },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
        extensions: ['.js', '.jsx'],
      },
    },
    'import/ignore': ['styled-components'],
  },
  plugins: ['react-refresh'],

  rules: {
    indent: ['warn', 2, { SwitchCase: 1, ignoredNodes: [] }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'jsx-quotes': ['error', 'prefer-double'],
    'import/no-absolute-path': 'off',
    'multiline-ternary': 'off',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never', asyncArrow: 'always' },
    ],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'parent', 'internal', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always-and-inside-groups',
      },
    ],
  },
};

// rules: {
//   indent: ['warn', 2, { SwitchCase: [1, 2] }],
//   'no-console': 'warn',
//   'prefer-const': 'warn',
//   'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
//   'import/order': [
//     'warn',
//     {
//       'newlines-between': 'always',
//       groups: [['builtin'], ['external'], ['parent', 'internal', 'sibling', 'index', 'unknown']],
//       alphabetize: {
//         order: 'asc',
//         caseInsensitive: true,
//       },
//     },
//   ],
// },
