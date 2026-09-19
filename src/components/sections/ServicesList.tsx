import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { services } from "@/lib/data/services";
import campaignChrome from "@/assets/campaign-chrome.jpg";
import campaignFilm from "@/assets/campaign-film.jpg";
import campaignGlass from "@/assets/campaign-glass.jpg";
import campaignObject from "@/assets/campaign-object.jpg";
import campaignProfile from "@/assets/campaign-profile.jpg";
import studio1 from "@/assets/studio-1.jpg";
import studio2 from "@/assets/studio-2.jpg";
import studioCraft from "@/assets/studio-craft.jpg";
import heroImg from "@/assets/hero.jpg";

// Curated visuals mapped to each discipline
const SERVICE_VISUALS: Record<string, string> = {
  "performance-marketing": campaignObject,
  "social-media-marketing": campaignProfile,
  "google-ads": studioCraft,
  "meta-ads": campaignGlass,
  "web-development": campaignChrome,
  "seo": studio2,
  "video-production": campaignFilm,
  "animation": heroImg,
  "event-marketing": studio1,
};

// Rich deliverables, tools, and outcomes for the art-directed index
const SERVICE_SPECS: Record<
  string,
  { tools: string; outcome: string; relatedProject: { name: string; slug: string } }
> = {
  "performance-marketing": {
    tools: "TripleWhale • GA4 • Northbeam • BigQuery",
    outcome: "-35% blended acquisition cost, +140% contribution margin",
    relatedProject: { name: "Meridian Coffee", slug: "meridian-coffee" },
  },
  "social-media-marketing": {
    tools: "Native Ingest • CapCut Pro • Frame.io • Midjourney",
    outcome: "4.8× organic viral reach, zero reliance on trend-jacking",
    relatedProject: { name: "Harbour Festival", slug: "harbour-festival" },
  },
  "google-ads": {
    tools: "Google Search • Shopping Feed • PMax • Offline Conversion API",
    outcome: "+220% qualified pipeline at sustainable target CPA",
    relatedProject: { name: "Atlas Fitness", slug: "atlas-fitness" },
  },
  "meta-ads": {
    tools: "Meta Ads Manager • Creative Testing Matrix • Advantage+",
    outcome: "Winning angle scaling from ₹50K to ₹10L+ daily spend",
    relatedProject: { name: "Meridian Coffee", slug: "meridian-coffee" },
  },
  "web-development": {
    tools: "React 19 • Next.js • TanStack • GSAP • Tailwind CSS",
    outcome: "Sub-second load time, 100/100 Core Web Vitals, +65% demo conversion",
    relatedProject: { name: "Nova Interiors", slug: "nova-interiors" },
  },
  "seo": {
    tools: "Ahrefs • SEMrush • Screaming Frog • Schema Engine",
    outcome: "Top 3 rankings on high-commercial revenue search queries",
    relatedProject: { name: "Nova Interiors", slug: "nova-interiors" },
  },
  "video-production": {
    tools: "ARRI Alexa Mini • RED V-Raptor • DaVinci Studio • ProGrade Glass",
    outcome: "Broadcast-caliber commercial films engineered for vertical feeds",
    relatedProject: { name: "Meridian Coffee", slug: "meridian-coffee" },
  },
  "animation": {
    tools: "Cinema 4D • Blender • After Effects • WebGL Shaders",
    outcome: "Unmistakable 3D brand assets and kinetic UI motion systems",
    relatedProject: { name: "Atlas Fitness", slug: "atlas-fitness" },
  },
  "event-marketing": {
    tools: "Spatial Architecture • Live Broadcast Ingest • Same-day Cutdowns",
    outcome: "Event lifecycle extended 6 months post-recap across global media",
    relatedProject: { name: "Harbour Festival", slug: "harbour-festival" },
  },
};

export function ServicesList() {
  const [activeSlug, setActiveSlug] = useState<string | null>("performance-marketing");
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  const activeService = services.find((s) => s.slug === activeSlug) ?? services[0]!;
  const activeVisual = SERVICE_VISUALS[activeSlug ?? "performance-marketing"] ?? campaignChrome;
  const activeSpec = SERVICE_SPECS[activeSlug ?? "performance-marketing"] ?? SERVICE_SPECS["performance-marketing"]!;

  return (
    <section
      id="services-section"
      aria-label="Capabilities and Services Index"
      className="relative overflow-hidden border-b border-border bg-[#09090b] py-24 md:py-40"
    >
      {/* Background visual spotlight that crossfades on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 overflow-hidden opacity-25 mix-blend-luminosity transition-opacity duration-700 lg:block"
      >
        <img
          src={activeVisual}
          alt=""
          className="size-full object-cover object-center filter blur-[1px] transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]" />
      </div>

      <div className="edge relative z-10">
        {/* Header */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <p className="eyebrow text-acid font-mono tracking-[0.25em]">
              (DISCIPLINE INDEX // 004)
            </p>
            <h2 className="display mt-3 text-4xl leading-tight md:text-7xl">
              NINE DISCIPLINES.
              <br />
              <span className="text-acid">ZERO SILOS.</span>
            </h2>
          </div>
          <div className="max-w-md font-mono text-xs leading-relaxed text-muted-foreground">
            We operate as an integrated SWAT team. Creatives understand media budgets, media buyers study typography, and developers write high-converting front-ends.
          </div>
        </div>

        {/* Desktop Vertical Service Index (Two-Column Layout: Interactive List + Sticky Detail Portal) */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left: Interactive List */}
          <div className="lg:col-span-7 border-t border-border">
            {services.map((s) => {
              const isActive = activeSlug === s.slug;
              return (
                <div
                  key={s.slug}
                  onMouseEnter={() => setActiveSlug(s.slug)}
                  onFocus={() => setActiveSlug(s.slug)}
                  className={`group relative border-b border-border transition-all duration-300 ${
                    isActive ? "bg-[#141610]" : "hover:bg-[#101014]"
                  }`}
                >
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    data-cursor="explore"
                    className="flex items-center justify-between px-6 py-6 transition-transform duration-300 group-hover:translate-x-3"
                  >
                    <div className="flex items-center gap-6">
                      <span
                        className={`font-mono text-xs transition-colors duration-300 ${
                          isActive ? "text-acid font-bold" : "text-muted-foreground"
                        }`}
                      >
                        {s.index} //
                      </span>
                      <h3
                        className={`display text-3xl transition-colors duration-300 xl:text-4xl ${
                          isActive ? "text-acid" : "text-foreground group-hover:text-foreground/90"
                        }`}
                      >
                        {s.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="eyebrow font-mono text-[10px] text-foreground/40 transition-colors group-hover:text-acid">
                        {s.discipline}
                      </span>
                      <ArrowUpRight
                        className={`size-5 transition-transform duration-300 ${
                          isActive
                            ? "text-acid -translate-y-1 translate-x-1"
                            : "text-foreground/40 group-hover:text-acid"
                        }`}
                      />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Right: Sticky Live Detail Portal */}
          <div className="sticky top-28 lg:col-span-5 border border-border bg-[#101015] p-8 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-xs">
              <span className="text-acid font-bold">
                [{activeService.index}] {activeService.discipline}
              </span>
              <span className="text-muted-foreground">ACTIVE SPECIFICATION</span>
            </div>

            {/* Preview Image Thumbnail */}
            <div className="relative mt-6 aspect-[16/9] overflow-hidden border border-border bg-ink">
              <img
                src={activeVisual}
                alt={activeService.title}
                className="size-full object-cover saturate-[0.85] transition-all duration-500 hover:scale-105"
              />
              <div className="absolute bottom-2 left-2 bg-ink/90 px-2 py-1 font-mono text-[10px] text-acid">
                OUTCOME: {activeSpec.outcome.split(",")[0]}
              </div>
            </div>

            {/* Copy */}
            <h4 className="display mt-6 text-2xl text-foreground">
              {activeService.hero}
            </h4>
            <p className="mt-2 text-sm font-mono leading-relaxed text-foreground/80">
              {activeService.short}
            </p>

            {/* Deliverables & Strategy points */}
            <div className="mt-6 border-t border-border/40 pt-4">
              <p className="eyebrow font-mono text-[11px] text-acid">KEY DELIVERABLES:</p>
              <ul className="mt-2 grid grid-cols-2 gap-2 font-mono text-xs text-foreground/80">
                {activeService.strategy.points.slice(0, 4).map((pt) => (
                  <li key={pt} className="flex items-center gap-1.5">
                    <Check className="size-3 text-acid shrink-0" />
                    <span className="truncate">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div className="mt-4 border-t border-border/40 pt-4 font-mono text-xs">
              <span className="text-muted-foreground">TECH STACK: </span>
              <span className="text-foreground/90">{activeSpec.tools}</span>
            </div>

            {/* Related Project link */}
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <div>
                <span className="eyebrow block text-[10px] text-muted-foreground">
                  FLAGSHIP STUDY:
                </span>
                <Link
                  to="/work/$slug"
                  params={{ slug: activeSpec.relatedProject.slug }}
                  className="font-mono text-xs text-acid hover:underline"
                >
                  {activeSpec.relatedProject.name} ↗
                </Link>
              </div>

              <Link
                to="/services/$slug"
                params={{ slug: activeService.slug }}
                className="eyebrow inline-flex items-center gap-1.5 bg-acid px-4 py-2 text-ink font-bold font-mono transition-colors hover:bg-foreground"
              >
                FULL SCOPE <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Accordion Interaction */}
        <div className="border-t border-border lg:hidden">
          {services.map((s) => {
            const isExpanded = expandedMobile === s.slug;
            const visual = SERVICE_VISUALS[s.slug] ?? campaignChrome;
            const spec = SERVICE_SPECS[s.slug] ?? SERVICE_SPECS["performance-marketing"]!;

            return (
              <div key={s.slug} className="border-b border-border">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedMobile(isExpanded ? null : s.slug)
                  }
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-acid">{s.index}</span>
                    <span className="display text-2xl text-foreground">
                      {s.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`size-5 text-foreground/60 transition-transform duration-300 ${
                      isExpanded ? "rotate-180 text-acid" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="pb-6 pt-2 font-mono text-xs space-y-4">
                    <img
                      src={visual}
                      alt={s.title}
                      className="aspect-[16/9] w-full object-cover border border-border"
                    />
                    <p className="text-foreground/90 leading-relaxed">{s.short}</p>
                    <div className="border-l-2 border-acid pl-3 py-1">
                      <p className="text-[10px] text-muted-foreground">OUTCOME:</p>
                      <p className="text-acid">{spec.outcome}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <Link
                        to="/work/$slug"
                        params={{ slug: spec.relatedProject.slug }}
                        className="text-muted-foreground underline"
                      >
                        Case Study: {spec.relatedProject.name}
                      </Link>
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="bg-acid px-3 py-1.5 text-ink font-bold"
                      >
                        VIEW SERVICE ↗
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
