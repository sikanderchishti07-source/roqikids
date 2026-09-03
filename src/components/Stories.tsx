import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import SmartImage from "./SmartImage";
import { pageUrl, stories } from "../lib/data";

export default function Stories() {
  return (
    <section id="stories" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHead
        pill="● حكاياتنا"
        title="اختر المغامرة التي يحبها طفلك"
        sub="كل قصة تُرسم من جديد لطفلك — باسمه، وبوجهه، وبعالمه."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((s, i) => (
          <Reveal
            as="article"
            key={s.title}
            delay={(i % 3) * 120}
            className="story-card group overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
          >
            <a href={s.url} className="block overflow-hidden" aria-label={`غلاف قصة ${s.title}`}>
              <SmartImage
                src={s.img}
                alt={s.alt}
                className="aspect-[3/4] w-full"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
            </a>
            <div className="p-5">
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="mt-3 text-lg font-extrabold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.sub}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-extrabold">تبدأ من ٦٥ ر.س</span>
                <a
                  href={s.url}
                  className="btn-base btn-sheen btn-primary inline-flex h-8 items-center rounded-full bg-primary px-3.5 text-xs font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
                >
                  التفاصيل
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
          شاهد كل الحكايات
        </a>
      </Reveal>
    </section>
  );
}
