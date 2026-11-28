"use client";

import { useEffect } from "react";
import { haptic, isHapticKind } from "@/lib/haptics";

/** Distance maximale, en px, dont un bouton magnétique suit le curseur. */
const MAGNET_PULL = 0.28;
const MAGNET_MAX = 10;

/**
 * Micro-interactions de toute la page, branchées par attributs :
 *
 * - `data-haptic="tap|impact|success"` : vibration au clic (Android).
 * - `data-magnetic` : l'élément est attiré par le curseur (souris seulement).
 *
 * Un seul écouteur délégué sur le document plutôt qu'un composant client par
 * bouton : les boutons (`ArrowButton`, `MenuCard`…) restent des composants
 * serveur, et un nouvel appel à l'action n'a besoin que d'un attribut.
 *
 * L'effet d'appui (`data-press`) est entièrement en CSS, voir
 * `styles/components/interactions.css`.
 */
export function Interactions() {
  /* Retour haptique. `click` plutôt que `pointerdown` : c'est un geste qui
     ouvre le droit de vibrer, et il ne se déclenche pas quand le doigt
     glisse pour faire défiler la page. */
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-haptic]",
      );
      const kind = target?.dataset.haptic;
      if (!kind) return;
      haptic(isHapticKind(kind) ? kind : "tap");
    }

    /* Safari iOS n'applique `:active` au toucher que si un écouteur
       `touchstart` existe : sans lui, l'effet d'appui (`data-press`) ne se
       verrait jamais sur iPhone. L'écouteur ne fait rien d'autre. */
    function onTouchStart() {}

    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  /* Boutons magnétiques : seulement avec une vraie souris, et jamais si le
     système demande moins d'animation. */
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let current: HTMLElement | null = null;
    let frame = 0;

    function release(el: HTMLElement | null) {
      if (!el) return;
      el.style.removeProperty("--mag-x");
      el.style.removeProperty("--mag-y");
    }

    function onMove(event: PointerEvent) {
      if (!fine.matches || reduced.matches || event.pointerType !== "mouse") {
        return;
      }

      const el = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-magnetic]",
      );

      if (el !== current) {
        release(current);
        current = el ?? null;
      }
      if (!el) return;

      const { clientX, clientY } = event;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const clamp = (v: number) =>
          Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, v));
        const dx = clamp(
          (clientX - (rect.left + rect.width / 2)) * MAGNET_PULL,
        );
        const dy = clamp(
          (clientY - (rect.top + rect.height / 2)) * MAGNET_PULL,
        );
        el.style.setProperty("--mag-x", `${dx.toFixed(1)}px`);
        el.style.setProperty("--mag-y", `${dy.toFixed(1)}px`);
      });
    }

    function onLeaveWindow() {
      cancelAnimationFrame(frame);
      release(current);
      current = null;
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      cancelAnimationFrame(frame);
      release(current);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onLeaveWindow,
      );
    };
  }, []);

  return null;
}
