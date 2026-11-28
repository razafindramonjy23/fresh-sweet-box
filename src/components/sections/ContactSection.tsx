import { Reveal, Stagger, StaggerItem, WordReveal } from "@/components/motion";
import { ContactIcon } from "@/components/ui/ContactIcon";
import { EMAIL, FACEBOOK, INSTAGRAM, PHONE, SITE } from "@/content";
import type { ContactIconName } from "@/types";

type Action = {
  icon: ContactIconName;
  label: string;
  detail: string;
  href: string;
  external?: boolean;
  primary?: boolean;
};

/**
 * Les trois chemins réellement disponibles pour joindre la boutique.
 *
 * Rien n'est inventé : tout vient de `src/content/contact.ts`. WhatsApp,
 * l'adresse et le lien Maps manquent encore côté métier — ils apparaîtront
 * ici dès qu'ils seront renseignés, et surtout pas avant.
 *
 * L'ordre n'est pas décoratif : il va du plus immédiat (un appel, on prépare
 * pendant le trajet) au plus différé (un e-mail, à quoi il faut répondre).
 */
const ACTIONS: Action[] = [
  {
    icon: "phone",
    label: "Appeler pour commander",
    detail: PHONE.display,
    href: PHONE.href,
    primary: true,
  },
  {
    icon: "instagram",
    label: "Voir nos nouveautés",
    detail: INSTAGRAM.handle,
    href: INSTAGRAM.url,
    external: true,
  },
  {
    icon: "facebook",
    label: "Nous suivre",
    detail: FACEBOOK.label,
    href: FACEBOOK.url,
    external: true,
  },
  {
    icon: "mail",
    label: "Écrire un e-mail",
    detail: EMAIL.address,
    href: EMAIL.href,
  },
];

/**
 * Bande de conversion, juste avant le pied de page.
 *
 * Le pied de page liste les coordonnées ; cette bande, elle, ne propose que
 * de passer à l'acte, sur un aplat vert qui la détache du reste de la page.
 * Elle est volontairement pleine largeur : c'est le dernier palier avant le
 * bas de page, il doit se voir.
 *
 * Pas d'`id` : l'ancre `#contact` reste sur le pied de page, qui porte les
 * informations. Deux cibles pour le même lien de navigation sèmeraient le
 * doute.
 */
export function ContactSection() {
  return (
    <section className="bg-deep text-cream" aria-labelledby="commander-titre">
      <div className="mx-auto grid w-full max-w-[calc(var(--container-measure)+2*var(--gutter))] items-center gap-10 px-[var(--gutter)] py-[clamp(64px,8vw,104px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16">
        <Reveal from="left">
          <p className="m-0 mb-3.5 text-xs font-bold tracking-[0.15em] text-peach uppercase">
            Commander
          </p>
          <h2
            id="commander-titre"
            className="m-0 font-display text-[clamp(30px,3.6vw,46px)] leading-[1.12] font-semibold tracking-[-0.02em] text-balance text-cream"
          >
            <WordReveal text="Votre pause vous attend." />
          </h2>
          <p className="mt-5 mb-0 max-w-[42ch] text-[16px] leading-[1.8] text-cream/80">
            {SITE.tagline} Un appel suffit, on prépare pendant que vous venez.
          </p>
        </Reveal>

        <Stagger className="flex flex-col gap-3" gap={0.09}>
          {ACTIONS.map((action) => (
            <StaggerItem key={action.label} from="right">
              <a
                href={action.href}
                data-haptic={action.primary ? "impact" : "tap"}
                data-press=""
                {...(action.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={[
                  "group flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors duration-200",
                  action.primary
                    ? "bg-berry text-white hover:bg-[#e2609a]"
                    : "bg-cream/8 text-cream hover:bg-cream/15",
                ].join(" ")}
              >
                <span
                  className={[
                    "grid size-11 flex-none place-items-center rounded-full",
                    action.primary ? "bg-white/18" : "bg-cream/10",
                  ].join(" ")}
                >
                  <ContactIcon name={action.icon} className="size-5" />
                </span>

                <span className="min-w-0">
                  {/* 19 px en gras : le blanc sur framboise tient 3,89:1, ce
                      qui suffit pour du « grand texte » mais pas en dessous
                      de 18,66 px. */}
                  <span className="block text-[19px] leading-tight font-bold">
                    {action.label}
                  </span>
                  <span
                    className={[
                      "block truncate text-[13px]",
                      action.primary ? "text-white/85" : "text-cream/70",
                    ].join(" ")}
                  >
                    {action.detail}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className="hover-arrow ml-auto flex-none text-xl"
                >
                  →
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
