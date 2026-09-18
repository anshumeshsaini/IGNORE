import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import campaignGlass from "@/assets/campaign-glass.jpg";
import campaignProfile from "@/assets/campaign-profile.jpg";
import { Magnetic } from "../Magnetic";
import { useGsapContext } from "@/hooks/useGsapContext";
import { site } from "@/lib/site";

const LINES = ["WE MAKE", "BRANDS", "HARD TO", "IGNORE."];

export function Hero() {
  const bg = useRef<HTMLDivElement>(null);

  const ref = useGsapContext<HTMLElement>(({ gsap, root }) => {
    const tl = gsap.timeline({ delay: 1.15 });
    tl.from(root.querySelectorAll("[data-hero-line]"), {
      yPercent: 120,
      duration: 1.2,
      stagger: 0.08,
      ease: "power4.out",
    })
      .from(
        root.querySelectorAll("[data-hero-meta]"),
        { opacity: 0, y: 20, duration: 0.8, stagger: 0.08, ease: "power2.out" },
        "-=0.7",
      )
      .from(root.querySelector("[data-hero-media]"), { scale: 1.18, duration: 2, ease: "power3.out" }, 0);

    gsap.to(root.querySelector("[data-hero-media]"), {
      yPercent: 18,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(root.querySelector("[data-hero-copy]"), {
      yPercent: -14,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
    });
  }, []);

  // mouse-responsive drift on the background
  useEffect(() => {
    const el = bg.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.06)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-8 pt-28 md:pb-12">
      <div data-hero-media className="absolute inset-0 -z-10">
        <div ref={bg} className="absolute inset-0 transition-transform duration-[900ms] ease-out">
          <img
            src={campaignProfile}
            alt="Iridescent sculptural portrait from an UNIGNORABLE campaign"
            width={1024}
            height={1280}
            fetchPriority="high"
            className="campaign-drift size-full object-cover object-[68%_center] opacity-90 md:object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/45" />
      </div>

      <div className="edge relative grid items-end gap-8 lg:grid-cols-12">
        <div className="lg:col-span-9">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-6">
          <p data-hero-meta className="eyebrow text-acid">
            <span className="mr-3 inline-block h-px w-10 bg-acid align-middle" /> CREATIVE / STRATEGY / PERFORMANCE
          </p>
          <p data-hero-meta className="eyebrow text-foreground/60 lg:hidden">
            {site.locations.join(" / ")}
          </p>
        </div>

        <h1 data-hero-copy className="display fluid-xl max-w-[9ch]">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span data-hero-line className={`block ${i === 1 ? "ml-[0.45em] text-transparent [-webkit-text-stroke:1px_var(--bone)]" : ""} ${i === 3 ? "text-acid" : ""}`}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-wrap items-center gap-4 md:gap-8">
          <Magnetic strength={0.4}>
            <Link
              to="/contact"
              data-cursor="cta"
              className="eyebrow inline-flex items-center gap-2 bg-acid px-8 py-4 text-acid-foreground transition-colors hover:bg-foreground"
            >
              START A PROJECT <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </Magnetic>
          <Link
            to="/work"
            data-cursor="cta"
            className="eyebrow link-underline inline-flex items-center gap-2 text-foreground/80"
          >
            EXPLORE OUR WORK <ArrowDown className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div data-hero-meta className="mt-10 flex items-center gap-3 text-muted-foreground">
          <span className="eyebrow">SCROLL</span>
          <span className="h-px w-16 bg-border" />
          <ArrowDown className="size-3 animate-bounce" aria-hidden="true" />
        </div>
        </div>

        <aside data-hero-meta className="relative hidden self-end lg:col-span-3 lg:block">
          <div className="relative ml-auto w-[min(22vw,280px)] border border-foreground/20 bg-bone p-3 text-ink shadow-2xl transition-transform duration-500 hover:-translate-y-3">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img src={campaignGlass} alt="Acid glass campaign artwork" width={1024} height={1280} className="size-full object-cover transition-transform duration-700 hover:scale-110" />
            </div>
            <p className="eyebrow mt-4 text-signal">FEATURED / 01</p>
            <p className="display mt-1 text-3xl leading-none">ATTENTION, ART DIRECTED.</p>
            <ArrowUpRight className="absolute -right-3 -top-3 size-9 bg-signal p-2 text-bone" aria-hidden="true" />
          </div>
          <p className="eyebrow mt-5 text-right text-foreground/60">{site.locations.join(" / ")}</p>
        </aside>
      </div>
      <div aria-hidden="true" className="signal-scan absolute bottom-0 h-1 w-1/2 bg-signal" />
    </section>
  );
}
