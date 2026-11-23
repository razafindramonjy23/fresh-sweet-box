import Image from "next/image";
import { Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { SITE } from "@/content";

/** Section « Notre esprit ». Cible de `#esprit`. */
export function StorySection() {
  return (
    <section className="shell section" id="esprit">
      <Reveal className="story">
        <div className="story-photo">
          <Parallax className="story-photo-shift" distance={22}>
            <Image
              src="/images/bol-salade-fruits-detail.jpg"
              alt="Gros plan du bol de fruits frais devant les collines, avec l'étiquette Fresh & Sweet Box"
              fill
              sizes="(max-width: 850px) 92vw, 45vw"
            />
          </Parallax>
        </div>

        <Stagger className="story-copy">
          <StaggerItem as="p" className="eyebrow">
            Notre esprit
          </StaggerItem>
          <StaggerItem as="h2">
            Le frais d’un bar à salade, le plaisir d’un bar à desserts
          </StaggerItem>
          <StaggerItem as="p" className="story-body">
            Tout part de fruits et légumes coupés le jour même. On compose
            devant vous, on garnit généreusement, et on referme le gobelet pour
            que ça voyage bien.
          </StaggerItem>
          <StaggerItem as="p" className="story-quote">
            {SITE.quote}
          </StaggerItem>
          <StaggerItem>
            <ArrowButton href="#carte">Voir la carte</ArrowButton>
          </StaggerItem>
        </Stagger>
      </Reveal>
    </section>
  );
}
