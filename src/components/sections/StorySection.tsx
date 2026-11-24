import Image from "next/image";
import {
  MaskReveal,
  Parallax,
  Reveal,
  Stagger,
  StaggerItem,
  WordReveal,
} from "@/components/motion";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { SITE } from "@/content";

/** Section « Notre esprit ». Cible de `#esprit`. */
export function StorySection() {
  return (
    <section className="shell section" id="esprit">
      <Reveal className="story">
        <MaskReveal className="story-photo">
          <Parallax className="story-photo-shift" distance={22}>
            <Image
              src="/images/bol-salade-fruits-detail.jpg"
              alt="Gros plan du bol de fruits frais devant les collines, avec l'étiquette Fresh & Sweet Box"
              fill
              sizes="(max-width: 850px) 92vw, 45vw"
            />
          </Parallax>
        </MaskReveal>

        <Stagger className="story-copy">
          <StaggerItem as="p" className="eyebrow" from="right">
            Notre esprit
          </StaggerItem>
          <StaggerItem as="h2" from="right">
            <WordReveal text="Le frais d’un bar à salade, le plaisir d’un bar à desserts" />
          </StaggerItem>
          <StaggerItem as="p" className="story-body" from="right">
            Tout part de fruits et légumes coupés le jour même. On compose
            devant vous, on garnit généreusement, et on referme le gobelet pour
            que ça voyage bien.
          </StaggerItem>
          <StaggerItem as="p" className="story-quote" from="right">
            {SITE.quote}
          </StaggerItem>
          <StaggerItem from="right">
            <ArrowButton href="#carte">Voir la carte</ArrowButton>
          </StaggerItem>
        </Stagger>
      </Reveal>
    </section>
  );
}
