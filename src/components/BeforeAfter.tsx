import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { IMG } from "../lib/data";
import { useI18n } from "../lib/i18n";
import { cn } from "../lib/utils";

/** Draggable photo → illustration comparison slider (RTL-aware, keyboard accessible). */
export default function BeforeAfter() {
  const { dir, t } = useI18n();
  const ba = t.beforeAfter;
  const [pct, setPct] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(5, Math.min(95, p)));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    update(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) update(e.clientX);
  };
  const stop = () => (dragging.current = false);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setPct((p) => Math.max(5, p - 5));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setPct((p) => Math.min(95, p + 5));
    }
  };

  // Photo layer: in LTR it occupies the left side, in RTL the right side.
  const clip =
    dir === "ltr" ? `inset(0 ${100 - pct}% 0 0)` : `inset(0 0 0 ${100 - pct}%)`;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <SectionHead pill={ba.pill} title={ba.title} sub={ba.sub} />

      <Reveal delay={150} className="mx-auto mt-10 max-w-3xl">
        <div
          ref={ref}
          role="slider"
          tabIndex={0}
          aria-label={ba.sliderLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stop}
          onPointerCancel={stop}
          onKeyDown={onKeyDown}
          className="relative aspect-[4/3] cursor-ew-resize touch-none overflow-hidden rounded-3xl shadow-card select-none"
        >
          {/* after (illustration) — base layer */}
          <img
            src={IMG.childIllustration}
            alt={ba.after}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* before (photo) — clipped layer */}
          <img
            src={IMG.childPhoto}
            alt={ba.before}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ clipPath: clip }}
          />

          {/* divider + handle */}
          <div
            className="pointer-events-none absolute inset-y-0 w-[3px] bg-card/90 shadow-lift"
            style={{ insetInlineStart: `calc(${pct}% - 1.5px)` }}
            aria-hidden="true"
          >
            <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-card bg-gold text-gold-foreground shadow-card">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 8-4 4 4 4" />
                <path d="m15 8 4 4-4 4" />
              </svg>
            </span>
          </div>

          {/* labels */}
          <span className="absolute top-4 start-4 rounded-full bg-foreground/60 px-3.5 py-1.5 text-[11px] font-bold text-background backdrop-blur-sm">
            {ba.before}
          </span>
          <span className="absolute top-4 end-4 rounded-full bg-primary/80 px-3.5 py-1.5 text-[11px] font-bold text-primary-foreground backdrop-blur-sm">
            {ba.after}
          </span>
        </div>
        <p
          className={cn(
            "mt-4 text-center text-xs font-bold text-muted-foreground"
          )}
        >
          ✦ {ba.dragHint}
        </p>
      </Reveal>
    </section>
  );
}
