import Logo from "./Logo";
import { navHrefs } from "../lib/data";
import { useI18n } from "../lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <Logo variant="onDark" tagline={t.brand.taglineLong} />

          <nav
            className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
            aria-label={t.footer.navLabel}
          >
            {navHrefs.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="nav-link text-sm font-bold opacity-80 transition-opacity duration-300 hover:opacity-100"
              >
                {t.nav[l.key]}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-primary-foreground/15 pt-6 text-xs opacity-70 sm:flex-row">
          <p>
            © {year} {t.brand.taglineLong} — {t.footer.rights}
          </p>
          <p>{t.footer.love}</p>
        </div>
      </div>
    </footer>
  );
}
