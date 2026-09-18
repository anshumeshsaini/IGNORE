import { useState, useRef, useEffect, useCallback } from "react";
import studioCraftImg from "@/assets/studio-craft.jpg";
import { sounds } from "@/lib/sound";

// Generate a static noise texture once on client (SSR-safe)
function generateNoiseSrc(): string {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 180;
    canvas.height = 180;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    const imageData = ctx.createImageData(180, 180);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.floor(Math.random() * 255);
      data[i] = data[i + 1] = data[i + 2] = v;
      data[i + 3] = 22;
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  } catch {
    return "";
  }
}

// Shared noise src — generated once after first mount, reused for all cards
let cachedNoiseSrc = "";

function NoiseOverlay() {
  const [src, setSrc] = useState("");
  useEffect(() => {
    if (!cachedNoiseSrc) cachedNoiseSrc = generateNoiseSrc();
    setSrc(cachedNoiseSrc);
  }, []);
  if (!src) return null;
  return (
    <img
      src={src}
      className="pointer-events-none absolute inset-0 size-full opacity-25 mix-blend-overlay select-none"
      aria-hidden="true"
      style={{ objectFit: "cover" }}
      draggable={false}
      alt=""
    />
  );
}

interface Principle {
  id: string;
  number: string;
  tag: string;
  title: string;
  subTitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  colorVar: string;
  glyph: string;
}

const PRINCIPLES: Principle[] = [
  {
    id: "taste",
    number: "01",
    tag: "IRREPLACEABLE INTUITION",
    title: "TASTE >",
    subTitle: "ALGORITHM",
    description:
      "Generative AI can only regurgitate the statistical average of what already exists. Our work is born from cultural tension, real lived friction, and irrational obsessions that no LLM prompt can anticipate.",
    metric: "4.8×",
    metricLabel: "Higher brand recall vs AI templates",
    colorVar: "#ccff00",
    glyph: "◈",
  },
  {
    id: "texture",
    number: "02",
    tag: "ORGANIC IMPERFECTION",
    title: "TACTILE",
    subTitle: "TEXTURE",
    description:
      "Plastic, over-smoothed digital assets breed indifference. We deliberately introduce grain, micro-delays, and analog warmth into every frame so the audience feels human presence.",
    metric: "60fps",
    metricLabel: "Bespoke hardware-accelerated physics",
    colorVar: "#38bdf8",
    glyph: "◇",
  },
  {
    id: "gravity",
    number: "03",
    tag: "CULTURAL WEIGHT",
    title: "EMOTIONAL",
    subTitle: "GRAVITY",
    description:
      "Safe design is the most expensive mistake in modern business. We build brands with sharp edges, unmistakable points of view, and memorable audacity that force competitors into defense.",
    metric: "+312%",
    metricLabel: "Verified revenue lift on flagship launches",
    colorVar: "#fb923c",
    glyph: "◉",
  },
  {
    id: "code",
    number: "04",
    tag: "ZERO TEMPLATES",
    title: "SUB-PIXEL",
    subTitle: "CODE",
    description:
      "We reject bloated page builders and generic AI component dumps. Our interfaces are custom-engineered from raw HTML, CSS shaders, and bespoke motion timelines.",
    metric: "0.0%",
    metricLabel: "Third-party template contamination",
    colorVar: "#ccff00",
    glyph: "◆",
  },
];

// Scramble text hook
function useScramble(text: string, active: boolean) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }
    let iter = 0;
    const interval = window.setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < iter) return text[i]!;
            return CHARS[Math.floor(Math.random() * CHARS.length)]!;
          })
          .join("")
      );
      if (iter >= text.length) clearInterval(interval);
      iter += 0.6;
    }, 30);
    return () => clearInterval(interval);
  }, [active, text]);

  return display;
}

// Glitch flicker text
function GlitchText({ children, active }: { children: string; active: boolean }) {
  const scrambled = useScramble(children, active);
  return <span data-text={children}>{scrambled}</span>;
}


export function HumanManifesto() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const leftSquareRef = useRef<HTMLDivElement>(null);

  const active = PRINCIPLES[activeIdx]!;

  // Scan line: use CSS animation to avoid JS timer overhead
  // (scanY state removed — CSS @keyframes "scan-y" in the component)

  // Mouse tracking for left square parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = leftSquareRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const handleSelect = (idx: number) => {
    if (idx !== activeIdx) {
      sounds.play("pop");
      setActiveIdx(idx);
    }
  };

  return (
    <section
      className="relative overflow-hidden border-t border-white/10 bg-[oklch(0.10_0.012_255)]"
      style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,5vw,5rem)" }}
    >
      {/* Full-section ambient radial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse 60% 50% at ${mousePos.x}% ${mousePos.y}%, ${active.colorVar}0d 0%, transparent 70%)`,
          transition: "background 1.2s ease",
        }}
      />

      {/* Film grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── HEADER ── */}
      <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex gap-1">
              <span className="size-1.5 rounded-full bg-acid animate-[pulse_1s_ease-in-out_infinite]" />
              <span className="size-1.5 rounded-full bg-acid animate-[pulse_1s_ease-in-out_infinite_200ms]" />
              <span className="size-1.5 rounded-full bg-acid animate-[pulse_1s_ease-in-out_infinite_400ms]" />
            </div>
            <p
              className="font-mono text-[0.62rem] tracking-[0.25em] uppercase"
              style={{ color: active.colorVar, transition: "color 0.5s ease" }}
            >
              ANTI-SLOP // PROTOCOL {active.number}
            </p>
          </div>

          <h2 className="display tracking-tight leading-[0.88]" style={{ fontSize: "clamp(2.4rem,6vw,6.5rem)" }}>
            <span className="block text-white/95">THE HUMAN</span>
            <span
              className="block font-serif italic font-normal lowercase"
              style={{ color: active.colorVar, transition: "color 0.5s ease" }}
            >
              manifesto.
            </span>
          </h2>
        </div>

        <p className="max-w-sm text-sm leading-relaxed text-white/50 font-normal">
          Four unbreakable axioms of human craftsmanship engineered to cut through the synthetic noise of the algorithmic web.
        </p>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid gap-6 lg:grid-cols-12 items-stretch">

        {/* ── LEFT: Square image viewer ── */}
        <div className="lg:col-span-5">
          <div
            ref={leftSquareRef}
            onMouseMove={handleMouseMove}
            className="relative aspect-square w-full overflow-hidden cursor-crosshair group"
            style={{
              borderRadius: "4px",
              border: `1px solid ${active.colorVar}30`,
              boxShadow: `0 0 60px ${active.colorVar}10, inset 0 0 60px rgba(0,0,0,0.4)`,
              transition: "border-color 0.5s ease, box-shadow 0.5s ease",
            }}
          >
            {/* Base image */}
            <img
              src={studioCraftImg}
              alt="Studio human craftsmanship"
              className="absolute inset-0 size-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-[1.04]"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

            {/* Scan line — CSS animated for GPU compositing */}
            <div
              className="pointer-events-none absolute left-0 right-0 z-20 h-px"
              style={{
                background: `linear-gradient(to right, transparent, ${active.colorVar}, transparent)`,
                boxShadow: `0 0 12px ${active.colorVar}`,
                opacity: 0.7,
                transition: "background 0.5s ease",
                animation: "scan-line-y 4s linear infinite",
              }}
              aria-hidden="true"
            />
            <style>{`
              @keyframes scan-line-y {
                0%   { top: 0%; }
                100% { top: 100%; }
              }
            `}</style>

            {/* Dynamic spotlight from mouse */}
            <div
              className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, ${active.colorVar}18, transparent 70%)`,
              }}
              aria-hidden="true"
            />

            {/* Corner brackets — top left */}
            <div
              className="pointer-events-none absolute top-4 left-4 z-30 size-8"
              style={{
                borderTop: `2px solid ${active.colorVar}`,
                borderLeft: `2px solid ${active.colorVar}`,
                transition: "border-color 0.5s ease",
              }}
            />
            {/* Corner brackets — top right */}
            <div
              className="pointer-events-none absolute top-4 right-4 z-30 size-8"
              style={{
                borderTop: `2px solid ${active.colorVar}`,
                borderRight: `2px solid ${active.colorVar}`,
                transition: "border-color 0.5s ease",
              }}
            />
            {/* Corner brackets — bottom left */}
            <div
              className="pointer-events-none absolute bottom-4 left-4 z-30 size-8"
              style={{
                borderBottom: `2px solid ${active.colorVar}`,
                borderLeft: `2px solid ${active.colorVar}`,
                transition: "border-color 0.5s ease",
              }}
            />
            {/* Corner brackets — bottom right */}
            <div
              className="pointer-events-none absolute bottom-4 right-4 z-30 size-8"
              style={{
                borderBottom: `2px solid ${active.colorVar}`,
                borderRight: `2px solid ${active.colorVar}`,
                transition: "border-color 0.5s ease",
              }}
            />

            {/* Top status bar */}
            <div className="absolute top-5 left-14 right-14 z-30 flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-widest text-white/40">
                RETICLE {active.number} // {active.tag}
              </span>
              <span className="font-mono text-[9px] tracking-widest text-white/40">
                LIVE ●
              </span>
            </div>

            {/* Center floating icon / glyph */}
            <div className="absolute inset-0 z-30 flex items-center justify-center">
              <div
                className="flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-500"
                style={{
                  width: 120,
                  height: 120,
                  border: `1px solid ${active.colorVar}50`,
                  background: "rgba(0,0,0,0.65)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "2px",
                  transition: "border-color 0.5s ease",
                }}
              >
                <span
                  className="text-4xl leading-none"
                  style={{
                    color: active.colorVar,
                    filter: `drop-shadow(0 0 12px ${active.colorVar})`,
                    transition: "color 0.5s ease, filter 0.5s ease",
                  }}
                >
                  {active.glyph}
                </span>
                <span
                  className="mt-2 font-mono text-[9px] tracking-[0.3em] uppercase"
                  style={{ color: active.colorVar, opacity: 0.8, transition: "color 0.5s ease" }}
                >
                  {active.id}
                </span>
              </div>
            </div>

            {/* Bottom data ribbon */}
            <div
              className="absolute bottom-5 left-5 right-5 z-30 flex items-center justify-between px-4 py-3"
              style={{
                background: "rgba(0,0,0,0.85)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "2px",
                backdropFilter: "blur(12px)",
              }}
            >
              <div>
                <p className="font-mono text-[8px] text-white/40 tracking-widest mb-0.5">CRAFT STAT</p>
                <p
                  className="font-mono text-base font-bold"
                  style={{ color: active.colorVar, transition: "color 0.5s ease" }}
                >
                  {active.metric}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[8px] text-white/40 tracking-widest mb-0.5">VERIFIED</p>
                <p className="font-mono text-[10px] text-white/70">{active.metricLabel}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Selector + detail ── */}
        <div className="lg:col-span-7 flex flex-col gap-4">

          {/* 4 square selector tiles in a 2x2 grid */}
          <div className="grid grid-cols-2 gap-3">
            {PRINCIPLES.map((p, idx) => {
              const isActive = idx === activeIdx;
              const isHov = hovered === idx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  onMouseEnter={() => { sounds.play("hover"); setHovered(idx); }}
                  onMouseLeave={() => setHovered(null)}
                  className="relative text-left overflow-hidden transition-all duration-300 group"
                  style={{
                    aspectRatio: "1/0.62",
                    padding: "1.25rem",
                    borderRadius: "4px",
                    border: `1px solid ${isActive ? p.colorVar + "60" : "rgba(255,255,255,0.08)"}`,
                    background: isActive
                      ? `linear-gradient(135deg, ${p.colorVar}0f, transparent 70%)`
                      : isHov
                      ? "rgba(255,255,255,0.03)"
                      : "transparent",
                    boxShadow: isActive ? `0 0 30px ${p.colorVar}18` : "none",
                    transform: isActive ? "scale(1.01)" : "scale(1)",
                    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  {/* Noise texture */}
                  <NoiseOverlay />

                  {/* Top row */}
                  <div className="relative z-10 flex items-center justify-between mb-3">
                    <span
                      className="font-mono text-[9px] tracking-[0.25em] font-bold"
                      style={{
                        color: isActive ? p.colorVar : "rgba(255,255,255,0.35)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      [{p.number}]
                    </span>
                    <span
                      className="font-mono text-[9px] tracking-widest"
                      style={{
                        color: isActive ? p.colorVar : "rgba(255,255,255,0.2)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {p.glyph}
                    </span>
                  </div>

                  {/* Title lines */}
                  <div className="relative z-10">
                    <p
                      className="font-mono text-[8px] tracking-[0.2em] uppercase mb-1"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {p.tag}
                    </p>
                    <h4
                      className="display text-base leading-tight"
                      style={{
                        color: isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      <GlitchText active={isActive}>{p.title}</GlitchText>
                    </h4>
                    <h4
                      className="display text-base leading-tight"
                      style={{
                        color: isActive ? p.colorVar : "rgba(255,255,255,0.4)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {p.subTitle}
                    </h4>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 h-[2px] w-full"
                      style={{
                        background: `linear-gradient(to right, ${p.colorVar}, transparent)`,
                        boxShadow: `0 0 8px ${p.colorVar}`,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active detail panel — square-ish */}
          <div
            className="flex-1 relative overflow-hidden"
            style={{
              borderRadius: "4px",
              border: `1px solid ${active.colorVar}25`,
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(20px)",
              padding: "clamp(1.25rem,3vw,2rem)",
              minHeight: 220,
              transition: "border-color 0.5s ease",
            }}
          >
            {/* Animated top accent line */}
            <div
              className="absolute top-0 left-0 h-[2px]"
              style={{
                width: "100%",
                background: `linear-gradient(to right, ${active.colorVar}, ${active.colorVar}40, transparent)`,
                boxShadow: `0 0 10px ${active.colorVar}`,
                transition: "background 0.5s ease",
              }}
            />

            {/* Tag pill */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="font-mono text-[9px] tracking-[0.25em] px-2.5 py-1 uppercase"
                style={{
                  color: active.colorVar,
                  border: `1px solid ${active.colorVar}40`,
                  borderRadius: "2px",
                  background: `${active.colorVar}0d`,
                  transition: "all 0.5s ease",
                }}
              >
                {active.tag}
              </span>
            </div>

            {/* Headline */}
            <h3
              className="display leading-none mb-4"
              style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)", color: "rgba(255,255,255,0.95)" }}
            >
              {active.title}{" "}
              <span
                style={{ color: active.colorVar, transition: "color 0.5s ease" }}
              >
                {active.subTitle}
              </span>
            </h3>

            <p className="text-sm font-normal leading-relaxed text-white/60 mb-6">
              {active.description}
            </p>

            {/* Bottom metric row */}
            <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-4">
                <span
                  className="display text-3xl"
                  style={{
                    color: active.colorVar,
                    filter: `drop-shadow(0 0 16px ${active.colorVar}80)`,
                    transition: "color 0.5s ease",
                  }}
                >
                  {active.metric}
                </span>
                <span className="font-mono text-[9px] text-white/40 max-w-[120px] leading-relaxed uppercase tracking-wide">
                  {active.metricLabel}
                </span>
              </div>

              <div
                className="font-mono text-[9px] tracking-widest"
                style={{ color: `${active.colorVar}80`, transition: "color 0.5s ease" }}
              >
                {active.number} / 04
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
