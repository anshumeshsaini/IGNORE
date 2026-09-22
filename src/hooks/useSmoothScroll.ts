import { useEffect } from "react";
import Lenis from "lenis";
import { initGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Lenis smooth scrolling wired into the GSAP ticker + ScrollTrigger.
 * Also publishes scroll velocity as `--scroll-velocity` (deg) on <html>, so
 * elements can lean into the scroll with a CSS skew.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = initGsap();

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      smoothWheel: true,
      syncTouch: false,
    });

    const root = document.documentElement;
    let skew = 0;

    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      ScrollTrigger.update();
      const target = gsap.utils.clamp(-6, 6, velocity * 0.22);
      skew += (target - skew) * 0.12;
      root.style.setProperty("--scroll-velocity", `${skew.toFixed(3)}deg`);
      root.style.setProperty("--scroll-speed", Math.min(1, Math.abs(velocity) / 40).toFixed(3));
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      root.style.removeProperty("--scroll-velocity");
      root.style.removeProperty("--scroll-speed");
    };
  }, []);
}
