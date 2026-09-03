import { useEffect, useState } from "react";
import { pageUrl } from "../lib/data";
import { useI18n } from "../lib/i18n";
import { cn } from "../lib/utils";

/** Mobile-only sticky purchase bar that slides up after the hero. */
export default function StickyCTA() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShow(window.scrollY > 720);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/92 shadow-lift backdrop-blur-md transition-transform duration-500 ease-out md:hidden",
        show ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3 px-4 py-3">
        <div className="leading-tight">
          <p className="text-[11px] font-bold text-muted-foreground">{t.stickyCta.price}</p>
          <p className="text-base font-extrabold text-primary">{t.stickyCta.amount}</p>
        </div>
        <a
          href={pageUrl("/stories")}
          className="btn-base btn-sheen btn-primary inline-flex h-11 flex-1 max-w-56 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
        >
          {t.stickyCta.button}
        </a>
      </div>
    </div>
  );
}
