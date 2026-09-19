import { useState, useRef } from "react";
import { useGsapContext } from "@/hooks/useGsapContext";
import campaignChrome from "@/assets/campaign-chrome.jpg";
import campaignFilm from "@/assets/campaign-film.jpg";
import campaignGlass from "@/assets/campaign-glass.jpg";
import campaignObject from "@/assets/campaign-object.jpg";
import studioCraft from "@/assets/studio-craft.jpg";

const STATEMENTS = [
  {
    text: "NO COOKIE-CUTTER CAMPAIGNS.",
    desc: "Every category has a default template. We find it, tear it up, and build what competitors are too afraid to produce.",
    image: campaignChrome,
  },
  {
    text: "NO VANITY METRICS.",
    desc: "Impressions don't fund payroll. We optimize exclusively for contribution margin, pipeline velocity, and real enterprise cash.",
    image: campaignGlass,
  },
  {
    text: "NO DESIGN WITHOUT PURPOSE.",
    desc: "Craft and aesthetics are weapons of commercial persuasion, not museum indulgences.",
    image: campaignFilm,
  },
  {
    text: "NO STRATEGY WITHOUT EXECUTION.",
    desc: "A 90-page slide deck with no creative execution is corporate procrastination. We prototype live in market on day one.",
    image: studioCraft,
  },
  {
    text: "NO CAMPAIGNS WITHOUT A REASON.",
    desc: "If a campaign does not permanently shift how an audience perceives your category, we tell you not to spend the money.",
    image: campaignObject,
  },
];

export function WhyUs() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useGsapContext<HTMLElement>(({ gsap, root }) => {
    const items = root.querySelectorAll("[data-why-item]");

    items.forEach((item, index) => {
      gsap.from(item, {
        opacity: 0.2,
        x: -25,
        duration: 0.8,
        scrollTrigger: {
          trigger: item,
          start: "top 75%",
          end: "bottom 35%",
          toggleActions: "play reverse play reverse",
          onEnter: () => setActiveIdx(index),
          onEnterBack: () => setActiveIdx(index),
        },
      });
    });
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Why Choose UNIGNORABLE"
      className="relative overflow-hidden border-b border-border bg-[#08080a] py-28 md:py-44"
    >
      {/* Dynamic Background Image crossfading on active statement */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-20 transition-opacity duration-700"
      >
        <img
          src={STATEMENTS[activeIdx]?.image ?? campaignChrome}
          alt=""
          className="size-full object-cover filter blur-[2px] transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-[#08080a]/80 to-[#08080a]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-[#08080a]" />
      </div>

      <div className="edge">
        {/* Header */}
        <div className="mb-20 border-b border-border pb-8">
          <p className="eyebrow text-acid font-mono tracking-[0.3em]">
            THE STANDARD // 008
          </p>
          <h2 className="display mt-3 text-4xl leading-tight md:text-7xl lg:text-8xl">
            WHY UNIGNORABLE?
          </h2>
        </div>

        {/* Five Dramatic Scroll Statements */}
        <div className="space-y-24 md:space-y-36">
          {STATEMENTS.map((st, i) => {
            const isActive = i === activeIdx;
            return (
              <div
                key={st.text}
                data-why-item
                className={`group border-l-2 transition-all duration-500 pl-6 md:pl-12 ${
                  isActive ? "border-acid" : "border-border/60 opacity-60"
                }`}
              >
                <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
                  <span className={isActive ? "text-acid font-bold" : ""}>
                    RULE 0{i + 1}
                  </span>
                  <span>//</span>
                  <span className="eyebrow text-[10px]">NON-NEGOTIABLE</span>
                </div>

                <h3
                  className={`display mt-4 fluid-md max-w-[15ch] leading-[0.9] transition-colors duration-500 ${
                    isActive ? "text-foreground" : "text-foreground/60"
                  }`}
                >
                  {st.text}
                </h3>

                <p className="mt-6 max-w-xl font-mono text-xs md:text-sm leading-relaxed text-foreground/80">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
