import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import SmartImage from "./SmartImage";
import { pageUrl, storyImgs, storyUrls } from "../lib/data";
import { useI18n } from "../lib/i18n";

export default function Stories() {
  const { t } = useI18n();
  return (
    <section id="stories" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHead pill={t.stories.pill} title={t.stories.title} sub={t.stories.sub} />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {t.stories.items.map((s, i) => (
          <Reveal
            as="article"
            key={s.title}
            delay={(i % 3) * 120}
            className="story-card group overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
          >
            <a
              href={storyUrls[i]}
              className="block overflow-hidden"
              aria-label={`${t.stories.coverOf} ${s.title}`}
            >
              <SmartImage
                src={storyImgs[i]}
                alt={s.alt}
                className="aspect-[3/4] w-full"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
            </a>
            <div className="p-5">
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-primary"
                  >
                    {tag}
                  </span>
                ))}
                <span
                  className="rounded-full border border-gold/50 bg-gold/10 px-2.5 py-1 text-[11px] font-bold text-gold-foreground"
                  title={`${t.stories.ageOf}: ${t.stories.ages[i]}`}
                >
                  {t.stories.ages[i]}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-extrabold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.sub}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-extrabold">{t.stories.price}</span>
                <a
                  href={storyUrls[i]}
                  className="btn-base btn-sheen btn-primary inline-flex h-8 items-center rounded-full bg-primary px-3.5 text-xs font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
                >
                  {t.stories.details}
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal variant="fade" delay={150} className="mt-10 text-center">
        <a
          href={pageUrl("/stories")}
          className="btn-base inline-flex h-11 items-center justify-center rounded-full border border-input bg-background px-8 text-sm font-bold shadow-sm hover:border-gold/60 hover:bg-accent hover:text-accent-foreground"
        >
          {t.stories.all}
        </a>
      </Reveal>
    </section>
  );
}
