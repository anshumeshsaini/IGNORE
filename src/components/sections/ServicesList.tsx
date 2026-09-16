import { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { services } from "@/lib/data/services";
import { SplitLines } from "../Reveal";
import { sounds } from "@/lib/sound";
import meridianImg from "@/assets/meridian.jpg";
import atlasImg from "@/assets/atlas.jpg";
import novaImg from "@/assets/nova.jpg";
import harbourImg from "@/assets/harbour.jpg";
import studioCraftImg from "@/assets/studio-craft.jpg";

const previewImages = [
  meridianImg,
  atlasImg,
  novaImg,
  harbourImg,
  studioCraftImg,
];

export function ServicesList() {
  const [active, setActive] = useState<string | null>(null);
  const [mouseY, setMouseY] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMouseY(e.clientY - rect.top);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative edge border-t border-white/10 py-24 md:py-36 transition-colors duration-700"
      aria-labelledby="services-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-acid" />
            <p className="eyebrow text-acid" id="services-heading">
              DISCIPLINES OF DOMINANCE
            </p>
          </div>
          <SplitLines
            text={"WE DON'T DO\nONE THING."}
            className="display fluid-lg mt-3 text-foreground"
            lineClassName=""
          />
        </div>
        <p className="max-w-sm text-sm text-muted-foreground font-normal">
          Nine interconnected disciplines under one roof. No outsourcing, no telephone game, no lost intent.
        </p>
      </div>

      <ul className="mt-16 border-t border-white/15">
        {services.map((s, idx) => {
          const isActive = active === s.slug;
          const dimmed = active !== null && !isActive;

          return (
            <li key={s.slug} className="border-b border-white/10">
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                data-cursor="explore"
                onMouseEnter={() => {
                  sounds.play("hover");
                  setActive(s.slug);
                }}
                onMouseLeave={() => setActive(null)}
                className="group relative flex items-center justify-between gap-6 py-6 transition-all duration-300 md:py-8"
                style={{
                  opacity: dimmed ? 0.3 : 1,
                  transform: isActive ? "translateX(1rem)" : "translateX(0)",
                }}
              >
                <div className="flex min-w-0 items-center gap-4 md:gap-8">
                  <span className="font-mono text-xs font-bold text-acid">{s.index}</span>
                  <span
                    className="display truncate text-[6vw] font-bold leading-none transition-colors duration-300 md:text-[3.6vw]"
                    style={{ color: isActive ? "var(--acid)" : undefined }}
                  >
                    {s.title}
                  </span>
                  <span className="hidden rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[9px] font-mono text-muted-foreground sm:inline-block">
                    {s.discipline}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-6">
                  <span
                    className="hidden max-w-xs text-right text-xs font-normal text-muted-foreground transition-opacity duration-300 xl:block"
                    style={{ opacity: isActive ? 1 : 0 }}
                  >
                    {s.short}
                  </span>
                  <div className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-foreground transition-all duration-300 group-hover:border-acid group-hover:bg-acid group-hover:text-ink">
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Dynamic Floating Cursor-Tracking Preview Card (Desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10vw] hidden w-80 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/20 shadow-2xl transition-all duration-300 xl:block"
        style={{
          top: `${Math.max(200, Math.min(mouseY, (sectionRef.current?.clientHeight || 800) - 200))}px`,
          opacity: active ? 0.95 : 0,
          transform: active
            ? "translateY(-50%) scale(1) rotate(2deg)"
            : "translateY(-50%) scale(0.9) rotate(0deg)",
        }}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-ink">
          <img
            src={
              previewImages[
                services.findIndex((s) => s.slug === active) % previewImages.length
              ] ?? previewImages[0]
            }
            alt=""
            loading="lazy"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white">
            <span className="flex items-center gap-1.5 text-acid">
              <Sparkles className="size-3" />
              SPECIALIZED DISCIPLINE
            </span>
            <span>VIEW PLAYBOOK ↗</span>
          </div>
        </div>
      </div>
    </section>
  );
}
