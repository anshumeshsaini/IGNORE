import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle, X } from "lucide-react";
import gsap from "gsap";
import { Magnetic } from "./Magnetic";
import { site, whatsappLink } from "@/lib/site";
import meridianImg from "@/assets/meridian.jpg";
import campaignGlass from "@/assets/campaign-glass.jpg";
import studio1 from "@/assets/studio-1.jpg";
import studio2 from "@/assets/studio-2.jpg";
import campaignProfile from "@/assets/campaign-profile.jpg";

interface NavItem {
  no: string;
  label: string;
  to: string;
  image: string;
  tagline: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    no: "01",
    label: "WORK",
    to: "/work",
    image: meridianImg,
    tagline: "Selected commissions & verified client case studies.",
  },
  {
    no: "02",
    label: "SERVICES",
    to: "/services",
    image: campaignGlass,
    tagline: "Nine specialized disciplines unified without operational silos.",
  },
  {
    no: "03",
    label: "ABOUT",
    to: "/about",
    image: studio1,
    tagline: "The human studio behind uncommoditized brand demand.",
  },
  {
    no: "04",
    label: "PROCESS",
    to: "/process",
    image: studio2,
    tagline: "Six stages engineered from diagnostic truth to aggressive scale.",
  },
  {
    no: "05",
    label: "CONTACT",
    to: "/contact",
    image: campaignProfile,
    tagline: "Initiate your Q3 / Q4 project briefing with our partners.",
  },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHoverImg, setActiveHoverImg] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const overlayRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Handle GSAP open / close animation
  useEffect(() => {
    const overlay = overlayRef.current;
    const links = linksContainerRef.current?.querySelectorAll("li");
    if (!overlay) return;

    if (open) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();

      tl.set(overlay, { display: "flex", opacity: 1 })
        .fromTo(
          overlay,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" },
        );

      if (links) {
        tl.fromTo(
          links,
          { opacity: 0, yPercent: 60, rotateX: -20 },
          {
            opacity: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.35",
        );
      }
    } else {
      document.body.style.overflow = "";
      gsap.to(overlay, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.6,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
        },
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      {/* Floating Header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 edge ${scrolled
            ? "border-b border-border/80 bg-[#09090b]/80 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-6"
          }`}
      >
        <nav
          className="flex items-center justify-between gap-6"
          aria-label="Main Navigation"
        >
          {/* Logo with glitch / dot hover */}
          <Link
            to="/"
            data-cursor="cta"
            className="group display text-xl font-bold tracking-[-0.04em] text-foreground md:text-2xl"
          >
            {site.name}
            <span className="text-acid transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(204,255,0,0.8)]">
              .
            </span>
          </Link>

          {/* Minimal Status indicator */}


          {/* Right Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp UNIGNORABLE"
              data-cursor="cta"
              className="hidden md:inline-flex size-9 items-center justify-center border border-border bg-[#101015] text-foreground/80 transition-colors hover:border-acid hover:text-acid"
            >
              <MessageCircle className="size-4" />
            </a>

            <Magnetic strength={0.3} className="hidden sm:inline-block">
              <Link
                to="/contact"
                data-cursor="cta"
                className="eyebrow inline-flex items-center gap-1.5 bg-acid px-5 py-2.5 font-mono font-bold text-ink transition-colors hover:bg-foreground"
              >
                LET&apos;S TALK <ArrowUpRight className="size-3.5" />
              </Link>
            </Magnetic>

            {/* Menu Trigger Button */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open Fullscreen Navigation"
              data-cursor="cta"
              className="eyebrow flex items-center gap-2 border border-border/80 bg-[#121217] px-4 py-2 font-mono text-xs font-bold text-foreground transition-colors hover:border-acid hover:text-acid"
            >
              <span>MENU</span>
              <span className="text-acid">///</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Cinematic Overlay */}
      <div
        ref={overlayRef}
        aria-hidden={!open}
        className="fixed inset-0 z-[160] hidden flex-col justify-between overflow-hidden bg-[#060608] text-foreground"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        {/* Dynamic Background Image Reveal on Hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-30 transition-opacity duration-700"
        >
          {activeHoverImg && (
            <img
              src={activeHoverImg}
              alt=""
              className="size-full object-cover filter blur-[2px] transition-all duration-700 scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/80 to-[#060608]" />
          <div className="grain-layer opacity-30" />
        </div>

        {/* Overlay Top Bar */}
        <div className="edge flex items-center justify-between border-b border-border/60 py-6">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="display text-xl font-bold tracking-tight text-foreground"
          >
            {site.name}
            <span className="text-acid">.</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="eyebrow flex items-center gap-2 border border-acid bg-acid px-4 py-2 font-mono text-xs font-bold text-ink transition-colors hover:bg-foreground"
          >
            CLOSE <X className="size-4" />
          </button>
        </div>

        {/* Center: Large Typography Menu */}
        <div className="edge my-auto py-8">
          <ul
            ref={linksContainerRef}
            className="space-y-4 md:space-y-6"
            style={{ perspective: 1000 }}
          >
            {NAV_ITEMS.map((item) => (
              <li
                key={item.to}
                onMouseEnter={() => setActiveHoverImg(item.image)}
                onFocus={() => setActiveHoverImg(item.image)}
                onMouseLeave={() => setActiveHoverImg(null)}
                className="overflow-hidden border-b border-border/40 pb-3"
              >
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  data-cursor="cta"
                  className="group flex flex-wrap items-baseline justify-between gap-4 transition-transform duration-300 hover:translate-x-3"
                >
                  <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="font-mono text-xs md:text-sm text-acid">
                      {item.no} //
                    </span>
                    <span className="display text-4xl sm:text-6xl md:text-8xl tracking-tight text-foreground transition-colors duration-300 group-hover:text-acid">
                      {item.label}
                    </span>
                  </div>

                  <span className="hidden lg:block font-mono text-xs text-foreground/50 max-w-xs text-right group-hover:text-foreground/80 transition-colors">
                    {item.tagline}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Overlay Bottom Bar */}
        <div className="edge flex flex-wrap items-center justify-between gap-4 border-t border-border/60 py-6 font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-6">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="text-acid hover:underline"
            >
              WHATSAPP ↗
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-foreground/70 hover:text-foreground"
            >
              {site.email}
            </a>
          </div>

          <div>{site.locations.join(" • ")}</div>
        </div>
      </div>
    </>
  );
}
