import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { useI18n } from "../lib/i18n";
import { cn } from "../lib/utils";

export default function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <SectionHead pill={t.faq.pill} title={t.faq.title} sub={t.faq.sub} />

      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {t.faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal
              key={item.q}
              delay={i * 70}
              className={cn(
                "overflow-hidden rounded-2xl border bg-card transition-all duration-300",
                isOpen ? "border-gold/60 shadow-soft" : "border-border"
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
              >
                <span className="text-sm font-extrabold sm:text-base">{item.q}</span>
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-primary transition-all duration-400",
                    isOpen && "rotate-45 bg-gold text-gold-foreground"
                  )}
                >
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,.61,.36,1)]",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-8 text-muted-foreground">{item.a}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
