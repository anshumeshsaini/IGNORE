import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { site, whatsappLink } from "@/lib/site";
import { services } from "@/lib/data/services";
import { sounds } from "@/lib/sound";

/* ─── Live clock ─── */
function LiveClock({ zone, label }: { zone: string; label: string }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: zone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [zone]);

  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[8px] tracking-[0.2em] text-white/25 uppercase">{label}</span>
      <span className="font-mono text-[11px] text-white/60 tabular-nums">{time}</span>
    </div>
  );
}

/* ─── Hover nav link ─── */
function FooterLink({
  href,
  to,
  children,
  external,
}: {
  href?: string;
  to?: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const [hov, setHov] = useState(false);
  const base =
    "group relative inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.08em] transition-all duration-300 text-white/40 hover:text-white/90";

  const inner = (
    <>
      {hov && (
        <span
          className="absolute -left-3 top-1/2 -translate-y-1/2 size-1 rounded-full animate-pulse"
          style={{ background: "#ccff00" }}
          aria-hidden="true"
        />
      )}
      {children}
      {external && (
        <span className="text-[9px] text-white/20 group-hover:text-acid transition-colors">↗</span>
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        onClick={() => sounds.play("click")}
        onMouseEnter={() => { sounds.play("hover"); setHov(true); }}
        onMouseLeave={() => setHov(false)}
        className={base}
        style={{ paddingLeft: "0.75rem" }}
      >
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onClick={() => sounds.play("click")}
      onMouseEnter={() => { sounds.play("hover"); setHov(true); }}
      onMouseLeave={() => setHov(false)}
      className={base}
      style={{ paddingLeft: "0.75rem" }}
    >
      {inner}
    </a>
  );
}

/* ─── Big animated wordmark ─── */
function Wordmark() {
  const [hov, setHov] = useState(false);
  const letters = site.name.split("");
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="cursor-pointer select-none"
    >
      <div
        className="display leading-[0.85] tracking-[-0.04em]"
        style={{ fontSize: "clamp(3rem,8vw,7rem)" }}
      >
        {letters.map((ch, i) => (
          <span
            key={i}
            className="inline-block transition-all"
            style={{
              color: hov ? "#ccff00" : "rgba(255,255,255,0.88)",
              transform: hov ? `translateY(${Math.sin(i * 0.8) * -6}px) rotate(${Math.sin(i * 0.5) * 2}deg)` : "none",
              transition: `transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 30}ms, color 0.4s ease ${i * 25}ms`,
              textShadow: hov ? "0 0 40px rgba(204,255,0,0.3)" : "none",
            }}
          >
            {ch}
          </span>
        ))}
        <span
          className="inline-block transition-all duration-500"
          style={{ color: "#ccff00", textShadow: hov ? "0 0 30px rgba(204,255,0,0.6)" : "0 0 0 transparent" }}
        >
          .
        </span>
      </div>
    </div>
  );
}

/* ─── Animated "back to top" button ─── */
function BackToTop() {
  const [hov, setHov] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => { sounds.play("pop"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
      onMouseEnter={() => { setHov(true); sounds.play("hover"); }}
      onMouseLeave={() => setHov(false)}
      aria-label="Back to top"
      className="flex items-center gap-2 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0.3,
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: hov ? "#ccff00" : "rgba(255,255,255,0.4)",
        border: `1px solid ${hov ? "rgba(204,255,0,0.4)" : "rgba(255,255,255,0.1)"}`,
        background: hov ? "rgba(204,255,0,0.06)" : "transparent",
        padding: "0.6rem 1rem",
        borderRadius: "2px",
        cursor: "pointer",
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
        style={{
          transform: hov ? "translateY(-3px)" : "none",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <path d="M6 10V2M2.5 5.5L6 2l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      BACK TO TOP
    </button>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const [mouseX, setMouseX] = useState(50);
  const footerRef = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = footerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouseX(((e.clientX - rect.left) / rect.width) * 100);
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={onMove}
      className="relative overflow-hidden border-t border-white/10"
      style={{
        background: "oklch(0.085 0.012 255)",
        padding: "clamp(3.5rem,7vw,7rem) clamp(1.25rem,5vw,5rem) 2rem",
      }}
    >
      {/* Ambient spotlight that follows mouse */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 bottom-0 w-[40vw] -z-10 transition-none"
        style={{
          left: `${mouseX - 20}%`,
          background: "radial-gradient(ellipse 60% 80% at center, rgba(204,255,0,0.04), transparent 70%)",
          filter: "blur(40px)",
          transition: "left 0.8s cubic-bezier(0.25,1,0.5,1)",
        }}
      />

      {/* Film grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── TOP: Live clocks bar ── */}
      <div
        className="flex flex-wrap items-center gap-6 mb-14 pb-6 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2 mr-4">
          <span className="size-1.5 rounded-full bg-acid animate-pulse" />
          <span className="font-mono text-[9px] tracking-[0.25em] text-acid uppercase">
            Studio Live
          </span>
        </div>
        <LiveClock zone="Asia/Kolkata" label="BLR" />
        <LiveClock zone="America/New_York" label="NYC" />
        <LiveClock zone="Europe/London" label="LON" />
        <LiveClock zone="Asia/Dubai" label="DXB" />
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid gap-12 md:grid-cols-12">

        {/* Brand column */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <Link to="/" onClick={() => sounds.play("pop")}>
            <Wordmark />
          </Link>

          <p className="text-[13px] text-white/40 font-normal leading-relaxed max-w-xs">
            Independent creative atelier and performance growth engine. We engineer brand films,
            immersive digital flagships, and acquisition machines that cannot be ignored.
          </p>

          {/* Human badge */}
          <div
            className="inline-flex items-center gap-2.5 self-start px-3 py-1.5"
            style={{
              borderRadius: "2px",
              border: "1px solid rgba(204,255,0,0.25)",
              background: "rgba(204,255,0,0.05)",
            }}
          >
            <span className="size-1.5 rounded-full bg-acid animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-acid uppercase">
              100% Human Intellect & Design
            </span>
          </div>

          {/* Locations */}
          <p className="font-mono text-[9px] tracking-[0.2em] text-white/20 uppercase">
            Studios: {site.locations.join("  ·  ")}
          </p>
        </div>

        {/* Explore nav */}
        <nav className="md:col-span-3" aria-label="Explore navigation">
          <p
            className="font-mono text-[8px] tracking-[0.25em] uppercase mb-5"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            / EXPLORE
          </p>
          <ul className="flex flex-col gap-3">
            {[
              { to: "/work", label: "Selected Work" },
              { to: "/services", label: "Studio Disciplines" },
              { to: "/about", label: "About Atelier" },
              { to: "/process", label: "The Blueprint" },
              { to: "/contact", label: "Commission Project" },
            ].map((l) => (
              <li key={l.to}>
                <FooterLink to={l.to}>{l.label}</FooterLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services nav */}
        <nav className="md:col-span-2" aria-label="Services navigation">
          <p
            className="font-mono text-[8px] tracking-[0.25em] uppercase mb-5"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            / SERVICES
          </p>
          <ul className="flex flex-col gap-3">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <FooterLink to={`/services/${s.slug}`}>{s.title}</FooterLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Connect nav */}
        <nav className="md:col-span-2" aria-label="Connect navigation">
          <p
            className="font-mono text-[8px] tracking-[0.25em] uppercase mb-5"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            / CONNECT
          </p>
          <ul className="flex flex-col gap-3">
            <li>
              <FooterLink href={`mailto:${site.email}`}>{site.email}</FooterLink>
            </li>
            <li>
              <FooterLink href={whatsappLink()} external>WhatsApp Direct</FooterLink>
            </li>
            {site.socials.map((s) => (
              <li key={s.label}>
                <FooterLink href={s.href} external>{s.label}</FooterLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ── BIG HORIZONTAL RULE WITH LABEL ── */}
      <div
        className="relative my-14 flex items-center gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span
          className="absolute top-0 left-0 h-[1px] w-24 -translate-y-1/2"
          style={{ background: "linear-gradient(to right, #ccff00, transparent)" }}
          aria-hidden="true"
        />
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <p className="font-mono text-[9px] tracking-[0.15em] text-white/20">
            © {year} {site.name}
          </p>
          <span className="text-white/10">|</span>
          <p className="font-mono text-[9px] tracking-[0.1em] text-white/20">
            Built with human obsession
          </p>
          <span
            className="inline-block animate-[pulse_2s_ease-in-out_infinite]"
            aria-hidden="true"
            style={{ color: "#fb923c", fontSize: "11px" }}
          >
            ♥
          </span>
        </div>

        <BackToTop />
      </div>
    </footer>
  );
}
