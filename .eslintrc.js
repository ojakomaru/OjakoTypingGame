module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb-base', 'airbnb-typescript', 'prettier'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint'],

  rules: {
    'no-console': 'off', // console.logが残っていてもOK
    'import/no-cycle': 'off', // importの階層読み込みルールの無効化
    'no-plusplus': 'off', // ++インクリメントを有効化
    'react/react-in-jsx-scope': 'off', //import React from 'react'が無くてもエラーを無くす
    'react/prop-types': 'off', //TypeScriptでチェックしているから不要。offにする
    'react-hooks/exhaustive-deps': 'off', // useEffectなどの依存配列の設定忘れを無視する
    'import/prefer-default-export': 'off', // named exportがエラーになるので使えるようにoff
    'import/extensions': [
      // importのときに以下の拡張子を記述しなくてもエラーにしない
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    'react/jsx-filename-extension': [
      //jsx形式のファイル拡張子をjsxもしくはtsxに限定
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      //importするファイルをjsだけではなく、tsを含むファイルを許可する
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
