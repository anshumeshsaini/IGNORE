import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { AboutBlock } from "@/components/sections/AboutBlock";
import { Stats } from "@/components/sections/Stats";
import { Marquee } from "@/components/sections/Marquee";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SplitLines } from "@/components/Reveal";

const title = "About — UNIGNORABLE";
const description =
  "An independent studio of strategists, designers, developers, media buyers and storytellers turning attention into business.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteFrame>
      <header className="edge pb-[4vh] pt-[24vh]">
        <p className="eyebrow text-muted-foreground">(THE STUDIO)</p>
        <h1 className="sr-only">About</h1>
        <SplitLines
          text={"TURNING ATTENTION\nINTO BUSINESS."}
          className="display mt-6 fluid-xl leading-[0.84] tracking-[-0.05em]"
        />
      </header>
      <AboutBlock />
      <Stats />
      <Marquee />
      <FinalCTA />
    </SiteFrame>
  );
}
