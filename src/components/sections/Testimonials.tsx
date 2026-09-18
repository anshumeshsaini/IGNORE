import { useState } from "react";
import { Reveal } from "../Reveal";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active]!;

  return (
    <section className="edge border-y border-border py-[14vh]">
      <p className="eyebrow text-muted-foreground">(WHAT THEY SAY)</p>

      <Reveal className="mt-10">
        <blockquote key={active} className="animate-in fade-in duration-700">
          <p className="display fluid-md leading-[0.95] tracking-[-0.04em]">
            <span className="text-acid">“</span>
            {t.quote}
            <span className="text-acid">”</span>
          </p>
          <footer className="eyebrow mt-8 text-muted-foreground">
            {t.client} — {t.role}, {t.company}
          </footer>
        </blockquote>
      </Reveal>

      <div className="mt-12 flex gap-3">
        {testimonials.map((item, i) => (
          <button
            key={item.client}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show testimonial from ${item.client}`}
            aria-current={i === active}
            data-cursor="cta"
            className={`h-[2px] w-16 transition-colors ${i === active ? "bg-acid" : "bg-border hover:bg-foreground/40"}`}
          />
        ))}
      </div>
    </section>
  );
}
