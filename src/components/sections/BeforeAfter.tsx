import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeftRight, CheckCircle2, XCircle } from "lucide-react";

export function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPos(clamped);
  }, []);

  const onPointerDown = () => {
    isDragging.current = true;
  };

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      handleMove(e.clientX);
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [handleMove]);

  return (
    <section
      aria-label="Before and After Transformation"
      className="relative overflow-hidden border-b border-border bg-[#09090b] py-24 md:py-36"
    >
      <div className="edge">
        {/* Header */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <p className="eyebrow text-acid font-mono tracking-[0.25em]">
              (STRATEGIC SHIFT // 002)
            </p>
            <h2 className="display mt-3 text-4xl leading-tight md:text-6xl">
              TRANSFORMING INTENT INTO INFRASTRUCTURE.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="eyebrow font-mono text-xs text-muted-foreground">
              DRAG OR CLICK TO COMPARE:
            </span>
            <div className="flex gap-1.5 font-mono text-xs">
              <button
                type="button"
                onClick={() => setSliderPos(15)}
                className={`border px-2.5 py-1 transition-colors ${
                  sliderPos < 35
                    ? "border-acid bg-acid text-ink font-bold"
                    : "border-border text-foreground/70 hover:border-foreground"
                }`}
              >
                BEFORE
              </button>
              <button
                type="button"
                onClick={() => setSliderPos(50)}
                className={`border px-2.5 py-1 transition-colors ${
                  sliderPos >= 35 && sliderPos <= 65
                    ? "border-acid bg-acid text-ink font-bold"
                    : "border-border text-foreground/70 hover:border-foreground"
                }`}
              >
                50/50
              </button>
              <button
                type="button"
                onClick={() => setSliderPos(85)}
                className={`border px-2.5 py-1 transition-colors ${
                  sliderPos > 65
                    ? "border-acid bg-acid text-ink font-bold"
                    : "border-border text-foreground/70 hover:border-foreground"
                }`}
              >
                AFTER
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Draggable Box */}
        <div
          ref={containerRef}
          data-cursor="drag"
          onPointerDown={onPointerDown}
          onClick={(e) => handleMove(e.clientX)}
          className="relative min-h-[560px] w-full select-none overflow-hidden border border-border bg-[#101014] md:min-h-[500px]"
        >
          {/* AFTER SIDE (Full width base) */}
          <div className="absolute inset-0 flex flex-col justify-between bg-[#12140d] p-8 md:p-14">
            <div className="flex items-center justify-between border-b border-acid/20 pb-4">
              <span className="display flex items-center gap-2 text-xl tracking-wider text-acid md:text-2xl">
                <CheckCircle2 className="size-5 text-acid" />
                AFTER // THE UNIGNORABLE ENGINE
              </span>
              <span className="eyebrow font-mono text-xs text-acid">
                [COMPOUNDING BRAND ADVANTAGE]
              </span>
            </div>

            <div className="my-auto py-8">
              <p className="eyebrow font-mono text-xs tracking-widest text-acid/80">
                THE REFRAMED MANDATE:
              </p>
              <h3 className="display mt-3 fluid-md leading-none text-foreground">
                &ldquo;WE NEED A SYSTEM THAT CREATES DEMAND.&rdquo;
              </h3>
              <p className="mt-4 max-w-xl text-sm font-mono leading-relaxed text-foreground/80">
                Media buying unified with provocative creative direction. Organic recall eliminates sensitivity to algorithm fluctuations, turning customer acquisition into a predictable mathematical growth lever.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-acid/20 pt-6 sm:grid-cols-3">
                <div>
                  <p className="display text-2xl text-acid md:text-3xl">+280%</p>
                  <p className="eyebrow mt-1 text-[11px] text-muted-foreground">Organic Lift</p>
                </div>
                <div>
                  <p className="display text-2xl text-acid md:text-3xl">-38%</p>
                  <p className="eyebrow mt-1 text-[11px] text-muted-foreground">Blended CAC</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="display text-2xl text-acid md:text-3xl">4.8×</p>
                  <p className="eyebrow mt-1 text-[11px] text-muted-foreground">LTV Payback Velocity</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-xs text-acid/60">
              <span>UNIGNORABLE PARADIGM</span>
              <span>SCALABLE • RESILIENT • PROFITABLE</span>
            </div>
          </div>

          {/* BEFORE SIDE (Clipped overlay) */}
          <div
            className="absolute inset-0 flex flex-col justify-between bg-[#18181c] p-8 md:p-14"
            style={{
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            }}
          >
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="display flex items-center gap-2 text-xl tracking-wider text-muted-foreground md:text-2xl">
                <XCircle className="size-5 text-destructive" />
                BEFORE // CONVENTIONAL AGENCY TRAP
              </span>
              <span className="eyebrow font-mono text-xs text-muted-foreground">
                [COMMODITIZED NOISE]
              </span>
            </div>

            <div className="my-auto py-8">
              <p className="eyebrow font-mono text-xs tracking-widest text-destructive">
                THE DESPERATION BRIEF:
              </p>
              <h3 className="display mt-3 fluid-md leading-none text-foreground/60">
                &ldquo;WE NEED MORE CUSTOMERS.&rdquo;
              </h3>
              <p className="mt-4 max-w-xl text-sm font-mono leading-relaxed text-muted-foreground">
                Running disjointed ads with identical templates. Burning media budget on vanity clicks, paying for your own brand search, and suffering margin erosion every time ad auctions spike.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-3">
                <div>
                  <p className="display text-2xl text-foreground/40 md:text-3xl">FLAT</p>
                  <p className="eyebrow mt-1 text-[11px] text-muted-foreground">Brand Recall</p>
                </div>
                <div>
                  <p className="display text-2xl text-destructive md:text-3xl">+64%</p>
                  <p className="eyebrow mt-1 text-[11px] text-muted-foreground">Ad Waste</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="display text-2xl text-foreground/40 md:text-3xl">0.0</p>
                  <p className="eyebrow mt-1 text-[11px] text-muted-foreground">Competitive Moat</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
              <span>LEGACY PARADIGM</span>
              <span>BURNING CASH • UNMEMORABLE</span>
            </div>
          </div>

          {/* Draggable Divider Handle */}
          <div
            className="absolute bottom-0 top-0 z-20 flex -translate-x-1/2 items-center justify-center pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Vertical Laser Divider Line */}
            <div className="h-full w-[2px] bg-acid shadow-[0_0_12px_var(--acid)]" />

            {/* Center Pill Handle */}
            <div className="absolute flex size-11 items-center justify-center rounded-full border-2 border-acid bg-ink text-acid shadow-[0_0_20px_rgba(204,255,0,0.5)]">
              <ArrowLeftRight className="size-4 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
