// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    plugins: {
      '@stylistic/ts': stylisticTs
    },
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    rules: {
      'max-len': ['error', {'code': 100 }],
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/semi': 'error',
      '@stylistic/ts/brace-style': 'error',
      '@stylistic/ts/quotes': ['error', 'single'],
      '@typescript-eslint/no-dynamic-delete': 'off',
    },
  }
);
