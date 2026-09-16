import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react";
import { CanvasHeroBackdrop } from "../CanvasHeroBackdrop";
import { Magnetic } from "../Magnetic";
import { useGsapContext } from "@/hooks/useGsapContext";
import { site } from "@/lib/site";
import { sounds } from "@/lib/sound";

const INITIAL_LINES = [
  { text: "WE ARCHITECT", accent: false, serif: false },
  { text: "EXPERIENCES", accent: false, serif: true },
  { text: "IMPOSSIBLE", accent: true, serif: false },
  { text: "TO FORGET.", accent: false, serif: false },
];

const GLYPHS = "!<>-_\\/[]{}—=+*^?#abcdefghijklmn0123456789";

function ScrambleText({
  original,
  className = "",
}: {
  original: string;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState(original);
  const intervalRef = useRef<number | null>(null);

  const handleHover = () => {
    sounds.play("hover");
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText((prev) =>
        original
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return original[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= original.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      iteration += 1 / 2.5;
    }, 25);
  };

  return (
    <span
      onMouseEnter={handleHover}
      className={`inline-block cursor-pointer transition-transform duration-300 hover:scale-[1.01] ${className}`}
    >
      {displayText}
    </span>
  );
}

export function Hero() {
  const [times, setTimes] = useState({
    nyc: "",
    lon: "",
    tokyo: "",
    blr: "",
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const getFormatted = (timeZone: string) =>
        new Intl.DateTimeFormat("en-US", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);

      setTimes({
        nyc: getFormatted("America/New_York"),
        lon: getFormatted("Europe/London"),
        tokyo: getFormatted("Asia/Tokyo"),
        blr: getFormatted("Asia/Kolkata"),
      });
    };
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const ref = useGsapContext<HTMLElement>(({ gsap, root }) => {
    const tl = gsap.timeline({ delay: 0.8 });

    tl.from(root.querySelectorAll("[data-hero-line]"), {
      yPercent: 120,
      opacity: 0,
      duration: 1.2,
      stagger: 0.09,
      ease: "power4.out",
    })
      .from(
        root.querySelectorAll("[data-hero-meta]"),
        { opacity: 0, y: 25, duration: 0.8, stagger: 0.08, ease: "power2.out" },
        "-=0.7"
      )
      .from(
        root.querySelectorAll("[data-hero-badge]"),
        { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5"
      );

    gsap.to(root.querySelector("[data-hero-copy]"), {
      yPercent: -12,
      opacity: 0.35,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
    });
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 pb-10"
    >
      {/* 60FPS Reactive Particle Constellation & Ripple Physics */}
      <CanvasHeroBackdrop />

      {/* Atmospheric ambient radiant lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 -z-10 size-[50vw] rounded-full bg-acid/[0.07] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-10 -z-10 size-[45vw] rounded-full bg-cyan/[0.06] blur-[130px]"
      />

      {/* Top Meta & Live Clocks Bar */}
      <div className="edge relative z-10 w-full">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">


          {/* Live Studio Clocks */}

        </div>
      </div>

      {/* Main Kinetic Headline */}
      <div className="edge relative z-10 my-auto py-10">
        <div className="max-w-7xl">


          <h1 data-hero-copy className="display fluid-hero tracking-[-0.04em]">
            {INITIAL_LINES.map((line, i) => (
              <span key={line.text} className="block overflow-hidden py-0.5">
                <span data-hero-line className="block">
                  <ScrambleText
                    original={line.text}
                    className={`
                      ${line.accent ? "text-acid drop-shadow-[0_0_25px_rgba(204,255,0,0.25)]" : "text-foreground"}
                      ${line.serif ? "font-serif font-normal italic lowercase tracking-normal text-white/90" : ""}
                    `}
                  />
                </span>
              </span>
            ))}
          </h1>

          <p
            data-hero-meta
            className="mt-8 max-w-xl text-base md:text-xl font-normal leading-relaxed text-foreground/75"
          >
            We fuse cinematic film production, bespoke interaction engineering, and ruthless
            performance marketing to build brands humans fall in love with.
          </p>

          {/* Interactive CTA Controls */}
          <div data-hero-meta className="mt-10 flex flex-wrap items-center gap-5 md:gap-8">
            <Magnetic strength={0.35}>
              <Link
                to="/contact"
                data-cursor="cta"
                onClick={() => sounds.play("pop")}
                className="eyebrow group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-acid px-9 py-4 text-acid-foreground font-bold shadow-[0_0_35px_rgba(204,255,0,0.4)] transition-all duration-300 hover:scale-105 hover:bg-white"
              >
                <span>COMMISSION A PROJECT</span>
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Magnetic>

            <Link
              to="/work"
              data-cursor="explore"
              onClick={() => sounds.play("pop")}
              className="eyebrow link-underline inline-flex items-center gap-2 text-foreground/85 transition-colors hover:text-acid"
            >
              EXPLORE OUR ARCHIVE <ArrowDown className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Floating Stats / Interaction Cue */}

    </section>
  );
}
