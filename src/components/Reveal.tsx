import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn, prefersReducedMotion } from "../lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** ms transition delay — used to stagger siblings */
  delay?: number;
  as?: "div" | "section" | "article" | "figure" | "li" | "p" | "h1" | "h2" | "span";
  /** fade = opacity only, up = fade + rise (default), mask = line-mask wipe for headings */
  variant?: "up" | "fade" | "mask";
  style?: CSSProperties;
  id?: string;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  variant = "up",
  style,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  const baseClass =
    variant === "mask"
      ? "mask-reveal"
      : variant === "fade"
        ? "reveal-fade"
        : "reveal";

  if (variant === "mask") {
    return (
      <Tag
        id={id}
        ref={ref as never}
        style={{ ...style, ["--rv-delay" as string]: `${delay}ms` }}
        className={cn(baseClass, visible && "is-visible", className)}
      >
        <span className="mask-inner">{children}</span>
      </Tag>
    );
  }

  return (
    <Tag
      id={id}
      ref={ref as never}
      style={{ ...style, ["--rv-delay" as string]: `${delay}ms` }}
      className={cn(baseClass, visible && "is-visible", className)}
    >
      {children}
    </Tag>
  );
}
