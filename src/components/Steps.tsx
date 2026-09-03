import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { steps } from "../lib/data";

export default function Steps() {
  return (
    <section id="steps" className="mx-auto max-w-6xl px-4 pt-24 pb-4">
      <SectionHead
        pill="● من الصورة إلى القصة"
        title="4 خطوات… وطفلك يصبح البطل"
        sub="أنت ترسل التفاصيل الأساسية، ونحن نصنع باقي المغامرة."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal
            key={s.num}
            delay={i * 140}
            className="card-hover group rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            <span className="grid size-11 place-items-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
              {s.num}
            </span>
            <h3 className="mt-4 text-base font-bold">{s.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
