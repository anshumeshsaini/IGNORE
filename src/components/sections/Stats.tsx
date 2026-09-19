import { useGsapContext } from "@/hooks/useGsapContext";

const STATS_DATA = [
  {
    index: "01",
    label: "CAMPAIGNS",
    target: 50,
    suffix: "+",
    descriptor: "Art-directed performance campaigns executed across consumer, luxury, and technology sectors.",
  },
  {
    index: "02",
    label: "BRANDS",
    target: 25,
    suffix: "+",
    descriptor: "Challenger and enterprise brands transformed into household cultural fixtures.",
  },
  {
    index: "03",
    label: "MARKETS",
    target: 10,
    suffix: "+",
    descriptor: "Active distribution footprint across India, the United Arab Emirates, North America, and Europe.",
  },
  {
    index: "04",
    label: "RETENTION",
    target: 98,
    suffix: "%",
    descriptor: "Client retention rate rooted in radical transparency, profit margins, and zero vanity theater.",
  },
];

const MANIFESTO_WORDS = [
  "ATTENTION",
  "REACH",
  "DEMAND",
  "CTR",
  "RECALL",
  "SCALE",
  "HOOK",
  "SHARE",
];

export function Stats() {
  const ref = useGsapContext<HTMLElement>(({ gsap, root }) => {
    // Number counters with smooth easing
    root.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
      const target = Number(el.dataset["counter"] ?? 0);
      const val = { n: 0 };
      gsap.to(val, {
        n: target,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          el.textContent = String(Math.round(val.n));
        },
      });
    });

    // Subtitle reveals
    gsap.from(root.querySelectorAll("[data-stat-card]"), {
      opacity: 0,
      y: 40,
      stagger: 0.12,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: root,
        start: "top 75%",
      },
    });
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Attention Manifesto and Agency Statistics"
      className="relative overflow-hidden border-y border-border bg-[#0e0e11] py-20 md:py-32"
    >
      {/* Dynamic Manifesto Ribbon */}
      <div className="relative mb-16 overflow-hidden border-y border-border/60 py-3 md:mb-24">
        <div className="flex w-[200%] animate-[signal-marquee_20s_linear_infinite] select-none whitespace-nowrap">
          {[...MANIFESTO_WORDS, ...MANIFESTO_WORDS].map((word, i) => (
            <span
              key={i}
              className="display mx-6 text-xl tracking-[0.2em] text-foreground/40 transition-colors hover:text-acid md:text-2xl"
            >
              {word} <span className="text-acid ml-3 font-mono text-sm">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="edge">
        {/* Editorial Section Header */}
        <div className="mb-16 grid items-end justify-between gap-8 border-b border-border pb-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow text-acid font-mono tracking-[0.3em]">
              (CAMPAIGN MANIFESTO // 001)
            </p>
            <h2 className="display mt-4 text-4xl leading-[0.9] tracking-tight md:text-6xl lg:text-7xl">
              WE DON&apos;T CHASE NOISE.
              <br />
              <span className="text-acid">WE ENGINEER RECALL.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="text-sm font-mono leading-relaxed text-muted-foreground">
              Most marketing reports measure vanity. We optimize for margin, compounding mental availability, and the velocity of real human decisions.
            </p>
          </div>
        </div>

        {/* Editorial 4-Column Stat Blocks */}
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {STATS_DATA.map((s, idx) => (
            <article
              key={s.label}
              data-stat-card
              className="group relative flex min-h-[340px] flex-col justify-between bg-[#0e0e11] p-8 transition-colors duration-500 hover:bg-[#141419]"
            >
              {/* Top metadata index */}
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <span className="font-mono text-xs font-bold text-acid">
                  [{s.index} →]
                </span>
                <span className="eyebrow font-mono text-[10px] text-foreground/40">
                  VERIFIED
                </span>
              </div>

              {/* Huge animated numbers */}
              <div className="my-8">
                <div className="display flex items-baseline text-[22vw] leading-none text-foreground transition-transform duration-500 group-hover:translate-x-1 sm:text-[10vw] lg:text-[6.5vw]">
                  <span data-counter={s.target}>0</span>
                  <span className="text-acid">{s.suffix}</span>
                </div>
                <h3 className="display mt-2 text-2xl tracking-wide text-foreground/90 md:text-3xl">
                  {s.label}
                </h3>
              </div>

              {/* Bottom explanatory copy */}
              <p className="border-t border-border/30 pt-4 text-xs font-mono leading-relaxed text-muted-foreground">
                {s.descriptor}
              </p>

              {/* Ambient accent corner line on hover */}
              <div className="pointer-events-none absolute bottom-0 left-0 h-1 w-0 bg-acid transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
