import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Logo from "./Logo";
import { arabicNum, useCart } from "../lib/cart";
import { navLinks, pageUrl } from "../lib/data";
import { cn } from "../lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

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
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-500",
          scrolled ? "h-14 md:h-16" : "h-[72px] md:h-20"
        )}
      >
        <Logo tagline="قصص مصوّرة باسم طفلك" />

        <nav className="hidden items-center gap-7 md:flex" aria-label="التنقل الرئيسي">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-sm font-bold text-foreground/80 transition-colors duration-300 hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            aria-label={`فتح سلة المشتريات — ${count > 0 ? countLabelAr(count) : "فارغة"}`}
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
                  {arabicNum(count)}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <a
            href={pageUrl("/stories")}
            className="btn-base btn-sheen btn-primary hidden h-10 items-center rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-soft hover:bg-primary/90 sm:inline-flex"
          >
            ✦ اصنع قصة طفلك
          </a>

          {/* hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            className="relative grid size-10 place-items-center rounded-full border border-border bg-card text-primary transition-colors duration-300 hover:border-gold/60 md:hidden"
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
            className="overflow-hidden border-t border-border/70 bg-background/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="قائمة الجوال">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.3 }}
                  className="rounded-xl px-3 py-2.5 text-sm font-bold text-foreground/85 transition-colors duration-300 hover:bg-secondary hover:text-primary"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href={pageUrl("/stories")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="btn-base btn-sheen btn-primary mt-2 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-soft"
              >
                ✦ اصنع قصة طفلك الآن
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function countLabelAr(n: number) {
  if (n === 1) return "منتج واحد";
  if (n === 2) return "منتجان";
  return `${arabicNum(n)} منتجات`;
}
