import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { COVERS } from "../lib/data";
import { useCart } from "../lib/cart";
import { formatSAR, localNum, useI18n } from "../lib/i18n";
import { cn } from "../lib/utils";

const A5_COVERS = [COVERS.braveAseel, COVERS.captainKarim, COVERS.dinoJourney];
const A4_COVERS = [COVERS.dreamCity, COVERS.littleArtist, COVERS.princessNoura];

/** Interactive sibling bundle: names + size → live discount → add to cart. */
export default function SiblingBuilder() {
  const { addItem, pushToast } = useCart();
  const { lang, t } = useI18n();
  const s = t.sibling;

  const [names, setNames] = useState<string[]>(["", ""]);
  const [size, setSize] = useState<"A5" | "A4">("A5");

  const unit = size === "A5" ? 65 : 100;
  const filled = names.filter((n) => n.trim()).length;
  const n = Math.max(1, filled);
  const rate = filled >= 3 ? 0.2 : filled === 2 ? 0.1 : 0;
  const gross = n * unit;
  const total = Math.round(gross * (1 - rate));
  const save = gross - total;

  const ladder = [
    { books: 1, off: lang === "ar" ? "٠٪" : "0%" },
    { books: 2, off: lang === "ar" ? "١٠٪" : "10%" },
    { books: 3, off: lang === "ar" ? "٢٠٪" : "20%" },
  ];

  const setName = (i: number, v: string) =>
    setNames((prev) => prev.map((x, j) => (j === i ? v : x)));

  const addChild = () => setNames((prev) => (prev.length < 3 ? [...prev, ""] : prev));
  const removeChild = (i: number) =>
    setNames((prev) => (prev.length > 1 ? prev.filter((_, j) => j !== i) : prev));

  const handleAdd = () => {
    if (!filled) {
      pushToast(s.needName);
      return;
    }
    addItem({
      id: `sibling-${size}`,
      title: s.cartTitle(filled),
      desc: s.cartDesc(size),
      price: total,
      save,
      covers: size === "A5" ? A5_COVERS : A4_COVERS,
    });
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <SectionHead pill={s.pill} title={s.title} sub={s.sub} />

      <Reveal delay={120} className="mx-auto mt-10 max-w-4xl">
        <div className="card-hover rounded-3xl border border-gold/40 bg-card p-6 shadow-soft sm:p-8">
          <div className="grid gap-8 md:grid-cols-[1.1fr_1fr]">
            {/* builder */}
            <div>
              <p className="text-sm font-extrabold">{s.childLabel}</p>
              <div className="mt-3 space-y-2.5">
                {names.map((name, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-xs font-extrabold text-primary">
                      {localNum(i + 1, lang)}
                    </span>
                    <input
                      type="text"
                      dir="auto"
                      maxLength={14}
                      value={name}
                      onChange={(e) => setName(i, e.target.value)}
                      placeholder={s.namePlaceholder}
                      aria-label={`${s.childLabel} ${localNum(i + 1, lang)}`}
                      className="h-11 w-full rounded-full border border-input bg-background px-4 text-sm font-bold outline-none transition-all duration-300 placeholder:text-muted-foreground/70 focus:border-gold focus:shadow-soft"
                    />
                    {names.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChild(i)}
                        aria-label={s.removeChild}
                        className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors duration-300 hover:bg-secondary hover:text-primary"
                      >
                        <X className="size-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {names.length < 3 ? (
                <button
                  type="button"
                  onClick={addChild}
                  className="btn-base mt-3 inline-flex h-9 items-center gap-1.5 rounded-full border border-dashed border-gold/70 px-4 text-xs font-bold text-gold-foreground hover:bg-secondary"
                >
                  <Plus className="size-3.5" aria-hidden="true" />
                  {s.addAnother}
                </button>
              ) : (
                <p className="mt-3 text-[11px] font-bold text-muted-foreground">{s.maxNote}</p>
              )}

              {/* size */}
              <p className="mt-6 text-sm font-extrabold">{s.sizeLabel}</p>
              <div className="mt-2 inline-flex rounded-full border border-border bg-background p-1">
                {(["A5", "A4"] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSize(sz)}
                    aria-pressed={size === sz}
                    className={cn(
                      "h-9 rounded-full px-6 text-sm font-extrabold transition-all duration-300",
                      size === sz
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* summary */}
            <div className="flex flex-col rounded-2xl bg-secondary/50 p-5">
              {/* discount ladder */}
              <div className="flex gap-2">
                {ladder.map((l) => {
                  const active = n === l.books;
                  return (
                    <span
                      key={l.books}
                      className={cn(
                        "flex-1 rounded-xl border px-2 py-2 text-center transition-all duration-300",
                        active
                          ? "border-gold bg-gold text-gold-foreground shadow-soft"
                          : "border-border bg-card text-muted-foreground"
                      )}
                    >
                      <span className="block text-sm font-extrabold">{l.off}</span>
                      <span className="block text-[10px] font-bold">
                        ×{localNum(l.books, lang)}
                      </span>
                    </span>
                  );
                })}
              </div>

              <dl className="mt-5 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">
                    {localNum(n, lang)} × {formatSAR(unit, lang)}{" "}
                    <span className="text-[11px]">({s.perBook})</span>
                  </dt>
                  <dd className="font-extrabold tabular-nums">{formatSAR(gross, lang)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">{s.discount}</dt>
                  <dd className="font-extrababold font-extrabold text-gold-foreground tabular-nums">
                    − {formatSAR(save, lang)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gold/30 pt-3">
                  <dt className="font-extrabold">{s.total}</dt>
                  <dd className="text-xl font-extrabold text-primary tabular-nums">
                    <motion.span
                      key={total}
                      initial={{ scale: 1.25, color: "#d9a741" }}
                      animate={{ scale: 1, color: "#61304f" }}
                      transition={{ duration: 0.4 }}
                      className="inline-block"
                    >
                      {formatSAR(total, lang)}
                    </motion.span>
                  </dd>
                </div>
              </dl>
              {save > 0 && (
                <p className="mt-2 text-end text-[11px] font-extrabold text-gold-foreground">
                  ✦ {s.youSave} {formatSAR(save, lang)}
                </p>
              )}

              <button
                type="button"
                onClick={handleAdd}
                className="btn-base btn-sheen btn-primary mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
              >
                <Minus className="hidden" aria-hidden="true" />
                {s.addBtn(filled || 1)}
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
