import Reveal from "./Reveal";
import { useI18n } from "../lib/i18n";

function Chip({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <span
      className="card-hover flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 shadow-soft"
      role="img"
      aria-label={label}
    >
      {children}
    </span>
  );
}

/** Simplified inline-SVG payment brand chips (mada, Apple Pay, Visa, Mastercard, Tamara). */
export default function PaymentStrip() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <Reveal variant="fade" className="text-center">
        <p className="text-sm font-extrabold">{t.payment.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{t.payment.note}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Chip label="mada">
            <svg viewBox="0 0 32 20" className="h-4 w-7" aria-hidden="true">
              <path d="M2 3h13L9 17H2z" fill="#23b14d" />
              <path d="M15 3h15v14H8.5z" fill="#003b71" opacity="0.92" />
            </svg>
            <span className="text-sm font-extrabold text-[#003b71]">mada</span>
          </Chip>
          <Chip label="Apple Pay">
            <svg viewBox="0 0 24 24" className="size-4.5" fill="currentColor" aria-hidden="true">
              <path d="M16.4 12.6c0-2 1.6-3 1.7-3-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2.1 2.5 2 1-.1 1.4-.6 2.6-.6s1.6.6 2.6.6c1.1 0 1.8-1 2.4-2 .8-1.1 1.1-2.2 1.1-2.3 0 0-2.1-.8-2.1-3.1ZM14.4 6.6c.5-.7.9-1.6.8-2.6-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.5.9 0 1.8-.5 2.3-1.1Z" />
            </svg>
            <span className="text-sm font-extrabold tracking-tight">Pay</span>
          </Chip>
          <Chip label="Visa">
            <span className="text-base font-extrabold tracking-wide text-[#1a1f71] italic">VISA</span>
          </Chip>
          <Chip label="Mastercard">
            <svg viewBox="0 0 36 22" className="h-5 w-8" aria-hidden="true">
              <circle cx="13" cy="11" r="9" fill="#eb001b" />
              <circle cx="23" cy="11" r="9" fill="#f79e1b" />
              <path d="M18 4a9 9 0 0 1 0 14 9 9 0 0 1 0-14Z" fill="#ff5f00" />
            </svg>
          </Chip>
          <Chip label="Tamara">
            <span className="flex items-center gap-1.5">
              <span className="grid size-4 place-items-center rounded-full bg-[#ff4fa3]">
                <span className="size-1.5 rounded-full bg-white" />
              </span>
              <span className="text-sm font-extrabold lowercase text-[#2b2b2b]">tamara</span>
            </span>
          </Chip>
        </div>
      </Reveal>
    </section>
  );
}
