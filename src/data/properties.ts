export interface Property {
  id: string;
  name: string;
  location: string;
  slug: string;
}

export const PROPERTIES: Property[] = [
  {
    id: "redstone-nungambakkam",
    name: "RedStone Hotel",
    location: "Nungambakkam, Chennai",
    slug: "redstone-nungambakkam",
  },
  {
    id: "redstone-tnagar",
    name: "RedStone Service Apt",
    location: "T. Nagar, Chennai",
    slug: "redstone-tnagar",
  },
  {
    id: "redfox-tnagar",
    name: "RedFox Hotel",
    location: "T. Nagar, Chennai",
    slug: "redfox-tnagar",
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

  // 2. Loose match against name or location
  const nameMatch = PROPERTIES.find(
    (p) =>
      p.name.toLowerCase().includes(clean) ||
      p.location.toLowerCase().includes(clean) ||
      clean.includes(p.slug.replace(/-/g, " ")),
  );
  if (nameMatch) return nameMatch;

  // 3. Aliases like branch-1, branch-2, branch-3
  if (clean.includes("1")) return PROPERTIES[0];
  if (clean.includes("2")) return PROPERTIES[1];
  if (clean.includes("3")) return PROPERTIES[2];

  // Default to first property
  return PROPERTIES[0];
}

export function getDefaultProperty(): Property {
  return PROPERTIES[0]!;
}
