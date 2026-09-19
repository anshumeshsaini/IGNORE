import { useRef } from "react";
import { useGsapContext } from "@/hooks/useGsapContext";
import studio1 from "@/assets/studio-1.jpg";
import studio2 from "@/assets/studio-2.jpg";
import studioCraft from "@/assets/studio-craft.jpg";

const PERSONALITY_TAGS = [
  { label: "INDEPENDENT", desc: "No holding company overhead. No junior farm-outs." },
  { label: "SENIOR-LED", desc: "Founders and senior operators sit directly in your briefs." },
  { label: "OPINIONATED", desc: "We push back on briefs that would waste your capital." },
  { label: "BUILT FOR COMPOUNDING", desc: "Crafting durable brand equity that outlasts individual ad flights." },
];

export function AboutBlock() {
  const containerRef = useRef<HTMLElement>(null);

  useGsapContext<HTMLElement>(({ gsap, root }) => {
    // Reveal personality words staggered
    gsap.from(root.querySelectorAll("[data-tag-item]"), {
      opacity: 0,
      y: 35,
      stagger: 0.12,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: root.querySelector("[data-tag-container]"),
        start: "top 80%",
      },
    });

    // Image reveal
    gsap.from(root.querySelectorAll("[data-about-img]"), {
      scale: 1.12,
      opacity: 0.6,
      duration: 1.4,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: root,
        start: "top 70%",
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      id="about-section"
      aria-label="About the Studio"
      className="relative overflow-hidden border-b border-border bg-[#0a0a0d] py-24 md:py-40"
    >
      <div className="edge">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 border-b border-border pb-4 font-mono text-xs text-acid">
          <span>HUMAN CRAFT // 007</span>
          <span className="text-foreground/40">•</span>
          <span className="text-muted-foreground">WHO WE ARE</span>
        </div>

        {/* Master Headline */}
        <div className="my-14">
          <h2 className="display fluid-lg max-w-[13ch] leading-[0.88] text-foreground">
            WE DON&apos;T JUST MAKE CONTENT.
            <br />
            <span className="text-acid">WE MAKE PEOPLE STOP SCROLLING.</span>
          </h2>
          <p className="mt-8 max-w-2xl font-mono text-base md:text-lg leading-relaxed text-foreground/85">
            We are strategists, designers, developers, media buyers and storytellers. One tight room with no handoffs. The strategist sits next to the film colorist, and the performance buyer tests the edit before the export even finishes rendering.
          </p>
        </div>

        {/* Editorial Image Composition (Real Studio & Equipment) */}
        <div className="my-16 grid items-start gap-8 lg:grid-cols-12">
          {/* Main Studio Image */}
          <div className="relative lg:col-span-7 overflow-hidden border border-border bg-ink">
            <div className="aspect-[16/11] w-full overflow-hidden">
              <img
                data-about-img
                src={studioCraft}
                alt="UNIGNORABLE studio camera rig and live capture session"
                className="size-full object-cover saturate-[0.8] transition-transform duration-700 hover:scale-105"
              />
              <div className="grain-layer opacity-25" />
            </div>
            <div className="flex items-center justify-between p-4 bg-[#111116] font-mono text-xs text-muted-foreground border-t border-border">
              <span>B-CAM ARRI 35 INGEST</span>
              <span className="text-acid font-bold">CALIBRATED RAW</span>
            </div>
          </div>

          {/* Secondary Stacked Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative overflow-hidden border border-border bg-ink">
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                  data-about-img
                  src={studio1}
                  alt="Creative strategy war room session"
                  className="size-full object-cover saturate-[0.75] transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-4 bg-[#111116] font-mono text-xs text-muted-foreground border-t border-border">
                <span>WAR ROOM: POSITIONING AUDIT</span>
              </div>
            </div>

            <div className="relative overflow-hidden border border-border bg-ink">
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                  data-about-img
                  src={studio2}
                  alt="Color grading and lens optics"
                  className="size-full object-cover saturate-[0.75] transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-4 bg-[#111116] font-mono text-xs text-muted-foreground border-t border-border">
                <span>COLOR & OPTICAL BENCH</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Personality Statements Animated Independently */}
        <div
          data-tag-container
          className="mt-20 border-t border-border pt-12"
        >
          <p className="eyebrow font-mono text-xs text-acid mb-8">
            OPERATIONAL PILLARS //
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PERSONALITY_TAGS.map((tag) => (
              <div
                key={tag.label}
                data-tag-item
                className="group border border-border bg-[#101014] p-6 transition-all duration-300 hover:border-acid hover:bg-[#141610]"
              >
                <div className="flex items-center justify-between pb-3 border-b border-border/40">
                  <span className="size-1.5 rounded-full bg-acid animate-pulse" />
                  <span className="font-mono text-[10px] text-muted-foreground">STANDARD</span>
                </div>
                <h3 className="display mt-4 text-2xl tracking-wide text-foreground transition-colors group-hover:text-acid md:text-3xl">
                  {tag.label}
                </h3>
                <p className="mt-3 font-mono text-xs leading-relaxed text-foreground/75">
                  {tag.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
