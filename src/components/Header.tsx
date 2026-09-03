import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Logo from "./Logo";
import { useCart } from "../lib/cart";
import { localNum, useI18n, type Lang } from "../lib/i18n";
import { navHrefs, pageUrl } from "../lib/data";
import { cn } from "../lib/utils";

/** Compact AR / EN segmented switch. */
function LangSwitch() {
  const { lang, setLang, t } = useI18n();
  const opts: { code: Lang; label: string }[] = [
    { code: "ar", label: "عربي" },
    { code: "en", label: "EN" },
  ];
  return (
    <div
      className="flex items-center rounded-full border border-border bg-card p-0.5"
      role="group"
      aria-label={t.langToggleLabel}
    >
      {opts.map((o) => (
        <button
          key={o.code}
          type="button"
          onClick={() => setLang(o.code)}
          aria-pressed={lang === o.code}
          className={cn(
            "h-7 rounded-full px-2.5 text-[11px] font-extrabold transition-all duration-300",
            lang === o.code
              ? "bg-primary text-primary-foreground shadow-soft"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();
  const { lang, t } = useI18n();

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (y > 480 && y > last + 6 && !open) setHidden(true);
        else if (y < last - 6 || y <= 480) setHidden(false);
        last = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const close = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/80 bg-background/90 shadow-soft backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
        hidden && !open && "-translate-y-full"
      )}
    >
      {/* promo bar */}
      <div
        className={cn(
          "overflow-hidden bg-primary text-primary-foreground transition-all duration-500",
          scrolled ? "max-h-0" : "max-h-16"
        )}
      >
        <p className="mx-auto flex min-h-9 max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-0.5 px-4 py-1.5 text-center text-[11px] font-bold leading-5 sm:text-xs">
          <span className="text-gold" aria-hidden="true">✦</span>
          {t.hero.promo}
          <span className="rounded-md bg-gold/20 px-2 py-0.5 tracking-wider text-gold">{t.hero.promoCode}</span>
        </p>
      </div>

      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 transition-all duration-500",
          scrolled ? "h-14 md:h-16" : "h-[72px] md:h-20"
        )}
      >
        <Logo tagline={t.brand.tagline} />

        <nav className="hidden items-center gap-7 lg:flex" aria-label={t.navLabel}>
          {navHrefs.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-sm font-bold text-foreground/80 transition-colors duration-300 hover:text-primary"
            >
              {t.nav[l.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch />

          <button
            type="button"
            onClick={openCart}
            aria-label={`${t.cart.buttonLabel} — ${count > 0 ? t.cart.count(count) : t.cart.emptyBadge}`}
            className="btn-base relative grid size-10 place-items-center rounded-full border border-border bg-card text-primary hover:border-gold/60 hover:bg-secondary"
          >
            <ShoppingBag className="size-[18px]" aria-hidden="true" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 24 }}
                  className="absolute -top-1 -left-1 grid size-5 place-items-center rounded-full bg-gold text-[11px] font-extrabold text-gold-foreground shadow-soft"
                >
                  {localNum(count, lang)}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <a
            href={pageUrl("/stories")}
            className="btn-base btn-sheen btn-primary hidden h-10 items-center rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-soft hover:bg-primary/90 xl:inline-flex"
          >
            {t.headerCta}
          </a>

          {/* hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t.menu.close : t.menu.open}
            className="relative grid size-10 place-items-center rounded-full border border-border bg-card text-primary transition-colors duration-300 hover:border-gold/60 lg:hidden"
          >
            <span
              className={cn(
                "absolute h-0.5 w-4.5 rounded-full bg-current transition-all duration-300",
                open ? "rotate-45" : "-translate-y-1.5"
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-4.5 rounded-full bg-current transition-all duration-300",
                open ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-4.5 rounded-full bg-current transition-all duration-300",
                open ? "-rotate-45" : "translate-y-1.5"
              )}
            />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden border-t border-border/70 bg-background/95 backdrop-blur-md lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label={t.menu.label}>
              {navHrefs.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.3 }}
                  className="rounded-xl px-3 py-2.5 text-sm font-bold text-foreground/85 transition-colors duration-300 hover:bg-secondary hover:text-primary"
                >
                  {t.nav[l.key]}
                </motion.a>
              ))}
              <motion.a
                href={pageUrl("/stories")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="btn-base btn-sheen btn-primary mt-2 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-soft"
              >
                {t.hero.cta1}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
