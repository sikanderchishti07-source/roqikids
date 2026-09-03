import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { stepNums } from "../lib/data";
import { useI18n } from "../lib/i18n";

export default function Steps() {
  const { t } = useI18n();
  return (
    <section id="steps" className="mx-auto max-w-6xl px-4 pt-24 pb-4">
      <SectionHead pill={t.steps.pill} title={t.steps.title} sub={t.steps.sub} />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.steps.items.map((s, i) => (
          <Reveal
            key={stepNums[i]}
            delay={i * 140}
            className="card-hover group rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            <span className="grid size-11 place-items-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
              {stepNums[i]}
            </span>
            <h3 className="mt-4 text-base font-bold">{s.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
