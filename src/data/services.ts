// SAMPLE DATA — illustrative listings for the design demo only.

export type AreaSlug = "plymouth" | "exeter" | "torbay" | "devon" | "cornwall";

export const AREAS: { slug: AreaSlug; name: string; blurb: string }[] = [
  { slug: "plymouth", name: "Plymouth", blurb: "Ocean city support, groups and helplines." },
  { slug: "exeter", name: "Exeter", blurb: "City services, sanctuary and food support." },
  { slug: "torbay", name: "Torbay", blurb: "Torquay, Paignton and Brixham services." },
  { slug: "devon", name: "Devon", blurb: "North, South, East and West Devon." },
  { slug: "cornwall", name: "Cornwall", blurb: "Support across the Duchy, town to coast." },
];

export const CATEGORIES = [
  "Crisis support",
  "Mental health",
  "Young adults",
  "Older people",
  "Food support",
  "Activities & groups",
  "Counselling",
  "Recovery & addiction",
  "Refugees & sanctuary",
  "Community",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const DEVON_REGIONS = ["North Devon", "South Devon", "East Devon", "West Devon"] as const;

export type Service = {
  id: string;
  name: string;
  category: Category;
  area: AreaSlug;
  region?: (typeof DEVON_REGIONS)[number];
  description: string;
  phone: string;
  website: string;
  updated: string; // ISO date
  openNow?: boolean;
};

let n = 0;
const s = (o: Omit<Service, "id" | "updated"> & { updated?: string }): Service => ({
  id: `svc-${++n}`,
  updated: o.updated ?? "2026-07-01",
  ...o,
});

export const SERVICES: Service[] = [
  // Plymouth
  s({ name: "Plymouth Wellbeing Hub", category: "Mental health", area: "plymouth", description: "Drop-in wellbeing space offering a listening ear, peer support and signposting.", phone: "01752 000 101", website: "https://example.org", updated: "2026-07-18", openNow: true }),
  s({ name: "Ocean City Crisis Café", category: "Crisis support", area: "plymouth", description: "Evening safe space for adults feeling overwhelmed. No appointment needed.", phone: "01752 000 102", website: "https://example.org", updated: "2026-07-22" }),
  s({ name: "Waterfront Counselling", category: "Counselling", area: "plymouth", description: "Low-cost one-to-one counselling with qualified, caring practitioners.", phone: "01752 000 103", website: "https://example.org", updated: "2026-07-10", openNow: true }),
  s({ name: "Plymouth Young Minds", category: "Young adults", area: "plymouth", description: "Support groups and mentoring for 16–25 year olds.", phone: "01752 000 104", website: "https://example.org", updated: "2026-07-05" }),
  s({ name: "Hoe Community Pantry", category: "Food support", area: "plymouth", description: "Weekly pantry with fresh and store-cupboard food for local families.", phone: "01752 000 105", website: "https://example.org", updated: "2026-07-14" }),
  s({ name: "Soul Singers CIC", category: "Activities & groups", area: "plymouth", description: "Friendly community singing for wellbeing. No experience needed.", phone: "01752 000 106", website: "https://example.org", updated: "2026-07-20", openNow: true }),
  s({ name: "Navigate Charity", category: "Community", area: "plymouth", description: "Practical help finding your way to local services and support.", phone: "01752 000 107", website: "https://example.org", updated: "2026-07-08" }),
  s({ name: "New Hope Counselling", category: "Counselling", area: "plymouth", description: "Person-centred counselling for adults, in person or online.", phone: "01752 000 108", website: "https://example.org", updated: "2026-07-12" }),
  // Exeter
  s({ name: "Age UK Exeter", category: "Older people", area: "exeter", description: "Friendship, advice and day services for older people in Exeter.", phone: "01392 000 201", website: "https://www.ageuk.org.uk/exeter/", updated: "2026-07-16", openNow: true }),
  s({ name: "ECI", category: "Community", area: "exeter", description: "Community projects connecting people and reducing isolation.", phone: "01392 000 202", website: "https://www.eci.org.uk/", updated: "2026-07-03" }),
  s({ name: "Exeter City of Sanctuary", category: "Refugees & sanctuary", area: "exeter", description: "Welcome, friendship and practical help for people seeking sanctuary.", phone: "01392 000 203", website: "https://exeter.cityofsanctuary.org/", updated: "2026-07-19" }),
  s({ name: "Balloons Charity Devon", category: "Young adults", area: "exeter", description: "Bereavement support for children and young people.", phone: "01392 000 204", website: "https://www.facebook.com/BalloonsCharityDevon/", updated: "2026-07-09" }),
  s({ name: "FoodCycle Exeter", category: "Food support", area: "exeter", description: "Free, warm community meals made from surplus food. Everyone welcome.", phone: "01392 000 205", website: "https://foodcycle.org.uk/location/foodcycle-exeter/", updated: "2026-07-21", openNow: true }),
  s({ name: "Exeter Talking Space", category: "Mental health", area: "exeter", description: "Peer-led wellbeing groups for adults living with anxiety or low mood.", phone: "01392 000 206", website: "https://example.org", updated: "2026-07-11" }),
  s({ name: "Riverside Recovery Group", category: "Recovery & addiction", area: "exeter", description: "Weekly recovery meetings in a friendly, non-judgemental space.", phone: "01392 000 207", website: "https://example.org", updated: "2026-07-06" }),
  // Torbay
  s({ name: "Heart of Torbay", category: "Community", area: "torbay", description: "Community care and connection across the bay.", phone: "01803 000 301", website: "https://www.facebook.com/heartoftorbay/", updated: "2026-07-15" }),
  s({ name: "Healthwatch Torbay", category: "Mental health", area: "torbay", description: "Share your experience of health and care and get information.", phone: "01803 000 302", website: "https://healthwatchtorbay.org.uk/", updated: "2026-07-17", openNow: true }),
  s({ name: "Torbay Council Support", category: "Community", area: "torbay", description: "Local council help with housing, wellbeing and community services.", phone: "01803 000 303", website: "https://www.torbay.gov.uk/", updated: "2026-07-02" }),
  s({ name: "Torbay Food Alliance", category: "Food support", area: "torbay", description: "A network of food projects making sure no one goes hungry.", phone: "01803 000 304", website: "https://www.torbayfoodalliance.org/", updated: "2026-07-13" }),
  s({ name: "Age UK Torbay", category: "Older people", area: "torbay", description: "Information, advice and friendship for older people.", phone: "01803 000 305", website: "https://www.ageuk.org.uk/torbay/", updated: "2026-07-07" }),
  s({ name: "Bayside Crisis Line", category: "Crisis support", area: "torbay", description: "Out-of-hours listening line for anyone struggling to cope.", phone: "01803 000 306", website: "https://example.org", updated: "2026-07-20", openNow: true }),
  s({ name: "Paignton Art for Wellbeing", category: "Activities & groups", area: "torbay", description: "Relaxed creative sessions to unwind and meet others.", phone: "01803 000 307", website: "https://example.org", updated: "2026-07-04" }),
  // Devon
  s({ name: "Devon Mind", category: "Mental health", area: "devon", region: "South Devon", description: "Mental health support, groups and advice across Devon.", phone: "01626 000 401", website: "https://www.devonmind.com/", updated: "2026-07-18", openNow: true }),
  s({ name: "Recovery Devon", category: "Recovery & addiction", area: "devon", region: "East Devon", description: "Lived-experience recovery community and resources.", phone: "01395 000 402", website: "https://recoverydevon.co.uk/", updated: "2026-07-12" }),
  s({ name: "Bro Project", category: "Mental health", area: "devon", region: "West Devon", description: "Peer support groups for men's mental health.", phone: "01822 000 403", website: "https://www.broproject.org.uk/", updated: "2026-07-16" }),
  s({ name: "North Devon Listening Post", category: "Crisis support", area: "devon", region: "North Devon", description: "A calm space to talk when things feel too much.", phone: "01271 000 404", website: "https://example.org", updated: "2026-07-09" }),
  s({ name: "Tavistock Walking Group", category: "Activities & groups", area: "devon", region: "West Devon", description: "Gentle moorland walks for fresh air and friendly chat.", phone: "01822 000 405", website: "https://example.org", updated: "2026-07-05" }),
  s({ name: "Honiton Community Larder", category: "Food support", area: "devon", region: "East Devon", description: "Affordable food and a warm welcome every Thursday.", phone: "01404 000 406", website: "https://example.org", updated: "2026-07-14" }),
  s({ name: "Barnstaple Youth Space", category: "Young adults", area: "devon", region: "North Devon", description: "Youth workers, activities and support for 13–25s.", phone: "01271 000 407", website: "https://example.org", updated: "2026-07-21", openNow: true }),
  s({ name: "Totnes Talking Therapies", category: "Counselling", area: "devon", region: "South Devon", description: "Short-term talking therapy for anxiety and low mood.", phone: "01803 000 408", website: "https://example.org", updated: "2026-07-03" }),
  // Cornwall
  s({ name: "Bro Project Cornwall", category: "Mental health", area: "cornwall", description: "Men's peer support circles in towns across Cornwall.", phone: "01872 000 501", website: "https://www.broproject.org.uk/", updated: "2026-07-19" }),
  s({ name: "Kernow Crisis Support", category: "Crisis support", area: "cornwall", description: "Listening support and safety planning when life feels hard.", phone: "01872 000 502", website: "https://example.org", updated: "2026-07-22", openNow: true }),
  s({ name: "Truro Counselling Collective", category: "Counselling", area: "cornwall", description: "Sliding-scale counselling with warm, qualified counsellors.", phone: "01872 000 503", website: "https://example.org", updated: "2026-07-08" }),
  s({ name: "Coastal Wellbeing Swims", category: "Activities & groups", area: "cornwall", description: "Supported sea-dipping groups for mental wellbeing.", phone: "01736 000 504", website: "https://example.org", updated: "2026-07-15" }),
  s({ name: "Falmouth Food Share", category: "Food support", area: "cornwall", description: "Free food share and a cuppa, no questions asked.", phone: "01326 000 505", website: "https://example.org", updated: "2026-07-11" }),
  s({ name: "Cornwall Older Friends", category: "Older people", area: "cornwall", description: "Befriending calls and coffee mornings for older people.", phone: "01208 000 506", website: "https://example.org", updated: "2026-07-06" }),
  s({ name: "Penzance Recovery Café", category: "Recovery & addiction", area: "cornwall", description: "Alcohol-free café and peer recovery support.", phone: "01736 000 507", website: "https://example.org", updated: "2026-07-17" }),
];

export const PARTNERS: Record<AreaSlug, { name: string; url: string }[]> = {
  plymouth: [],
  exeter: [
    { name: "Age UK Exeter", url: "https://www.ageuk.org.uk/exeter/" },
    { name: "ECI", url: "https://www.eci.org.uk/" },
    { name: "Exeter City of Sanctuary", url: "https://exeter.cityofsanctuary.org/" },
    { name: "Balloons Charity Devon", url: "https://www.facebook.com/BalloonsCharityDevon/" },
    { name: "FoodCycle Exeter", url: "https://foodcycle.org.uk/location/foodcycle-exeter/" },
  ],
  torbay: [
    { name: "Heart of Torbay", url: "https://www.facebook.com/heartoftorbay/" },
    { name: "Healthwatch Torbay", url: "https://healthwatchtorbay.org.uk/" },
    { name: "Torbay Council", url: "https://www.torbay.gov.uk/" },
    { name: "Torbay Food Alliance", url: "https://www.torbayfoodalliance.org/" },
    { name: "Age UK Torbay", url: "https://www.ageuk.org.uk/torbay/" },
  ],
  devon: [
    { name: "Bro Project", url: "https://www.broproject.org.uk/" },
    { name: "Recovery Devon", url: "https://recoverydevon.co.uk/" },
    { name: "Devon Mind", url: "https://www.devonmind.com/" },
  ],
  cornwall: [
    { name: "Bro Project", url: "https://www.broproject.org.uk/" },
    { name: "Recovery Devon", url: "https://recoverydevon.co.uk/" },
    { name: "Devon Mind", url: "https://www.devonmind.com/" },
  ],
};

export const areaName = (slug: string) => AREAS.find((a) => a.slug === slug)?.name ?? slug;

export function filterServices(opts: { q?: string; area?: string; category?: string; region?: string }) {
  const q = (opts.q ?? "").trim().toLowerCase();
  return SERVICES.filter((svc) => {
    if (opts.area && opts.area !== "all" && svc.area !== opts.area) return false;
    if (opts.category && opts.category !== "all" && svc.category !== opts.category) return false;
    if (opts.region && opts.region !== "all" && svc.region !== opts.region) return false;
    if (!q) return true;
    const hay = `${svc.name} ${svc.category} ${svc.description} ${areaName(svc.area)} ${svc.region ?? ""}`.toLowerCase();
    return q.split(/\s+/).some((w) => w.length > 2 && hay.includes(w.replace(/s$/, ""))) || hay.includes(q);
  });
}
