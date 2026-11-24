/**
 * Tailwind CSS v4 passe par un unique plugin PostCSS : il lit
 * `@import "tailwindcss"` et le bloc `@theme` de `src/styles/base/theme.css`,
 * puis génère les utilitaires à partir des classes réellement trouvées dans
 * les sources. Aucun `tailwind.config.js` n'est nécessaire en v4 — la
 * configuration est dans le CSS.
 */
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
