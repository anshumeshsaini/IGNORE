import { useGsapContext } from "@/hooks/useGsapContext";

const FLYING = ["ATTENTION", "REACH", "DEMAND", "CTR", "RECALL", "SCALE", "HOOK", "SHARE"];

/**
 * Signature scroll-driven moment.
 * Pinned timeline: dark → READY? → typographic expansion → collapse →
 * "WE DON'T FOLLOW ATTENTION." → pause → "WE CREATE IT." → explode out.
 */
export function Comeback() {
  const ref = useGsapContext<HTMLElement>(({ gsap, root }) => {
    const q = gsap.utils.selector(root);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "+=420%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    tl.fromTo(q("[data-ready]"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 })
      .to(q("[data-ready]"), { opacity: 0, scale: 6, filter: "blur(22px)", duration: 1 }, ">0.3")
      .fromTo(
        q("[data-word]"),
        { opacity: 0, scale: 0.4 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: { each: 0.06, from: "random" },
          ease: "power2.out",
        },
        "<0.2",
      )
      .to(
        q("[data-word]"),
        {
          xPercent: () => gsap.utils.random(-160, 160),
          yPercent: () => gsap.utils.random(-160, 160),
          rotation: () => gsap.utils.random(-25, 25),
          duration: 1.4,
          ease: "power1.inOut",
        },
        "<0.3",
      )
      .to(q("[data-word]"), { opacity: 0, scale: 0.2, filter: "blur(14px)", duration: 0.6 })
      .fromTo(
        q("[data-statement-1]"),
        { opacity: 0, clipPath: "inset(50% 0% 50% 0%)", scale: 1.2 },
        { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1, ease: "power4.out" },
        "<0.2",
      )
      .to({}, { duration: 1 })
      .to(q("[data-statement-1]"), { opacity: 0, y: -60, duration: 0.5 })
      .fromTo(
        q("[data-statement-2]"),
        { opacity: 0, scale: 0.7, filter: "blur(18px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "power4.out" },
        "<0.1",
      )
      .to({}, { duration: 0.8 })
      .to(q("[data-statement-2]"), { scale: 14, opacity: 0, filter: "blur(30px)", duration: 1.1, ease: "power3.in" })
      .fromTo(q("[data-flash]"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, "<0.55");
  }, []);

  return (
    <div>
    <section
      ref={ref}
      aria-label="Our point of view"
      className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-acid text-acid-foreground"
    >
      <div data-flash className="pointer-events-none absolute inset-0 bg-signal opacity-0" aria-hidden="true" />

      <p data-ready className="eyebrow absolute text-acid-foreground">
        READY?
      </p>

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {FLYING.map((w, i) => (
          <span
            key={w}
            data-word
            className="display absolute text-[6vw] text-acid-foreground/25"
            style={{
              left: `${(i * 13 + 8) % 80}%`,
              top: `${(i * 29 + 12) % 78}%`,
            }}
          >
            {w}
          </span>
        ))}
      </div>

      <h2 data-statement-1 className="display fluid-lg absolute max-w-[92vw] px-4 text-center opacity-0">
        WE DON&apos;T FOLLOW
        <br />
        ATTENTION.
      </h2>

      <p data-statement-2 className="editorial fluid-lg absolute px-4 text-center text-acid-foreground opacity-0">
        WE CREATE IT.
      </p>
    </section>
    </div>
  );
}
