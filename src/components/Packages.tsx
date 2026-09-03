import { useState } from "react";
import { Check } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { COVERS, packages } from "../lib/data";
import { useCart } from "../lib/cart";
import { cn } from "../lib/utils";

const cartEntries = [
  {
    id: "pkg-a5",
    title: "باقة 3 قصص صغيرة",
    desc: "مقاس A5 · 3 قصص مختلفة",
    price: 130,
    save: 65,
    covers: [COVERS.braveAseel, COVERS.captainKarim, COVERS.dinoJourney],
  },
  {
    id: "pkg-a4",
    title: "باقة 3 قصص كبيرة",
    desc: "مقاس A4 · 3 قصص مختلفة",
    price: 200,
    save: 100,
    covers: [COVERS.dreamCity, COVERS.littleArtist, COVERS.princessNoura],
  },
];

export default function Packages() {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (index: number) => {
    addItem(cartEntries[index]);
    setAddedId(cartEntries[index].id);
    window.setTimeout(() => setAddedId(null), 1400);
  };

  return (
    <section id="packages" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHead
        pill="● باقات رُقي الموفّرة"
        title="اختر الباقة الأنسب ووفّر أكثر"
        sub="ثلاث قصص مخصصة يمكن تنفيذها لنفس الطفل أو لأطفال مختلفين."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {packages.map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 160}
            className={cn(
              "card-hover relative rounded-3xl border bg-card p-7 shadow-soft",
              i === 1 ? "border-gold/60" : "border-border"
            )}
          >
            <span className="absolute -top-3 right-6 rounded-full bg-gold px-3 py-1 text-[11px] font-bold text-gold-foreground shadow-soft">
              {p.badge}
            </span>
            <h3 className="text-lg font-extrabold">{p.title}</h3>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-3xl font-extrabold text-primary">{p.price}</span>
              <span className="pb-1 text-sm font-bold">ريال</span>
              <span className="pb-1 text-sm text-muted-foreground line-through">
                {p.oldPrice} ريال
              </span>
            </div>
            <p className="mt-1 text-xs font-semibold text-gold-foreground">وفّر {p.save} ريال</p>
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
                addedId === cartEntries[i].id
                  ? "bg-gold text-gold-foreground"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {addedId === cartEntries[i].id && <Check className="size-4" aria-hidden="true" />}
              {p.cta}
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
