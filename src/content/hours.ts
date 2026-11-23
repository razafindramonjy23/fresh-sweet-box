import type { OpeningRange } from "@/types";

/**
 * Horaires d'ouverture. **À compléter** : rien n'est inventé ici.
 *
 * Tant que ce tableau est vide, le pied de page affiche « Horaires à
 * compléter » en italique, et le balisage structuré n'annonce aucun horaire.
 *
 * Il suffit de décrire les plages ; tout le reste en découle — l'étiquette
 * des jours, la ligne « Fermé : … » pour les jours non couverts, et le
 * balisage Google. Exemple :
 *
 * ```ts
 * export const OPENING_HOURS: OpeningRange[] = [
 *   {
 *     days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
 *     opens: "08:00",
 *     closes: "18:00",
 *   },
 *   { days: ["saturday"], opens: "09:00", closes: "17:00" },
 * ];
 * ```
 *
 * donne « Lundi – Vendredi 08h00 – 18h00 », « Samedi 09h00 – 17h00 » et
 * « Fermé : Dimanche ».
 */
export const OPENING_HOURS: OpeningRange[] = [];
