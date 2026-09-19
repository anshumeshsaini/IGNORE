import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";
import { CinematicLoader } from "./CinematicLoader";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/** Shell: smooth scroll, custom cursor, grain, cinematic intro, route transitions. */
export function SiteFrame({ children }: { children: ReactNode }) {
  useSmoothScroll();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [wipe, setWipe] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setWipe(true);
    window.scrollTo(0, 0);
    const t = setTimeout(() => setWipe(false), 550);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#09090b] text-foreground">
      {/* Subtle Analog Grain Texture Layer */}
      <div className="grain-layer" aria-hidden="true" />

      {/* Desktop Custom Reactive Cursor */}
      <Cursor />

      {/* Signature Cinematic Opening */}
      <CinematicLoader />

      {/* Fast route transition wipe between subpages */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[85] flex items-center justify-center bg-ink transition-[clip-path] duration-500 ease-[cubic-bezier(0.83,0,0.17,1)]"
        style={{ clipPath: wipe ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
      >
        <span className="display text-[7vw] leading-none text-acid">
          UNIGNORABLE.
        </span>
      </div>

      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
