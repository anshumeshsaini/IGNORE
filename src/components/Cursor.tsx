import { useEffect, useRef, useState } from "react";
import { usePointerFine } from "@/hooks/usePointerFine";

type CursorMode =
  | "default"
  | "link"
  | "view"
  | "case-study"
  | "cta"
  | "drag"
  | "play";

export function Cursor() {
  const fine = usePointerFine();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [currentMode, setCurrentMode] = useState<CursorMode>("default");

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("cursor-none-desktop");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;
    let rafId = 0;

    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Identify closest cursor trigger
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, input, textarea, select",
      );

      let mode: CursorMode = "default";

      if (target) {
        const custom = target.dataset["cursor"] as CursorMode | undefined;
        if (custom) {
          mode = custom;
        } else if (
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.getAttribute("role") === "button"
        ) {
          mode = "link";
        }
      }

      setCurrentMode(mode);

      // Label text
      switch (mode) {
        case "view":
          label.innerHTML = "VIEW<br/>PROJECT";
          break;
        case "case-study":
          label.innerHTML = "VIEW<br/>CASE STUDY →";
          break;
        case "cta":
          label.innerHTML = "LET'S<br/>TALK →";
          break;
        case "drag":
          label.innerHTML = "DRAG<br/>↔";
          break;
        case "play":
          label.innerHTML = "PLAY<br/>▶";
          break;
        default:
          label.textContent = "";
      }
    };

    const loop = () => {
      // Fast tracking for core dot
      dotX += (mouseX - dotX) * 0.45;
      dotY += (mouseY - dotY) * 0.45;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

      // Fluid trailing lerp for ring / expanded aura
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [fine]);

  if (!fine) return null;

  const isExpanded = currentMode !== "default" && currentMode !== "link";
  const isLink = currentMode === "link";

  return (
    <>
      {/* Precision center dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[120] size-2 rounded-full bg-acid mix-blend-difference transition-opacity duration-200 ${
          isExpanded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Outer reactive ring / disc */}
      <div
        ref={ringRef}
        aria-hidden="true"
        data-mode={currentMode}
        className={`pointer-events-none fixed left-0 top-0 z-[119] flex items-center justify-center rounded-full text-center font-mono leading-tight tracking-widest text-ink transition-[width,height,background-color,border-color,opacity] duration-300 ease-out will-change-transform ${
          isExpanded
            ? "size-28 bg-acid font-bold text-[11px] shadow-[0_0_30px_rgba(204,255,0,0.35)]"
            : isLink
            ? "size-12 border border-acid/80 bg-acid/15 mix-blend-difference"
            : "size-8 border border-foreground/30 bg-transparent"
        }`}
      >
        <span
          ref={labelRef}
          className="select-none px-2 uppercase transition-opacity duration-200"
        />
      </div>
    </>
  );
}
