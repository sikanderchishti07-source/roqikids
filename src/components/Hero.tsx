import type { CSSProperties } from "react";
import { BookOpen, Gift, Heart, Printer, ShieldCheck, Smile, Sparkles, Truck } from "lucide-react";
import Reveal from "./Reveal";
import { pageUrl } from "../lib/data";
import { useI18n } from "../lib/i18n";

function Sparkle({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" fill="currentColor">
      <path d="m12 1.8 2.1 6.3 6.3 2.1-6.3 2.1L12 18.6l-2.1-6.3-6.3-2.1 6.3-2.1z" />
    </svg>
  );
}

const assuranceIcons = [ShieldCheck, Truck, Printer];
const featureIcons = [Smile, BookOpen, Gift, Heart];

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="bg-hero relative overflow-hidden">
      {/* ambient twinkling sparkles */}
      <Sparkle className="twinkle absolute right-[8%] top-40 size-4 text-gold/70" />
      <Sparkle className="twinkle absolute left-[6%] top-48 size-3 text-gold/50" style={{ animationDelay: "1.2s" }} />
      <Sparkle className="twinkle absolute right-[46%] top-36 size-2.5 text-gold/60" style={{ animationDelay: "2.1s" }} />
      <Sparkle className="twinkle absolute bottom-52 left-[18%] size-3.5 text-gold/40" style={{ animationDelay: "0.6s" }} />
      <Sparkle className="twinkle absolute bottom-72 right-[14%] size-2.5 text-gold/50" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 pt-32 pb-10 md:grid-cols-2 md:pt-44 md:pb-14 lg:gap-14">
        {/* ------- copy ------- */}
        <div>
          <Reveal variant="fade">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold text-primary">
              <Sparkles className="size-3.5" aria-hidden="true" />
              {t.hero.pill}
            </span>
          </Reveal>

          <Reveal
            as="h1"
            variant="mask"
            delay={120}
            className="font-display mt-5 text-4xl leading-[1.35] text-foreground sm:text-5xl md:text-[3.4rem] md:leading-[1.3]"
          >
            <>
              <span className="block">{t.hero.h1a}</span>
              <span className="text-gradient-gold block">{t.hero.h1b}</span>
            </>
          </Reveal>

          <Reveal as="p" variant="fade" delay={280} className="mt-5 max-w-md text-base leading-8 text-muted-foreground">
            {t.hero.body}
          </Reveal>

          <Reveal variant="fade" delay={420} className="mt-7 flex flex-wrap gap-3">
            <a
              href={pageUrl("/stories")}
              className="btn-base btn-sheen btn-primary inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-bold text-primary-foreground shadow-soft hover:bg-primary/90 sm:h-12"
            >
              {t.hero.cta1}
            </a>
            <a
              href="#stories"
              className="btn-base inline-flex h-11 items-center justify-center rounded-full border border-input bg-background px-7 text-sm font-bold text-foreground shadow-sm hover:border-gold/60 hover:bg-accent hover:text-accent-foreground sm:h-12"
            >
              {t.hero.cta2}
            </a>
          </Reveal>

          <Reveal variant="fade" delay={560} className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            {t.hero.assurances.map((label, i) => {
              const Icon = assuranceIcons[i];
              return (
                <span key={label} className="inline-flex items-center gap-2 text-xs font-bold text-foreground/80">
                  <Icon className="size-4 text-primary" aria-hidden="true" />
                  {label}
                </span>
              );
            })}
          </Reveal>
        </div>

        {/* ------- fanned book stack ------- */}
        <Reveal variant="fade" delay={250} className="relative">
          <div className="hero-glow absolute inset-x-4 top-1/2 -z-10 h-[70%] -translate-y-1/2 rounded-full" aria-hidden="true" />
          <div className="floaty">
            <img
              src="/hero-books.webp"
              alt={t.hero.stackAlt}
              width={1400}
              height={789}
              fetchPriority="high"
              decoding="async"
              className="w-full scale-[1.06] drop-shadow-[0_28px_40px_rgba(97,48,79,0.28)]"
            />
          </div>

          {/* gold seal */}
          <div className="hero-seal absolute -bottom-3 end-0 grid size-24 place-items-center rounded-full text-center leading-tight text-gold-foreground shadow-lift sm:size-28">
            <span className="px-2 text-[11px] font-extrabold sm:text-xs">
              {t.hero.badge[0]}
              <br />
              {t.hero.badge[1]}
            </span>
          </div>
        </Reveal>
      </div>

      {/* ------- feature strip ------- */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-8">
        <Reveal className="grid rounded-3xl border border-border bg-card/90 shadow-soft backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4">
          {t.hero.features.map((f, i) => {
            const Icon = featureIcons[i];
            return (
              <div
                key={f.title}
                className="hero-feature flex flex-col items-center gap-3 px-5 py-7 text-center"
              >
                <span className="grid size-12 place-items-center rounded-full bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="text-sm font-extrabold">{f.title}</p>
                <p className="text-xs leading-6 text-muted-foreground">{f.body}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
