import { useState } from "react";
import campaignProfile from "@/assets/campaign-profile.jpg";
import campaignGlass from "@/assets/campaign-glass.jpg";
import studioCraft from "@/assets/studio-craft.jpg";

const TESTIMONIALS = [
  {
    quote: "They argued with our brief.\nAnd they were right.",
    author: "A. RAO",
    role: "FOUNDER & CEO",
    brand: "MERIDIAN COFFEE",
    metric: "+312% REVENUE LIFT",
    background: campaignProfile,
  },
  {
    quote: "They killed our discount ads.\nWe raised prices and grew volume.",
    author: "M. KHALID",
    role: "CHIEF OPERATING OFFICER",
    brand: "ATLAS FITNESS GROUP",
    metric: "-38% BLENDED CAC",
    background: studioCraft,
  },
  {
    quote: "The site didn't just win awards.\nIt doubled qualified enterprise inbounds.",
    author: "S. CHEN",
    role: "MANAGING DIRECTOR",
    brand: "NOVA LUXURY ARCHITECTURE",
    metric: "4.8× PIPELINE VELOCITY",
    background: campaignGlass,
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const current = TESTIMONIALS[active] ?? TESTIMONIALS[0]!;

  return (
    <section
      aria-label="Client Testimonials and Proof"
      className="relative overflow-hidden border-b border-border bg-[#09090b] py-28 md:py-44"
    >
      {/* Ambient background crossfade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-20 transition-opacity duration-700"
      >
        <img
          src={current.background}
          alt=""
          className="size-full object-cover filter blur-[2px] transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/85 to-[#09090b]" />
      </div>

      <div className="edge">
        {/* Header */}
        <div className="mb-14 flex items-center justify-between border-b border-border pb-4 font-mono text-xs">
          <span className="text-acid">PROOF OF IMPACT // 010</span>
          <span className="text-muted-foreground">FOUNDER & OPERATOR EVIDENCE</span>
        </div>

        {/* Large Editorial Quotation */}
        <div className="my-10 min-h-[300px] flex flex-col justify-between">
          <blockquote className="display fluid-lg leading-[0.9] text-foreground transition-all duration-500">
            {current.quote.split("\n").map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </blockquote>

          {/* Author Meta */}
          <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-border pt-6">
            <div>
              <p className="display text-2xl text-foreground md:text-3xl">
                {current.author}
              </p>
              <p className="font-mono text-xs text-muted-foreground mt-1">
                {current.role} • <span className="text-foreground/90 font-bold">{current.brand}</span>
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right font-mono text-xs">
                <span className="text-muted-foreground block text-[10px]">VERIFIED OUTCOME:</span>
                <span className="text-acid font-bold">{current.metric}</span>
              </div>

              {/* Tab Selector Buttons */}
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`View testimonial 0${i + 1}`}
                    className={`size-9 border font-mono text-xs font-bold transition-all duration-300 ${
                      active === i
                        ? "border-acid bg-acid text-ink shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                        : "border-border text-foreground/60 hover:border-foreground"
                    }`}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
