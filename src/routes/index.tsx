import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Comeback } from "@/components/sections/Comeback";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { AttentionMachine } from "@/components/sections/AttentionMachine";
import { ServicesList } from "@/components/sections/ServicesList";
import { WorkPreview } from "@/components/sections/WorkPreview";
import { Process } from "@/components/sections/Process";
import { AboutBlock } from "@/components/sections/AboutBlock";
import { WhyUs } from "@/components/sections/WhyUs";
import { CampaignWall } from "@/components/sections/CampaignWall";
import { Testimonials } from "@/components/sections/Testimonials";
import { Marquee } from "@/components/sections/Marquee";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { site } from "@/lib/site";

const title = `${site.name} — We Make Brands Hard To Ignore`;
const description =
  "Independent creative & performance marketing studio across India, UAE, and Global. Creative, Strategy, Performance, Branding, Digital, and Technology.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: IndexPage,
});

function IndexPage() {
  return (
    <SiteFrame>
      <h1 className="sr-only">
        {site.name} — Creative & Performance Marketing Studio
      </h1>

      {/* 1. INTRODUCTION: Immersive Hero + WebGL Chrome Sculpture */}
      <Hero />

      {/* 2. ATTENTION: Editorial Manifesto & Kinetic Number Counters */}
      <Stats />

      {/* 3. SIGNATURE MOMENT: "We don't follow attention. We create it." */}
      <Comeback />

      {/* 4. STRATEGIC SHIFT: Draggable Before / After Comparison */}
      <BeforeAfter />

      {/* 5. THE ATTENTION MACHINE: Proprietary 7-Stage Interactive Engine */}
      <AttentionMachine />

      {/* 6. CAPABILITIES: Vertical Interactive Service Index (9 Disciplines) */}
      <ServicesList />

      {/* 7. COMMISSIONS & CASE STUDIES: Editorial Flagship Studies */}
      <WorkPreview />

      {/* 8. METHODOLOGY: 6-Stage Pinned Horizontal Process */}
      <Process />

      {/* 9. HUMAN CRAFT: Human Manifesto & Team Philosophy */}
      <AboutBlock />

      {/* 10. THE UNIGNORABLE STANDARD: Why Us Manifesto */}
      <WhyUs />

      {/* 11. LIVE ARCHIVE: Multi-lane Campaign Wall */}
      <CampaignWall />

      {/* 12. PROOF OF IMPACT: Editorial Founder Testimonials */}
      <Testimonials />

      {/* 13. VELOCITY MARQUEE SYSTEM */}
      <Marquee />

      {/* 14. ENORMOUS "LET'S TALK" FINALE */}
      <FinalCTA />
    </SiteFrame>
  );
}
