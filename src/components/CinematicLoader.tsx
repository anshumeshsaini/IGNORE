import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CinematicLoaderProps {
  onComplete?: () => void;
}

export function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("unignorable_intro_viewed");
    if (hasLoaded) {
      setDone(true);
      onComplete?.();
      return;
    }

    const container = containerRef.current;
    const p1 = phase1Ref.current;
    const p2 = phase2Ref.current;
    const letters = lettersRef.current?.children;
    const curtain = curtainRef.current;

    if (!container || !p1 || !p2 || !letters || !curtain) {
      setDone(true);
      onComplete?.();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("unignorable_intro_viewed", "true");
          setDone(true);
          onComplete?.();
        },
      });

      gsap.set(container, { display: "flex", opacity: 1 });
      gsap.set(p1, { opacity: 0, y: 15 });
      gsap.set(p2, { opacity: 0, y: 15 });
      gsap.set(letters, {
        opacity: 0,
        yPercent: 120,
        rotateX: -60,
        filter: "blur(12px)",
        transformOrigin: "50% 100%",
      });

      tl.to(p1, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .to(p1, { opacity: 0, y: -10, duration: 0.4, ease: "power2.in" }, "+=0.35")
        .to(p2, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .to(p2, { opacity: 0, y: -10, duration: 0.4, ease: "power2.in" }, "+=0.3")
        .to(
          letters,
          {
            opacity: 1,
            yPercent: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.045,
            ease: "power4.out",
          },
          "-=0.1",
        )
        .to(lettersRef.current, { letterSpacing: "0.08em", duration: 0.7, ease: "power2.out" }, "-=0.4")
        .to(curtain, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.95,
          ease: "expo.inOut",
        }, "+=0.25")
        .to(container, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.2,
        }, "-=0.2");
    }, container);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        ctx.revert();
        sessionStorage.setItem("unignorable_intro_viewed", "true");
        setDone(true);
        onComplete?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      ctx.revert();
    };
  }, [onComplete]);

  if (done) return null;

  const word = "UNIGNORABLE.";

  return (
    <aside
      ref={containerRef}
      aria-label="Cinematic intro animation"
      className="fixed inset-0 z-[100] flex select-none items-center justify-center bg-ink"
      onClick={() => {
        sessionStorage.setItem("unignorable_intro_viewed", "true");
        setDone(true);
        onComplete?.();
      }}
    >
      <div
        ref={curtainRef}
        className="relative flex size-full items-center justify-center bg-[#09090b]"
        style={{ clipPath: "inset(0 0 0% 0)" }}
      >
        <div className="grain-layer opacity-40" />

        <div
          ref={phase1Ref}
          className="eyebrow absolute text-center font-mono text-xs tracking-[0.35em] text-acid/90 md:text-sm"
        >
          <span className="mr-3 inline-block size-1.5 rounded-full bg-acid animate-ping" />
          CREATIVE / STRATEGY / PERFORMANCE
        </div>

        <div
          ref={phase2Ref}
          className="eyebrow absolute text-center font-mono text-xs tracking-[0.45em] text-foreground/80 md:text-sm"
        >
          INDIA / UAE / GLOBAL
        </div>

        <div
          ref={lettersRef}
          className="display flex flex-wrap justify-center overflow-hidden px-4 text-center text-[15vw] leading-[0.82] tracking-[-0.03em] text-foreground"
          style={{ perspective: 1000 }}
        >
          {word.split("").map((ch, i) => (
            <span
              key={i}
              className={`inline-block will-change-transform ${
                ch === "." ? "text-acid" : ""
              }`}
            >
              {ch}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            sessionStorage.setItem("unignorable_intro_viewed", "true");
            setDone(true);
            onComplete?.();
          }}
          className="eyebrow absolute bottom-8 right-8 text-[10px] tracking-[0.25em] text-foreground/40 transition-colors hover:text-acid"
        >
          [ESC TO SKIP]
        </button>
      </div>
    </aside>
  );
}
