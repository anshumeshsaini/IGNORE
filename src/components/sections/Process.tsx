import { useRef, useState } from "react";
import { useGsapContext } from "@/hooks/useGsapContext";
import studio1 from "@/assets/studio-1.jpg";
import studio2 from "@/assets/studio-2.jpg";
import studioCraft from "@/assets/studio-craft.jpg";
import campaignChrome from "@/assets/campaign-chrome.jpg";
import campaignObject from "@/assets/campaign-object.jpg";
import campaignGlass from "@/assets/campaign-glass.jpg";

export const PROCESS_STEPS = [
  {
    no: "01",
    label: "DISCOVER",
    subtitle: "MARGINS, MOTIVATION, AND RAW TRUTH",
    body: "We dismantle the business model, unit economics, and customer objections. No fluff audits or vanity benchmarks — only where margin is won or lost.",
    metric: "14 Days",
    metricLabel: "Diagnostic Sprint",
    image: studio1,
    accent: "#ccff00",
  },
  {
    no: "02",
    label: "STRATEGIZE",
    subtitle: "ONE PROVOCATIVE CATEGORY ANGLE",
    body: "Finding the sharp angle that only your brand has the courage to own. If a competitor can copy and paste the headline onto their logo, we tear it up.",
    metric: "100%",
    metricLabel: "Differentiated Stance",
    image: studioCraft,
    accent: "#38bdf8",
  },
  {
    no: "03",
    label: "CREATE",
    subtitle: "SUB-PIXEL CRAFT & VERTICAL CINEMATOGRAPHY",
    body: "Studio-grade film production, bespoke code, and editorial graphic systems. Everything is designed to stop thumbs dead within 0.8 seconds.",
    metric: "40+ Variants",
    metricLabel: "First Drop Assets",
    image: studio2,
    accent: "#fb923c",
  },
  {
    no: "04",
    label: "LAUNCH",
    subtitle: "HIGH-INTENT DISTRIBUTION ORCHESTRATION",
    body: "Synchronized deployment across Meta, Google PMax, programmatic networks, and PR. Real-time attribution tracking feeds live signals from hour zero.",
    metric: "0.0s",
    metricLabel: "Attribution Latency",
    image: campaignChrome,
    accent: "#ccff00",
  },
  {
    no: "05",
    label: "OPTIMIZE",
    subtitle: "RUTHLESS CREATIVE SELECTION",
    body: "We double down on high-performing creative hooks and ruthlessly prune non-performers. Weekly variant drops continually suppress blended acquisition cost.",
    metric: "-28% Avg",
    metricLabel: "CAC Compression",
    image: campaignObject,
    accent: "#38bdf8",
  },
  {
    no: "06",
    label: "SCALE",
    subtitle: "CAPITAL FOLLOWS VERIFIED EVIDENCE",
    body: "Scaling ad spend aggressively with ironclad payback windows. Brand desire compounds into sustainable enterprise pricing power.",
    metric: "3.5× - 8×",
    metricLabel: "Scale Multiple",
    image: campaignGlass,
    accent: "#ccff00",
  },
];

export function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useGsapContext<HTMLElement>(({ gsap, root }) => {
    const track = root.querySelector<HTMLElement>("[data-process-track]");
    if (!track || !window.matchMedia("(min-width: 1024px)").matches) return;

    const totalWidth = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: () => -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: () => `+=${totalWidth * 1.25}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * PROCESS_STEPS.length),
            PROCESS_STEPS.length - 1,
          );
          setActiveStep(idx);
        },
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      id="process-section"
      aria-label="Process and Methodology"
      className="relative overflow-hidden border-b border-border bg-[#09090b] py-20 lg:py-0"
    >
      {/* Top Header Sticky Anchor */}
      <div className="edge py-8 lg:absolute lg:left-0 lg:top-0 lg:z-20 lg:w-full lg:bg-transparent">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-acid font-bold">
              METHODOLOGY // 006
            </span>
            <span className="font-mono text-xs text-foreground/50">
              SIX STAGES • PINNED JOURNEY
            </span>
          </div>
          <div className="font-mono text-xs text-acid">
            ACTIVE STAGE: [{PROCESS_STEPS[activeStep]?.no} / 06] {PROCESS_STEPS[activeStep]?.label}
          </div>
        </div>
      </div>

      {/* Track: Horizontal on Desktop (pinned), Vertical on Mobile */}
      <div className="lg:h-[100svh] lg:flex lg:items-center lg:overflow-hidden">
        <div
          data-process-track
          className="flex flex-col gap-12 px-6 lg:h-full lg:flex-row lg:items-center lg:gap-0 lg:px-0 lg:will-change-transform"
        >
          {PROCESS_STEPS.map((s, i) => {
            return (
              <article
                key={s.no}
                className="group relative flex flex-col justify-between border-t border-border pt-8 lg:h-full lg:w-[58vw] lg:shrink-0 lg:border-l lg:border-t-0 lg:p-16 lg:pt-32"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-ink">
                  <img
                    src={s.image}
                    alt={s.label}
                    className="size-full object-cover saturate-[0.8] transition-all duration-700 group-hover:scale-105 group-hover:saturate-100"
                  />
                  <div className="absolute left-3 top-3 bg-ink/90 px-3 py-1 font-mono text-xs text-acid border border-border">
                    PHASE {s.no}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-ink/90 px-3 py-1 font-mono text-xs text-foreground border border-border">
                    {s.metricLabel}: <span className="text-acid">{s.metric}</span>
                  </div>
                </div>

                {/* Typography & Content */}
                <div className="my-8">
                  <div className="flex items-baseline gap-4">
                    <p className="display text-6xl text-acid font-bold md:text-8xl">
                      {s.no}
                    </p>
                    <h3 className="display text-4xl text-foreground md:text-6xl">
                      {s.label}
                    </h3>
                  </div>
                  <p className="eyebrow mt-3 font-mono text-xs text-acid/90">
                    {s.subtitle}
                  </p>
                  <p className="mt-4 max-w-lg font-mono text-xs leading-relaxed text-foreground/80 md:text-sm">
                    {s.body}
                  </p>
                </div>

                {/* Step indicator bar */}
                <div className="hidden lg:flex items-center gap-2 border-t border-border/40 pt-4 font-mono text-[10px] text-foreground/40">
                  <span>UNIGNORABLE DISCIPLINE</span>
                  <span>—</span>
                  <span>NO THEATRE</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
