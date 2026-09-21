import { IconCloudDemo } from "@/components/demos/IconCloudDemo";
import { HexagonPatternDemo } from "@/components/demos/HexagonPatternDemo";
import { Reveal } from "@/components/Reveal";
import { Layers, Terminal, Compass } from "lucide-react";

export function TechEcosystem() {
  return (
    <section className="border-t border-border py-20 lg:py-28 overflow-hidden bg-background">
      <div className="edge">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="eyebrow text-acid font-mono flex items-center justify-center gap-2">
            <Terminal className="size-3.5" />
            // 05 / DIGITAL ARSENAL & SYSTEM PATTERNS
          </p>
          <h2 className="display text-4xl sm:text-6xl md:text-7xl mt-3 tracking-tight leading-[0.9]">
            ENGINEERED BEAUTY.
            <br />
            <span className="text-acid">POWERED BY MODERN TECH.</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            We merge brutalist creative art direction with cutting-edge software engineering. 
            Explore our interactive 3D technology matrix and mathematical design patterns below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: 3D Interactive Technology Sphere */}
          <Reveal className="h-full">
            <div className="h-full rounded-2xl border border-border/80 bg-card/30 p-6 md:p-8 flex flex-col justify-between shadow-xl backdrop-blur-xs relative overflow-hidden group">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Compass className="size-4 text-acid" />
                    <span className="text-xs font-mono font-bold tracking-wider">3D INTERACTIVE STACK CLOUD</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground border border-border px-2 py-0.5 rounded">
                    DRAG TO ROTATE
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Full-stack engineering & creative tooling. Grab and spin the 3D sphere to inspect our stack.
                </p>
              </div>

              <div className="my-6 flex items-center justify-center min-h-[380px]">
                <IconCloudDemo />
              </div>

              <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>30+ LIBRARIES & PLATFORMS</span>
                <span className="text-acid font-semibold">REACT 19 / WEBGL READY</span>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Hexagon Pattern Grid */}
          <Reveal className="h-full">
            <div className="h-full rounded-2xl border border-border/80 bg-card/30 p-6 md:p-8 flex flex-col justify-between shadow-xl backdrop-blur-xs relative overflow-hidden group">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Layers className="size-4 text-signal" />
                    <span className="text-xs font-mono font-bold tracking-wider">SPATIAL HEXAGON PATTERN ENGINE</span>
                  </div>
                  <span className="text-[10px] font-mono text-signal border border-signal/30 bg-signal/10 px-2 py-0.5 rounded">
                    NODE MATRIX
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Algorithmic tessellation and dynamic SVG honeycomb matrices with active coordinate mapping.
                </p>
              </div>

              <div className="my-6 rounded-xl overflow-hidden border border-border/60 shadow-inner">
                <HexagonPatternDemo />
              </div>

              <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>RADIAL MASK GRADIENTS</span>
                <span className="text-signal font-semibold">COORDINATE MESH ACTIVE</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
