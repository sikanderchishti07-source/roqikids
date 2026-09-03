import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import SmartImage from "./SmartImage";
import { IMG } from "../lib/data";
import { useI18n } from "../lib/i18n";

const pages = [IMG.interior1, IMG.interior2];

/** Horizontal snap-scroll strip of real interior story pages. */
export default function Samples() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <SectionHead pill={t.samples.pill} title={t.samples.title} sub={t.samples.sub} />

      <div className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
        {pages.map((src, i) => (
          <Reveal
            as="figure"
            key={src}
            delay={i * 150}
            className="card-hover w-[85%] shrink-0 snap-center overflow-hidden rounded-3xl border border-border bg-card shadow-soft sm:w-[60%] lg:w-[46%]"
          >
            <SmartImage src={src} alt={t.samples.captions[i]} className="aspect-[4/3] w-full" />
            <figcaption className="flex items-center justify-between px-5 py-4">
              <span className="text-sm font-extrabold">{t.samples.captions[i]}</span>
              <span className="text-xs font-bold text-muted-foreground" dir="ltr">
                {i === 0 ? "p. 7" : "p. 12"}
              </span>
            </figcaption>
          </Reveal>
        ))}
      </div>

      <p className="mt-2 text-center text-xs font-bold text-muted-foreground">
        ← {t.samples.hint} →
      </p>
    </section>
  );
}
