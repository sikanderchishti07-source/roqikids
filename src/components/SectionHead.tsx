import Reveal from "./Reveal";

type SectionHeadProps = {
  pill: string;
  title: string;
  sub?: string;
};

/** Centered section header: gold pill + line-mask title + fading subtitle. */
export default function SectionHead({ pill, title, sub }: SectionHeadProps) {
  return (
    <div className="text-center">
      <Reveal variant="fade">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold text-primary">
          {pill}
        </span>
      </Reveal>
      <Reveal
        as="h2"
        variant="mask"
        delay={100}
        className="font-display mt-4 text-3xl text-foreground sm:text-4xl"
      >
        {title}
      </Reveal>
      {sub && (
        <Reveal
          as="p"
          variant="fade"
          delay={220}
          className="mx-auto mt-3 max-w-2xl text-sm leading-8 text-muted-foreground"
        >
          {sub}
        </Reveal>
      )}
    </div>
  );
}
