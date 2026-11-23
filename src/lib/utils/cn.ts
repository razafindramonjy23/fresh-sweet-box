/**
 * Concatène des classes CSS en ignorant les valeurs vides.
 *
 * Le projet n'utilise pas Tailwind : pas de fusion de classes
 * conflictuelles à gérer, un simple filtre suffit.
 */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
