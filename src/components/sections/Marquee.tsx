import { clientLogos } from "@/lib/data/testimonials";

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="group flex overflow-hidden border-b border-white/10 py-5">
      <div
        className={`flex shrink-0 items-center gap-12 pr-12 group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-rtl" : "animate-marquee-ltr"
        }`}
      >
        {loop.map((l, i) => (
          <div key={`${l}-${i}`} className="flex items-center gap-12">
            <span className="display text-2xl font-bold tracking-tight text-white/30 transition-colors duration-300 hover:text-acid md:text-4xl">
              {l}
            </span>
            <span className="size-1.5 rounded-full bg-acid/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  const half = Math.ceil(clientLogos.length / 2);
  return (
    <section aria-label="Brand partners" className="relative border-t border-white/10 bg-ink/70">
      <Row items={clientLogos.slice(0, half)} />
      <Row items={clientLogos.slice(half)} reverse />
    </section>
  );
}
