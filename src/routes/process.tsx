import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { Process } from "@/components/sections/Process";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SplitLines } from "@/components/Reveal";

const title = "Process — UNIGNORABLE";
const description =
  "Discover, strategize, create, launch, scale — how we take a brand from brief to compounding growth.";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/process" }],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <SiteFrame>
      <header className="edge pb-[2vh] pt-[24vh]">
        <p className="eyebrow text-muted-foreground">(THE METHOD)</p>
        <h1 className="sr-only">Process</h1>
        <SplitLines
          text={"BRIEF TO\nCOMPOUNDING."}
          className="display mt-6 fluid-xl leading-[0.84] tracking-[-0.05em]"
        />
      </header>
      <Process />
      <FinalCTA />
    </SiteFrame>
  );
}
