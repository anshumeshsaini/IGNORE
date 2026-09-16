import { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, X, CheckCircle2 } from "lucide-react";
import { projects, type Project } from "@/lib/data/work";
import { sounds } from "@/lib/sound";

const CATEGORIES = [
  "ALL",
  "Brand Direction",
  "Digital Experience",
  "Film & Motion",
  "Performance",
] as const;

function TiltCard({
  project,
  onQuickView,
}: {
  project: Project;
  onQuickView: (p: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, sheenX: 50, sheenY: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    const sheenX = (x / rect.width) * 100;
    const sheenY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, sheenX, sheenY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, sheenX: 50, sheenY: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => sounds.play("hover")}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1, 1, 1)`,
        transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink/80 transition-all duration-500 hover:border-acid/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(204,255,0,0.15)]"
    >
      {/* Dynamic Specular Sheen */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${tilt.sheenX}% ${tilt.sheenY}%, rgba(204,255,0,0.15), transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="size-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <span className="rounded-full border border-white/20 bg-ink/70 px-3 py-1 text-[10px] font-mono text-white backdrop-blur-md">
            {project.category}
          </span>
          <span className="rounded-full border border-acid/40 bg-acid/15 px-3 py-1 text-[10px] font-mono font-bold text-acid backdrop-blur-md">
            {project.heroMetric}
          </span>
        </div>

        {/* Quick View Button */}
        <button
          type="button"
          data-cursor="explore"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            sounds.play("pop");
            onQuickView(project);
          }}
          className="absolute bottom-4 right-4 z-10 translate-y-10 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-mono font-semibold text-white backdrop-blur-md opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-acid hover:text-ink hover:border-acid"
        >
          QUICK PEEK ↗
        </button>
      </div>

      {/* Card Body */}
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-mono tracking-wider text-muted-foreground">
              {project.industry} — {project.year}
            </p>
            <h3 className="display mt-2 text-2xl md:text-3xl text-foreground group-hover:text-acid transition-colors">
              {project.name}
            </h3>
          </div>

          <Link
            to="/work/$slug"
            params={{ slug: project.slug }}
            data-cursor="view"
            onClick={() => sounds.play("pop")}
            aria-label={`View ${project.name} case study`}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground transition-all duration-300 group-hover:bg-acid group-hover:text-ink group-hover:border-acid"
          >
            <ArrowUpRight className="size-4 transition-transform group-hover:scale-110" />
          </Link>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-foreground/70 font-normal">
          {project.summary}
        </p>

        {/* Services Pills */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
          {project.services.map((svc) => (
            <span
              key={svc}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-mono text-muted-foreground"
            >
              {svc}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WorkPreview() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [quickViewProject, setQuickViewProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section className="relative edge py-24 md:py-36">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 -z-10 size-[50vw] -translate-y-1/2 rounded-full bg-cyan/[0.04] blur-[150px]"
      />

      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-acid" />
            <p className="eyebrow text-acid">PORTFOLIO OF MOVEMENT</p>
          </div>
          <h2 className="display fluid-lg mt-3 text-foreground tracking-tight">
            WORK THAT SHIFTED <br />
            <span className="font-serif italic font-normal text-acid">the needle.</span>
          </h2>
        </div>

        <Link
          to="/work"
          data-cursor="cta"
          onClick={() => sounds.play("pop")}
          className="eyebrow group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-foreground transition-all duration-300 hover:border-acid hover:bg-acid hover:text-ink"
        >
          <span>VIEW FULL ARCHIVE (14 CASES)</span>
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* Interactive Category Filter Pills */}
      <div className="mt-12 flex flex-wrap items-center gap-2.5 pb-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              data-cursor="cta"
              onClick={() => {
                sounds.play("click");
                setSelectedCategory(cat);
              }}
              className={`rounded-full px-5 py-2 text-xs font-mono tracking-wider transition-all duration-300 ${
                isActive
                  ? "bg-acid font-bold text-ink shadow-[0_0_20px_rgba(204,255,0,0.35)] scale-105"
                  : "border border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/30 hover:text-foreground"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* 3D Tilt Projects Grid */}
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {filteredProjects.map((p) => (
          <TiltCard
            key={p.slug}
            project={p}
            onQuickView={(proj) => setQuickViewProject(proj)}
          />
        ))}
      </div>

      {/* Quick View Modal Drawer */}
      {quickViewProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setQuickViewProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/15 bg-ink p-6 sm:p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close modal"
              data-cursor="cta"
              onClick={() => {
                sounds.play("click");
                setQuickViewProject(null);
              }}
              className="absolute top-6 right-6 flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground hover:bg-acid hover:text-ink transition-colors"
            >
              <X className="size-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <img
                src={quickViewProject.image}
                alt={quickViewProject.name}
                className="size-full object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-full bg-ink/80 px-3.5 py-1 text-xs font-mono text-acid backdrop-blur-md">
                {quickViewProject.heroMetric}
              </div>
            </div>

            <div className="mt-6">
              <span className="eyebrow text-acid">{quickViewProject.industry}</span>
              <h3 className="display mt-2 text-3xl sm:text-4xl text-foreground">
                {quickViewProject.name}
              </h3>
              <p className="mt-3 text-base text-foreground/80 leading-relaxed font-normal">
                {quickViewProject.summary}
              </p>

              {/* Impact Highlights */}
              <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
                {quickViewProject.results.map((r) => (
                  <div key={r.label}>
                    <div className="display text-xl sm:text-2xl text-acid font-bold">
                      {r.value}
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground mt-1">
                      {r.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Chapters */}
              <div className="mt-6 space-y-3">
                <h4 className="eyebrow text-foreground/90 flex items-center gap-2">
                  <Sparkles className="size-3.5 text-acid" />
                  THE STRATEGY DISSECTION
                </h4>
                {quickViewProject.chapters.slice(0, 3).map((ch) => (
                  <div
                    key={ch.no}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.01] p-3 text-sm"
                  >
                    <span className="font-mono text-acid text-xs">{ch.no}</span>
                    <div>
                      <span className="font-semibold text-foreground">{ch.title}: </span>
                      <span className="text-muted-foreground">{ch.body}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex items-center justify-end gap-4 border-t border-white/10 pt-6">
                <button
                  type="button"
                  onClick={() => setQuickViewProject(null)}
                  className="eyebrow text-muted-foreground hover:text-foreground"
                >
                  CLOSE
                </button>
                <Link
                  to="/work/$slug"
                  params={{ slug: quickViewProject.slug }}
                  onClick={() => sounds.play("pop")}
                  className="eyebrow inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3 font-bold text-ink hover:bg-white transition-colors"
                >
                  READ DEEP DIVE <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
