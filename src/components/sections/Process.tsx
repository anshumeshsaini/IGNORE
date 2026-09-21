import { useGsapContext } from "@/hooks/useGsapContext";
import { SplitLines } from "../Reveal";

export const steps = [
  { no: "01", label: "DISCOVER", body: "Business model, margins, audience, and the honest state of the brand." },
  { no: "02", label: "STRATEGIZE", body: "One idea sharp enough to survive contact with a media plan." },
  { no: "03", label: "CREATE", body: "Film, design, product and copy built as a system, not one-offs." },
  { no: "04", label: "LAUNCH", body: "Ship fast, instrument everything, read the first signal within days." },
  { no: "05", label: "SCALE", body: "Double down on what compounds. Kill the rest without sentiment." },
];

/** Desktop: pinned horizontal scroll. Mobile: vertical timeline. */
export function Process() {
  const ref = useGsapContext<HTMLDivElement>(({ gsap, root }) => {
    const track = root.querySelector<HTMLElement>("[data-track]");
    if (!track || !window.matchMedia("(min-width: 768px)").matches) return;
    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: () => `+=${track.scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }, []);

  return (
    <section className="py-[10vh]">
      <div className="edge">
        <p className="eyebrow text-muted-foreground">(HOW WE WORK)</p>
        <SplitLines
          text={"FIVE STEPS.\nNO THEATRE."}
          className="display mt-6 fluid-lg leading-[0.86] tracking-[-0.045em]"
        />
      </div>

      <div ref={ref} className="mt-[8vh] md:h-[100svh] md:overflow-hidden">
        <div
          data-track
          className="flex flex-col gap-10 px-6 md:h-full md:flex-row md:items-center md:gap-0 md:px-0 md:will-change-transform"
        >
          {steps.map((s) => (
            <article
              key={s.no}
              className="border-t border-border pt-6 md:w-[70vw] md:shrink-0 md:border-l md:border-t-0 md:px-[6vw] md:pt-0 lg:w-[46vw]"
            >
              <p className="display text-[18vw] leading-[0.8] text-acid md:text-[12vw]">{s.no}</p>
              <h3 className="display mt-4 text-3xl tracking-[-0.03em] md:text-5xl">{s.label}</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
