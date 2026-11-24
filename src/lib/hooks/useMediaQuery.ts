"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Suit une media query sans provoquer d'écart d'hydratation.
 *
 * `useSyncExternalStore` est préféré à `useState` + `useEffect` : le serveur
 * répond toujours `false` (il n'a pas de fenêtre), le client lit la vraie
 * valeur dès le premier rendu suivant, et React gère lui-même la
 * synchronisation. La variante en effet, elle, déclenche un second rendu en
 * cascade à chaque montage.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
