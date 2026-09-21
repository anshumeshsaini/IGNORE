import { GlobeDemo } from "@/components/demos/GlobeDemo";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function GlobalReach() {
  const hubs = [
    { city: "NEW YORK", tz: "EST / UTC-5", status: "OPERATIONAL" },
    { city: "LONDON", tz: "GMT / UTC+0", status: "OPERATIONAL" },
    { city: "BERLIN", tz: "CET / UTC+1", status: "OPERATIONAL" },
    { city: "TOKYO", tz: "JST / UTC+9", status: "OPERATIONAL" },
    { city: "SAN FRANCISCO", tz: "PST / UTC-8", status: "OPERATIONAL" },
    { city: "MUMBAI", tz: "IST / UTC+5.5", status: "OPERATIONAL" },
  ];

  return (
    <section className="border-t border-border py-20 lg:py-28 overflow-hidden bg-background">
      <div className="edge">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Meta */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>

              <h2 className="display text-4xl sm:text-6xl lg:text-7xl mt-4 tracking-tight leading-[0.88]">
                GLOBAL IMPACT.
                <br />
                <span className="text-acid">EVERY TIMEZONE.</span>
              </h2>

              <p className="mt-6 text-foreground/80 text-base md:text-lg max-w-lg leading-relaxed">
                We orchestrate high-frequency creative launches across 6 continents.
                Whether executing simultaneous multi-market rollouts or localized blitz campaigns,
                our creative network operates 24/7 without geographic borders.
              </p>

              {/* Live Hubs Matrix */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 border border-border/80 p-4 rounded-lg bg-card/40 backdrop-blur-xs">
                {hubs.map((hub) => (
                  <div key={hub.city} className="p-2 border-l border-acid/40">
                    <div className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-signal animate-pulse" />
                      <p className="text-xs font-bold tracking-wider">{hub.city}</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">{hub.tz}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-6">
                <div>
                  <p className="display text-3xl md:text-4xl text-foreground">140M+</p>
                  <p className="eyebrow text-muted-foreground mt-1">GLOBAL REACH</p>
                </div>
                <div className="h-10 w-px bg-border" />
                <div>
                  <p className="display text-3xl md:text-4xl text-acid">34</p>
                  <p className="eyebrow text-muted-foreground mt-1">COUNTRIES REACHED</p>
                </div>
                <div className="h-10 w-px bg-border" />
                <div>
                  <p className="display text-3xl md:text-4xl text-signal">&lt; 4HRS</p>
                  <p className="eyebrow text-muted-foreground mt-1">SYNC RESPONSE</p>
                </div>
              </div>
            </div>


          </div>

          {/* Right Column: Interactive 3D Globe */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <Reveal className="w-full max-w-lg flex justify-center">
              <div className="relative w-full aspect-square max-w-md md:max-w-lg flex items-center justify-center">
                <GlobeDemo />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
