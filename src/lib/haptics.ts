/* ---------------------------------------------------------------------------
   Retour haptique : une vibration brève sous le doigt quand une action
   compte (appeler, commander, envoyer une question).

   Portée réelle, à garder en tête :
   - Android (Chrome, Samsung Internet, Firefox) : oui.
   - iPhone : pas de `navigator.vibrate`. Repli sur iOS 18+ via un
     interrupteur natif (voir `iosHaptic`), un seul « tic » sans nuance.
     Avant iOS 18 : sans effet, rien ne casse.
   - Ordinateur : sans effet.

   Le navigateur n'accepte de vibrer qu'en réponse à un geste de l'utilisateur
   (un tap) : ces fonctions s'appellent donc depuis un gestionnaire de clic,
   jamais au chargement.

   La vibration est toujours un complément du retour visuel, jamais son
   remplaçant : la plupart des visiteurs ne la sentiront pas.
--------------------------------------------------------------------------- */

/**
 * Motifs disponibles, en millisecondes (vibration, pause, vibration…).
 *
 * Très courts à dessein : au-delà de ~20 ms une vibration cesse d'être un
 * « tic » et devient un bourdonnement agaçant.
 */
export const HAPTIC_PATTERNS = {
  /** Tap ordinaire : lien, bouton. */
  tap: 8,
  /** Action principale : appeler, commander. */
  impact: 14,
  /** Confirmation : réponse reçue, envoi réussi. */
  success: [10, 50, 14],
} as const satisfies Record<string, number | readonly number[]>;

export type HapticKind = keyof typeof HAPTIC_PATTERNS;

export function isHapticKind(value: string): value is HapticKind {
  return value in HAPTIC_PATTERNS;
}

/**
 * Déclenche une vibration si l'appareil le permet et si le visiteur n'a pas
 * demandé moins d'animation : qui coupe le mouvement à l'écran attend en
 * général aussi moins de stimulations.
 */
export function haptic(kind: HapticKind = "tap") {
  if (typeof navigator === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  if (!("vibrate" in navigator)) {
    iosHaptic();
    return;
  }

  try {
    const pattern = HAPTIC_PATTERNS[kind];
    navigator.vibrate(typeof pattern === "number" ? pattern : [...pattern]);
  } catch {
    /* Certains navigateurs lèvent une erreur au lieu de renvoyer `false`
       (iframe sans permission, par exemple) : on l'ignore. */
  }
}

/** Écran tactile sans `navigator.vibrate` : en pratique, un iPhone. */
function isTouchWithoutVibrate() {
  return window.matchMedia("(pointer: coarse)").matches;
}

/**
 * Repli pour iPhone (iOS 18 et plus).
 *
 * Safari n'a pas d'API de vibration, mais basculer un interrupteur natif
 * (`<input type="checkbox" switch>`) produit le « tic » haptique du système.
 * On crée donc un interrupteur invisible, on le bascule via son `<label>`, et
 * on le retire aussitôt.
 *
 * Comportement non documenté par Apple : il peut cesser de fonctionner à une
 * mise à jour d'iOS. Le pire cas est alors l'absence de vibration, rien de
 * plus. Un seul motif possible (pas d'intensité ni de rythme), et seulement
 * dans le prolongement direct d'un geste de l'utilisateur.
 */
function iosHaptic() {
  if (!isTouchWithoutVibrate()) return;

  try {
    const label = document.createElement("label");
    label.setAttribute("aria-hidden", "true");
    label.style.cssText =
      "position:fixed;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.setAttribute("switch", "");
    input.tabIndex = -1;

    label.appendChild(input);
    document.body.appendChild(label);
    label.click();
    label.remove();
  } catch {
    /* Sans effet ailleurs qu'iOS 18+ : rien à signaler. */
  }
}
