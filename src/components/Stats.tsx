import { BookOpen, Globe, Star, Users } from "lucide-react";
import Reveal from "./Reveal";
import { useI18n } from "../lib/i18n";

const icons = [Users, BookOpen, Globe, Star];

export default function Stats() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <Reveal className="grid grid-cols-2 rounded-3xl border border-border bg-card shadow-soft lg:grid-cols-4">
        {t.hero.stats.map((s, i) => {
          const Icon = icons[i];
          return (
            <div key={s.label} className="hero-feature flex items-center justify-center gap-3 px-4 py-5">
              <Icon className="size-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-display text-xl text-primary">{s.value}</p>
                <p className="text-[11px] text-muted-foreground">{s.label}</p>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
