export const site = {
  name: "UNIGNORABLE",
  tagline: "WE MAKE BRANDS HARD TO IGNORE.",
  description:
    "Independent creative & performance marketing studio across India, UAE, and Global. Creative, Strategy, Performance, Branding, Digital, and Technology.",
  email: "hello@unignorable.studio",
  phone: "+91 90000 00000",
  whatsappNumber: "919000000000",
  locations: ["INDIA", "UAE", "GLOBAL"],
  socials: [
    { label: "INSTAGRAM", href: "https://instagram.com" },
    { label: "LINKEDIN", href: "https://linkedin.com" },
  ],
} as const;

export const whatsappLink = (
  message = "Hi UNIGNORABLE — I'd like to start a project.",
): string => `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const mailtoLink = (subject = "New project enquiry"): string =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export const BUDGETS = [
  "₹25K–₹50K",
  "₹50K–₹1L",
  "₹1L–₹2L",
  "₹2L+",
] as const;

export const TIMELINES = [
  "Immediately / ASAP",
  "Within 1 Month",
  "1–3 Months",
  "Strategic Retainer",
] as const;

