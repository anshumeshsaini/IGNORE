import { useEffect, useRef, type ReactNode } from "react";
import { usePointerFine } from "@/hooks/usePointerFine";
import { prefersReducedMotion } from "@/lib/gsap";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/** Wraps a child and pulls it gently toward the pointer. Desktop only. */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = usePointerFine();

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || prefersReducedMotion()) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
    };
    const reset = () => {
      el.style.transform = "translate3d(0,0,0)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
    };
  }, [fine, strength]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-block", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
    >
      {children}
    </span>
  );
}
