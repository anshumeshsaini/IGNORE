import { useState, useRef, useEffect, useCallback } from "react";
import { SplitLines } from "../Reveal";
import studio1 from "@/assets/studio-1.jpg";
import studio2 from "@/assets/studio-2.jpg";
import { sounds } from "@/lib/sound";

interface Pillar {
  number: string;
  title: string;
  tag: string;
  desc: string;
  stat: string;
  unit: string;
  colorVar: string;
  glyph: string;
}

const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "Senior-Only Force",
    tag: "ZERO INTERNS",
    desc: "The creative strategist who leads your discovery is the director in the edit suite and the engineer reviewing git commits.",
    stat: "14",
    unit: "SENIORS ONLY",
    colorVar: "#ccff00",
    glyph: "▣",
  },
  {
    number: "02",
    title: "Zero Outsourcing",
    tag: "IN-HOUSE PURITY",
    desc: "Every frame of 35mm film, WebGL shader, and dollar of paid media architecture is engineered directly inside our atelier.",
    stat: "100%",
    unit: "IN-HOUSE",
    colorVar: "#38bdf8",
    glyph: "▤",
  },
  {
    number: "03",
    title: "Unit-Level Math",
    tag: "PROFIT > APPLAUSE",
    desc: "We calibrate every aesthetic decision against gross margin, customer payback velocity, and enterprise valuation lift.",
    stat: "4.8×",
    unit: "BLENDED ROI",
    colorVar: "#fb923c",
    glyph: "▦",
  },
  {
    number: "04",
    title: "Sub-Pixel Nuance",
    tag: "OBSESSION AS WEAPON",
    desc: "The micro-second audio trigger, tactile curve of magnetic drag, the exact lighting falloff. We sweat the details that build subconscious prestige.",
    stat: "60fps",
    unit: "GUARANTEED",
    colorVar: "#ccff00",
    glyph: "▩",
  },
];

// Animated counter hook
function useCounter(target: string, active: boolean) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!active) return;
    const num = parseFloat(target.replace(/[^\d.]/g, ""));
    if (isNaN(num)) { setDisplay(target); return; }
    const suffix = target.replace(/[\d.]/g, "");
    let start = 0;
    const steps = 30;
    const step = num / steps;
    let count = 0;
    const id = window.setInterval(() => {
      count++;
      start += step;
      const val = count >= steps ? num : start;
      setDisplay(
        (val % 1 === 0 ? Math.round(val) : val.toFixed(1)).toString() + suffix
      );
      if (count >= steps) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [active, target]);

  return display;
}

// Pillar card with square shape and hover effects
function PillarCard({ p, idx }: { p: Pillar; idx: number }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);
  const counterVal = useCounter(p.stat, hovered);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => { sounds.play("hover"); setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden cursor-default"
      style={{
        borderRadius: "2px",
        border: `1px solid ${hovered ? p.colorVar + "50" : "rgba(255,255,255,0.07)"}`,
        background: hovered
          ? `linear-gradient(135deg, ${p.colorVar}08 0%, rgba(0,0,0,0.5) 100%)`
          : "rgba(255,255,255,0.015)",
        padding: "clamp(1rem,2.5vw,1.5rem)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease",
        boxShadow: hovered ? `0 0 40px ${p.colorVar}10` : "none",
      }}
    >
      {/* Mouse spotlight */}
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle 120px at ${mousePos.x}% ${mousePos.y}%, ${p.colorVar}14, transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 h-[1.5px] transition-all duration-500"
        style={{
          width: hovered ? "100%" : "0%",
          background: `linear-gradient(to right, ${p.colorVar}, transparent)`,
          boxShadow: `0 0 8px ${p.colorVar}`,
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-auto">
        <span
          className="font-mono text-[9px] tracking-[0.25em] font-bold"
          style={{
            color: hovered ? p.colorVar : "rgba(255,255,255,0.3)",
            transition: "color 0.3s ease",
          }}
        >
          [{p.number}]
        </span>
        <span
          className="text-lg leading-none transition-all duration-300"
          style={{
            color: hovered ? p.colorVar : "rgba(255,255,255,0.15)",
            filter: hovered ? `drop-shadow(0 0 8px ${p.colorVar})` : "none",
          }}
        >
          {p.glyph}
        </span>
      </div>

      {/* Body */}
      <div className="relative z-10 mt-4 mb-4">
        <p
          className="font-mono text-[8px] tracking-[0.2em] uppercase mb-2"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {p.tag}
        </p>
        <h4
          className="display text-base sm:text-lg leading-tight mb-2"
          style={{
            color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
            transition: "color 0.3s ease",
          }}
        >
          {p.title}
        </h4>
        <p
          className="text-[11px] leading-relaxed font-normal"
          style={{
            color: hovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)",
            transition: "color 0.3s ease",
          }}
        >
          {p.desc}
        </p>
      </div>

      {/* Stat footer */}
      <div
        className="relative z-10 flex items-end justify-between border-t pt-3"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div>
          <span
            className="display text-2xl font-bold block leading-none"
            style={{
              color: p.colorVar,
              filter: hovered ? `drop-shadow(0 0 12px ${p.colorVar}80)` : "none",
              transition: "filter 0.3s ease",
            }}
          >
            {hovered ? counterVal : p.stat}
          </span>
          <span
            className="font-mono text-[8px] tracking-[0.2em] block mt-0.5"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            {p.unit}
          </span>
        </div>

        {/* Animated bars */}
        <div className="flex items-end gap-0.5 h-6">
          {[4, 7, 5, 9, 6, 8, 5].map((h, i) => (
            <div
              key={i}
              className="w-0.5 rounded-sm"
              style={{
                height: hovered ? `${h * 3}px` : "3px",
                background: p.colorVar,
                opacity: hovered ? 0.8 : 0.2,
                transition: `height ${0.3 + i * 0.05}s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease`,
                transitionDelay: `${i * 30}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Square image panel with lens overlay
function SquareImagePanel({
  src,
  alt,
  label,
  sublabel,
}: {
  src: string;
  alt: string;
  label: string;
  sublabel: string;
}) {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [entered, setEntered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => { sounds.play("hover"); setEntered(true); }}
      onMouseLeave={() => setEntered(false)}
      className="relative overflow-hidden group cursor-crosshair"
      style={{
        borderRadius: "2px",
        border: `1px solid ${entered ? "rgba(204,255,0,0.35)" : "rgba(255,255,255,0.07)"}`,
        boxShadow: entered ? "0 0 50px rgba(204,255,0,0.08)" : "none",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-[1.04]"
        style={{ display: "block" }}
      />

      {/* Dark wash */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Mouse spotlight */}
      {entered && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle 150px at ${mouse.x}% ${mouse.y}%, rgba(204,255,0,0.12), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Corner brackets */}
      {[
        { top: "1rem", left: "1rem", borderTop: true, borderLeft: true },
        { top: "1rem", right: "1rem", borderTop: true, borderRight: true },
        { bottom: "4.5rem", left: "1rem", borderBottom: true, borderLeft: true },
        { bottom: "4.5rem", right: "1rem", borderBottom: true, borderRight: true },
      ].map((pos, i) => (
        <div
          key={i}
          className="pointer-events-none absolute z-20 size-5 transition-all duration-500"
          style={{
            ...pos,
            borderTop: pos.borderTop ? `1.5px solid ${entered ? "#ccff00" : "rgba(255,255,255,0.3)"}` : undefined,
            borderBottom: pos.borderBottom ? `1.5px solid ${entered ? "#ccff00" : "rgba(255,255,255,0.3)"}` : undefined,
            borderLeft: pos.borderLeft ? `1.5px solid ${entered ? "#ccff00" : "rgba(255,255,255,0.3)"}` : undefined,
            borderRight: pos.borderRight ? `1.5px solid ${entered ? "#ccff00" : "rgba(255,255,255,0.3)"}` : undefined,
          }}
        />
      ))}

      {/* Lens reticle follows mouse */}
      {entered && (
        <div
          className="pointer-events-none absolute z-30 size-14 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${mouse.x}%`,
            top: `${mouse.y}%`,
            border: "1px solid rgba(204,255,0,0.7)",
            borderRadius: "50%",
            boxShadow: "0 0 12px rgba(204,255,0,0.4)",
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-1 rounded-full bg-acid/80" />
          </div>
          {/* crosshair lines */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-acid/40 -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-acid/40 -translate-x-1/2" />
        </div>
      )}

      {/* Bottom label */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 px-4 py-3 flex items-center justify-between"
        style={{
          background: "rgba(0,0,0,0.8)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="size-1.5 rounded-full"
            style={{ background: entered ? "#ccff00" : "rgba(255,255,255,0.3)", transition: "background 0.3s" }}
          />
          <span className="font-mono text-[9px] tracking-widest text-white/60 uppercase">{label}</span>
        </div>
        <span className="font-mono text-[9px] text-white/30">{sublabel}</span>
      </div>
    </div>
  );
}

export function AboutBlock() {
  return (
    <section
      className="relative overflow-hidden border-t border-white/10 bg-[oklch(0.09_0.012_255)]"
      style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,5vw,5rem)" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[55vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── HEADER ── */}
      <div className="flex flex-wrap items-end justify-between gap-8 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-acid/60" />
            <p className="eyebrow text-acid">(THE ATELIER BLUEPRINT)</p>
          </div>
          <SplitLines
            text={"SQUARE RIGOR.\nZERO HANDOFFS."}
            className="display fluid-lg tracking-tight"
          />
        </div>
        <p className="max-w-sm text-sm text-white/40 font-normal leading-relaxed">
          We operate like a bespoke special forces design and engineering unit: hyper-agile, radically candid, and completely obsessed with cultural dominance.
        </p>
      </div>

      {/* ── MAIN LAYOUT ── */}
      {/* Top row: 2 square images side by side */}
      <div className="grid grid-cols-2 gap-4 mb-4" style={{ height: "clamp(200px,35vw,400px)" }}>
        <SquareImagePanel
          src={studio1}
          alt="Studio production environment"
          label="THE ATELIER // LIVE"
          sublabel="RAW 35MM"
        />
        <SquareImagePanel
          src={studio2}
          alt="Creative workspace"
          label="PRODUCTION LAB"
          sublabel="F/1.4 · ISO 100"
        />
      </div>

      {/* Bottom row: 4 square pillar cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ minHeight: "clamp(240px,30vw,340px)" }}>
        {PILLARS.map((p, idx) => (
          <PillarCard key={p.number} p={p} idx={idx} />
        ))}
      </div>

      {/* ── Bottom statement ── */}
      <div
        className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t pt-8"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <p className="font-mono text-[11px] tracking-[0.18em] text-white/30 uppercase">
          IGNITION STUDIO // EST. MMXXII // BANGALORE, IND
        </p>
        <div className="flex items-center gap-3">
          <span className="size-1.5 rounded-full bg-acid animate-pulse" />
          <span className="font-mono text-[11px] tracking-[0.18em] text-acid uppercase">
            CURRENTLY OPEN FOR COMMISSIONS
          </span>
        </div>
      </div>
    </section>
  );
}
