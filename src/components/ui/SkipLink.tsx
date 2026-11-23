/** Premier élément focusable de la page : saute la navigation. */
export function SkipLink({ targetId = "contenu" }: { targetId?: string }) {
  return (
    <a className="skip-link" href={`#${targetId}`}>
      Aller au contenu
    </a>
  );
}
