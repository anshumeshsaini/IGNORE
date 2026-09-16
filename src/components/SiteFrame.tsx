import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { site } from "@/lib/site";

/** Shell: smooth scroll, cursor, grain, entrance loader, route transitions. */
export function SiteFrame({ children }: { children: ReactNode }) {
  useSmoothScroll();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [booted, setBooted] = useState(false);
  const [wipe, setWipe] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 1100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setWipe(true);
    window.scrollTo(0, 0);
    const t = setTimeout(() => setWipe(false), 620);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="grain-layer" aria-hidden="true" />
      <Cursor />

      {/* entrance loader */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80] flex items-end justify-center bg-ink transition-[clip-path,opacity] duration-[900ms] ease-[cubic-bezier(0.83,0,0.17,1)]"
        style={{
          clipPath: booted ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
          opacity: booted ? 0 : 1,
        }}
      >
        <span className="display pb-[12vh] text-[14vw] leading-none text-foreground">
          {site.name}
          <span className="text-acid">.</span>
        </span>
      </div>

      {/* route transition wipe */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[75] flex items-center justify-center bg-ink transition-[clip-path] duration-[600ms] ease-[cubic-bezier(0.83,0,0.17,1)]"
        style={{ clipPath: wipe ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
      >
        <span className="display text-[8vw] leading-none text-acid">LOADING</span>
      </div>

      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
