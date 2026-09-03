import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart, type CartItem } from "../lib/cart";
import { formatSAR, localNum, useI18n } from "../lib/i18n";
import { pageUrl } from "../lib/data";

/* ---------------- item row ---------------- */

function CoverStack({ covers }: { covers: string[] }) {
  return (
    <div className="relative h-20 w-16 shrink-0" aria-hidden="true">
      {covers.slice(0, 3).map((src, i, arr) => (
        <img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full rounded-lg border-2 border-card object-cover shadow-soft transition-transform duration-500"
          style={{
            transform: `translateX(${(i - (arr.length - 1) / 2) * 7}px) rotate(${(i - (arr.length - 1) / 2) * 7}deg)`,
            zIndex: i,
          }}
        />
      ))}
    </div>
  );
}

function CartRow({ item, exitX }: { item: CartItem; exitX: number }) {
  const { setQty, removeItem } = useCart();
  const { lang, t } = useI18n();
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: exitX, transition: { duration: 0.22 } }}
      transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
      className="flex gap-3 rounded-2xl border border-border bg-card p-3"
    >
      <CoverStack covers={item.covers} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-extrabold leading-5">{item.title}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{item.desc}</p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label={`${t.cart.remove} ${item.title} ${t.cart.fromCart}`}
            className="grid size-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors duration-300 hover:bg-secondary hover:text-primary"
          >
            <Trash2 className="size-3.5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-full border border-border bg-background p-0.5">
            <button
              type="button"
              onClick={() => setQty(item.id, item.qty - 1)}
              aria-label={t.cart.decrease}
              className="grid size-6 place-items-center rounded-full text-primary transition-colors duration-300 hover:bg-secondary disabled:opacity-40"
            >
              <Minus className="size-3" aria-hidden="true" />
            </button>
            <span className="min-w-6 text-center text-xs font-extrabold tabular-nums">
              {localNum(item.qty, lang)}
            </span>
            <button
              type="button"
              onClick={() => setQty(item.id, item.qty + 1)}
              aria-label={t.cart.increase}
              className="grid size-6 place-items-center rounded-full text-primary transition-colors duration-300 hover:bg-secondary"
            >
              <Plus className="size-3" aria-hidden="true" />
            </button>
          </div>
          <span className="text-sm font-extrabold text-primary">
            {formatSAR(item.price * item.qty, lang)}
          </span>
        </div>
      </div>
    </motion.li>
  );
}

/* ---------------- drawer ---------------- */

export default function CartDrawer() {
  const { isOpen, closeCart, items, count, subtotal, totalSave, pushToast } = useCart();
  const { lang, dir, t } = useI18n();
  const reduced = useReducedMotion();
  const asideRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // lock page scroll + close on Escape
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape to close + simple focus trap while the drawer is open
  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
      if (e.key === "Tab" && asideRef.current) {
        const nodes = asideRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  const checkout = () => {
    window.open(pageUrl("/stories"), "_blank", "noopener");
    pushToast(t.cart.checkoutOpened);
  };

  const goToPackages = () => {
    closeCart();
    window.setTimeout(() => {
      document.getElementById("packages")?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
      });
    }, 120);
  };

  // drawer slides from the inline-start edge (right in RTL, left in LTR)
  const offscreen = dir === "rtl" ? "104%" : "-104%";
  const rowExitX = dir === "rtl" ? 24 : -24;
  const spring = reduced
    ? { duration: 0.01 }
    : { type: "spring" as const, stiffness: 320, damping: 32 };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[70] bg-foreground/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.01 : 0.3 }}
            onClick={closeCart}
            aria-hidden="true"
          />
          <motion.aside
            key="drawer"
            ref={asideRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.cart.drawerLabel}
            className="fixed inset-y-0 start-0 z-[80] flex w-full max-w-md flex-col bg-background shadow-card"
            initial={{ x: offscreen }}
            animate={{ x: 0 }}
            exit={{ x: offscreen }}
            transition={spring}
          >
            {/* head */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-full bg-secondary text-primary">
                  <ShoppingBag className="size-4.5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-base font-extrabold">{t.cart.title}</h2>
                  <p className="text-[11px] font-bold text-muted-foreground">
                    {count > 0 ? t.cart.count(count) : t.cart.empty}
                  </p>
                </div>
              </div>
              <button
                type="button"
                ref={closeRef}
                onClick={closeCart}
                aria-label={t.cart.close}
                className="btn-base grid size-9 place-items-center rounded-full border border-border bg-card text-primary hover:border-gold/60"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            {/* body */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <span className="grid size-20 place-items-center rounded-full bg-secondary text-primary">
                    <ShoppingBag className="size-9" aria-hidden="true" />
                  </span>
                  <p className="font-display text-2xl text-foreground">{t.cart.emptyTitle}</p>
                  <p className="max-w-60 text-sm leading-7 text-muted-foreground">
                    {t.cart.emptyBody}
                  </p>
                  <button
                    type="button"
                    onClick={goToPackages}
                    className="btn-base btn-sheen mt-2 inline-flex h-10 items-center rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
                  >
                    {t.cart.explore}
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartRow key={item.id} item={item} exitX={rowExitX} />
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* totals */}
            {items.length > 0 && (
              <div className="border-t border-border bg-card px-5 py-4">
                <dl className="space-y-1.5 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">{t.cart.subtotal}</dt>
                    <dd className="font-extrabold tabular-nums">{formatSAR(subtotal, lang)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">{t.cart.savings}</dt>
                    <dd className="font-extrabold text-gold-foreground tabular-nums">
                      − {formatSAR(totalSave, lang)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">{t.cart.shipping}</dt>
                    <dd className="font-extrabold text-primary">{t.cart.free}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={checkout}
                  className="btn-base btn-sheen mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
                >
                  {t.cart.checkout}
                </button>
                <p className="mt-2.5 text-center text-[11px] text-muted-foreground">
                  {t.cart.checkoutNote}
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------------- toasts ---------------- */

export function CartToasts() {
  const { toasts } = useCart();
  const reduced = useReducedMotion();
  return (
    <div
      className="pointer-events-none fixed bottom-6 left-1/2 z-[90] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: reduced ? 0.01 : 0.32, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex items-center gap-2.5 rounded-full bg-primary py-2.5 pr-4 pl-5 text-sm font-bold text-primary-foreground shadow-card"
          >
            <CheckCircle2 className="size-4.5 shrink-0 text-gold" aria-hidden="true" />
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
