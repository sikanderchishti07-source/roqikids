import type { FC } from "react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { occasionIconKeys } from "../lib/data";
import { useI18n } from "../lib/i18n";

type IconFn = FC<{ className?: string }>;

const CakeIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
    <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
    <path d="M2 21h20" />
    <path d="M7 8v3" /><path d="M12 8v3" /><path d="M17 8v3" />
    <path d="M7 4h.01" /><path d="M12 4h.01" /><path d="M17 4h.01" />
  </svg>
);

const MedalIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 8" />
    <path d="M11 12 5.12 2.2" /><path d="m13 12 5.88-9.8" /><path d="M8 7h8" />
    <circle cx="12" cy="17" r="5" /><path d="M12 18v-2h-.5" />
  </svg>
);

const MoonStarIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    <path d="M20 3v4" /><path d="M22 5h-4" />
  </svg>
);

const BackpackIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
    <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    <path d="M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5" />
    <path d="M8 10h8" />
  </svg>
);

const icons: Record<string, IconFn> = {
  cake: CakeIcon,
  medal: MedalIcon,
  moon: MoonStarIcon,
  school: BackpackIcon,
};

export default function Occasions() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <SectionHead pill={t.occasions.pill} title={t.occasions.title} sub={t.occasions.sub} />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.occasions.items.map((o, i) => {
          const Icon = icons[occasionIconKeys[i]];
          return (
            <Reveal
              key={o.title}
              delay={i * 120}
              className="card-hover group rounded-3xl border border-border bg-card p-6 text-center"
            >
              <span className="mx-auto grid size-13 place-items-center rounded-2xl bg-secondary text-primary transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-4 text-base font-extrabold">{o.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{o.body}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
