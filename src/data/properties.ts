export interface Property {
  id: string;
  name: string;
  location: string;
  slug: string;
}

export const PROPERTIES: Property[] = [
  {
    id: "redfox-tnagar",
    name: "RedFox Hotel T. Nagar",
    location: "T. Nagar, Chennai",
    slug: "redfox-tnagar",
  },
  {
    id: "redfox-omr",
    name: "RedFox Hotel OMR",
    location: "OMR, Kanchipuram, Chennai",
    slug: "redfox-omr",
  },
  {
    id: "pickd-hub-central",
    name: "Pickd Hub Central",
    location: "Central Stay, Chennai",
    slug: "pickd-hub-central",
  },
];

export function findProperty(query?: string | null): Property | undefined {
  if (!query) return undefined;
  const clean = query.trim().toLowerCase();

  // 1. Direct slug or ID match
  const direct = PROPERTIES.find(
    (p) => p.id.toLowerCase() === clean || p.slug.toLowerCase() === clean,
  );
  if (direct) return direct;

  // 2. Name contains or slug converted match (e.g. "Branch 1", "T. Nagar")
  const nameMatch = PROPERTIES.find(
    (p) =>
      p.name.toLowerCase().includes(clean) ||
      p.location.toLowerCase().includes(clean) ||
      clean.includes(p.slug.replace(/-/g, " ")),
  );
  if (nameMatch) return nameMatch;

  // 3. Fallback to default first property if unknown branch
  return PROPERTIES[0];
}

export function getDefaultProperty(): Property {
  return PROPERTIES[0]!;
}
