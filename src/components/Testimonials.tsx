import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { testimonials } from "../lib/data";
import { cn } from "../lib/utils";

function Stars() {
  return (
    <div className="flex gap-0.5 text-gold" aria-label="تقييم 5 من 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 fill-current"
          aria-hidden="true"
        >
          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  // soft rotating spotlight that gently fades between testimonial cards
  useEffect(() => {
    if (reduced || paused) return;
    timer.current = window.setInterval(
      () => setActive((a) => (a + 1) % testimonials.length),
      4200
    );
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [reduced, paused]);

  return (
    <section id="testimonials" className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead
          pill="● تجارب العملاء"
          title="أجمل رد فعل؟ «ده أنا!»"
          sub="تجارب أهالٍ عاش أطفالهم لحظة اكتشاف أنهم أبطال القصة."
        />

        <div
          className="mt-10 grid gap-6 md:grid-cols-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {testimonials.map((t, i) => {
            const isActive = !reduced && i === active;
            return (
              <Reveal
                as="figure"
                key={t.name}
                delay={i * 140}
                className={cn(
                  "rounded-2xl border bg-card p-7 shadow-soft transition-all duration-700 ease-out",
                  isActive ? "-translate-y-1.5 border-gold/60 shadow-card" : "border-border"
                )}
              >
                <Stars />
                <blockquote className="mt-4 text-sm leading-8 text-muted-foreground">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-2.5 text-sm font-bold">
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-full bg-secondary text-xs font-extrabold text-primary transition-colors duration-700",
                      isActive && "bg-gold text-gold-foreground"
                    )}
                  >
                    {t.name.replace("والدة ", "").replace("ماما ", "").replace("أم ", "").charAt(0)}
                  </span>
                  {t.name}
                </figcaption>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
