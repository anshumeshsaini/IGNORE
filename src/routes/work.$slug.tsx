import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { Reveal, SplitLines } from "@/components/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { getProject, projects } from "@/lib/data/work";
import hero from "@/assets/hero.jpg";
import studio1 from "@/assets/studio-1.jpg";
import studio2 from "@/assets/studio-2.jpg";

const imgs = [hero, studio1, studio2];

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — UNIGNORABLE" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    const title = `${project.name} — Case study — UNIGNORABLE`;
    return {
      meta: [
        { title },
        { name: "description", content: project.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: project.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/work/${project.slug}` }],
    };
  },
  component: CaseStudy,
  notFoundComponent: () => (
    <SiteFrame>
      <div className="edge py-[30vh]">
        <p className="display text-6xl">PROJECT NOT FOUND.</p>
        <Link to="/work" className="eyebrow mt-6 inline-block text-acid">
          BACK TO WORK ↗
        </Link>
      </div>
    </SiteFrame>
  ),
});

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const next = projects[(projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length]!;

  return (
    <SiteFrame>
      <article>
        <header className="edge pb-[8vh] pt-[22vh]">
          <p className="eyebrow text-muted-foreground">
            {project.industry} — {project.year}
          </p>
          <h1 className="display mt-6 fluid-xl leading-[0.82] tracking-[-0.05em]">
            {project.name}
            <span className="text-acid">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-foreground/80">{project.summary}</p>
          <p className="eyebrow mt-8 text-foreground/60">{project.services.join(" / ")}</p>
        </header>

        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
          <img
            src={hero}
            alt={`${project.name} key visual`}
            className="size-full object-cover grayscale"
          />
          <span className="display pointer-events-none absolute bottom-4 left-4 text-[12vw] leading-none text-acid/70 mix-blend-difference">
            {project.accentWord}
          </span>
        </div>

        <div className="edge">
          {project.chapters.map((c, i) => (
            <section
              key={c.no}
              className={`grid gap-8 border-b border-border py-[10vh] md:grid-cols-12 ${
                i % 2 ? "md:[direction:rtl]" : ""
              }`}
            >
              <div className="md:col-span-5 md:[direction:ltr] md:sticky md:top-28 md:self-start">
                <p className="eyebrow text-acid">{c.no}</p>
                <SplitLines
                  text={c.title.toUpperCase()}
                  className="display mt-3 text-4xl leading-none tracking-[-0.04em] md:text-6xl"
                />
              </div>
              <Reveal className="md:col-span-7 md:[direction:ltr]">
                <p className="max-w-xl text-lg leading-relaxed text-foreground/80">{c.body}</p>
                {i % 2 === 1 && (
                  <div className="mt-8 aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={imgs[(i + 1) % imgs.length]}
                      alt={`${project.name} — ${c.title}`}
                      loading="lazy"
                      className="size-full object-cover grayscale"
                    />
                  </div>
                )}
              </Reveal>
            </section>
          ))}

          <section className="py-[10vh]">
            <p className="eyebrow text-muted-foreground">(RESULTS — DEMO PLACEHOLDERS)</p>
            <dl className="mt-8 grid gap-10 md:grid-cols-3">
              {project.results.map((r) => (
                <div key={r.label}>
                  <dt className="eyebrow text-muted-foreground">{r.label}</dt>
                  <dd className="display mt-2 text-6xl leading-none text-acid md:text-8xl">{r.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <nav className="flex items-center justify-between border-t border-border py-10" aria-label="Case studies">
            <Link to="/work" className="eyebrow link-underline text-muted-foreground">
              ← ALL WORK
            </Link>
            <Link
              to="/work/$slug"
              params={{ slug: next.slug }}
              data-cursor="view"
              className="eyebrow link-underline text-acid"
            >
              NEXT: {next.name.toUpperCase()} ↗
            </Link>
          </nav>
        </div>
      </article>
      <FinalCTA />
    </SiteFrame>
  );
}
