import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { site, whatsappLink } from "@/lib/site";

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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const panel = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 edge transition-all duration-500 ${
          scrolled
            ? "border-b border-border bg-background/80 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-6"
        }`}
      >
        <nav className="flex items-center justify-between gap-6" aria-label="Primary">
          <Link
            to="/"
            data-cursor="cta"
            className="display text-lg leading-none tracking-[-0.05em] md:text-xl"
          >
            {site.name}
            <span className="text-acid">.</span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-cursor="cta"
                  className="eyebrow link-underline text-foreground/70 transition-colors hover:text-foreground aria-[current=page]:text-acid"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              data-cursor="cta"
              className="hidden size-9 items-center justify-center border border-border text-foreground/70 transition-colors hover:border-acid hover:text-acid md:inline-flex"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
            </a>
            <Magnetic className="hidden md:inline-block">
              <Link
                to="/contact"
                data-cursor="cta"
                className="eyebrow inline-flex items-center gap-1.5 bg-acid px-5 py-2.5 text-acid-foreground transition-colors hover:bg-foreground"
              >
                LET&apos;S TALK <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="eyebrow relative z-[56] border border-border px-3 py-2 lg:hidden"
            >
              {open ? "CLOSE" : "MENU"}
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        ref={panel}
        aria-hidden={!open}
        className="fixed inset-0 z-[55] bg-background transition-[clip-path] duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] lg:hidden"
        style={{
          clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="edge flex h-full flex-col justify-between pb-10 pt-28">
          <ul>
            {links.map((l, i) => (
              <li key={l.to} className="overflow-hidden border-b border-border">
                <Link
                  to={l.to}
                  className="display block py-4 text-[13vw] leading-none transition-transform duration-700"
                  style={{
                    transform: open ? "translateY(0)" : "translateY(110%)",
                    transitionDelay: `${120 + i * 70}ms`,
                  }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-2">
            <a href={whatsappLink()} className="eyebrow block text-acid">
              WHATSAPP ↗
            </a>
            <a href={`mailto:${site.email}`} className="eyebrow block text-foreground/60">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
