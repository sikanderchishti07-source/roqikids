import type { CSSProperties, FC } from "react";
import { Check, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";
import { COVERS, heroChecklist, pageUrl, trustItems } from "../lib/data";

type IconFn = FC<{ className?: string }>;

const TruckIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </svg>
);

const HeartIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
  </svg>
);

const StarIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
);

const trustIcons: Record<string, IconFn> = {
  truck: TruckIcon,
  sparkles: Sparkles,
  heart: HeartIcon,
  star: StarIcon,
};

function Sparkle({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" fill="currentColor">
      <path d="m12 1.8 2.1 6.3 6.3 2.1-6.3 2.1L12 18.6l-2.1-6.3-6.3-2.1 6.3-2.1z" />
    </svg>
  );
}

const heroCovers = [
  { src: COVERS.braveAseel, alt: "غلاف قصة الأميرة الشجاعة", offset: true, eager: true },
  { src: COVERS.captainKarim, alt: "غلاف قصة القبطان الصغير", offset: false, eager: true },
  { src: COVERS.dinoJourney, alt: "غلاف قصة رحلة الديناصورات", offset: true, eager: false },
  { src: COVERS.dreamCity, alt: "غلاف قصة رحلة إلى مدينة الأحلام", offset: false, eager: false },
];

export default function Hero() {
  return (
    <section className="bg-hero relative overflow-hidden">
      {/* ambient twinkling sparkles */}
      <Sparkle className="twinkle absolute right-[6%] top-28 size-4 text-gold/70" />
      <Sparkle className="twinkle absolute left-[8%] top-40 size-3 text-gold/50" style={{ animationDelay: "1.2s" }} />
      <Sparkle className="twinkle absolute right-[42%] top-24 size-2.5 text-gold/60" style={{ animationDelay: "2.1s" }} />
      <Sparkle className="twinkle absolute bottom-24 left-[16%] size-3.5 text-gold/40" style={{ animationDelay: "0.6s" }} />
      <Sparkle className="twinkle absolute bottom-40 right-[12%] size-2.5 text-gold/50" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 pt-32 pb-14 md:grid-cols-2 md:pt-40 md:pb-20">
        <div>
          <Reveal variant="fade">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold text-primary">
              <Sparkles className="size-3.5" aria-hidden="true" />
              هدية لن تكون مثل أي هدية
            </span>
          </Reveal>

          <Reveal
            as="h1"
            variant="mask"
            delay={120}
            className="font-display mt-5 text-4xl leading-[1.4] text-foreground sm:text-5xl md:text-6xl md:leading-[1.35]"
          >
            <>
              تخيّل فرحة طفلك عندما يفتح الكتاب ويكتشف…{" "}
              <span className="text-gradient-gold">أنه هو بطل القصة!</span>
            </>
          </Reveal>

          <Reveal
            as="p"
            variant="fade"
            delay={280}
            className="mt-5 max-w-lg text-base leading-8 text-muted-foreground"
          >
            ليست مجرد كتاب أطفال. نحوّل اسمه وصورته إلى مغامرة مصوّرة صُنعت خصيصًا له، ليقرأ عن
            نفسه ويشاهد شخصيته داخل عالم يحبه.
          </Reveal>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {heroChecklist.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={360 + i * 90}
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {item}
              </Reveal>
            ))}
          </ul>

          <Reveal variant="fade" delay={640} className="mt-8 flex flex-wrap gap-3">
            <a
              href={pageUrl("/stories")}
              className="btn-base btn-sheen btn-primary inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-bold text-primary-foreground shadow-soft hover:bg-primary/90 sm:h-12"
            >
              ✦ اصنع قصة طفلك الآن
            </a>
            <a
              href={pageUrl("/how-it-works")}
              className="btn-base inline-flex h-11 items-center justify-center rounded-full border border-input bg-background px-7 text-sm font-bold text-foreground shadow-sm hover:border-gold/60 hover:bg-accent hover:text-accent-foreground sm:h-12"
            >
              شاهد كيف نصنعها
            </a>
          </Reveal>
        </div>

        {/* floating cover grid */}
        <Reveal variant="fade" delay={250} className="relative">
          <div className="grid grid-cols-2 gap-4">
            {heroCovers.map((c, i) => (
              <div key={c.src} className="floaty group" style={{ animationDelay: `${i * 0.9}s` }}>
                <SmartImage
                  src={c.src}
                  alt={c.alt}
                  eager={c.eager}
                  className={
                    "w-full rounded-2xl shadow-card transition-transform duration-500 group-hover:scale-[1.02] " +
                    (c.offset ? "md:translate-y-4" : "")
                  }
                  imgClassName="aspect-[3/4]"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* trust strip overlapping the next section */}
      <div className="relative z-10 mx-auto -mb-10 grid max-w-6xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((t, i) => {
          const Icon = trustIcons[t.icon];
          return (
            <Reveal
              key={t.title}
              delay={i * 110}
              className="card-hover flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-bold">{t.title}</p>
                <p className="text-xs text-muted-foreground">{t.sub}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
