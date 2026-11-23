import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettierRecommended from "eslint-plugin-prettier/recommended";

/**
 * Règles Next.js (dont Core Web Vitals en erreur) + TypeScript, et Prettier
 * en dernier pour que le formatage ne soit jamais en conflit avec le lint.
 */
export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  prettierRecommended,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "node_modules/**",
    "next-env.d.ts",
  ]),
]);
