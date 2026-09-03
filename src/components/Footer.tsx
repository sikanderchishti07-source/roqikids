import Logo from "./Logo";
import { navLinks } from "../lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <Logo
            variant="onDark"
            tagline="رُقي للأطفال — قصص مصوّرة باسم طفلك وصورته"
          />

          <nav
            className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
            aria-label="روابط سفلية"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="nav-link text-sm font-bold opacity-80 transition-opacity duration-300 hover:opacity-100"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-primary-foreground/15 pt-6 text-xs opacity-70 sm:flex-row">
          <p>© {year} رُقي للأطفال — جميع الحقوق محفوظة.</p>
          <p>قصص مخصصة تُصنع بحب، صفحة بصفحة.</p>
        </div>
      </div>
    </footer>
  );
}
