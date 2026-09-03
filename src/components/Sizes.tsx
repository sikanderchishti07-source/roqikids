import type { FC } from "react";
import { Check } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { pageUrl, sizeNote, sizes, specs } from "../lib/data";
import { cn } from "../lib/utils";

type IconFn = FC<{ className?: string }>;

const BookIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 7v14" />
    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
  </svg>
);

const SparkleIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
    <path d="M20 2v4" />
    <path d="M22 4h-4" />
    <circle cx="4" cy="20" r="2" />
  </svg>
);

const DropletsIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
  </svg>
);

const PaletteIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
  </svg>
);

const specIcons: Record<string, IconFn> = {
  book: BookIcon,
  sparkles: SparkleIcon,
  droplets: DropletsIcon,
  palette: PaletteIcon,
};

export default function Sizes() {
  return (
    <section id="sizes" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHead
        pill="● اختر الحجم المناسب"
        title="متاحة بمقاسي A4 و A5"
        sub="نفس القصة ونفس الجودة، الفرق في الحجم وتجربة المشاهدة."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {sizes.map((s, i) => (
          <Reveal
            key={s.tag}
            delay={i * 150}
            className={cn(
              "card-hover rounded-3xl border bg-card p-7 shadow-soft",
              i === 1 ? "border-gold/50" : "border-border"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-sm font-extrabold text-primary">
                {s.tag}
              </span>
              <span className="text-2xl font-extrabold">{s.price}</span>
            </div>
            <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
            <p className="text-sm text-muted-foreground" dir="ltr" style={{ textAlign: "right" }}>
              {s.dims}
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {s.note}
            </p>
            <a
              href={pageUrl("/stories")}
              className="btn-base btn-sheen btn-primary mt-6 inline-flex h-10 w-full items-center justify-center rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
            >
              {s.cta}
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal as="p" variant="fade" delay={200} className="mt-6 text-center text-xs text-muted-foreground">
        {sizeNote}
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {specs.map((s, i) => {
          const Icon = specIcons[s.icon];
          return (
            <Reveal
              key={s.title}
              delay={i * 110}
              className="card-hover rounded-2xl border border-border bg-card p-5 text-center"
            >
              <Icon className="mx-auto size-6 text-primary" />
              <p className="mt-3 text-sm font-bold">{s.title}</p>
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
