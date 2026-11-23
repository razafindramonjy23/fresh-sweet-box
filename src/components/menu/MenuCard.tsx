import Image from "next/image";
import { StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils/cn";
import type { MenuItem } from "@/types";

/**
 * Une carte de la grille « Les envies du jour ».
 *
 * S'attend à être rendue dans un <Stagger> : c'est le conteneur qui donne
 * la cadence d'apparition.
 */
export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <StaggerItem as="article" className={cn("menu-card", item.theme)} lift>
      <div className="card-top">
        <span className="card-number">{item.number}</span>
        <span className="card-media" aria-hidden="true">
          {item.image ? (
            <Image src={item.image} alt="" width={200} height={200} />
          ) : (
            item.icon
          )}
        </span>
      </div>
      <div>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <a className="arrow-link" href="#contact" aria-label={item.linkLabel}>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </StaggerItem>
  );
}
