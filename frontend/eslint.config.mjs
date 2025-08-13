import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import cssModules from "eslint-plugin-css-modules";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["src/**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: "detect", // fixes React version warning
      },
    },
    plugins: {
      react: pluginReact,
      "css-modules": cssModules,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,

      "react/jsx-no-undef": "error",
      "react/jsx-uses-vars": "error",
      "react/jsx-no-duplicate-props": ["error", { ignoreCase: true }],
      "react/prop-types": "off",
      "no-var": "error", 
      "no-undef": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "css-modules/no-unused-class": ["error", { camelCase: true }],
      "css-modules/no-undef-class": "error",
    },
  },
]);
