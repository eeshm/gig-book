import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
      globals: {
        node: true,
        es6: true,
      },
    },
    rules: {
      "no-console": "off",
      "prefer-const": "warn",
    },
  },
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      ".turbo/**",
      ".next/**",
      "apps/**",
      "packages/**",
    ],
  },
];
