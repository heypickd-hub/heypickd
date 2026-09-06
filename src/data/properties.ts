export interface Property {
  id: string;
  name: string;
  location: string;
  slug: string;
}

const placeholderProperties: Property[] = [
  {
    id: "property-1",
    name: "name",
    location: "location",
    slug: "property-1",
  },
];

function loadProperties(): Property[] {
  const rawProperties = import.meta.env.VITE_PICKD_PROPERTIES_JSON;
  if (!rawProperties) return placeholderProperties;

  try {
    const parsed: unknown = JSON.parse(rawProperties);
    if (!Array.isArray(parsed)) return placeholderProperties;

    const validProperties = parsed.filter(
      (property): property is Property =>
        typeof property === "object" &&
        property !== null &&
        typeof property.id === "string" &&
        typeof property.name === "string" &&
        typeof property.location === "string" &&
        typeof property.slug === "string",
    );

    return validProperties.length > 0 ? validProperties : placeholderProperties;
  } catch {
    return placeholderProperties;
  }
}

export const PROPERTIES = loadProperties();

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
  const branchNumber = clean.match(/\d+/)?.[0];
  if (branchNumber) return PROPERTIES[Number(branchNumber) - 1] ?? PROPERTIES[0];

  // Default to first property
  return PROPERTIES[0];
}

export function getDefaultProperty(): Property {
  return PROPERTIES[0]!;
}
