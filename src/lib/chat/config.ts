/**
 * Réglages de l'assistant, rassemblés ici pour qu'aucun nombre ne soit
 * enfoui dans la route.
 */
export const CHAT = {
  /*
   * `gemini-3.5-flash-lite` : le plus rapide et le plus économique de sa
   * génération, et gratuit. Le choix se joue sur la latence — les modèles
   * Gemini « réfléchissent » par défaut, et sur un widget de chat l'attente
   * décourage l'usage. Celui-ci est le seul modèle gratuit dont le palier de
   * réflexion descend à `minimal`.
   *
   * À ne PAS remplacer par `gemini-2.5-flash` : ce modèle est déprécié et ses
   * requêtes sont redirigées ailleurs depuis le 1er décembre 2026.
   */
  model: "gemini-3.5-flash-lite",

  /** Palier de réflexion le plus bas accepté par ce modèle. */
  thinkingLevel: "minimal",

  /*
   * Plafond dur de la réponse. Les jetons de réflexion comptent dedans :
   * trop bas, la réponse est coupée avant d'avoir commencé (statut
   * `incomplete`). 400 laisse de la marge pour trois phrases.
   */
  maxOutputTokens: 400,

  /** Au-delà, la question est refusée : personne ne pose une question de 500 signes. */
  maxQuestionLength: 500,

  /*
   * Nombre de tours renvoyés au modèle. Borne le coût et la taille de la
   * requête : au-delà, les premiers échanges sont oubliés, ce qui est sans
   * conséquence pour une FAQ.
   */
  maxHistoryTurns: 12,

  /*
   * Limitation de débit par adresse IP. L'endpoint est public : sans ce
   * garde-fou, un robot épuise le quota gratuit de l'API en quelques
   * minutes et le chat tombe en panne pour les vrais clients.
   */
  rateLimit: { max: 12, windowSeconds: 3600 },
} as const;
