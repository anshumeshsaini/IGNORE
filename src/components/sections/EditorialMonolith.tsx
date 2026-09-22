import { useGsapContext } from "@/hooks/useGsapContext";
import monolith from "@/assets/editorial-monolith.jpg";
import texture from "@/assets/editorial-texture.jpg";

const notes = [
  { k: "01", t: "ART DIRECTION", d: "Every frame composed, nothing accidental." },
  { k: "02", t: "MEDIA CRAFT", d: "Budget behaves like design: intentional." },
  { k: "03", t: "BUILD QUALITY", d: "Sites that feel as fast as they look." },
];

export function EditorialMonolith() {
  const ref = useGsapContext<HTMLElement>(({ gsap, root }) => {
    gsap.fromTo(
      root.querySelector("[data-mono-image]"),
      { clipPath: "inset(18% 12% 18% 12%)", scale: 1.15 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top 85%", end: "center center", scrub: true },
      },
    );
    gsap.from(root.querySelectorAll("[data-mono-note]"), {
      y: 60,
      opacity: 0,
      stagger: 0.14,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 65%" },
    });
    gsap.to(root.querySelector("[data-mono-texture]"), {
      yPercent: -18,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
    });
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden py-[12vh]" aria-label="Studio craft">
      <img
        data-mono-texture
        src={texture}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-[0.14] mix-blend-multiply"
      />
      <div className="edge grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow text-signal">/ THE STUDIO STANDARD</p>
          <h2 className="display fluid-lg mt-4 max-w-[10ch] velocity-lean">
            BUILT LIKE A <span className="editorial lowercase text-signal">monolith</span>, MOVED LIKE FILM.
          </h2>
          <div className="mt-10 overflow-hidden border border-border">
            <img
              data-mono-image
              src={monolith}
              alt="Editorial monolith campaign composition"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </div>

        <ol className="lg:col-span-5 lg:pb-4">
          {notes.map((n) => (
            <li key={n.k} data-mono-note className="border-t border-border py-7 first:border-t-0 lg:py-9">
              <div className="flex items-baseline gap-5">
                <span className="eyebrow text-signal">{n.k}</span>
                <div>
                  <h3 className="display text-3xl leading-none md:text-5xl">{n.t}</h3>
                  <p className="mt-3 max-w-sm text-sm text-muted-foreground">{n.d}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
