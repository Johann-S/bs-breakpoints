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
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/semi': 'error',
      '@stylistic/ts/brace-style': 'error',
      '@typescript-eslint/no-dynamic-delete': 'off',
    },
  }
);
