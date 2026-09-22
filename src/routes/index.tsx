import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Comeback } from "@/components/sections/Comeback";
import { ServicesList } from "@/components/sections/ServicesList";
import { WorkPreview } from "@/components/sections/WorkPreview";
import { AboutBlock } from "@/components/sections/AboutBlock";
import { VideoSection } from "@/components/sections/VideoSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { Marquee } from "@/components/sections/Marquee";
import { Newsletter } from "@/components/sections/Newsletter";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CampaignGrid } from "@/components/sections/CampaignGrid";
import { EditorialMonolith } from "@/components/sections/EditorialMonolith";
import { SignalStrip } from "@/components/sections/SignalStrip";
import { site } from "@/lib/site";

const title = `${site.name} — We make brands impossible to ignore`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: site.description },
      { property: "og:title", content: title },
      { property: "og:description", content: site.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteFrame>
      <h1 className="sr-only">{site.name} — creative and performance studio</h1>
      <Hero />
      <SignalStrip />
      <CampaignGrid />
      <EditorialMonolith />
      <Stats />
      <Comeback />
      <ServicesList />
      <SignalStrip />
      <WorkPreview />
      <VideoSection />
      <AboutBlock />
      <Testimonials />
      <Marquee />
      <Newsletter />
      <FinalCTA />
    </SiteFrame>
  );
}
