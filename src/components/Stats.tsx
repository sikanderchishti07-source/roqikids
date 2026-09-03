import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { localNum, useI18n } from "../lib/i18n";

function CountUp({
  value,
  suffix,
  decimal,
  start,
}: {
  value: number;
  suffix: string;
  decimal: boolean;
  start: boolean;
}) {
  const { lang } = useI18n();
  const reduced = useReducedMotion();
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setV(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1500;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      setV(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value, reduced]);

  const display = decimal ? Math.round(v * 10) / 10 : Math.round(v);
  return (
    <span className="font-display text-4xl text-gold sm:text-5xl" dir="ltr">
      {localNum(display, lang)}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStart(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground shadow-card"
      >
        <div
          className="glow-pulse pointer-events-none absolute -top-20 left-1/4 size-64 rounded-full bg-gold/15 blur-3xl"
          aria-hidden="true"
        />
        <p className="text-center text-xs font-bold text-primary-foreground/60">✦ {t.stats.band}</p>
        <div className="mt-8 grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {t.stats.items.map((s) => (
            <div key={s.label}>
              <CountUp value={s.value} suffix={s.suffix} decimal={s.decimal} start={start} />
              <p className="mt-2 text-sm font-bold text-primary-foreground/75">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
