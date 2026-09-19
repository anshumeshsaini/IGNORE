import { Link } from "@tanstack/react-router";
import { site, whatsappLink } from "@/lib/site";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer
      aria-label="Site Footer"
      className="relative overflow-hidden border-t border-border bg-[#050507] pt-20 pb-12 text-foreground"
    >
      <div className="edge">
        {/* Navigation & Directory Grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 pb-16 border-b border-border/40">
          {/* Tagline Column */}
          <div className="lg:col-span-4 space-y-4">
            <p className="eyebrow text-acid font-mono text-xs">
              CREATIVE + PERFORMANCE MARKETING
            </p>
            <p className="font-mono text-sm leading-relaxed text-foreground/80 max-w-sm">
              {site.tagline}
            </p>
            <div className="pt-2 font-mono text-xs text-foreground/50">
              {site.locations.join(" • ")}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <p className="eyebrow text-muted-foreground mb-4">INDEX // NAVIGATION</p>
            <div>
              <Link to="/work" className="hover:text-acid transition-colors">
                01 // WORK
              </Link>
            </div>
            <div>
              <Link to="/services" className="hover:text-acid transition-colors">
                02 // SERVICES
              </Link>
            </div>
            <div>
              <Link to="/about" className="hover:text-acid transition-colors">
                03 // ABOUT
              </Link>
            </div>
            <div>
              <Link to="/process" className="hover:text-acid transition-colors">
                04 // PROCESS
              </Link>
            </div>
            <div>
              <Link to="/contact" className="hover:text-acid transition-colors">
                05 // CONTACT
              </Link>
            </div>
          </div>

          {/* Socials & Comms */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <p className="eyebrow text-muted-foreground mb-4">CONNECT // SOCIALS</p>
            <div>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="hover:text-acid transition-colors flex items-center gap-1.5"
              >
                WHATSAPP ↗
              </a>
            </div>
            <div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-acid transition-colors flex items-center gap-1.5"
              >
                INSTAGRAM ↗
              </a>
            </div>
            <div>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-acid transition-colors flex items-center gap-1.5"
              >
                LINKEDIN ↗
              </a>
            </div>
            <div>
              <a
                href={`mailto:${site.email}`}
                className="text-foreground/70 hover:text-acid transition-colors"
              >
                {site.email}
              </a>
            </div>
          </div>

          {/* Subtle animated status coordinate radar */}
          <div className="lg:col-span-2 flex flex-col justify-between font-mono text-xs">
            <p className="eyebrow text-muted-foreground">RADAR // ACTIVE</p>
            <div className="relative size-16 my-4 border border-border flex items-center justify-center">
              <div className="size-2 rounded-full bg-acid animate-ping" />
              <div className="absolute inset-0 border border-acid/30 rounded-full animate-spin" style={{ animationDuration: "8s" }} />
            </div>
            <p className="text-[10px] text-muted-foreground">LATENCY: 14MS</p>
          </div>
        </div>

        {/* Huge UNIGNORABLE Display Word */}
        <div className="my-10 select-none overflow-hidden text-center">
          <span className="display block fluid-xl tracking-[-0.04em] text-foreground/90 transition-colors duration-500 hover:text-acid">
            {site.name}
            <span className="text-acid">.</span>
          </span>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/40 pt-6 font-mono text-xs text-muted-foreground">
          <div>© {currentYear} {site.name}. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-6">
            <span>INDIA / UAE / GLOBAL</span>
            <span className="text-acid">HARD TO IGNORE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
