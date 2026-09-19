import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Eye } from "lucide-react";
import { projects, Project } from "@/lib/data/work";
import { CaseStudyModal } from "../CaseStudyModal";
import meridianImg from "@/assets/meridian.jpg";
import atlasImg from "@/assets/atlas.jpg";
import novaImg from "@/assets/nova.jpg";
import harbourImg from "@/assets/harbour.jpg";

const PROJECT_IMAGES: Record<string, string> = {
  "meridian-coffee": meridianImg,
  "atlas-fitness": atlasImg,
  "nova-interiors": novaImg,
  "harbour-festival": harbourImg,
};

export function WorkPreview() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalImage, setModalImage] = useState<string>("");

  const openProjectModal = (proj: Project, img: string) => {
    setSelectedProject(proj);
    setModalImage(img);
  };

  const p1 = projects[0]!; // Meridian Coffee
  const p2 = projects[1]!; // Atlas Fitness
  const p3 = projects[2]!; // Nova Interiors
  const p4 = projects[3]!; // Harbour Festival

  return (
    <>
      <section
        id="work-section"
        aria-label="Selected Case Studies and Creative Work"
        className="relative overflow-hidden border-b border-border bg-[#09090b] py-24 md:py-40"
      >
        <div className="edge">
          {/* Header */}
          <div className="mb-20 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
            <div>
              <p className="eyebrow text-acid font-mono tracking-[0.25em]">
                (SELECTED COMMISSIONS // 005)
              </p>
              <h2 className="display mt-3 text-4xl leading-tight md:text-7xl lg:text-8xl">
                WORK THAT MOVES
                <br />
                <span className="text-acid">THE NEEDLE.</span>
              </h2>
            </div>
            <div>
              <Link
                to="/work"
                data-cursor="cta"
                className="eyebrow link-underline flex items-center gap-2 font-mono text-foreground hover:text-acid"
              >
                VIEW FULL ARCHIVE <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="space-y-36 md:space-y-48">
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                PROJECT 01: MERIDIAN COFFEE — Large Image + Text Overlay
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <article className="group relative">
              <div
                data-cursor="case-study"
                onClick={() => openProjectModal(p1, meridianImg)}
                className="relative cursor-pointer select-none overflow-hidden border border-border/60 bg-ink"
              >
                {/* Large Hero Image with Hover Grain & Scale */}
                <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[21/10]">
                  <img
                    src={meridianImg}
                    alt={p1.name}
                    className="size-full object-cover saturate-[0.85] transition-all duration-[900ms] ease-out group-hover:scale-105 group-hover:saturate-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div className="grain-layer opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                </div>

                {/* Overlay Typographic Composition */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-14">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow font-mono text-xs text-acid bg-ink/80 px-3 py-1.5 border border-border">
                      01 // {p1.industry} • {p1.year}
                    </span>
                    <span className="eyebrow hidden font-mono text-xs text-foreground/70 md:inline-block bg-ink/70 px-3 py-1.5 border border-border">
                      MOTIF: {p1.accentWord}
                    </span>
                  </div>

                  <div>
                    <h3 className="display text-5xl leading-none text-foreground md:text-8xl lg:text-9xl transition-transform duration-500 group-hover:-translate-y-2">
                      {p1.name}
                      <span className="text-acid">.</span>
                    </h3>
                    <div className="mt-4 flex flex-wrap items-end justify-between gap-6 border-t border-border/40 pt-4">
                      <p className="max-w-xl font-mono text-sm text-foreground/80 leading-relaxed">
                        {p1.summary}
                      </p>
                      <button
                        type="button"
                        className="eyebrow flex items-center gap-2 bg-acid px-5 py-2.5 font-mono text-xs font-bold text-ink hover:bg-foreground"
                      >
                        EXPLORE CASE STUDY <ArrowUpRight className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                PROJECT 02: ATLAS FITNESS — High-Contrast Split Screen
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <article className="group grid gap-8 md:grid-cols-12 items-center">
              {/* Left Column: Image with Subtle Angled Shadow */}
              <div
                data-cursor="case-study"
                onClick={() => openProjectModal(p2, atlasImg)}
                className="relative cursor-pointer select-none md:col-span-7 overflow-hidden border border-border/80 bg-ink"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={atlasImg}
                    alt={p2.name}
                    className="size-full object-cover saturate-[0.8] transition-all duration-700 ease-out group-hover:scale-105 group-hover:saturate-100"
                  />
                  <div className="grain-layer opacity-25" />
                </div>
                <div className="absolute left-4 top-4 bg-ink/90 px-3 py-1.5 font-mono text-xs text-acid border border-border">
                  02 // SPLIT VIEW
                </div>
              </div>

              {/* Right Column: Editorial Details */}
              <div className="md:col-span-5 md:pl-6 space-y-6">
                <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
                  <span className="text-acid font-bold">02 //</span>
                  <span>{p2.industry}</span>
                  <span>•</span>
                  <span>{p2.year}</span>
                </div>

                <h3 className="display text-5xl leading-none text-foreground md:text-6xl lg:text-7xl">
                  {p2.name}
                  <span className="text-acid">.</span>
                </h3>

                <div className="border-l-2 border-acid pl-4 font-mono text-xs space-y-2">
                  <p className="text-muted-foreground">CHALLENGE:</p>
                  <p className="text-foreground/90">{p2.chapters[0]?.body}</p>
                </div>

                <div className="border-l-2 border-border pl-4 font-mono text-xs space-y-2">
                  <p className="text-muted-foreground">STRATEGY:</p>
                  <p className="text-foreground/90">{p2.chapters[1]?.body}</p>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    type="button"
                    data-cursor="case-study"
                    onClick={() => openProjectModal(p2, atlasImg)}
                    className="eyebrow inline-flex items-center gap-2 border border-acid bg-acid px-6 py-3 font-mono text-xs font-bold text-ink transition-colors hover:bg-foreground"
                  >
                    VIEW STUDY <ArrowUpRight className="size-4" />
                  </button>
                  <span className="font-mono text-xs text-foreground/50">
                    SERVICES: {p2.services.slice(0, 2).join(", ")}
                  </span>
                </div>
              </div>
            </article>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                PROJECT 03: NOVA INTERIORS — Asymmetrical Floating Composition
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <article className="group relative">
              <div className="grid gap-8 lg:grid-cols-12 items-center">
                {/* Left Meta & Narrative */}
                <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
                  <span className="font-mono text-xs text-acid font-bold">
                    03 // {p3.industry} • {p3.year}
                  </span>
                  <h3 className="display text-5xl leading-none text-foreground md:text-7xl">
                    {p3.name}
                    <span className="text-acid">.</span>
                  </h3>
                  <p className="font-mono text-sm leading-relaxed text-foreground/80">
                    {p3.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-4 border-t border-border pt-4 font-mono text-xs">
                    <div>
                      <p className="text-muted-foreground">CORE SERVICES:</p>
                      <p className="text-foreground/90 mt-1">{p3.services.join(" • ")}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">STRATEGIC FOCUS:</p>
                      <p className="text-acid mt-1">{p3.accentWord}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    data-cursor="case-study"
                    onClick={() => openProjectModal(p3, novaImg)}
                    className="eyebrow inline-flex items-center gap-2 bg-acid px-6 py-3 font-mono text-xs font-bold text-ink hover:bg-foreground"
                  >
                    INSPECT ARCHITECTURE <ArrowUpRight className="size-4" />
                  </button>
                </div>

                {/* Right: Floating Angled Gallery Canvas */}
                <div
                  data-cursor="case-study"
                  onClick={() => openProjectModal(p3, novaImg)}
                  className="lg:col-span-7 relative cursor-pointer select-none order-1 lg:order-2"
                >
                  <div className="relative aspect-[16/11] overflow-hidden border border-border bg-ink shadow-2xl transition-transform duration-700 group-hover:rotate-1 group-hover:scale-[1.02]">
                    <img
                      src={novaImg}
                      alt={p3.name}
                      className="size-full object-cover saturate-[0.8] transition-all duration-700 group-hover:saturate-100"
                    />
                    <div className="grain-layer opacity-20" />
                  </div>
                </div>
              </div>
            </article>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                PROJECT 04: HARBOUR FESTIVAL — Giant Interwoven Typography + Cropped Image
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <article className="group relative">
              {/* Massive Background Typography */}
              <div
                aria-hidden="true"
                className="pointer-events-none select-none text-center font-display text-[14vw] font-bold leading-none text-foreground/10"
              >
                HARBOUR FEST
              </div>

              {/* Foreground Image Overlap */}
              <div
                data-cursor="case-study"
                onClick={() => openProjectModal(p4, harbourImg)}
                className="relative -mt-[6vw] mx-auto cursor-pointer select-none max-w-5xl overflow-hidden border border-border bg-ink shadow-2xl"
              >
                <div className="relative aspect-[21/9] w-full overflow-hidden">
                  <img
                    src={harbourImg}
                    alt={p4.name}
                    className="size-full object-cover saturate-[0.85] transition-all duration-700 group-hover:scale-105 group-hover:saturate-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 p-6 md:p-8 bg-[#101015]">
                  <div>
                    <span className="font-mono text-xs text-acid">04 // CULTURE & EVENTS</span>
                    <h4 className="display text-3xl text-foreground md:text-4xl mt-1">
                      {p4.name} — THE CROWD PARADOX
                    </h4>
                  </div>
                  <button
                    type="button"
                    className="eyebrow flex items-center gap-2 bg-acid px-6 py-3 font-mono text-xs font-bold text-ink hover:bg-foreground"
                  >
                    READ FESTIVAL STUDY <ArrowUpRight className="size-4" />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Cinematic Fullscreen Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        imageSrc={modalImage}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
