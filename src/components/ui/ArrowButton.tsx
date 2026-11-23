import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Props = {
  href: string;
  children: ReactNode;
  /**
   * `solid` : pilule pleine framboise, avec la pastille de flèche.
   * `ghost` : contour fin, sans pastille.
   * `nav`   : variante compacte de `solid`, pour la barre de navigation.
   */
  variant?: "solid" | "ghost" | "nav";
  className?: string;
};

const VARIANT_CLASS = {
  solid: "button",
  ghost: "button-ghost",
  nav: "nav-action",
} as const;

/**
 * Appel à l'action de la page : toujours un lien, jamais un `<button>`
 * (toutes les cibles sont des ancres).
 */
export function ArrowButton({
  href,
  children,
  variant = "solid",
  className,
}: Props) {
  return (
    <a className={cn(VARIANT_CLASS[variant], className)} href={href}>
      {children}
      {variant !== "ghost" && (
        <span className="button__icon" aria-hidden="true">
          →
        </span>
      )}
    </a>
  );
}
