import type { FC } from "react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { whyIconKeys } from "../lib/data";
import { useI18n } from "../lib/i18n";

type IconFn = FC<{ className?: string }>;

const HeartIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
  </svg>
);

const BookIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 7v14" />
    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
  </svg>
);

const GiftIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M20 12v10H4V12" />
    <path d="M2 7h20v5H2z" />
    <path d="M12 22V7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

const icons: Record<string, IconFn> = {
  heart: HeartIcon,
  book: BookIcon,
  gift: GiftIcon,
};

export default function WhyLove() {
  const { t } = useI18n();
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead pill={t.why.pill} title={t.why.title} sub={t.why.sub} />

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {t.why.items.map((item, i) => {
            const Icon = icons[whyIconKeys[i]];
            return (
              <Reveal
                key={item.title}
                delay={i * 140}
                className="card-hover group rounded-3xl border border-border bg-card p-7 text-center"
              >
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-secondary text-primary transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
