import { Link } from "@tanstack/react-router";
import { Magnetic } from "../Magnetic";
import { useGsapContext } from "@/hooks/useGsapContext";
import { site, whatsappLink } from "@/lib/site";
import { sounds } from "@/lib/sound";
import { ArrowUpRight, MessageCircle, Mail, Sparkles } from "lucide-react";

export function FinalCTA() {
  const ref = useGsapContext<HTMLElement>(({ gsap, root }) => {
    gsap.to(root.querySelector("[data-glow]"), {
      scale: 1.3,
      opacity: 0.25,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
    });
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-white/10 py-24 md:py-40 bg-ink"
    >
      {/* Radiant Glowing Atmosphere */}
      <div
        data-glow
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[75vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-acid/20 via-cyan/15 to-transparent blur-[140px] opacity-10"
      />

      <div className="edge relative z-10">
        <div className="max-w-5xl">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-acid animate-ping" />
            <p className="eyebrow text-acid">Q2/Q3 COMMISSIONS NOW OPEN</p>
          </div>

          <h2 className="display fluid-hero mt-6 tracking-tight text-foreground">
            LET&apos;S MAKE <br />
            SOMETHING <br />
            <span className="font-serif italic font-normal text-acid drop-shadow-[0_0_35px_rgba(204,255,0,0.3)]">
              impossible to ignore.
            </span>
          </h2>

          <p className="mt-8 max-w-2xl text-lg md:text-2xl font-light text-foreground/75 leading-relaxed">
            We only take 3 clients per quarter to ensure ruthless senior focus. If you have an
            audacious challenge and demand unfair market share, we should talk.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Magnetic strength={0.4}>
              <Link
                to="/contact"
                data-cursor="cta"
                onClick={() => sounds.play("pop")}
                className="eyebrow group inline-flex items-center gap-3 rounded-full bg-acid px-10 py-5 text-base font-bold text-acid-foreground shadow-[0_0_40px_rgba(204,255,0,0.45)] transition-all duration-300 hover:scale-105 hover:bg-white"
              >
                <span>COMMISSION A PROJECT</span>
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Magnetic>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              data-cursor="cta"
              onClick={() => sounds.play("pop")}
              className="eyebrow inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-acid hover:text-acid"
            >
              <MessageCircle className="size-4" />
              <span>WHATSAPP PRIORITY ↗</span>
            </a>

            <a
              href={`mailto:${site.email}`}
              data-cursor="cta"
              onClick={() => sounds.play("pop")}
              className="eyebrow link-underline inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-4" />
              <span>{site.email}</span>
            </a>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-2">
              <Sparkles className="size-3.5 text-acid" />
              Average Discovery Turnaround: 24 Hours
            </span>
            <span>•</span>
            <span>Direct Access to Founders & Directors</span>
            <span>•</span>
            <span>Global Delivery: India • UAE • Worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
}
