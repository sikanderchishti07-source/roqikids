import type { CSSProperties } from "react";
import Reveal from "./Reveal";
import { pageUrl } from "../lib/data";

function Sparkle({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" fill="currentColor">
      <path d="m12 1.8 2.1 6.3 6.3 2.1-6.3 2.1L12 18.6l-2.1-6.3-6.3-2.1 6.3-2.1z" />
    </svg>
  );
}

export default function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-4">
      <Reveal className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground shadow-card">
        {/* ambient glows + floating sparkles */}
        <div
          className="glow-pulse pointer-events-none absolute -top-24 right-1/4 size-64 rounded-full bg-gold/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="glow-pulse pointer-events-none absolute -bottom-28 left-[20%] size-72 rounded-full bg-secondary/10 blur-3xl"
          style={{ animationDelay: "2.2s" }}
          aria-hidden="true"
        />
        <Sparkle className="floaty absolute right-[12%] top-8 size-4 text-gold/70" />
        <Sparkle className="floaty absolute left-[10%] top-14 size-3 text-gold/50" style={{ animationDelay: "1.4s" }} />
        <Sparkle className="floaty absolute bottom-8 right-[28%] size-2.5 text-secondary/60" style={{ animationDelay: "0.7s" }} />
        <Sparkle className="floaty absolute bottom-12 left-[22%] size-3.5 text-gold/40" style={{ animationDelay: "2.6s" }} />

        <div className="relative">
          <p className="text-sm font-bold opacity-80">✦ الآن جاء دور طفلك</p>
          <Reveal
            as="h2"
            variant="mask"
            delay={120}
            className="font-display mt-3 text-3xl sm:text-4xl"
          >
            جاهز تخلي طفلك بطل قصته؟
          </Reveal>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-8 opacity-80">
            اختر الحكاية والمقاس المناسب، أضفها إلى السلة، وأكمل طلبك في أقل من 3 دقائق.
          </p>
          <a
            href={pageUrl("/stories")}
            className="btn-base btn-sheen mt-7 inline-flex h-11 items-center justify-center rounded-full bg-secondary px-8 text-sm font-bold text-secondary-foreground shadow-sm hover:bg-secondary/85"
          >
            ابدأ قصة طفلك
          </a>
        </div>
      </Reveal>
    </section>
  );
}
