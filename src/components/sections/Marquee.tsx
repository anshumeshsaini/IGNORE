import { clientLogos } from "@/lib/data/testimonials";

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee group flex overflow-hidden border-b border-border py-6">
      <div
        className="flex shrink-0 gap-14 pr-14 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-${reverse ? "rtl" : "ltr"} 38s linear infinite`,
        }}
      >
        {loop.map((l, i) => (
          <span key={`${l}-${i}`} className="display text-3xl tracking-[-0.03em] text-foreground/45 md:text-5xl">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Placeholder wordmarks — replace with real client logos. */
export function Marquee() {
  const half = Math.ceil(clientLogos.length / 2);
  return (
    <section aria-label="Selected clients" className="border-t border-border">
      <Row items={clientLogos.slice(0, half)} />
      <Row items={clientLogos.slice(half)} reverse />
    </section>
  );
}
