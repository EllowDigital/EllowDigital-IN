import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist"], // Ignore files in the 'dist' directory
  },
  {
    extends: [
      js.configs.recommended, // Use ESLint's recommended rules
      ...tseslint.configs.recommended, // Add TypeScript recommended rules
    ],
    files: ["**/*.{ts,tsx}"], // Apply to TypeScript and TSX files
    languageOptions: {
      ecmaVersion: 2020, // Use ECMAScript 2020 syntax
      globals: globals.browser, // Define browser globals
    },
    plugins: {
      "react-hooks": reactHooks, // React Hooks linting plugin
      "react-refresh": reactRefresh, // React Fast Refresh plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Use recommended React hooks rules
      "react-refresh/only-export-components": [
        "warn", // Warn on non-component exports
        { allowConstantExport: true }, // Allow constant exports
      ],
      "@typescript-eslint/no-unused-vars": "off", // Disable unused variable checks for TypeScript
    },
  }
);
