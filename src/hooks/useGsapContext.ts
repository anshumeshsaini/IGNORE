import { useEffect, useRef, type RefObject } from "react";
import { initGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Runs GSAP setup scoped to a container and cleans the context up on unmount.
 * Skips entirely when the user prefers reduced motion.
 */
export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  setup: (ctx: { gsap: typeof import("gsap").gsap; root: T }) => void,
  deps: unknown[] = [],
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const { gsap } = initGsap();
    const root = ref.current;
    const ctx = gsap.context(() => setup({ gsap, root }), root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
