export interface Testimonial {
  quote: string;
  client: string;
  role: string;
  company: string;
  impactMetric: string;
  avatarLetter: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "They dismantled our initial brief on day one. They showed us why our assumptions were losing us millions. Within 90 days of launch, our customer acquisition cost dropped 46% and brand search volume doubled.",
    client: "Arjun Rao",
    role: "Founder & CEO",
    company: "Meridian Artisan Roasters",
    impactMetric: "+312% Revenue Lift in Q1",
    avatarLetter: "A",
  },
  {
    quote: "Every agency promises 'creative performance'—UNIGNORABLE is the only team whose creative actually converted cold traffic on day one. They produced 45 film cuts that outperformed our entire previous year of ads.",
    client: "Maya Haddad",
    role: "Head of Growth",
    company: "Atlas Performance Group",
    impactMetric: "4.8x Return on Ad Spend",
    avatarLetter: "M",
  },
  {
    quote: "Our new digital platform won Site of the Day on Awwwards within 48 hours. But more importantly, high-net-worth architectural inquiries from Dubai and London spiked 280%. A truly bespoke masterclass.",
    client: "Stefan Lindqvist",
    role: "Design Principal",
    company: "Nova Spatial Architecture",
    impactMetric: "280% Inbound HNW Leads",
    avatarLetter: "S",
  },
  {
    quote: "They didn't just market our festival; they created a viral cultural frenzy. 45,000 tickets sold out in under four minutes. The recap content generated 28 million organic impressions.",
    client: "Elena Rostova",
    role: "Festival Director",
    company: "Harbour Sonic International",
    impactMetric: "100% Sellout in 3m 42s",
    avatarLetter: "E",
  },
];

export const clientLogos = [
  "MERIDIAN ROASTERS",
  "ATLAS ATHLETICS",
  "NOVA ARCHITECTURE",
  "HARBOUR SONIC",
  "KESTREL CAPITAL",
  "OKAPI STUDIOS",
  "NORTHBOUND LABS",
  "SALT & MINERAL",
  "VERDE BOTANICS",
  "LUMEN DIGITAL",
];
