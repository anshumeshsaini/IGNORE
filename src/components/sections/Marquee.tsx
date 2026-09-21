import { MarqueeDemo } from "@/components/demos/MarqueeDemo";
import { Reveal } from "@/components/Reveal";

export function Marquee() {
  return (
    <section aria-label="Client feedback and reviews" className="border-t border-border py-16 overflow-hidden bg-background/50">
      <div className="edge mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-acid font-mono">// VERIFIED IMPACT</p>
          <h2 className="display text-3xl md:text-5xl mt-2 tracking-tight">
            WHAT PARTNERS SAY.
          </h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-md">
          Live stream of client evaluations, founder feedback, and campaign post-mortems across global deployments.
        </p>
      </div>

      <Reveal>
        <MarqueeDemo />
      </Reveal>
    </section>
  );
}
