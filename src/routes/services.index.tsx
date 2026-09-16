import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { ServicesList } from "@/components/sections/ServicesList";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SplitLines } from "@/components/Reveal";

const title = "Services — UNIGNORABLE";
const description =
  "Nine disciplines: performance marketing, social, Google Ads, Meta Ads, web, SEO, video, animation and event marketing.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <SiteFrame>
      <header className="edge pb-[4vh] pt-[24vh]">
        <p className="eyebrow text-muted-foreground">(NINE DISCIPLINES)</p>
        <h1 className="sr-only">Services</h1>
        <SplitLines
          text={"WE DON'T DO\nONE THING."}
          className="display mt-6 fluid-xl leading-[0.84] tracking-[-0.05em]"
        />
      </header>
      <ServicesList />
      <FinalCTA />
    </SiteFrame>
  );
}
