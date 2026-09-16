import { useState, useEffect, useRef, useCallback } from "react";
import { testimonials } from "@/lib/data/testimonials";
import { sounds } from "@/lib/sound";

/* ─── Waveform bars (animated audio visualizer) ─── */
function Waveform({ active }: { active: boolean }) {
  const heights = [4, 10, 7, 14, 9, 16, 6, 12, 8, 15, 5, 11, 7, 13];
  return (
    <div className="flex items-center gap-[2px] h-4" aria-hidden="true">
      {heights.map((h, i) => (
        <div
          key={i}
          className="rounded-full w-[2px]"
          style={{
            height: active ? `${h}px` : "3px",
            background: "#ccff00",
            opacity: active ? 0.85 : 0.25,
            transition: `height ${0.3 + (i % 4) * 0.08}s cubic-bezier(0.34,1.56,0.64,1)`,
            transitionDelay: `${i * 25}ms`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Single testimonial card ─── */
function TestiCard({
  t,
  idx,
  isActive,
  onClick,
}: {
  t: (typeof testimonials)[number];
  idx: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: y * -8, ry: x * 8 });
  }, []);

  const onLeave = () => {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  const avatarColors = ["#ccff00", "#38bdf8", "#fb923c", "#a78bfa"];
  const color = avatarColors[idx % avatarColors.length]!;

  return (
    <div
      ref={cardRef}
      onClick={() => { sounds.play("pop"); onClick(); }}
      onMouseEnter={() => { sounds.play("hover"); setHovered(true); }}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      className="relative overflow-hidden cursor-pointer select-none"
      style={{
        borderRadius: "2px",
        border: `1px solid ${isActive ? color + "55" : "rgba(255,255,255,0.07)"}`,
        background: isActive
          ? `linear-gradient(140deg, ${color}0a 0%, rgba(0,0,0,0.55) 100%)`
          : "rgba(255,255,255,0.018)",
        padding: "clamp(1.25rem,2.5vw,1.75rem)",
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) ${isActive ? "scale(1.01)" : "scale(1)"}`,
        transition: "transform 0.3s cubic-bezier(0.25,1,0.5,1), border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease",
        boxShadow: isActive ? `0 0 40px ${color}15, 0 20px 60px rgba(0,0,0,0.5)` : "none",
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 h-[2px] transition-all duration-500"
        style={{
          width: isActive ? "100%" : "0%",
          background: `linear-gradient(to right, ${color}, transparent)`,
          boxShadow: `0 0 10px ${color}`,
        }}
      />

      {/* Number badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="font-mono text-[9px] tracking-[0.25em] font-bold"
          style={{ color: isActive ? color : "rgba(255,255,255,0.25)", transition: "color 0.3s ease" }}
        >
          [{String(idx + 1).padStart(2, "0")}]
        </span>
        <Waveform active={isActive} />
      </div>

      {/* Avatar + name */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="size-10 rounded-sm flex items-center justify-center font-mono font-bold text-sm flex-shrink-0"
          style={{
            background: `${color}18`,
            border: `1px solid ${color}40`,
            color,
            transition: "all 0.3s ease",
          }}
        >
          {t.avatarLetter}
        </div>
        <div>
          <p
            className="font-mono text-[11px] font-bold tracking-wide"
            style={{ color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)", transition: "color 0.3s ease" }}
          >
            {t.client}
          </p>
          <p className="font-mono text-[9px] text-white/30 tracking-wide">
            {t.role} — {t.company}
          </p>
        </div>
      </div>

      {/* Quote snippet */}
      <p
        className="text-[11px] sm:text-xs font-normal leading-relaxed line-clamp-3"
        style={{
          color: isActive ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.3)",
          transition: "color 0.3s ease",
        }}
      >
        "{t.quote.slice(0, 100)}…"
      </p>

      {/* Impact pill */}
      <div
        className="mt-4 inline-flex items-center gap-2 px-2.5 py-1"
        style={{
          borderRadius: "2px",
          border: `1px solid ${isActive ? color + "40" : "rgba(255,255,255,0.06)"}`,
          background: isActive ? `${color}0a` : "transparent",
          transition: "all 0.3s ease",
        }}
      >
        <span
          className="font-mono text-[8px] tracking-[0.2em] uppercase"
          style={{ color: isActive ? color : "rgba(255,255,255,0.25)", transition: "color 0.3s ease" }}
        >
          {t.impactMetric}
        </span>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [typing, setTyping] = useState(false);
  const [displayedQuote, setDisplayedQuote] = useState("");
  const [autoPlay, setAutoPlay] = useState(true);
  const t = testimonials[active]!;
  const avatarColors = ["#ccff00", "#38bdf8", "#fb923c", "#a78bfa"];
  const color = avatarColors[active % avatarColors.length]!;

  // Typewriter effect when testimonial changes
  useEffect(() => {
    setTyping(true);
    setDisplayedQuote("");
    let i = 0;
    const full = t.quote;
    const interval = window.setInterval(() => {
      i++;
      setDisplayedQuote(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(interval);
        setTyping(false);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [active, t.quote]);

  // Auto-advance
  useEffect(() => {
    if (!autoPlay) return;
    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(id);
  }, [autoPlay]);

  const handleSelect = (idx: number) => {
    setAutoPlay(false);
    setActive(idx);
    sounds.play("pop");
  };

  return (
    <section
      className="relative overflow-hidden border-t border-white/10"
      style={{
        background: "oklch(0.10 0.012 255)",
        padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,5vw,5rem)",
      }}
    >
      {/* Ambient glow that changes with testimonial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 50% 60% at 20% 50%, ${color}08, transparent 70%)`,
        }}
      />

      {/* Film grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── HEADER ── */}
      <div className="flex flex-wrap items-end justify-between gap-8 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="h-px w-10 transition-all duration-500"
              style={{ background: color }}
            />
            <p
              className="eyebrow transition-colors duration-500"
              style={{ color }}
            >
              VERIFIED REPUTATION
            </p>
          </div>
          <h2 className="display fluid-lg tracking-tight leading-[0.9] text-white/95">
            VOICES OF <br />
            <span
              className="font-serif italic font-normal lowercase transition-colors duration-500"
              style={{ color }}
            >
              the founders.
            </span>
          </h2>
        </div>

        {/* Auto-play toggle + counter */}
        <div className="flex flex-col items-end gap-3">
          <button
            type="button"
            onClick={() => setAutoPlay((p) => !p)}
            className="flex items-center gap-2 font-mono text-[9px] tracking-widest uppercase transition-all duration-300"
            style={{ color: autoPlay ? color : "rgba(255,255,255,0.3)" }}
          >
            <span
              className="size-1.5 rounded-full"
              style={{
                background: autoPlay ? color : "rgba(255,255,255,0.3)",
                boxShadow: autoPlay ? `0 0 8px ${color}` : "none",
                animation: autoPlay ? "pulse 1.5s infinite" : "none",
              }}
            />
            {autoPlay ? "LIVE MODE" : "PAUSED"}
          </button>

          <p className="font-mono text-[9px] text-white/25">
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="grid gap-4 lg:grid-cols-12 items-start">

        {/* Left: thumbnail selector cards stack */}
        <div className="lg:col-span-4 grid gap-3">
          {testimonials.map((item, idx) => (
            <TestiCard
              key={idx}
              t={item}
              idx={idx}
              isActive={idx === active}
              onClick={() => handleSelect(idx)}
            />
          ))}
        </div>

        {/* Right: expanded active quote panel */}
        <div className="lg:col-span-8 sticky top-24">
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: "2px",
              border: `1px solid ${color}30`,
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(24px)",
              padding: "clamp(1.75rem,4vw,3rem)",
              boxShadow: `0 0 80px ${color}0a, 0 40px 80px rgba(0,0,0,0.6)`,
              transition: "border-color 0.6s ease, box-shadow 0.6s ease",
            }}
          >
            {/* Corner accents */}
            {[
              { top: "1rem", left: "1rem", borderTop: true, borderLeft: true },
              { top: "1rem", right: "1rem", borderTop: true, borderRight: true },
              { bottom: "1rem", left: "1rem", borderBottom: true, borderLeft: true },
              { bottom: "1rem", right: "1rem", borderBottom: true, borderRight: true },
            ].map((pos, i) => (
              <div
                key={i}
                className="pointer-events-none absolute z-10 size-5 transition-all duration-500"
                style={{
                  ...pos,
                  borderTop: pos.borderTop ? `1.5px solid ${color}60` : undefined,
                  borderBottom: pos.borderBottom ? `1.5px solid ${color}60` : undefined,
                  borderLeft: pos.borderLeft ? `1.5px solid ${color}60` : undefined,
                  borderRight: pos.borderRight ? `1.5px solid ${color}60` : undefined,
                }}
              />
            ))}

            {/* Top bar */}
            <div
              className="flex items-center justify-between mb-8 pb-5 border-b"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-[9px] tracking-[0.25em] uppercase px-2.5 py-1"
                  style={{
                    color,
                    border: `1px solid ${color}40`,
                    borderRadius: "2px",
                    background: `${color}0a`,
                    transition: "all 0.5s ease",
                  }}
                >
                  VERIFIED IMPACT
                </span>
                <span
                  className="font-mono text-[9px] tracking-widest text-white/40"
                  style={{ transition: "color 0.5s ease" }}
                >
                  {t.impactMetric}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] text-white/25">AUDIO LOG</span>
                <Waveform active={true} />
              </div>
            </div>

            {/* Big opening glyph */}
            <div
              className="font-serif text-7xl leading-none mb-2 block"
              style={{
                color,
                opacity: 0.6,
                filter: `drop-shadow(0 0 20px ${color}40)`,
                transition: "color 0.5s ease, filter 0.5s ease",
              }}
              aria-hidden="true"
            >
              "
            </div>

            {/* Typewriter quote */}
            <blockquote>
              <p
                className="font-light leading-relaxed text-white/85"
                style={{ fontSize: "clamp(1.05rem,2vw,1.45rem)" }}
              >
                {displayedQuote}
                {typing && (
                  <span
                    className="inline-block w-[2px] h-[1.1em] ml-[2px] align-text-bottom animate-pulse"
                    style={{ background: color, borderRadius: "1px" }}
                  />
                )}
              </p>

              {/* Attribution */}
              <footer className="mt-10 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  {/* Square avatar */}
                  <div
                    className="size-12 flex items-center justify-center font-mono font-bold text-lg flex-shrink-0"
                    style={{
                      borderRadius: "2px",
                      background: `${color}18`,
                      border: `1px solid ${color}50`,
                      color,
                      boxShadow: `0 0 20px ${color}20`,
                      transition: "all 0.5s ease",
                    }}
                  >
                    {t.avatarLetter}
                  </div>
                  <div>
                    <div
                      className="flex items-center gap-2 font-bold text-white/90 text-sm"
                    >
                      {t.client}
                      <span
                        className="size-4 inline-flex items-center justify-center"
                        style={{
                          borderRadius: "2px",
                          background: `${color}22`,
                          border: `1px solid ${color}50`,
                        }}
                      >
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                          <path d="M2 5.5l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-white/40 mt-0.5">
                      {t.role} — {t.company}
                    </div>
                  </div>
                </div>

                {/* Dot nav */}
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelect(i)}
                      aria-label={`Testimonial ${i + 1}`}
                      className="transition-all duration-400"
                      style={{
                        width: i === active ? "28px" : "8px",
                        height: "3px",
                        borderRadius: "2px",
                        background: i === active ? color : "rgba(255,255,255,0.2)",
                        boxShadow: i === active ? `0 0 8px ${color}` : "none",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                      }}
                    />
                  ))}
                </div>
              </footer>
            </blockquote>

            {/* Progress bar at bottom */}
            {autoPlay && (
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden"
                style={{ borderRadius: "0 0 2px 2px" }}
              >
                <div
                  className="h-full"
                  key={active}
                  style={{
                    background: `linear-gradient(to right, ${color}, ${color}60)`,
                    boxShadow: `0 0 8px ${color}`,
                    animation: "progress-bar 7s linear forwards",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress-bar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
