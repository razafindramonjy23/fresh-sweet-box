/**
 * Un tour de conversation de l'assistant.
 *
 * C'est le format d'échange entre le widget et la route `/api/chat` : le
 * navigateur garde l'historique et le renvoie à chaque question, parce que
 * la route est sans état (une fonction serverless ne se souvient de rien
 * d'une requête à l'autre).
 */
export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  text: string;
};
