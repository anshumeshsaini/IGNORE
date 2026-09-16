import { useGsapContext } from "@/hooks/useGsapContext";
import { sounds } from "@/lib/sound";
import { TrendingUp, Award, Zap, Users } from "lucide-react";

const STATS = [
  {
    icon: TrendingUp,
    value: 48,
    prefix: "$",
    suffix: "M+",
    label: "CLIENT VALUE GENERATED",
    desc: "Measured net-new revenue driven across brand campaigns and digital launches.",
  },
  {
    icon: Zap,
    value: 99,
    prefix: "",
    suffix: ".2%",
    label: "HUMAN CRAFT PRECISION",
    desc: "Every interaction, film frame, and asset custom engineered without generic templates.",
  },
  {
    icon: Award,
    value: 24,
    prefix: "",
    suffix: "",
    label: "GLOBAL HONORS & SOTD",
    desc: "Awwwards, FWA, Red Dot, and D&AD recognitions for aesthetic & performance mastery.",
  },
  {
    icon: Users,
    value: 12,
    prefix: "",
    suffix: "M+",
    label: "ORGANIC ATTENTION CAPTURED",
    desc: "Audience eyes held for over 60 seconds per session through hypnotic storytelling.",
  },
];

export function Stats() {
  const ref = useGsapContext<HTMLElement>(({ gsap, root }) => {
    root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const target = Number(el.dataset["count"] ?? 0);
      const isFloat = el.dataset["float"] === "true";
      const obj = { v: 0 };

      gsap.to(obj, {
        v: target,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
        onUpdate: () => {
          el.textContent = isFloat ? obj.v.toFixed(1) : String(Math.round(obj.v));
        },
      });
    });

    gsap.from(root.querySelectorAll("[data-stat-card]"), {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 80%" },
    });
  }, []);

  return (
    <section
      ref={ref}
      className="relative edge border-y border-white/10 bg-ink/40 py-20 md:py-28"
    >
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-acid flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-acid" />
            MEASURED IMPACT
          </p>
          <h2 className="display mt-2 text-3xl md:text-5xl text-foreground">
            DATA DOESN&apos;T LIE. <span className="font-serif italic font-normal text-acid">neither do we.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm text-muted-foreground font-normal">
          We reject vanity metrics. We measure velocity, margin expansion, and cultural relevance.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              data-stat-card
              onMouseEnter={() => sounds.play("hover")}
              className="glass-surface glass-surface-hover group relative flex flex-col justify-between rounded-2xl p-7 transition-all duration-500"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/10 bg-white/5 p-2.5 text-acid group-hover:bg-acid group-hover:text-ink transition-colors duration-300">
                  <Icon className="size-4" />
                </span>
                <span className="eyebrow text-[10px] text-muted-foreground">METRIC</span>
              </div>

              <div className="my-8">
                <div className="display flex items-baseline text-5xl lg:text-6xl text-foreground font-bold tracking-tight">
                  {s.prefix && <span className="text-acid text-4xl mr-1">{s.prefix}</span>}
                  <span data-count={s.value} data-float={s.suffix.includes(".")}>
                    0
                  </span>
                  <span className="text-acid ml-0.5">{s.suffix}</span>
                </div>
                <h3 className="eyebrow mt-4 text-foreground/90 font-bold tracking-wider">
                  {s.label}
                </h3>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
