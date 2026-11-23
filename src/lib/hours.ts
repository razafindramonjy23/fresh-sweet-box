import type { OpeningRange, Weekday } from "@/types";

/** Ordre de la semaine, lundi en tête. */
export const WEEK: Weekday[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const LABELS: Record<Weekday, string> = {
  monday: "Lundi",
  tuesday: "Mardi",
  wednesday: "Mercredi",
  thursday: "Jeudi",
  friday: "Vendredi",
  saturday: "Samedi",
  sunday: "Dimanche",
};

/** Noms attendus par schema.org, pour le balisage structuré. */
const SCHEMA_DAYS: Record<Weekday, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

/** `08:00` → `08h00`. */
export function formatTime(time: string) {
  return time.replace(":", "h");
}

/** `08:00`–`18:00` → `08h00 – 18h00`. */
export function formatRange(range: OpeningRange) {
  return `${formatTime(range.opens)} – ${formatTime(range.closes)}`;
}

/**
 * Jours d'une plage, en une étiquette lisible.
 *
 * Trois jours consécutifs ou plus sont abrégés (« Lundi – Vendredi ») ;
 * en dessous, ils sont énumérés. Les jours sont d'abord remis en ordre de
 * semaine : l'ordre de saisie n'a donc pas d'importance.
 */
export function formatDays(days: Weekday[]) {
  const ordered = WEEK.filter((day) => days.includes(day));
  if (ordered.length === 0) return "";

  const firstIndex = WEEK.indexOf(ordered[0]);
  const consecutive = ordered.every(
    (day, i) => WEEK.indexOf(day) === firstIndex + i,
  );

  if (consecutive && ordered.length >= 3) {
    return `${LABELS[ordered[0]]} – ${LABELS[ordered[ordered.length - 1]]}`;
  }
  return ordered.map((day) => LABELS[day]).join(", ");
}

/** Les jours qu'aucune plage ne couvre : l'établissement y est fermé. */
export function getClosedDays(ranges: OpeningRange[]) {
  const open = new Set(ranges.flatMap((range) => range.days));
  return WEEK.filter((day) => !open.has(day));
}

/** Étiquette des jours de fermeture, ou `null` s'il n'y en a aucun. */
export function formatClosedDays(ranges: OpeningRange[]) {
  const closed = getClosedDays(ranges);
  return closed.length === 0 ? null : formatDays(closed);
}

/**
 * Plages au format `openingHoursSpecification` de schema.org : c'est ce qui
 * permet à Google d'afficher les horaires dans ses résultats.
 */
export function toSchemaHours(ranges: OpeningRange[]) {
  return ranges.map((range) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: WEEK.filter((day) => range.days.includes(day)).map(
      (day) => SCHEMA_DAYS[day],
    ),
    opens: range.opens,
    closes: range.closes,
  }));
}
