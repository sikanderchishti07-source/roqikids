import { useState } from "react";
import { Check } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { packageData } from "../lib/data";
import { useCart } from "../lib/cart";
import { formatSAR, useI18n } from "../lib/i18n";
import { cn } from "../lib/utils";

export default function Packages() {
  const { addItem } = useCart();
  const { lang, t } = useI18n();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (index: number) => {
    const meta = t.packages.items[index];
    const data = packageData[index];
    addItem({
      id: data.id,
      title: meta.title,
      desc: meta.desc,
      price: data.price,
      save: data.save,
      covers: data.covers,
    });
    setAddedId(data.id);
    window.setTimeout(() => setAddedId(null), 1400);
  };

  const oldLabel = (oldPrice: string) =>
    lang === "ar" ? `${oldPrice} ${t.packages.riyal}` : `${t.packages.riyal} ${oldPrice}`;

  const saveLabel = (save: number) =>
    lang === "ar"
      ? `${t.packages.save} ${save} ${t.packages.riyal}`
      : `${t.packages.save} ${t.packages.riyal} ${save}`;

  return (
    <section id="packages" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHead
        pill={t.packages.pill}
        title={t.packages.title}
        sub={t.packages.sub}
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {t.packages.items.map((p, i) => {
          const data = packageData[i];
          return (
            <Reveal
              key={p.title}
              delay={i * 160}
              className={cn(
                "card-hover relative rounded-3xl border bg-card p-7 shadow-soft",
                i === 1 ? "border-gold/60" : "border-border"
              )}
            >
              <span className="absolute -top-3 start-6 rounded-full bg-gold px-3 py-1 text-[11px] font-bold text-gold-foreground shadow-soft">
                {p.badge}
              </span>
              <h3 className="text-lg font-extrabold">{p.title}</h3>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-3xl font-extrabold text-primary">{data.price}</span>
                <span className="pb-1 text-sm font-bold">{t.packages.riyal}</span>
                <span className="pb-1 text-sm text-muted-foreground line-through">
                  {oldLabel(data.oldPrice)}
                </span>
              </div>
              <p className="mt-1 text-xs font-semibold text-gold-foreground">{saveLabel(data.save)}</p>
              <ul className="mt-5 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleAdd(i)}
                aria-live="polite"
                className={cn(
                  "btn-base btn-sheen btn-primary mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full px-4 text-sm font-bold shadow-soft",
                  addedId === data.id
                    ? "bg-gold text-gold-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {addedId === data.id && <Check className="size-4" aria-hidden="true" />}
                {p.cta}
              </button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
