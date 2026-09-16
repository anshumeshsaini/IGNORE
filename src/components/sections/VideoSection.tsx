import { useGsapContext } from "@/hooks/useGsapContext";
import studio2 from "@/assets/studio-2.jpg";

export function VideoSection() {
  const ref = useGsapContext<HTMLElement>(({ gsap, root }) => {
    gsap.to(root.querySelector("[data-media]"), {
      yPercent: -12,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
    });
    gsap.from(root.querySelectorAll("[data-vline]"), {
      yPercent: 110,
      duration: 1.1,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: { trigger: root, start: "top 70%" },
    });
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[90svh] items-center overflow-hidden">
      <div data-media className="absolute inset-[-10%] -z-10">
        <img
          src={studio2}
          alt="Camera lens catching light in the studio"
          loading="lazy"
          className="size-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background" />
      </div>

      <div className="edge">
        <div className="display fluid-lg leading-[0.86] tracking-[-0.045em]">
          {["WE DON'T JUST", "MAKE CONTENT."].map((l) => (
            <span key={l} className="block overflow-hidden">
              <span data-vline className="block">
                {l}
              </span>
            </span>
          ))}
          {["WE MAKE PEOPLE", "STOP SCROLLING."].map((l) => (
            <span key={l} className="block overflow-hidden text-acid">
              <span data-vline className="block">
                {l}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
