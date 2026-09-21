import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SplitLines } from "../Reveal";
import { projects } from "@/lib/data/work";
import studio1 from "@/assets/studio-1.jpg";
import studio2 from "@/assets/studio-2.jpg";
import hero from "@/assets/hero.jpg";
import campaignObject from "@/assets/campaign-object.jpg";
import campaignGlass from "@/assets/campaign-glass.jpg";

const imgs = [campaignObject, campaignGlass, hero, studio1];

export function WorkPreview() {
  return (
    <section className="relative overflow-hidden bg-bone py-[14vh] text-ink">
      <div className="edge">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SplitLines
          text={"WORK THAT MOVED\nTHE NEEDLE."}
          className="display fluid-lg max-w-[9ch] leading-[0.86]"
        />
        <Link to="/work" data-cursor="cta" className="eyebrow link-underline text-signal">
          ALL WORK ↗
        </Link>
      </div>

      <ul className="mt-[8vh] grid gap-y-24 md:grid-cols-12 md:gap-x-8">
        {projects.map((p, i) => (
          <li key={p.slug} className={`${i % 4 === 0 ? "md:col-span-7" : i % 4 === 1 ? "md:col-span-5 md:mt-40" : i % 4 === 2 ? "md:col-span-5 md:ml-12" : "md:col-span-7 md:mt-24"}`}>
            <Link
              to="/work/$slug"
              params={{ slug: p.slug }}
              data-cursor="view"
              className="group block"
            >
              <div className={`relative overflow-hidden bg-muted ${i % 2 ? "aspect-[4/5]" : "aspect-[16/11]"}`}>
                <img
                  src={imgs[i % imgs.length]}
                  alt={`${p.name} — ${p.industry} case study preview`}
                  loading="lazy"
                   className="size-full object-cover saturate-[0.65] transition-all duration-[900ms] ease-out group-hover:scale-[1.05] group-hover:saturate-100"
                />
                 <span className="absolute left-0 top-0 bg-acid px-3 py-2 text-acid-foreground eyebrow">0{i + 1} / DEMO</span>
              </div>
              <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="display text-4xl leading-none md:text-6xl">
                    {p.name}
                    <span className="text-signal">.</span>
                  </h3>
                  <p className="mt-3 max-w-md text-sm text-ink/65">{p.summary}</p>
                </div>
                <div className="text-right">
                  <p className="eyebrow text-ink/55">
                    {p.industry} — {p.year}
                  </p>
                  <p className="eyebrow mt-2 text-ink/55">{p.services.join(" / ")}</p>
                  <ArrowUpRight className="ml-auto mt-3 size-5 text-signal" aria-hidden="true" />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}
