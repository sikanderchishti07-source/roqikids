import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "../lib/i18n";

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="m12 1.8 2.1 6.3 6.3 2.1-6.3 2.1L12 18.6l-2.1-6.3-6.3-2.1 6.3-2.1z" />
    </svg>
  );
}

/**
 * Interactive 3D book: the child's name renders live onto a storybook cover.
 * Tilts with the mouse and adapts its spine direction to the page language.
 */
export default function NamePreview() {
  const { dir, t } = useI18n();
  const np = t.namePreview;
  const [name, setName] = useState("");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const sceneRef = useRef<HTMLDivElement>(null);
  const displayName = name.trim() || np.fallback;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = sceneRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -7, y: px * 9 });
  };

  const baseY = dir === "rtl" ? 13 : -13;

  return (
    <div className="mx-auto w-full max-w-95">
      {/* 3D book */}
      <div
        ref={sceneRef}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="book-scene floaty relative mx-auto w-[78%] max-w-72"
      >
        <div
          className="book-3d relative aspect-[3/4] w-full"
          style={{ transform: `rotateY(${baseY + tilt.y}deg) rotateX(${tilt.x}deg)` }}
        >
          <div className="book-pages" aria-hidden="true" />
          {/* cover */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-between overflow-hidden rounded-2xl p-6 text-center shadow-card"
            style={{
              background:
                "linear-gradient(160deg, #71405f 0%, #61304f 46%, #48233e 100%)",
            }}
          >
            <div className="pointer-events-none absolute inset-3 rounded-xl border border-gold/50" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-4 rounded-lg border border-gold/20" aria-hidden="true" />

            <SparkIcon className="size-6 text-gold" />

            <div className="relative">
              <p className="text-[11px] font-bold text-primary-foreground/70">{np.coverKicker}</p>
              <AnimatePresence mode="popLayout">
                <motion.h2
                  key={displayName}
                  initial={{ opacity: 0, y: 10, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                  className="font-display mt-1 text-4xl leading-tight text-primary-foreground"
                >
                  {np.coverTitle(displayName)}
                </motion.h2>
              </AnimatePresence>
            </div>

            <p className="text-[11px] font-bold text-gold">{np.coverFooter}</p>
          </div>
        </div>
        {/* soft ground shadow */}
        <div
          className="absolute -bottom-7 left-1/2 h-6 w-[80%] -translate-x-1/2 rounded-full bg-primary/25 blur-xl"
          aria-hidden="true"
        />
      </div>

      {/* name input */}
      <div className="mt-12 text-center">
        <label htmlFor="child-name" className="text-sm font-extrabold">
          {np.label}
        </label>
        <input
          id="child-name"
          type="text"
          dir="auto"
          maxLength={14}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={np.placeholder}
          className="mt-3 h-12 w-full rounded-full border border-input bg-card px-5 text-center text-base font-bold shadow-soft outline-none transition-all duration-300 placeholder:font-medium placeholder:text-muted-foreground/70 focus:border-gold focus:shadow-lift"
        />
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-bold text-muted-foreground">{np.try}</span>
          {np.names.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setName(n)}
              className="btn-base rounded-full bg-secondary px-3.5 py-1.5 text-xs font-bold text-primary hover:bg-gold hover:text-gold-foreground"
            >
              {n}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{np.hint}</p>
      </div>
    </div>
  );
}
