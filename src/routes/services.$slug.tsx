import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { Reveal, SplitLines } from "@/components/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { getService, services } from "@/lib/data/services";
import studio1 from "@/assets/studio-1.jpg";
import studio2 from "@/assets/studio-2.jpg";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — UNIGNORABLE" }, { name: "robots", content: "noindex" }] };
    }
    const { service } = loaderData;
    const title = `${service.title} — UNIGNORABLE`;
    return {
      meta: [
        { title },
        { name: "description", content: service.short },
        { property: "og:title", content: title },
        { property: "og:description", content: service.short },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/services/${service.slug}` }],
    };
  },
  component: ServicePage,
  notFoundComponent: () => (
    <SiteFrame>
      <div className="edge py-[30vh]">
        <p className="display text-6xl">SERVICE NOT FOUND.</p>
        <Link to="/services" className="eyebrow mt-6 inline-block text-acid">
          ALL SERVICES ↗
        </Link>
      </div>
    </SiteFrame>
  ),
});

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  const idx = services.findIndex((x) => x.slug === s.slug);
  const next = services[(idx + 1) % services.length]!;
  const offset = s.layout === "offset";
  const stacked = s.layout === "stacked";

  return (
    <SiteFrame>
      <header className={`edge pb-[8vh] pt-[24vh] ${offset ? "md:pl-[18%]" : ""}`}>
        <p className="eyebrow text-acid">
          {s.index} — {s.discipline}
        </p>
        <h1 className="display mt-6 fluid-xl leading-[0.82] tracking-[-0.05em]">
          {s.title.toUpperCase()}
          <span className="text-acid">.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-foreground/80">{s.hero}</p>
      </header>

      {/* Problem */}
      <section className={`edge border-t border-border py-[10vh] ${stacked ? "" : "md:grid md:grid-cols-12 md:gap-10"}`}>
        <div className="md:col-span-5">
          <p className="eyebrow text-muted-foreground">(THE PROBLEM)</p>
          <SplitLines
            text={s.problem.title.toUpperCase()}
            className="display mt-4 text-3xl leading-[0.95] tracking-[-0.03em] md:text-5xl"
          />
        </div>
        <Reveal className="mt-6 md:col-span-7 md:mt-0">
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">{s.problem.body}</p>
        </Reveal>
      </section>

      {/* Strategy + Execution */}
      {[s.strategy, s.execution].map((block, i) => (
        <section
          key={block.title}
          className={`edge border-t border-border py-[10vh] ${i === 1 && offset ? "md:pl-[14%]" : ""}`}
        >
          <p className="eyebrow text-muted-foreground">{i === 0 ? "(STRATEGY)" : "(EXECUTION)"}</p>
          <div className="mt-6 grid gap-10 md:grid-cols-12">
            <h2 className="display md:col-span-6 text-4xl leading-[0.9] tracking-[-0.04em] md:text-6xl">
              {block.title}
            </h2>
            <Reveal className="md:col-span-6">
              <p className="text-lg leading-relaxed text-foreground/80">{block.body}</p>
              <ul className="mt-8 divide-y divide-border border-y border-border">
                {block.points.map((pt) => (
                  <li key={pt} className="flex items-baseline gap-4 py-3">
                    <span className="text-acid">—</span>
                    <span className="text-sm">{pt}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      ))}

      {/* Visual */}
      <section className="relative h-[70svh] overflow-hidden">
        <img
          src={idx % 2 ? studio1 : studio2}
          alt={`${s.title} in practice`}
          loading="lazy"
          className="size-full object-cover opacity-45 grayscale"
        />
        <div className="edge absolute inset-0 flex items-end pb-[8vh]">
          <p className="display fluid-lg leading-[0.85] tracking-[-0.045em]">
            {s.discipline}
            <span className="text-acid">.</span>
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="edge border-t border-border py-[10vh]">
        <p className="eyebrow text-muted-foreground">(WHAT YOU GET)</p>
        <ul className="mt-8 grid gap-px bg-border md:grid-cols-2">
          {s.benefits.map((b) => (
            <li key={b} className="bg-background p-8">
              <p className="display text-2xl leading-tight tracking-[-0.03em] md:text-4xl">{b}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className="edge border-t border-border py-[10vh]">
        <p className="eyebrow text-muted-foreground">(PROCESS)</p>
        <ol className="mt-8 space-y-px">
          {s.process.map((step) => (
            <li key={step.step} className="grid gap-4 border-t border-border py-6 md:grid-cols-12">
              <span className="eyebrow text-acid md:col-span-1">{step.step}</span>
              <h3 className="display md:col-span-4 text-2xl tracking-[-0.03em] md:text-4xl">
                {step.label}
              </h3>
              <p className="md:col-span-7 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="edge flex items-center justify-between border-t border-border py-10">
        <Link to="/services" className="eyebrow link-underline text-muted-foreground">
          ← ALL SERVICES
        </Link>
        <Link
          to="/services/$slug"
          params={{ slug: next.slug }}
          data-cursor="explore"
          className="eyebrow link-underline text-acid"
        >
          NEXT: {next.title.toUpperCase()} ↗
        </Link>
      </div>

      <FinalCTA />
    </SiteFrame>
  );
}
