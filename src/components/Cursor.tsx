import { useEffect, useRef } from "react";
import { usePointerFine } from "@/hooks/usePointerFine";

/**
 * Desktop-only custom cursor.
 * Add data-cursor="view" | "explore" | "cta" to any element to change its state.
 */
export function Cursor() {
  const fine = usePointerFine();
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("cursor-none-desktop");

    const el = dot.current;
    const lbl = label.current;
    if (!el || !lbl) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const mode = target?.dataset["cursor"] ?? "default";
      el.dataset["mode"] = mode;
      lbl.textContent = mode === "view" ? "VIEW" : mode === "explore" ? "EXPLORE" : "";
    };

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <div
      ref={dot}
      aria-hidden="true"
      data-mode="default"
      className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full border border-acid text-[10px] font-medium tracking-[0.2em] text-ink mix-blend-difference transition-[width,height,background-color] duration-300 ease-out
        size-3 bg-acid
        data-[mode=cta]:size-20 data-[mode=cta]:bg-acid
        data-[mode=view]:size-24 data-[mode=view]:bg-acid
        data-[mode=explore]:size-24 data-[mode=explore]:bg-acid"
    >
      <span ref={label} />
    </div>
  );
}
