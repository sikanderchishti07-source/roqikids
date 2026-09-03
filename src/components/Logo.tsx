import { cn } from "../lib/utils";

type LogoProps = {
  /** onLight = cream header, onDark = plum footer */
  variant?: "onLight" | "onDark";
  tagline: string;
  className?: string;
};

/**
 * Brand lockup: gold ✦ over an open picture book + Lalezar wordmark.
 * Built from the site's own motifs (✦ sparkle, plum #61304f, gold #d9a741).
 */
export default function Logo({ variant = "onLight", tagline, className }: LogoProps) {
  const dark = variant === "onDark";

  return (
    <a href="#top" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="رُقي للأطفال — العودة إلى الأعلى">
      <svg
        viewBox="0 0 48 48"
        className="size-9 shrink-0 transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-105"
        aria-hidden="true"
      >
        {/* signature ✦ */}
        <path
          d="M24 2.2 25.9 6 29.8 8 25.9 10 24 13.8 22.1 10 18.2 8 22.1 6Z"
          fill="#d9a741"
          className="transition-transform duration-700 ease-out group-hover:rotate-180"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        {/* open book */}
        <path
          d="M24 17.5C19.6 14.6 13 14 9 15.5V37c4-1.5 10.6-1 15 2 4.4-3 11-3.5 15-2V15.5c-4-1.5-10.6-.9-15 2Z"
          fill={dark ? "#f8eac9" : "#61304f"}
        />
        <path
          d="M24 17.5V39"
          stroke={dark ? "#61304f" : "#f8eac9"}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M12.6 21.4c2.9-.7 5.9-.6 8.4.4M12.6 26.4c2.9-.7 5.9-.6 8.4.4M27 21.8c2.5-1 5.5-1.1 8.4-.4M27 26.8c2.5-1 5.5-1.1 8.4-.4"
          stroke={dark ? "#61304f" : "#f8eac9"}
          strokeWidth="1.25"
          strokeLinecap="round"
          opacity="0.55"
          fill="none"
        />
        {/* tiny page-corner sparkles */}
        <circle cx="40.5" cy="12.5" r="1.1" fill="#d9a741" opacity="0.8" />
        <circle cx="7.5" cy="12.5" r="0.9" fill="#d9a741" opacity="0.6" />
      </svg>

      <span className="leading-none text-start">
        <span
          className={cn(
            "font-display block text-[26px] leading-[1.1] transition-colors duration-300",
            dark ? "text-primary-foreground" : "text-primary"
          )}
        >
          رُقي
        </span>
        <span
          className={cn(
            "mt-1 block text-[11px] font-bold transition-colors duration-300",
            dark ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {tagline}
        </span>
      </span>
    </a>
  );
}
