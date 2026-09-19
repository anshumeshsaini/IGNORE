import { useState } from "react";
import campaignChrome from "@/assets/campaign-chrome.jpg";
import campaignFilm from "@/assets/campaign-film.jpg";
import campaignGlass from "@/assets/campaign-glass.jpg";
import campaignObject from "@/assets/campaign-object.jpg";
import campaignProfile from "@/assets/campaign-profile.jpg";
import studio1 from "@/assets/studio-1.jpg";
import studio2 from "@/assets/studio-2.jpg";
import studioCraft from "@/assets/studio-craft.jpg";
import meridianImg from "@/assets/meridian.jpg";
import atlasImg from "@/assets/atlas.jpg";
import novaImg from "@/assets/nova.jpg";
import harbourImg from "@/assets/harbour.jpg";

interface WallItem {
  id: string;
  tag: "CAMPAIGNS" | "CONTENT" | "ADS" | "WEB" | "SOCIAL" | "VIDEO" | "BRANDS";
  title: string;
  image: string;
  aspect: string;
}

const WALL_LANE_1: WallItem[] = [
  { id: "w1", tag: "CAMPAIGNS", title: "Meridian 6AM Ritual", image: meridianImg, aspect: "aspect-[16/10]" },
  { id: "w2", tag: "ADS", title: "Atlas Discipline Angle 03", image: atlasImg, aspect: "aspect-[4/5]" },
  { id: "w3", tag: "VIDEO", title: "Cinema Shutter Rig", image: studioCraft, aspect: "aspect-[16/9]" },
  { id: "w4", tag: "WEB", title: "Nova Spatial Rebuild", image: novaImg, aspect: "aspect-[1/1]" },
  { id: "w5", tag: "BRANDS", title: "Chrome Monolith", image: campaignChrome, aspect: "aspect-[4/3]" },
  { id: "w6", tag: "SOCIAL", title: "Harbour Recap Reel", image: harbourImg, aspect: "aspect-[9/16]" },
];

const WALL_LANE_2: WallItem[] = [
  { id: "w7", tag: "CONTENT", title: "Acid Optics Grade", image: campaignGlass, aspect: "aspect-[4/5]" },
  { id: "w8", tag: "VIDEO", title: "35mm Direction Study", image: campaignFilm, aspect: "aspect-[16/9]" },
  { id: "w9", tag: "BRANDS", title: "Sculptural Silhouette", image: campaignProfile, aspect: "aspect-[3/4]" },
  { id: "w10", tag: "CAMPAIGNS", title: "Obsidian Object Drop", image: campaignObject, aspect: "aspect-[16/10]" },
  { id: "w11", tag: "CONTENT", title: "Editorial Cut Bay", image: studio1, aspect: "aspect-[4/3]" },
  { id: "w12", tag: "ADS", title: "Lens Bench Calibrate", image: studio2, aspect: "aspect-[1/1]" },
];

const CATEGORIES = ["ALL", "CAMPAIGNS", "CONTENT", "ADS", "WEB", "SOCIAL", "VIDEO", "BRANDS"] as const;

export function CampaignWall() {
  const [filter, setFilter] = useState<string>("ALL");

  return (
    <section
      aria-label="Live Campaign Archive Wall"
      className="relative overflow-hidden border-b border-border bg-[#070709] py-24 md:py-36"
    >
      <div className="edge mb-12">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <p className="eyebrow text-acid font-mono tracking-[0.3em]">
              LIVE ARCHIVE // 009
            </p>
            <h2 className="display mt-3 text-4xl leading-tight md:text-6xl">
              THE CAMPAIGN WALL.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`border px-3 py-1.5 transition-colors ${
                  filter === cat
                    ? "border-acid bg-acid text-ink font-bold"
                    : "border-border text-foreground/70 hover:border-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lane 1: Moving Right */}
      <div className="relative mb-6 overflow-hidden select-none">
        <div className="flex w-[200%] animate-[signal-marquee_42s_linear_infinite] hover:[animation-play-state:paused] gap-6">
          {[...WALL_LANE_1, ...WALL_LANE_1].map((item, i) => {
            const matches = filter === "ALL" || filter === item.tag;
            return (
              <div
                key={`${item.id}-${i}`}
                data-cursor="view"
                className={`group relative shrink-0 overflow-hidden border border-border/70 bg-ink transition-all duration-500 w-72 md:w-96 ${
                  matches ? "opacity-100" : "opacity-25 grayscale"
                }`}
              >
                <div className={`${item.aspect} w-full overflow-hidden bg-muted`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="size-full object-cover saturate-[0.8] transition-transform duration-700 group-hover:scale-105 group-hover:saturate-100"
                  />
                  <div className="grain-layer opacity-20" />
                </div>
                <div className="flex items-center justify-between p-3.5 bg-[#101014] font-mono text-xs border-t border-border">
                  <span className="text-foreground/90 truncate font-semibold">{item.title}</span>
                  <span className="text-acid text-[10px] shrink-0">#{item.tag}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lane 2: Moving Left */}
      <div className="relative overflow-hidden select-none">
        <div
          className="flex w-[200%] gap-6 hover:[animation-play-state:paused]"
          style={{
            animation: "signal-marquee 48s linear infinite reverse",
          }}
        >
          {[...WALL_LANE_2, ...WALL_LANE_2].map((item, i) => {
            const matches = filter === "ALL" || filter === item.tag;
            return (
              <div
                key={`${item.id}-${i}`}
                data-cursor="view"
                className={`group relative shrink-0 overflow-hidden border border-border/70 bg-ink transition-all duration-500 w-64 md:w-88 ${
                  matches ? "opacity-100" : "opacity-25 grayscale"
                }`}
              >
                <div className={`${item.aspect} w-full overflow-hidden bg-muted`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="size-full object-cover saturate-[0.8] transition-transform duration-700 group-hover:scale-105 group-hover:saturate-100"
                  />
                  <div className="grain-layer opacity-20" />
                </div>
                <div className="flex items-center justify-between p-3.5 bg-[#101014] font-mono text-xs border-t border-border">
                  <span className="text-foreground/90 truncate font-semibold">{item.title}</span>
                  <span className="text-acid text-[10px] shrink-0">#{item.tag}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
