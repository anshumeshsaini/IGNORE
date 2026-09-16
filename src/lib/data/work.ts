import meridianImg from "@/assets/meridian.jpg";
import atlasImg from "@/assets/atlas.jpg";
import novaImg from "@/assets/nova.jpg";
import harbourImg from "@/assets/harbour.jpg";

export interface CaseChapter {
  no: string;
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  name: string;
  industry: string;
  year: string;
  category: "Brand Direction" | "Digital Experience" | "Film & Motion" | "Performance";
  image: string;
  accentWord: string;
  heroMetric: string;
  services: string[];
  summary: string;
  chapters: CaseChapter[];
  results: { value: string; label: string }[];
}

export const projects: Project[] = [
  {
    slug: "meridian-coffee",
    name: "Meridian Coffee",
    industry: "Specialty F&B / Artisanal Retail",
    year: "2026",
    category: "Brand Direction",
    image: meridianImg,
    accentWord: "RITUAL",
    heroMetric: "+312% DIRECT REVENUE",
    services: ["Brand Film", "Art Direction", "Packaging", "Performance Launch"],
    summary: "Rebuilding a specialty coffee roaster into a sacred morning ritual, multiplying direct-to-consumer sales 3.1x.",
    chapters: [
      {
        no: "01",
        title: "The Problem",
        body: "Meridian had legendary beans but a sterile brand that looked like every other hipster cafe in Brooklyn and Melbourne.",
      },
      {
        no: "02",
        title: "The Human Angle",
        body: "We stopped selling caffeine and started honoring the 12 quiet minutes before the noise of the world intrudes.",
      },
      {
        no: "03",
        title: "The Execution",
        body: "Shot on 35mm film at dawn, paired with tactile textured packaging and a micro-targeted paid acquisition engine.",
      },
      {
        no: "04",
        title: "The Impact",
        body: "Subscribers jumped from 1,200 to 8,900 in 90 days. Average order value climbed 41%.",
      },
    ],
    results: [
      { value: "+312%", label: "Direct Revenue" },
      { value: "-46%", label: "Customer Acq. Cost" },
      { value: "9.2x", label: "ROAS on Film Ads" },
    ],
  },
  {
    slug: "atlas-fitness",
    name: "Atlas Athletics",
    industry: "High-Performance Fitness / Apparel",
    year: "2025",
    category: "Performance",
    image: atlasImg,
    accentWord: "DISCIPLINE",
    heroMetric: "4.8X TRIAL CONVERSION",
    services: ["High-Octane Film", "Meta Performance Engine", "Web Experience"],
    summary: "A brutalist performance fitness movement that scrapped price discounts and built an unapologetic cult following.",
    chapters: [
      {
        no: "01",
        title: "The Problem",
        body: "Tired discount promotions were diluting brand equity and attracting high-churn bargain hunters.",
      },
      {
        no: "02",
        title: "The Human Angle",
        body: "People don't want easy workouts. They want the triumph of enduring what others quit.",
      },
      {
        no: "03",
        title: "The Execution",
        body: "High-contrast cinematic films of real athletes breaking through barriers, matched with an instant frictionless digital booking flow.",
      },
      {
        no: "04",
        title: "The Impact",
        body: "Highest annual member retention in company history at 88.4%, with zero discount campaigns.",
      },
    ],
    results: [
      { value: "4.8x", label: "Trial Conversion" },
      { value: "$1.4M", label: "New ARR Added" },
      { value: "88.4%", label: "12-Mo Retention" },
    ],
  },
  {
    slug: "nova-interiors",
    name: "Nova Architecture",
    industry: "Luxury Brutalism & Spatial Design",
    year: "2025",
    category: "Digital Experience",
    image: novaImg,
    accentWord: "RESTRAINT",
    heroMetric: "AWWWARDS SITE OF DAY",
    services: ["Editorial Architecture", "WebGL Interactivity", "Technical SEO"],
    summary: "A monolithic, cinematic digital portfolio for an elite architecture studio commanding eight-figure residential builds.",
    chapters: [
      {
        no: "01",
        title: "The Problem",
        body: "World-class architectural projects trapped inside a clunky WordPress site that took seven seconds to load.",
      },
      {
        no: "02",
        title: "The Human Angle",
        body: "Treat digital space with the same volumetric gravity and serene restraint as raw travertine stone.",
      },
      {
        no: "03",
        title: "The Execution",
        body: "Sub-second page transitions, full-screen architectural photography, and fluid interactive floor-plan explorations.",
      },
      {
        no: "04",
        title: "The Impact",
        body: "Awarded Site of the Day, driving high-net-worth private client inquiries from London, Dubai, and Zurich.",
      },
    ],
    results: [
      { value: "0.4s", label: "Global Load Time" },
      { value: "+280%", label: "Qualified Leads" },
      { value: "3x", label: "Awwwards Honors" },
    ],
  },
  {
    slug: "harbour-festival",
    name: "Harbour Sonic",
    industry: "Nocturnal Arts & Electronic Culture",
    year: "2024",
    category: "Film & Motion",
    image: harbourImg,
    accentWord: "EUPHORIA",
    heroMetric: "45,000 TICKETS SOLD OUT",
    services: ["Spatial Direction", "Live Capture Crews", "Viral Social Engine"],
    summary: "Transforming an annual city festival into an electrifying cultural phenomenon that sold out in under 4 minutes.",
    chapters: [
      {
        no: "01",
        title: "The Problem",
        body: "The festival had incredible artist lineups but lacked a cohesive visual universe and sold tickets too slowly.",
      },
      {
        no: "02",
        title: "The Human Angle",
        body: "Design for the memory. Build sensory capture into every stage so attendees become the broadcast network.",
      },
      {
        no: "03",
        title: "The Execution",
        body: "3 continuous film teams, real-time stage recap cutdowns within 90 minutes of performance, and hyper-amplified TikTok feeds.",
      },
      {
        no: "04",
        title: "The Impact",
        body: "28 million total views across TikTok & Instagram, with Tier-1 sponsorships renewed at +140% value.",
      },
    ],
    results: [
      { value: "3m 42s", label: "Sellout Speed" },
      { value: "28M", label: "Organic Impressions" },
      { value: "+140%", label: "Sponsor Equity" },
    ],
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
