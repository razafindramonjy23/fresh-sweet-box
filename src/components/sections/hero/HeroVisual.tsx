"use client";

import Image from "next/image";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type PointerEvent } from "react";
import { FloatIn, Parallax } from "@/components/motion";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { HERO_DECOR } from "@/content";

/** Inclinaison maximale sous la souris, en degrés. */
const TILT = 8;

/**
 * Composition du hero : plusieurs calques à des profondeurs différentes,
 * dans une scène en perspective.
 *
 * Ce qui donne le relief n'est pas une image 3D mais l'empilement : le
 * conteneur pose une `perspective`, chaque calque est décalé en `translateZ`,
 * et l'ensemble bascule légèrement sous la souris. Les calques éloignés
 * bougent donc moins que les proches — c'est de la parallaxe, gratuite, sans
 * aucun calcul par image.
 *
 * Trois garde-fous :
 *
 * - **Pointeur grossier** (doigt) : pas de bascule. Il n'y a pas de survol sur
 *   un écran tactile, et suivre le doigt ferait sauter la composition à chaque
 *   effleurement du défilement.
 * - **`prefers-reduced-motion`** : ni bascule, ni parallaxe, ni lévitation.
 * - **Petit écran** : la perspective est réduite et les éléments purement
 *   décoratifs (pastille, pastilles de couleur) disparaissent — ils y seraient
 *   rognés par le bord et illisibles.
 *
 * Les calques « éclaboussure / gouttelettes » attendus par la direction
 * artistique viennent de `HERO_DECOR`, vide tant que les fichiers détourés
 * n'ont pas été fournis : voir `src/content/hero.ts`.
 */
export function HeroVisual() {
  const scene = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const small = useMediaQuery("(max-width: 640px)");
  const tilting = fine && !reduce;

  // -0.5 … +0.5 : la position du pointeur dans le cadre, pas en pixels, pour
  // que l'amplitude ne dépende pas de la taille du bloc.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 110, damping: 18, mass: 0.5 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-TILT, TILT]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [TILT * 0.7, -TILT * 0.7]);

  const track = (event: PointerEvent<HTMLDivElement>) => {
    if (!tilting) return;
    const box = scene.current?.getBoundingClientRect();
    if (!box) return;
    px.set((event.clientX - box.left) / box.width - 0.5);
    py.set((event.clientY - box.top) / box.height - 0.5);
  };

  const release = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      ref={scene}
      onPointerMove={track}
      onPointerLeave={release}
      className="relative mx-auto w-full max-w-[540px] px-[22px] pt-1 pb-[18px] sm:max-w-none sm:px-[26px] sm:pt-[14px] sm:pb-[26px] lg:p-[18px]"
      style={{ perspective: small ? 1400 : 1000 }}
    >
      <m.div
        className="relative grid transform-3d place-items-center lg:min-h-[clamp(430px,42vw,560px)]"
        style={tilting ? { rotateX, rotateY } : undefined}
      >
        {/* Fond : la forme verte, posée en retrait du cadre. */}
        <span
          aria-hidden="true"
          className="absolute inset-[8%_1%_1%_12%] rounded-[48%_48%_40px_40px] bg-leaf"
          /* `scale` compense le recul : en perspective, un calque reculé de
             70 px paraît 7 % plus petit, et la forme verte disparaissait
             derrière la photo au lieu de déborder sur sa gauche. */
          style={{ transform: "translateZ(-70px) scale(1.08) rotate(-7deg)" }}
        />

        {/* Calques fournis par la direction artistique, derrière la photo. */}
        {HERO_DECOR.filter((d) => d.depth < 0).map((d) => (
          <FloatIn
            key={d.src}
            as="span"
            /* Masqués sous 640 px au même titre que la pastille et les
               pois : l'éclaboussure fait 660 px de large, elle ne peut que
               sortir de l'écran d'un téléphone, et un moignon orange rogné
               au bord se lit comme un bug, pas comme une intention. */
            className="pointer-events-none absolute block transform-3d max-sm:hidden"
            aria-hidden="true"
            amplitude={d.float}
            duration={d.duration}
            style={{
              top: d.top,
              left: d.left,
              transform: `translateZ(${d.depth}px)`,
            }}
          >
            <Image src={d.src} alt="" width={d.width} height={d.height} />
          </FloatIn>
        ))}

        {/* Trois couches, trois transformations : <Parallax> glisse au
            défilement, <FloatIn> porte l'entrée et la lévitation, le cadre
            garde sa rotation fixe. Les fusionner ferait que la dernière
            écraserait les autres. */}
        <Parallax
          className="relative z-2 grid w-full transform-3d place-items-center"
          distance={26}
        >
          <FloatIn
            className="grid w-full transform-3d place-items-center"
            delay={0.2}
            amplitude={10}
            duration={7.5}
          >
            <div className="relative aspect-[1/1.02] w-[min(100%,410px)] rotate-2 rounded-[48%_48%_28px_28px] bg-white p-[9px] shadow-[0_32px_64px_rgba(68,87,61,0.14),0_3px_10px_rgba(68,87,61,0.05)] sm:w-[min(78vw,470px)] lg:w-[min(100%,510px)] lg:rounded-[48%_48%_40px_40px] lg:p-[14px]">
              <div className="relative h-full w-full overflow-hidden rounded-[48%_48%_20px_20px] lg:rounded-[48%_48%_30px_30px]">
                <Image
                  src="/images/bol-salade-fruits.jpg"
                  alt="Bol blanc garni de mangue, raisin noir, grenade, kiwi, rondelles de citron vert et physalis, tenu à la main"
                  fill
                  sizes="(max-width: 640px) 84vw, (max-width: 1024px) 78vw, 510px"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </FloatIn>
        </Parallax>

        {/* Pastille manuscrite : décorative et rognée par le bord sur
            téléphone, donc réservée aux écrans qui ont la place. */}
        <div
          className="absolute bottom-[54px] -left-[23px] z-3 hidden transform-3d sm:block"
          style={{ transform: "translateZ(90px)" }}
        >
          <p className="m-0 -rotate-7 rounded-[17px] bg-paper px-[18px] py-[15px] font-display text-[15px] text-deep shadow-[0_12px_30px_rgba(51,75,55,0.13)] lg:text-[17px]">
            <small className="mb-[5px] block font-sans text-[10px] tracking-[0.14em] text-sage uppercase">
              Une pause fraîche
            </small>
            faite avec amour ♡
          </p>
        </div>

        {/* Second cliché : le versant sucré de la carte. */}
        <FloatIn
          className="absolute -right-[14px] bottom-[7%] z-3 transform-3d"
          delay={0.55}
          amplitude={8}
          duration={9}
        >
          <div
            className="relative aspect-3/4 w-[104px] overflow-hidden rounded-[18px] border-[6px] border-paper shadow-[0_18px_38px_rgba(51,75,55,0.2)] sm:w-[130px] lg:w-[152px] lg:rounded-[22px] lg:border-8"
            style={{ transform: "translateZ(70px) rotate(7deg)" }}
          >
            <Image
              src="/images/milkshake-hero.jpg"
              alt="Milkshake rose Fresh & Sweet Box, chantilly, coulis de fraise, bord chocolaté et billes colorées"
              fill
              sizes="152px"
              className="object-cover"
            />
          </div>
        </FloatIn>

        {/* Pastilles de couleur : pur ornement, masquées sur téléphone. */}
        <FloatIn
          as="span"
          aria-hidden="true"
          className="absolute top-[15%] right-[3%] z-2 hidden size-[42px] rounded-full bg-berry shadow-[0_8px_16px_rgba(101,55,74,0.13)] transform-3d sm:block"
          style={{ transform: "translateZ(120px)" }}
          delay={0.45}
          amplitude={7}
          duration={5.5}
        />
        <FloatIn
          as="span"
          aria-hidden="true"
          className="absolute top-[17%] left-[8%] z-2 hidden size-[25px] rounded-full bg-[#efb64d] shadow-[0_8px_16px_rgba(101,55,74,0.13)] transform-3d sm:block"
          style={{ transform: "translateZ(100px)" }}
          delay={0.6}
          amplitude={6}
          duration={6.5}
        />

        {/* Calques décoratifs posés devant la photo. */}
        {HERO_DECOR.filter((d) => d.depth >= 0).map((d) => (
          <FloatIn
            key={d.src}
            as="span"
            className="pointer-events-none absolute z-3 block transform-3d max-sm:hidden"
            aria-hidden="true"
            amplitude={d.float}
            duration={d.duration}
            style={{
              top: d.top,
              left: d.left,
              transform: `translateZ(${d.depth}px)`,
            }}
          >
            <Image src={d.src} alt="" width={d.width} height={d.height} />
          </FloatIn>
        ))}
      </m.div>
    </div>
  );
}
