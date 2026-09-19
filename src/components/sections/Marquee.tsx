export function Marquee() {
  const line1 = "ATTENTION → REACH → DEMAND → SCALE →";
  const line2 = "CREATIVE → PERFORMANCE → DIGITAL → CULTURE →";
  const line3 = "UNIGNORABLE → UNIGNORABLE → UNIGNORABLE →";

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-border/80 bg-[#060608] py-8 select-none"
    >
      {/* Tier 1: LTR */}
      <div className="flex w-[200%] animate-[marquee-ltr_26s_linear_infinite] whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="display mx-4 text-3xl tracking-widest text-foreground/40 md:text-5xl"
          >
            {line1}
          </span>
        ))}
      </div>

      {/* Tier 2: RTL (Acid Accent) */}
      <div className="my-2 flex w-[200%] animate-[marquee-rtl_22s_linear_infinite] whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="display mx-4 text-3xl font-bold tracking-widest text-acid md:text-5xl"
          >
            {line2}
          </span>
        ))}
      </div>

      {/* Tier 3: LTR (Outline typography) */}
      <div className="flex w-[200%] animate-[marquee-ltr_30s_linear_infinite] whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="display mx-4 text-3xl tracking-widest text-transparent [-webkit-text-stroke:1px_var(--bone)] opacity-40 md:text-5xl"
          >
            {line3}
          </span>
        ))}
      </div>
    </div>
  );
}
