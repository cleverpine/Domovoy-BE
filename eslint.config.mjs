import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
  baseDirectory: dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [{
  ignores: ['**/node_modules/', '**/dist/', '**/build/'],
}, ...compat.extends('eslint:recommended', 'airbnb-base'), {
  languageOptions: {
    globals: {
      ...globals.node,
    },

    ecmaVersion: 12,
    sourceType: 'module',
  },

  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
    'arrow-body-style': 'off',
    'prefer-const': 'warn',
  },
}];
