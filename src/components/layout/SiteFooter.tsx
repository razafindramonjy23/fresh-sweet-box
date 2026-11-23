import Image from "next/image";
import { Reveal } from "@/components/motion";
import { ContactIcon } from "@/components/ui/ContactIcon";
import { CONTACT_LINKS, FOOTER_LINKS, SITE } from "@/content";

/** Pied de page : marque, contacts et rappel de la carte. Cible de `#contact`. */
export function SiteFooter() {
  return (
    <Reveal as="footer" className="shell footer" id="contact">
      <div className="footer-grid">
        <div className="footer-brand">
          <a
            className="footer-logo"
            href="#accueil"
            aria-label={`${SITE.name}, retour en haut de page`}
          >
            <Image
              src={SITE.logo.src}
              alt=""
              width={SITE.logo.width}
              height={SITE.logo.height}
              style={{ height: 74, width: "auto" }}
            />
          </a>
          <p className="footer-tagline">{SITE.tagline}</p>
          <p className="footer-quote">{SITE.quote}</p>
        </div>

        <div>
          <h2 className="eyebrow">Contacter</h2>
          <ul className="footer-list">
            {CONTACT_LINKS.map((item) => (
              <li key={item.label}>
                <ContactIcon name={item.icon} />
                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="footer-todo">{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow">La carte</h2>
          <ul className="footer-list">
            {FOOTER_LINKS.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="footer-legal">
        © {SITE.copyrightYear} {SITE.name}
      </p>
    </Reveal>
  );
}
