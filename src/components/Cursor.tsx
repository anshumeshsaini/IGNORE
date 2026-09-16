import { useEffect, useRef } from "react";
import { usePointerFine } from "@/hooks/usePointerFine";
import { sounds } from "@/lib/sound";

/**
 * Desktop-only luxury custom cursor with dual-layer physics (core dot + trailing ring)
 * and interactive sound micro-feedback.
 */
export function Cursor() {
  const fine = usePointerFine();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const lastMode = useRef<string>("default");

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("cursor-none-desktop");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const lbl = labelRef.current;
    if (!dot || !ring || !lbl) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let dotX = targetX;
    let dotY = targetY;
    let ringX = targetX;
    let ringY = targetY;
    let raf = 0;
    let isDown = false;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const mode = target?.dataset["cursor"] ?? "default";

      if (mode !== lastMode.current) {
        lastMode.current = mode;
        ring.dataset["mode"] = mode;
        dot.dataset["mode"] = mode;

        if (mode !== "default") {
          sounds.play("hover");
        }

        switch (mode) {
          case "view":
            lbl.textContent = "VIEW CASE";
            break;
          case "explore":
            lbl.textContent = "EXPLORE";
            break;
          case "cta":
            lbl.textContent = "LET'S TALK";
            break;
          case "sound":
            lbl.textContent = "SOUND";
            break;
          case "drag":
            lbl.textContent = "DRAG";
            break;
          default:
            lbl.textContent = "";
            break;
        }
      }
    };

    const onPointerDown = () => {
      isDown = true;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(0.85)`;
      sounds.play("click");
    };

    const onPointerUp = () => {
      isDown = false;
    };

    const loop = () => {
      // Instant crisp follower for precision center dot
      dotX += (targetX - dotX) * 0.45;
      dotY += (targetY - dotY) * 0.45;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

      // Smooth buttery lag for fluid outer ring
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      if (!isDown) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        data-mode="default"
        className="pointer-events-none fixed left-0 top-0 z-[75] size-2 rounded-full bg-acid shadow-[0_0_10px_rgba(204,255,0,0.8)] transition-[opacity,transform] duration-150 data-[mode=cta]:opacity-0 data-[mode=view]:opacity-0 data-[mode=explore]:opacity-0"
      />

      {/* Fluid Interactive Trailing Aura Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        data-mode="default"
        className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full border border-acid/50 text-[10px] font-mono font-bold tracking-[0.18em] transition-[width,height,background-color,border-color] duration-300 ease-out
          size-8 bg-acid/10 backdrop-blur-[2px]
          data-[mode=cta]:size-24 data-[mode=cta]:bg-acid data-[mode=cta]:text-ink data-[mode=cta]:border-acid data-[mode=cta]:shadow-[0_0_30px_rgba(204,255,0,0.4)]
          data-[mode=view]:size-28 data-[mode=view]:bg-acid data-[mode=view]:text-ink data-[mode=view]:border-acid data-[mode=view]:shadow-[0_0_30px_rgba(204,255,0,0.4)]
          data-[mode=explore]:size-24 data-[mode=explore]:bg-acid data-[mode=explore]:text-ink data-[mode=explore]:border-acid data-[mode=explore]:shadow-[0_0_30px_rgba(204,255,0,0.4)]
          data-[mode=sound]:size-20 data-[mode=sound]:bg-cyan data-[mode=sound]:text-ink data-[mode=sound]:border-cyan
          data-[mode=drag]:size-20 data-[mode=drag]:bg-acid data-[mode=drag]:text-ink data-[mode=drag]:border-acid"
      >
        <span ref={labelRef} className="select-none text-center leading-none" />
      </div>
    </>
  );
}
