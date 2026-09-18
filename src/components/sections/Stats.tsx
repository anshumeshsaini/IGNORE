import { useGsapContext } from "@/hooks/useGsapContext";

/** DEMO VALUES — replace `value` with real numbers. */
const STATS = [
  { value: 50, suffix: "+", label: "CAMPAIGNS" },
  { value: 25, suffix: "+", label: "BRANDS" },
  { value: 10, suffix: "+", label: "MARKETS" },
  { value: 9, suffix: "", label: "SERVICES" },
];

export function Stats() {
  const ref = useGsapContext<HTMLElement>(({ gsap, root }) => {
    root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const target = Number(el.dataset["count"] ?? 0);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
        },
      });
    });
  }, []);

  return (
    <section ref={ref} className="edge border-y border-border py-16 md:py-24">
      <div className="grid gap-y-12 md:grid-cols-4 md:gap-x-6">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col ${i % 2 === 1 ? "md:mt-16" : ""} ${i === 2 ? "md:mt-8" : ""}`}
          >
            <div className="display flex items-start text-[18vw] leading-[0.8] md:text-[7vw]">
              <span data-count={s.value}>0</span>
              <span className="text-acid">{s.suffix}</span>
            </div>
            <span className="eyebrow mt-3 text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
