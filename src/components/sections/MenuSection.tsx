import {
  FloatingFruits,
  type Floater,
} from "@/components/decor/FloatingFruits";
import { Stagger, StaggerItem, WordReveal } from "@/components/motion";
import { MenuCard } from "@/components/menu/MenuCard";
import { MENU_ITEMS } from "@/content";

/* Aux bords de la section, à moitié hors champ : ils dépassent des marges
   sans jamais passer sous le texte. */
const FRUITS: Floater[] = [
  {
    fruit: "citrus",
    top: "3%",
    right: "-14px",
    size: 46,
    depth: 50,
    rotate: 12,
  },
  {
    fruit: "almond",
    top: "8%",
    left: "-12px",
    size: 32,
    depth: 30,
    rotate: -35,
    delay: 1.2,
  },
  {
    fruit: "raisin",
    top: "4%",
    right: "16%",
    size: 18,
    depth: 80,
    rotate: 15,
    delay: 2,
  },
  {
    fruit: "cashew",
    top: "34%",
    left: "-16px",
    size: 34,
    depth: 45,
    rotate: 20,
    delay: 0.3,
  },
  {
    fruit: "strawberry",
    top: "52%",
    right: "-18px",
    size: 40,
    depth: 60,
    rotate: -10,
    delay: 2.4,
  },
  {
    fruit: "raisin",
    top: "66%",
    right: "-8px",
    size: 20,
    depth: 75,
    rotate: -20,
    delay: 1.7,
  },
  {
    fruit: "leaf",
    top: "82%",
    left: "-14px",
    size: 32,
    depth: 40,
    rotate: 8,
    delay: 0.6,
  },
];

/** Section « Les envies du jour ». Cible de `#carte`. */
export function MenuSection() {
  return (
    /* `relative isolate` : le calque des fruits se place derrière le
       contenu de la section, sans passer sous le fond de la page. */
    <section className="shell section relative isolate" id="carte">
      <FloatingFruits items={FRUITS} />
      <Stagger className="section-head">
        <StaggerItem>
          <p className="eyebrow">À chacun sa pause</p>
          <h2>
            <WordReveal text="Les envies du jour" />
          </h2>
        </StaggerItem>
        <StaggerItem as="p">
          Du croquant, du fruité ou une touche sucrée : choisissez votre moment
          de fraîcheur.
        </StaggerItem>
      </Stagger>

      <Stagger
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
        gap={0.1}
      >
        {MENU_ITEMS.map((item) => (
          <MenuCard key={item.title} item={item} />
        ))}
      </Stagger>
    </section>
  );
}
