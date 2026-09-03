import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "../lib/utils";

/** Thin gold reading-progress bar pinned to the very top. */
function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent" aria-hidden="true">
      <div
        className="h-full rounded-full bg-gradient-to-l from-[#b8842b] via-gold to-[#e7c26c] transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%`, marginLeft: "auto" }}
      />
    </div>
  );
}

/** Floating back-to-top button that fades in after scrolling. */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > 640);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="العودة إلى الأعلى"
      className={cn(
        "btn-base btn-sheen btn-primary fixed bottom-5 left-5 z-50 grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-all duration-500 hover:bg-primary/90",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}

export default function ScrollUI() {
  return (
    <>
      <ProgressBar />
      <BackToTop />
    </>
  );
}
