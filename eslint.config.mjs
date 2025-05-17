import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "**/generated/**", // Ignore all generated files
    ],
  },
  {
    // Apply these rules to all files
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Your global rules here
    },
  },
  {
    // Disable rules for generated Prisma files
    files: ["**/generated/**/*.{js,ts}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/no-unnecessary-type-constraint": "off",
    },
  },
  {
    // Specific override for wasm.js
    files: ["**/wasm.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
