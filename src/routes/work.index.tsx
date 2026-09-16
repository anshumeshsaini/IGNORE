import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { WorkPreview } from "@/components/sections/WorkPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SplitLines } from "@/components/Reveal";

const title = "Work — UNIGNORABLE";
const description =
  "Selected case studies: brand films, performance engines and products built to move the needle.";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkIndex,
});

function WorkIndex() {
  return (
    <SiteFrame>
      <header className="edge pb-[6vh] pt-[24vh]">
        <p className="eyebrow text-muted-foreground">(SELECTED WORK — DEMO PROJECTS)</p>
        <h1 className="sr-only">Work</h1>
        <SplitLines
          text={"PROOF, NOT\nPROMISES."}
          className="display mt-6 fluid-xl leading-[0.84] tracking-[-0.05em]"
        />
      </header>
      <WorkPreview />
      <FinalCTA />
    </SiteFrame>
  );
}
