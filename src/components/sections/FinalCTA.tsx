import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle, Mail } from "lucide-react";
import { Magnetic } from "../Magnetic";
import { site, whatsappLink } from "@/lib/site";
import campaignChrome from "@/assets/campaign-chrome.jpg";

export function FinalCTA() {
  return (
    <section
      aria-label="Call to action — Start a project"
      className="group relative flex min-h-[90vh] flex-col justify-between overflow-hidden border-t border-border bg-[#070709] py-20 md:py-28"
    >
      {/* Background ambient texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-15 transition-all duration-700 group-hover:opacity-25"
      >
        <img
          src={campaignChrome}
          alt=""
          className="size-full object-cover filter blur-[2px] transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-[#070709]" />
      </div>

      <div className="edge w-full">
        {/* Top signal bar */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4 font-mono text-xs text-muted-foreground">
          <span className="text-acid font-bold">CONTACT DIRECTORY // 011</span>
          <span>TAKING Q3 / Q4 COMMISSIONS</span>
        </div>
      </div>

      {/* Viewport-filling Massive Headline */}
      <div className="edge my-auto py-12">
        <Link
          to="/contact"
          data-cursor="cta"
          className="block group/headline transition-transform duration-500 hover:translate-x-2"
        >
          <h2 className="display fluid-xl leading-[0.82] tracking-[-0.04em] text-foreground">
            <span className="block transition-colors duration-300 group-hover/headline:text-foreground">
              LET&apos;S MAKE
            </span>
            <span className="block text-transparent [-webkit-text-stroke:1.5px_var(--bone)] transition-colors duration-300 group-hover/headline:text-bone group-hover/headline:[-webkit-text-stroke:0px]">
              SOMETHING
            </span>
            <span className="block text-acid transition-all duration-300 group-hover/headline:drop-shadow-[0_0_40px_rgba(204,255,0,0.5)]">
              UNIGNORABLE.
            </span>
          </h2>
        </Link>
      </div>

      {/* Bottom Action Grid */}
      <div className="edge w-full border-t border-border/60 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Main Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <Magnetic strength={0.35}>
              <Link
                to="/contact"
                data-cursor="cta"
                className="eyebrow inline-flex items-center gap-2 bg-acid px-8 py-4 font-mono font-bold text-ink shadow-[0_0_25px_rgba(204,255,0,0.3)] transition-all duration-300 hover:bg-foreground hover:text-ink"
              >
                START A PROJECT <ArrowUpRight className="size-4" />
              </Link>
            </Magnetic>

            <Magnetic strength={0.25}>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                data-cursor="cta"
                className="eyebrow inline-flex items-center gap-2 border border-border bg-[#121217] px-6 py-4 font-mono text-foreground/90 transition-colors hover:border-acid hover:text-acid"
              >
                <MessageCircle className="size-4 text-acid" />
                WHATSAPP ↗
              </a>
            </Magnetic>

            <Magnetic strength={0.25}>
              <a
                href={`mailto:${site.email}`}
                data-cursor="cta"
                className="eyebrow inline-flex items-center gap-2 border border-border bg-[#121217] px-6 py-4 font-mono text-foreground/90 transition-colors hover:border-acid hover:text-acid"
              >
                <Mail className="size-4" />
                EMAIL ↗
              </a>
            </Magnetic>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 font-mono text-xs text-foreground/60">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="cta"
                className="link-underline transition-colors hover:text-acid"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
