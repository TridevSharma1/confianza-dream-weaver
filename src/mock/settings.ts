// Global website settings: branding, SEO and homepage section ordering.
export const settings = {
  logoText: "Confianza",
  tagline: "Where Weddings Become Stories",
  theme: "luxury", // "luxury" | "light"
  seo: {
    title: "Confianza Event's and Entertainment | Luxury Wedding Planners in Pune",
    description:
      "Luxury wedding planning, decor, execution and destination weddings in Pune. Where weddings become stories.",
  },
  about: {
    story:
      "Confianza began in Pune with one belief — a wedding should feel like the couple, not like a catalogue. What started as a two-person decor studio now designs and executes celebrations across India, from intimate garden ceremonies to multi-day destination weddings.",
    mission:
      "To design personalised celebrations that are executed flawlessly, so families can be guests at their own wedding.",
    vision:
      "To be India's most trusted name in bespoke wedding design and destination celebrations.",
    values: ["Trust", "Craft", "Personalisation", "Punctuality", "Warmth"],
  },
  // Homepage sections — admin can toggle and reorder these
  sections: [
    { id: "hero", label: "Hero", enabled: true },
    { id: "about", label: "About", enabled: true },
    { id: "services", label: "Services", enabled: true },
    { id: "why", label: "Why Choose Us", enabled: true },
    { id: "portfolio", label: "Portfolio", enabled: true },
    { id: "process", label: "Wedding Process", enabled: true },
    { id: "stats", label: "Statistics", enabled: true },
    { id: "packages", label: "Packages", enabled: true },
    { id: "beforeafter", label: "Before / After Decor", enabled: true },
    { id: "testimonials", label: "Testimonials", enabled: true },
    { id: "logos", label: "Venue Partners", enabled: true },
    { id: "team", label: "Team", enabled: true },
    { id: "gallery", label: "Gallery", enabled: true },
    { id: "calculator", label: "Budget Calculator", enabled: true },
    { id: "calendar", label: "Event Calendar", enabled: true },
    { id: "faq", label: "FAQ", enabled: true },
    { id: "blog", label: "Blog", enabled: true },
    { id: "instagram", label: "Instagram", enabled: true },
    { id: "contact", label: "Contact", enabled: true },
  ],
};
