import { OPENING_HOURS } from "@/content";
import { formatClosedDays, formatDays, formatRange } from "@/lib/hours";

/**
 * Horaires du pied de page.
 *
 * Tout est dérivé de `OPENING_HOURS` : l'étiquette des jours, l'horaire et
 * la ligne « Fermé ». Tant que la liste est vide, l'absence est déclarée
 * plutôt que comblée — même règle que pour l'e-mail.
 */
export function FooterHours() {
  const closed = formatClosedDays(OPENING_HOURS);

  if (OPENING_HOURS.length === 0) {
    return (
      <p className="footer-hours-todo footer-todo">Horaires à compléter</p>
    );
  }

  return (
    <ul className="footer-hours">
      {OPENING_HOURS.map((range) => (
        <li key={`${range.days.join("-")}-${range.opens}`}>
          <span className="footer-hours__days">{formatDays(range.days)}</span>
          <span className="footer-hours__time">{formatRange(range)}</span>
        </li>
      ))}
      {closed && (
        <li className="footer-hours__closed">
          <span className="footer-hours__days">Fermé</span>
          <span className="footer-hours__time">{closed}</span>
        </li>
      )}
    </ul>
  );
}
