import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle, Volume2, VolumeX } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { site, whatsappLink } from "@/lib/site";
import { sounds } from "@/lib/sound";

const links = [
  { label: "WORK", to: "/work" },
  { label: "SERVICES", to: "/services" },
  { label: "ABOUT", to: "/about" },
  { label: "PROCESS", to: "/process" },
  { label: "CONTACT", to: "/contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(sounds.isMuted());
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = sounds.subscribe((isMuted) => setMuted(isMuted));
    return unsub;
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleSound = () => {
    const newState = sounds.toggleMute();
    setMuted(newState);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 edge transition-all duration-500 ${scrolled
            ? "border-b border-white/10 bg-background/80 py-3.5 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "border-b border-transparent py-6"
          }`}
      >
        <nav className="flex items-center justify-between gap-6" aria-label="Primary">
          {/* Logo with pulsing human studio stamp */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              data-cursor="cta"
              onClick={() => sounds.play("pop")}
              className="group display text-xl leading-none tracking-[-0.04em] md:text-2xl"
            >
              <span className="transition-colors group-hover:text-acid">{site.name}</span>
              <span className="text-acid">.</span>
            </Link>


          </div>

          {/* Desktop Links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-cursor="cta"
                  onClick={() => sounds.play("click")}
                  className="eyebrow link-underline text-foreground/75 transition-colors hover:text-foreground aria-[current=page]:text-acid"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Action Tools & Sound Toggle */}
          <div className="flex items-center gap-3">
            {/* Interactive Sound Synthesizer Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              data-cursor="sound"
              aria-label={muted ? "Enable audio feedback" : "Disable audio feedback"}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[10px] font-mono text-foreground/80 transition-all hover:border-acid hover:text-acid"
            >
              {muted ? (
                <>
                  <VolumeX className="size-3.5 text-muted-foreground" aria-hidden="true" />
                  <span className="hidden sm:inline">SOUND OFF</span>
                </>
              ) : (
                <>
                  <div className="flex items-end gap-0.5 h-3.5" aria-hidden="true">
                    <span className="eq-bar" />
                    <span className="eq-bar" />
                    <span className="eq-bar" />
                    <span className="eq-bar" />
                  </div>
                  <span className="hidden sm:inline text-acid">SOUND ON</span>
                </>
              )}
            </button>

            {/* WhatsApp CTA */}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              data-cursor="cta"
              onClick={() => sounds.play("pop")}
              className="hidden size-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-foreground/70 transition-all hover:border-acid hover:text-acid md:inline-flex"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
            </a>

            {/* Magnetic Talk Button */}
            <Magnetic className="hidden md:inline-block">
              <Link
                to="/contact"
                data-cursor="cta"
                onClick={() => sounds.play("pop")}
                className="eyebrow inline-flex items-center gap-1.5 rounded-full bg-acid px-6 py-2.5 text-acid-foreground font-bold transition-all hover:bg-white hover:scale-105 shadow-[0_0_20px_rgba(204,255,0,0.3)]"
              >
                LET&apos;S TALK <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </Magnetic>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => {
                sounds.play("click");
                setOpen((v) => !v);
              }}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="eyebrow relative z-[56] rounded-full border border-white/20 bg-white/5 px-3.5 py-2 text-[11px] lg:hidden"
            >
              {open ? "CLOSE" : "MENU"}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Overlay Menu */}
      <div
        id="mobile-menu"
        ref={panel}
        aria-hidden={!open}
        className="fixed inset-0 z-[55] bg-ink/95 backdrop-blur-2xl transition-[clip-path] duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] lg:hidden"
        style={{
          clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="edge flex h-full flex-col justify-between pb-10 pt-28">
          <ul className="space-y-2">
            {links.map((l, i) => (
              <li key={l.to} className="overflow-hidden border-b border-white/10">
                <Link
                  to={l.to}
                  onClick={() => sounds.play("pop")}
                  className="display block py-3.5 text-[12vw] leading-none transition-transform duration-700 hover:text-acid"
                  style={{
                    transform: open ? "translateY(0)" : "translateY(110%)",
                    transitionDelay: `${120 + i * 60}ms`,
                  }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-muted-foreground">AUDIO EXPERIENCE</span>
              <button
                type="button"
                onClick={toggleSound}
                className="stamp-badge cursor-pointer"
              >
                {muted ? "UNMUTE AUDIO" : "AUDIO ACTIVE"}
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href={whatsappLink()} className="eyebrow text-acid hover:underline">
                WHATSAPP ↗
              </a>
              <a href={`mailto:${site.email}`} className="eyebrow text-foreground/60 hover:underline">
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
