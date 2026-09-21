import { AnimatedBeamDemo } from "@/components/demos/AnimatedBeamDemo";
import { Reveal } from "@/components/Reveal";
import { Sparkles, Cpu, Zap, Activity } from "lucide-react";

export function WorkflowEngine() {
  const highlights = [
    {
      icon: Cpu,
      title: "CENTRAL AI INTELLIGENCE",
      desc: "OpenAI GPT-4 fine-tuned on client brand voice, tone guidelines, and performance copy datasets.",
    },
    {
      icon: Zap,
      title: "INSTANT ASSET PIPELINES",
      desc: "Synchronized cloud assets connecting Google Drive, Docs, and Notion directly to production pipelines.",
    },
    {
      icon: Activity,
      title: "MULTI-CHANNEL BROADCAST",
      desc: "Real-time deployment routing through WhatsApp, Messenger, and automated Zapier campaign triggers.",
    },
  ];

  return (
    <section className="border-t border-border py-20 lg:py-28 overflow-hidden bg-card/20">
      <div className="edge">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>

            <h2 className="display text-4xl sm:text-6xl mt-3 tracking-tight leading-[0.9]">
              AUTONOMOUS PIPELINES.
              <br />
              <span className="text-acid">WIRED FOR VELOCITY.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
            We do not work in silos. Every creative campaign is plugged into an automated neural beam
            infrastructure—delivering assets from ideation to distribution in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Animated Beam Demo Canvas */}
          <div className="lg:col-span-7">
            <Reveal className="w-full">
              <div className="rounded-2xl border border-border/80 bg-background/80 shadow-2xl p-4 md:p-6 backdrop-blur-md relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-destructive/70" />
                    <span className="size-2.5 rounded-full bg-signal/70" />
                    <span className="size-2.5 rounded-full bg-acid/70" />
                    <span className="text-xs font-mono text-muted-foreground ml-2">ignition-flow://neural-mesh.stream</span>
                  </div>

                </div>

                <AnimatedBeamDemo />

                <div className="mt-4 pt-3 border-t border-border/40 flex flex-wrap items-center justify-between text-[11px] font-mono text-muted-foreground gap-2">

                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Architecture Highlights */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 border border-border/70 rounded-xl bg-background/60 hover:border-acid/60 hover:bg-card/60 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-acid/10 text-acid group-hover:bg-acid group-hover:text-acid-foreground transition-colors">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-muted-foreground">0{index + 1} / NODE</p>
                      <h3 className="font-bold text-sm tracking-wide text-foreground">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
