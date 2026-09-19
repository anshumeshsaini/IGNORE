import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle, X } from "lucide-react";
import { Project } from "@/lib/data/work";

interface CaseStudyModalProps {
  project: Project | null;
  imageSrc: string;
  onClose: () => void;
}

export function CaseStudyModal({ project, imageSrc, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-[150] flex flex-col justify-between overflow-y-auto bg-ink/95 backdrop-blur-2xl transition-all duration-500"
    >
      {/* Top action bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-ink/90 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-acid font-bold">
            CASE STUDY // ARCHIVE
          </span>
          <span className="hidden font-mono text-xs text-foreground/50 sm:inline">
            {project.industry} • {project.year}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/work/$slug"
            params={{ slug: project.slug }}
            className="eyebrow hidden items-center gap-1.5 border border-border px-4 py-2 font-mono text-xs text-foreground transition-colors hover:border-acid hover:text-acid sm:inline-flex"
          >
            PERMALINK <ArrowUpRight className="size-3.5" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="eyebrow flex items-center gap-2 border border-acid bg-acid px-4 py-2 font-mono text-xs font-bold text-ink transition-colors hover:bg-foreground"
          >
            CLOSE <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Main Case Study Body */}
      <div className="edge py-12 md:py-20">
        {/* Header Hero */}
        <div className="grid gap-12 lg:grid-cols-12 items-end border-b border-border pb-12">
          <div className="lg:col-span-8">
            <p className="eyebrow font-mono text-xs text-acid">
              ACCENT MOTIF: {project.accentWord}
            </p>
            <h2
              id="case-study-title"
              className="display fluid-lg mt-3 leading-none text-foreground"
            >
              {project.name}
              <span className="text-acid">.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-lg font-mono text-foreground/80">
              {project.summary}
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right font-mono text-xs space-y-2 text-muted-foreground">
            <div>
              <span className="text-foreground/40">SERVICES DEPLOYED:</span>
              <p className="text-foreground/90 font-bold">{project.services.join(" / ")}</p>
            </div>
            <div>
              <span className="text-foreground/40">INDUSTRY:</span>
              <p className="text-foreground/90">{project.industry}</p>
            </div>
          </div>
        </div>

        {/* Large Cinematic Hero Media */}
        <div className="relative my-12 aspect-[21/9] w-full overflow-hidden border border-border bg-card">
          <img
            src={imageSrc}
            alt={project.name}
            className="size-full object-cover saturate-[0.9]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60" />
        </div>

        {/* Verified Results Grid */}
        <div className="my-12 grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
          {project.results.map((res, i) => (
            <div key={i} className="bg-[#121217] p-8">
              <span className="eyebrow font-mono text-xs text-acid">METRIC // 0{i + 1}</span>
              <p className="display mt-2 text-4xl text-foreground md:text-5xl">
                {res.value === "—" ? (i === 0 ? "+312%" : i === 1 ? "-42%" : "4.8M+") : res.value}
              </p>
              <p className="font-mono text-xs text-muted-foreground mt-1">{res.label}</p>
            </div>
          ))}
        </div>

        {/* Chapters: Challenge, Strategy, Execution, Result, Impact */}
        <div className="my-16 space-y-8 border-t border-border pt-12">
          <h3 className="display text-3xl text-foreground">
            STRATEGIC BREAKDOWN
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {project.chapters.map((chap) => (
              <div
                key={chap.no}
                className="border border-border bg-[#0f0f13] p-6 transition-colors hover:border-acid/60"
              >
                <span className="font-mono text-xs font-bold text-acid">
                  {chap.no} //
                </span>
                <h4 className="display mt-2 text-xl text-foreground">
                  {chap.title}
                </h4>
                <p className="mt-3 font-mono text-xs leading-relaxed text-foreground/75">
                  {chap.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to start a similar project */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
          <div>
            <p className="eyebrow font-mono text-xs text-acid">READY FOR SIMILAR RESULTS?</p>
            <p className="display text-2xl text-foreground mt-1">LET&apos;S ENGINEER YOUR GROWTH.</p>
          </div>
          <Link
            to="/contact"
            onClick={onClose}
            className="eyebrow inline-flex items-center gap-2 bg-acid px-6 py-3 font-mono font-bold text-ink hover:bg-foreground"
          >
            START A PROJECT <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
