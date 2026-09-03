import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { useI18n } from "../lib/i18n";
import { cn } from "../lib/utils";

function Stars({ label }: { label: string }) {
  return (
    <div className="flex gap-0.5 text-gold" aria-label={label}>
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
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  const total = t.testimonials.items.length;

  // soft rotating spotlight that gently fades between testimonial cards
  useEffect(() => {
    if (reduced || paused) return;
    timer.current = window.setInterval(() => setActive((a) => (a + 1) % total), 4200);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [reduced, paused, total]);

  return (
    <section id="testimonials" className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead
          pill={t.testimonials.pill}
          title={t.testimonials.title}
          sub={t.testimonials.sub}
        />

        <div
          className="mt-10 grid gap-6 md:grid-cols-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {t.testimonials.items.map((item, i) => {
            const isActive = !reduced && i === active;
            return (
              <Reveal
                as="figure"
                key={item.name}
                delay={i * 140}
                className={cn(
                  "rounded-2xl border bg-card p-7 shadow-soft transition-all duration-700 ease-out",
                  isActive ? "-translate-y-1.5 border-gold/60 shadow-card" : "border-border"
                )}
              >
                <Stars label={t.testimonials.rating} />
                <blockquote className="mt-4 text-sm leading-8 text-muted-foreground">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-2.5 text-sm font-bold">
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-full bg-secondary text-xs font-extrabold text-primary transition-colors duration-700",
                      isActive && "bg-gold text-gold-foreground"
                    )}
                  >
                    {item.initial}
                  </span>
                  {item.name}
                </figcaption>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
