import { useState } from "react";
import { MarqueeDemo } from "@/components/demos/MarqueeDemo";
import { GlobeDemo } from "@/components/demos/GlobeDemo";
import { IconCloudDemo } from "@/components/demos/IconCloudDemo";
import { AnimatedBeamDemo } from "@/components/demos/AnimatedBeamDemo";
import { HexagonPatternDemo } from "@/components/demos/HexagonPatternDemo";
import { Reveal } from "@/components/Reveal";
import { Sparkles, Globe as GlobeIcon, Cloud, Share2, Hexagon, MessageSquareQuote } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  {
    id: "marquee",
    label: "Reviews Marquee",
    icon: MessageSquareQuote,
    badge: "Social Proof",
    desc: "Infinite bidirectional review cards with pause-on-hover physics and edge gradient masks.",
  },
  {
    id: "globe",
    label: "3D WebGL Globe",
    icon: GlobeIcon,
    badge: "Global Reach",
    desc: "Interactive autorotating WebGL sphere with pointer inertia and multi-city geo markers.",
  },
  {
    id: "beam",
    label: "Animated Beam",
    icon: Share2,
    badge: "AI Automation",
    desc: "Connected SVG data streams and curved light beams orchestrating 7 platform nodes.",
  },
  {
    id: "cloud",
    label: "3D Icon Cloud",
    icon: Cloud,
    badge: "Tech Arsenal",
    desc: "Fibonacci sphere projection with 3D rotation, inertia drag, and 30+ interactive icons.",
  },
  {
    id: "hex",
    label: "Hexagon Pattern",
    icon: Hexagon,
    badge: "Spatial Grid",
    desc: "Mathematical honeycomb tessellation with radial masking and highlighted coordinate matrix.",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ModernInteractiveSuite() {
  const [activeTab, setActiveTab] = useState<TabId>("marquee");
  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0]!;

  return (
    <section className="border-t border-border py-20 lg:py-28 overflow-hidden bg-card/10">
      <div className="edge">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow text-acid font-mono flex items-center gap-2">
              <Sparkles className="size-3.5" />
              // NEXT-GEN INTERFACE LAB
            </p>
            <h2 className="display text-4xl sm:text-6xl mt-3 tracking-tight leading-[0.9]">
              MAGIC UI SUITE.
              <br />
              <span className="text-acid">INTERACTIVE SANDBOX.</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            All 5 modern components active in real-time. Select any module to preview interactive behaviors, 
            WebGL animations, and SVG shaders.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-border/70">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 border cursor-pointer",
                  isActive
                    ? "bg-foreground text-background border-foreground shadow-md scale-102"
                    : "bg-background/80 text-foreground/70 border-border hover:border-foreground/40 hover:text-foreground"
                )}
              >
                <Icon className="size-3.5" />
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded font-sans uppercase",
                    isActive
                      ? "bg-background/20 text-background"
                      : "bg-acid/10 text-acid"
                  )}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Preview Display */}
        <Reveal key={activeTab} className="mt-8">
          <div className="rounded-2xl border border-border bg-background p-6 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-4">
              <div>
                <span className="text-xs font-mono text-acid uppercase tracking-wider font-bold">
                  // {currentTab.label}
                </span>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {currentTab.desc}
                </p>
              </div>
              <span className="text-[11px] font-mono text-signal bg-signal/10 px-3 py-1 rounded-full border border-signal/30 shrink-0 self-start sm:self-auto">
                LIVE INTERACTIVE COMPONENT
              </span>
            </div>

            <div className="min-h-[380px] flex items-center justify-center">
              {activeTab === "marquee" && <MarqueeDemo />}
              {activeTab === "globe" && (
                <div className="relative w-full flex justify-center py-4">
                  <GlobeDemo />
                </div>
              )}
              {activeTab === "beam" && (
                <div className="w-full max-w-2xl">
                  <AnimatedBeamDemo />
                </div>
              )}
              {activeTab === "cloud" && (
                <div className="w-full flex justify-center py-4">
                  <IconCloudDemo />
                </div>
              )}
              {activeTab === "hex" && (
                <div className="w-full">
                  <HexagonPatternDemo />
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
