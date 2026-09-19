import { useState, useEffect } from "react";
import { ArrowRight, Cpu, Sparkles, Zap } from "lucide-react";

interface MachineStage {
  id: string;
  step: string;
  name: string;
  short: string;
  input: string;
  mechanics: string;
  output: string;
  deliverables: string[];
}

const STAGES: MachineStage[] = [
  {
    id: "attention",
    step: "01",
    name: "ATTENTION",
    short: "Unearthing the irrational cultural tension competitors are afraid to touch.",
    input: "Category complacency & bland commodity noise",
    mechanics: "Audience sentiment analysis, tension mapping, radical premise formulation",
    output: "Stop-the-scroll hook rate (>42% on cold feeds)",
    deliverables: ["Tension Brief", "Hook Architecture", "Cultural Positioning"],
  },
  {
    id: "creative",
    step: "02",
    name: "CREATIVE",
    short: "Art-directed studio films, sub-pixel digital design, and unapologetic copy.",
    input: "Verified cultural hooks & product reality",
    mechanics: "Commercial cinematography, motion design, interactive code shaders",
    output: "Brand recall lift (+310% vs industry baseline)",
    deliverables: ["Hero Campaign Films", "Static Angle Kits", "Digital Experiences"],
  },
  {
    id: "distribution",
    step: "03",
    name: "DISTRIBUTION",
    short: "Deploying high-intent paid media and organic amplification across global channels.",
    input: "Multi-ratio creative library & audience cohorts",
    mechanics: "PMax, Meta Advantage+, Programmatic OOH, High-intent Search",
    output: "Maximum efficient reach with zero impression leakage",
    deliverables: ["Channel Orchestration", "Bid Algorithms", "Placement Hygiene"],
  },
  {
    id: "performance",
    step: "04",
    name: "PERFORMANCE",
    short: "Mathematical unit economics: every rupee or dirham tied to contribution margin.",
    input: "Inbound traffic streams & buyer intent",
    mechanics: "Server-side tracking, offline conversion imports, margin modelling",
    output: "True ROAS grounded in verified bank balance, not dashboard theatre",
    deliverables: ["Attribution Protocol", "CAC Guardrails", "Margin Models"],
  },
  {
    id: "data",
    step: "05",
    name: "DATA",
    short: "Raw telemetry extracted from every touchpoint without sample distortion.",
    input: "1st-party event streams & behavioral dropoffs",
    mechanics: "Heatmaps, scroll depth analytics, retention cohorts, cohort LTV",
    output: "Clarity on exactly which second viewers convert or bounce",
    deliverables: ["Live Performance Feed", "Dropoff Telemetry", "Audience Cohorts"],
  },
  {
    id: "optimization",
    step: "06",
    name: "OPTIMIZATION",
    short: "Rapid creative iteration: doubling down on winning hooks and executing swift pivots.",
    input: "Performance telemetry & customer objections",
    mechanics: "Weekly creative sprints, landing page CRO, dynamic headline tests",
    output: "Continuous downward pressure on blended CPA",
    deliverables: ["Variant Sprints", "CRO Experiments", "Hook Iterations"],
  },
  {
    id: "growth",
    step: "07",
    name: "GROWTH",
    short: "Compounding enterprise valuation where brand desire outpaces media spend.",
    input: "Compounding brand recognition & flywheel mechanics",
    mechanics: "Pricing power expansion, organic word-of-mouth, repeat retention",
    output: "Sustainable category leadership immune to algorithm shifts",
    deliverables: ["Market Share Expansion", "Pricing Power", "Compounding LTV"],
  },
];

export function AttentionMachine() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAuto, setIsAuto] = useState(true);

  // Auto progression heartbeat
  useEffect(() => {
    if (!isAuto) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % STAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAuto]);

  const activeStage = STAGES[activeIdx] ?? STAGES[0]!;

  return (
    <section
      aria-label="The Attention Machine proprietary engine"
      className="relative overflow-hidden border-b border-border bg-[#0a0a0d] py-24 md:py-36"
    >
      {/* Background ambient grid & circuitry */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-15">
        <div
          className="size-full"
          style={{
            backgroundImage:
              "radial-gradient(#ccff00 1px, transparent 1px), radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 20px 20px",
          }}
        />
      </div>

      <div className="edge">
        {/* Section Header */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-2 text-acid">
              <Cpu className="size-4 animate-spin" style={{ animationDuration: "12s" }} />
              <span className="eyebrow font-mono tracking-[0.3em]">
                PROPRIETARY ENGINE // 003
              </span>
            </div>
            <h2 className="display mt-3 text-4xl leading-tight md:text-6xl lg:text-7xl">
              THE ATTENTION MACHINE.
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="eyebrow font-mono text-xs text-muted-foreground">
              CONTINUOUS FLYWHEEL:
            </span>
            <button
              type="button"
              onClick={() => setIsAuto((prev) => !prev)}
              className="flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-xs transition-colors hover:border-acid"
            >
              <span
                className={`size-2 rounded-full ${
                  isAuto ? "bg-acid animate-ping" : "bg-muted-foreground"
                }`}
              />
              {isAuto ? "PULSE: AUTO" : "PULSE: MANUAL"}
            </button>
          </div>
        </div>

        {/* Nodes Navigation Bar (Horizontal on Desktop, Grid on Mobile) */}
        <div className="relative mb-12">
          {/* Animated Connecting Energy Conduits (SVG) */}
          <div className="hidden lg:block absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none px-8">
            <svg className="w-full h-4" preserveAspectRatio="none" viewBox="0 0 1000 16">
              <line
                x1="0"
                y1="8"
                x2="1000"
                y2="8"
                stroke="oklch(1 0 0 / 15%)"
                strokeWidth="2"
              />
              <line
                x1="0"
                y1="8"
                x2={`${((activeIdx + 0.5) / STAGES.length) * 1000}`}
                y2="8"
                stroke="#ccff00"
                strokeWidth="2"
                strokeDasharray="6 4"
                className="animate-[signal-marquee_8s_linear_infinite]"
              />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7 lg:gap-3">
            {STAGES.map((st, i) => {
              const isActive = i === activeIdx;
              const isPast = i < activeIdx;
              return (
                <button
                  key={st.id}
                  type="button"
                  data-cursor="cta"
                  onMouseEnter={() => {
                    setIsAuto(false);
                    setActiveIdx(i);
                  }}
                  onClick={() => {
                    setIsAuto(false);
                    setActiveIdx(i);
                  }}
                  className={`group relative flex flex-col items-start border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-acid bg-[#16190f] shadow-[0_0_20px_rgba(204,255,0,0.18)]"
                      : isPast
                      ? "border-border/80 bg-[#101014] text-foreground/80 hover:border-acid/60"
                      : "border-border/40 bg-[#0c0c0f] text-foreground/40 hover:border-border"
                  }`}
                >
                  <div className="flex w-full items-center justify-between pb-2 font-mono text-[10px]">
                    <span className={isActive ? "text-acid font-bold" : "text-muted-foreground"}>
                      {st.step}
                    </span>
                    <span
                      className={`size-1.5 rounded-full ${
                        isActive ? "bg-acid animate-ping" : "bg-transparent"
                      }`}
                    />
                  </div>
                  <span
                    className={`display text-lg tracking-wide transition-colors ${
                      isActive ? "text-foreground" : "group-hover:text-foreground"
                    }`}
                  >
                    {st.name}
                  </span>
                  <div
                    className={`mt-2 h-0.5 w-full transition-all duration-500 ${
                      isActive ? "bg-acid" : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Diagnostic Engine Terminal Output Panel */}
        <div className="relative border border-border bg-[#101015] p-8 md:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="flex size-2 rounded-full bg-acid animate-pulse" />
              <span className="text-acid font-bold">
                STAGE // {activeStage.step}: {activeStage.name}
              </span>
            </div>
            <div className="text-muted-foreground">
              TELEMETRY LOG: 2026.SYS.0{activeIdx + 1}
            </div>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            {/* Left Narrative */}
            <div className="lg:col-span-6">
              <h3 className="display text-3xl leading-snug tracking-tight text-foreground md:text-5xl">
                {activeStage.short}
              </h3>

              <div className="mt-8 space-y-4">
                <div className="border-l-2 border-acid/60 pl-4">
                  <p className="eyebrow font-mono text-[11px] text-muted-foreground">
                    RAW INPUT:
                  </p>
                  <p className="mt-1 text-sm text-foreground/90">{activeStage.input}</p>
                </div>
                <div className="border-l-2 border-border pl-4">
                  <p className="eyebrow font-mono text-[11px] text-muted-foreground">
                    ENGINE MECHANICS:
                  </p>
                  <p className="mt-1 text-sm text-foreground/90">{activeStage.mechanics}</p>
                </div>
              </div>
            </div>

            {/* Right Output & Deliverables */}
            <div className="flex flex-col justify-between border-t border-border pt-8 lg:col-span-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div>
                <div className="flex items-center gap-2 text-acid">
                  <Zap className="size-4" />
                  <span className="eyebrow font-mono text-xs tracking-wider">
                    VERIFIED OUTPUT SIGNAL
                  </span>
                </div>
                <p className="display mt-3 text-2xl leading-snug text-foreground md:text-3xl">
                  {activeStage.output}
                </p>
              </div>

              <div className="mt-8">
                <p className="eyebrow font-mono text-xs text-muted-foreground">
                  OPERATIONAL DELIVERABLES:
                </p>
                <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs">
                  {activeStage.deliverables.map((item) => (
                    <span
                      key={item}
                      className="border border-border/80 bg-[#15151c] px-3 py-1 text-foreground/80"
                    >
                      ✦ {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-4 font-mono text-xs text-muted-foreground">
                <button
                  type="button"
                  onClick={() => {
                    setIsAuto(false);
                    setActiveIdx((prev) => (prev > 0 ? prev - 1 : STAGES.length - 1));
                  }}
                  className="hover:text-acid transition-colors"
                >
                  ← PREV STAGE
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAuto(false);
                    setActiveIdx((prev) => (prev + 1) % STAGES.length);
                  }}
                  className="hover:text-acid flex items-center gap-1 transition-colors"
                >
                  NEXT STAGE <ArrowRight className="size-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
