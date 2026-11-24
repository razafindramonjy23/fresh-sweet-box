"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Défilement lissé (Lenis), posé sur la fenêtre.
 *
 * Trois choses à savoir avant de toucher à ce fichier :
 *
 * 1. **Lenis déplace réellement la fenêtre** (il traduit la molette en
 *    `window.scrollTo`). Les événements `scroll` natifs partent donc comme
 *    d'habitude, et tout ce qui écoute le défilement — `useScroll` de Framer
 *    (en-tête, barre d'avancement, parallaxe) — continue de fonctionner sans
 *    passerelle. Ne pas passer Lenis en mode « wrapper » : il romprait ce lien.
 *
 * 2. **`scroll-behavior: smooth` du CSS se bat avec Lenis.** Les deux veulent
 *    animer le même défilement et le résultat saccade. Le composant pose donc
 *    `data-lenis` sur <html>, et `reset.css` repasse en `auto` tant que
 *    l'attribut est là. Sans JavaScript, ou sous `prefers-reduced-motion`,
 *    l'attribut n'existe pas et le lissage natif reprend la main.
 *
 * 3. **Les ancres sont reprises ici.** Avec Lenis actif, un saut natif
 *    court-circuiterait l'animation. L'interception respecte la hauteur de
 *    l'en-tête collant et, surtout, **déplace le focus** sur la cible : sans
 *    cela, la navigation au clavier scrolle la page mais laisse le focus en
 *    haut, et la touche Tab repart du début.
 */

/** Marge haute à l'arrivée d'une ancre : la hauteur de l'en-tête collant. */
const ANCHOR_OFFSET = 96;

/** Le lien d'évitement garde le comportement natif : il doit être instantané. */
const SKIP = ".skip-link";

export function SmoothScroll() {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Courbe douce, sans rebond : une exponentielle amortie.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Le tactile garde le défilement natif : le lisser donne une inertie
      // qui ne correspond pas au geste et gêne plus qu'elle n'aide.
      syncTouch: false,
    });

    const root = document.documentElement;
    root.setAttribute("data-lenis", "");

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    /**
     * Amène la cible à l'écran, puis lui donne le focus.
     *
     * La position est calculée ici, en nombre, plutôt que laissée à Lenis
     * sous forme d'élément + `offset` : la variante élément s'arrêtait une
     * hauteur d'en-tête trop bas, et un nombre ne laisse aucune place à
     * l'interprétation.
     */
    const goTo = (target: HTMLElement) => {
      const top =
        target.getBoundingClientRect().top + window.scrollY - ANCHOR_OFFSET;
      lenis.scrollTo(Math.max(0, top), {
        onComplete: () => {
          // `tabindex="-1"` posé à la volée : un <section> n'est pas
          // focusable, et sans focus la navigation au clavier repartirait du
          // haut de page au prochain Tab.
          if (!target.hasAttribute("tabindex")) {
            target.setAttribute("tabindex", "-1");
          }
          target.focus({ preventScroll: true });
        },
      });
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const link = (event.target as Element | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!link || link.matches(SKIP)) return;

      const id = link.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      goTo(target);
      // L'URL suit le déplacement sans provoquer de saut natif.
      history.pushState(null, "", `#${id}`);
    };

    document.addEventListener("click", onClick);

    // Arrivée directe sur une ancre : le navigateur a déjà sauté, on reprend
    // la position proprement une fois la mise en page stabilisée.
    const hash = window.location.hash.slice(1);
    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        requestAnimationFrame(() => {
          const top =
            target.getBoundingClientRect().top + window.scrollY - ANCHOR_OFFSET;
          lenis.scrollTo(Math.max(0, top), { immediate: true });
        });
      }
    }

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      root.removeAttribute("data-lenis");
      lenis.destroy();
    };
  }, []);

  return null;
}
