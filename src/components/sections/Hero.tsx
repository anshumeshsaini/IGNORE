import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import campaignChrome from "@/assets/campaign-chrome.jpg";
import campaignGlass from "@/assets/campaign-glass.jpg";
import { Magnetic } from "../Magnetic";
import { HeroChromeSculpture } from "../HeroChromeSculpture";
import { useGsapContext } from "@/hooks/useGsapContext";
import { site } from "@/lib/site";

export function Hero() {
  const heroRoot = useRef<HTMLElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useGsapContext<HTMLElement>(({ gsap, root }) => {
    const lines = root.querySelectorAll("[data-hero-line]");
    const metas = root.querySelectorAll("[data-hero-meta]");
    const ctas = root.querySelectorAll("[data-hero-cta]");
    const media = root.querySelector("[data-hero-media]");

    const tl = gsap.timeline({ delay: 0.3 });

    // Entrance timeline
    tl.from(lines, {
      yPercent: 130,
      rotateX: -35,
      stagger: 0.08,
      duration: 1.3,
      ease: "power4.out",
    })
      .from(
        metas,
        {
          opacity: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.06,
          ease: "power3.out",
        },
        "-=0.8",
      )
      .from(
        ctas,
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.7",
      )
      .from(
        media,
        {
          scale: 1.25,
          opacity: 0,
          duration: 1.8,
          ease: "power3.out",
        },
        0,
      );

    // Scroll parallax & velocity reactions
    gsap.to(media, {
      yPercent: 24,
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(typographyRef.current, {
      yPercent: -18,
      opacity: 0.15,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  // Kinetic cursor reactivity & velocity tilt
  useEffect(() => {
    const typo = typographyRef.current;
    if (!typo || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const onPointerMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = ((e.clientX / innerWidth) - 0.5) * 36;
      targetY = ((e.clientY / innerHeight) - 0.5) * 26;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      typo.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotateY(${currentX * 0.25}deg) rotateX(${-currentY * 0.25}deg)`;
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={heroRoot}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#09090b] pt-24 md:pt-32 pb-10"
    >
      {/* Interactive WebGL Liquid Chrome Sculpture */}
      <HeroChromeSculpture />

      {/* Layered cinematic campaign background with grain & depth */}
      <div data-hero-media ref={mediaRef} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <img
          src={campaignChrome}
          alt="UNIGNORABLE Signature Chrome Object"
          width={1920}
          height={1080}
          fetchPriority="high"
          className="size-full object-cover object-center opacity-30 mix-blend-luminosity filter blur-[1px] md:opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-[#09090b]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-transparent to-[#09090b]/90" />
      </div>

      {/* Top manifesto signals */}

      {/* Center: Massive reactive typography */}
      <div className="edge relative z-10 my-auto py-10 md:py-16">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <div
              ref={typographyRef}
              className="will-change-transform"
              style={{ perspective: 1200 }}
            >
              <h1 className="display fluid-xl max-w-[12ch] font-bold tracking-[-0.04em]">
                {/* Line 1 */}
                <span className="block overflow-hidden">
                  <span data-hero-line className="block text-foreground">
                    WE MAKE
                  </span>
                </span>

                {/* Line 2: Cutout / tactile stroke */}
                <span className="block overflow-hidden">
                  <span
                    data-hero-line
                    className="block text-transparent [-webkit-text-stroke:1.5px_var(--bone)] transition-colors duration-500 hover:text-bone hover:[-webkit-text-stroke:0px]"
                  >
                    BRANDS
                  </span>
                </span>

                {/* Line 3 & 4 */}
                <span className="block overflow-hidden">
                  <span data-hero-line className="block text-foreground">
                    HARD TO
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span data-hero-line className="block text-acid">
                    IGNORE.
                  </span>
                </span>
              </h1>
            </div>

            {/* Strategic descriptor & buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-6 md:gap-10">
              <Magnetic strength={0.35}>
                <Link
                  to="/contact"
                  data-hero-cta
                  data-cursor="cta"
                  className="eyebrow group relative inline-flex items-center gap-3 overflow-hidden bg-acid px-8 py-4 font-mono font-bold text-ink shadow-[0_0_25px_rgba(204,255,0,0.25)] transition-all duration-300 hover:bg-foreground hover:text-ink"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    START A PROJECT
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-foreground transition-transform duration-300 ease-out group-hover:translate-x-0" />
                </Link>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href="#work-section"
                  data-hero-cta
                  data-cursor="view"
                  className="eyebrow link-underline group inline-flex items-center gap-2 font-mono text-foreground/80 transition-colors hover:text-acid"
                >
                  <span>EXPLORE OUR WORK</span>
                  <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right: Signature Floating Campaign Artifact */}
          <aside
            data-hero-meta
            className="relative hidden self-end lg:col-span-3 lg:block"
          >
            <div className="group relative ml-auto w-[min(22vw,280px)] border border-border/80 bg-ink/90 p-3 shadow-2xl backdrop-blur-md transition-all duration-700 hover:-translate-y-3 hover:border-acid">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={campaignGlass}
                  alt="Acid Glass Editorial Study"
                  width={600}
                  height={800}
                  className="size-full object-cover saturate-[0.8] transition-transform duration-700 group-hover:scale-110 group-hover:saturate-100"
                />
                <span className="eyebrow absolute left-2 top-2 bg-ink/80 px-2 py-1 text-[9px] text-acid">
                  ARCHIVE // 01
                </span>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <p className="eyebrow text-xs text-acid">ATTENTION ARCHITECTURE</p>
                  <p className="display mt-1 text-2xl leading-none text-foreground">
                    CULTURE × METRICS
                  </p>
                </div>
                <ArrowUpRight className="size-4 text-foreground/40 transition-colors group-hover:text-acid" />
              </div>
            </div>
            <p className="eyebrow mt-4 text-right font-mono text-[10px] text-foreground/40">
              {site.locations.join(" • ")}
            </p>
          </aside>
        </div>
      </div>

      {/* Bottom ticker bar */}
      <div className="edge relative z-10 flex items-center justify-between border-t border-border/40 pt-4 text-muted-foreground">
        <div data-hero-meta className="flex items-center gap-4">
          <span className="eyebrow font-mono text-[10px] text-acid">SYSTEM STATUS</span>
          <span className="h-1.5 w-1.5 rounded-full bg-acid animate-pulse" />
          <span className="eyebrow font-mono text-[10px] text-foreground/60">DEPLOYED GLOBALLY</span>
        </div>
        <div data-hero-meta className="flex items-center gap-2 font-mono text-[10px] text-foreground/40">
          <span>COORDINATES:</span>
          <span>19.0760° N, 72.8777° E</span>
        </div>
      </div>

      {/* Scanning laser line at bottom */}
      <div aria-hidden="true" className="signal-scan absolute bottom-0 h-0.5 w-1/3 bg-acid shadow-[0_0_12px_var(--acid)]" />
    </section>
  );
}
