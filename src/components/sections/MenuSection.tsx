import { Stagger, StaggerItem } from "@/components/motion";
import { MenuCard } from "@/components/menu/MenuCard";
import { MENU_ITEMS } from "@/content";

/** Section « Les envies du jour ». Cible de `#carte`. */
export function MenuSection() {
  return (
    <section className="shell section" id="carte">
      <Stagger className="section-head">
        <StaggerItem>
          <p className="eyebrow">À chacun sa pause</p>
          <h2>Les envies du jour</h2>
        </StaggerItem>
        <StaggerItem as="p">
          Du croquant, du fruité ou une touche sucrée : choisissez votre moment
          de fraîcheur.
        </StaggerItem>
      </Stagger>

      <Stagger className="menu-grid" gap={0.1}>
        {MENU_ITEMS.map((item) => (
          <MenuCard key={item.title} item={item} />
        ))}
      </Stagger>
    </section>
  );
}
