import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useGsapContext } from "@/hooks/useGsapContext";
import campaignChrome from "@/assets/campaign-chrome.jpg";
import campaignFilm from "@/assets/campaign-film.jpg";
import campaignGlass from "@/assets/campaign-glass.jpg";
import campaignObject from "@/assets/campaign-object.jpg";

const principles = ["RADICAL STRATEGY", "EDITORIAL PRECISION", "KINETIC MOTION", "MEASURABLE IMPACT"];

export function CampaignGrid() {
  const ref = useGsapContext<HTMLElement>(({ gsap, root }) => {
    gsap.from(root.querySelectorAll("[data-grid-cell]"), {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 78%" },
    });
    root.querySelectorAll<HTMLElement>("[data-grid-image]").forEach((image) => {
      gsap.fromTo(image, { yPercent: -7, scale: 1.08 }, {
        yPercent: 7,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
  }, []);

  return (
    <section ref={ref} className="edge border-y border-border py-6 md:py-10" aria-label="Creative studio reel">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:grid-rows-[minmax(22rem,55vh)_minmax(18rem,42vh)]">
        <Link to="/work" data-grid-cell data-cursor="view" className="group relative overflow-hidden border border-border md:col-span-8 md:row-span-1">
          <img data-grid-image src={campaignChrome} alt="Liquid chrome campaign artwork in acid light" loading="lazy" width={1408} height={1008} className="size-full object-cover transition-[filter] duration-700 group-hover:saturate-150" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-8">
            <div><p className="eyebrow text-acid">001 / STUDIO REEL</p><h2 className="display mt-2 text-5xl md:text-7xl">MATTER / MOTION</h2></div>
            <ArrowUpRight className="size-10 border border-foreground/30 p-2 transition-colors group-hover:bg-acid group-hover:text-acid-foreground" aria-hidden="true" />
          </div>
        </Link>

        <div data-grid-cell className="flex min-h-72 flex-col justify-between bg-acid p-6 text-acid-foreground md:col-span-4 md:p-8">
          <p className="eyebrow">OUR OPERATING SYSTEM</p>
          <h2 className="display max-w-[8ch] text-5xl leading-[0.86] md:text-7xl">DENSITY WITH DIRECTION.</h2>
          <p className="max-w-xs text-sm leading-relaxed">Every frame earns attention. Every interaction moves the story. Every campaign is built to perform.</p>
        </div>

        <div data-grid-cell className="relative min-h-80 overflow-hidden border border-border md:col-span-4">
          <img data-grid-image src={campaignFilm} alt="Editorial figure wrapped in translucent campaign film" loading="lazy" width={1008} height={1312} className="size-full object-cover" />
          <p className="eyebrow absolute bottom-5 left-5 bg-ink px-3 py-2 text-acid">/ ART DIRECTION</p>
        </div>

        <div data-grid-cell className="relative min-h-72 overflow-hidden border border-border md:col-span-5">
          <img data-grid-image src={campaignGlass} alt="Iridescent glass campaign study" loading="lazy" width={1024} height={1280} className="size-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-ink/25">
            <span className="display text-6xl text-foreground mix-blend-difference md:text-8xl">CULTURE</span>
          </div>
        </div>

        <div data-grid-cell className="relative flex min-h-72 flex-col justify-between overflow-hidden border border-border p-6 md:col-span-3 md:p-8">
          <img src={campaignObject} alt="Abstract coral campaign object" loading="lazy" width={1280} height={912} className="absolute inset-0 -z-10 size-full object-cover opacity-35 grayscale" />
          <p className="eyebrow text-acid">BUILT TO LAND</p>
          <ol className="space-y-3">
            {principles.map((item, index) => <li key={item} className="eyebrow flex justify-between border-t border-foreground/20 pt-3"><span>0{index + 1}</span><span>{item}</span></li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}