import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data/services";
import { SplitLines } from "../Reveal";
import studio2 from "@/assets/studio-2.jpg";
import studio1 from "@/assets/studio-1.jpg";

const previews = [studio2, studio1];

export function ServicesList() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      className="relative py-24 transition-colors duration-700 md:py-40"
      style={{ backgroundColor: active ? "var(--card)" : undefined }}
      aria-labelledby="services-heading"
    >
      <div className="edge">
        <SplitLines
          text={"WE DON'T DO\nONE THING."}
          className="display fluid-lg max-w-[9ch]"
          lineClassName=""
        />
        <p className="eyebrow mt-6 max-w-sm text-muted-foreground" id="services-heading">
          NINE DISCIPLINES. ONE TEAM. ONE STANDARD.
        </p>
      </div>

      <ul className="mt-16 border-t border-border">
        {services.map((s) => {
          const isActive = active === s.slug;
          const dimmed = active !== null && !isActive;
          return (
            <li key={s.slug} className="border-b border-border">
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                data-cursor="explore"
                onMouseEnter={() => setActive(s.slug)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(s.slug)}
                onBlur={() => setActive(null)}
                className="edge group relative flex min-h-24 items-center justify-between gap-6 py-5 transition-all duration-500 hover:bg-acid hover:text-acid-foreground md:min-h-32 md:py-7"
                style={{
                  opacity: dimmed ? 0.35 : 1,
                  transform: isActive ? "translateX(1.25rem)" : "translateX(0)",
                }}
              >
                <div className="flex min-w-0 items-baseline gap-4 md:gap-8">
                  <span className="eyebrow shrink-0 text-acid">{s.index}</span>
                  <span
                    className="display truncate text-[12vw] leading-none transition-[font-size,color] duration-500 md:text-[4.2vw]"
                    style={{ color: isActive ? "currentColor" : undefined }}
                  >
                    {s.title}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-6">
                  <span
                    className="hidden max-w-xs text-right text-sm text-muted-foreground transition-opacity duration-500 xl:block"
                    style={{ opacity: isActive ? 1 : 0 }}
                  >
                    {s.short}
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* hover preview — desktop only, purely decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[7vw] top-[38%] hidden w-72 -translate-y-1/2 rotate-3 overflow-hidden border-8 border-bone transition-all duration-500 xl:block"
        style={{ opacity: active ? 0.45 : 0 }}
      >
        <img
          src={previews[services.findIndex((s) => s.slug === active) % previews.length] ?? previews[0]}
          alt=""
          loading="lazy"
          width={1280}
          height={1024}
          className="aspect-[4/5] size-full object-cover grayscale"
        />
      </div>
    </section>
  );
}
