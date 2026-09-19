const words = ["STRATEGY", "CREATIVE", "PERFORMANCE", "DEVELOPMENT", "PRODUCTION", "CULTURE"];

export function SignalStrip() {
  const loop = [...words, ...words];
  return (
    <section className="overflow-hidden border-y border-ink bg-acid py-4 text-acid-foreground" aria-label="Agency disciplines">
      <div className="signal-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {loop.map((word, index) => (
          <span key={`${word}-${index}`} className="display flex items-center gap-8 text-4xl md:text-6xl">
            {word}<span aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}