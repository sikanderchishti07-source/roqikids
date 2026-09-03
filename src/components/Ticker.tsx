import { useI18n } from "../lib/i18n";

function Dot() {
  return (
    <svg viewBox="0 0 24 24" className="size-3 shrink-0 text-gold" aria-hidden="true" fill="currentColor">
      <path d="m12 1.8 2.1 6.3 6.3 2.1-6.3 2.1L12 18.6l-2.1-6.3-6.3-2.1 6.3-2.1z" />
    </svg>
  );
}

/** Ambient marquee of recent family orders — pauses on hover. */
export default function Ticker() {
  const { t } = useI18n();
  const items = [...t.ticker.items, ...t.ticker.items];
  return (
    <div
      dir="ltr"
      className="ticker relative z-10 overflow-hidden border-y border-border bg-secondary/60 py-3"
      aria-label={t.ticker.ariaLabel}
    >
      <div className="ticker-track flex items-center gap-10">
        {items.map((it, i) => (
          <span
            key={i}
            dir="auto"
            className="flex items-center gap-2.5 whitespace-nowrap text-xs font-bold text-foreground/70"
          >
            <Dot />
            {it.text}
            <span className="font-semibold text-muted-foreground">· {it.time}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
