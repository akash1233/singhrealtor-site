import {
  type Listing,
  type ListingQuery,
  SimplyRetsListSchema,
  SimplyRetsListingSchema,
} from "./schemas";

const SIMPLYRETS_API = "https://api.simplyrets.com/properties";

/** Northeast Atlanta suburban markets Shweta serves */
export const DEFAULT_LISTING_CITIES = [
  "Buford",
  "Suwanee",
  "Duluth",
  "Lawrenceville",
  "Sugar Hill",
  "Cumming",
  "Dacula",
  "Peachtree Corners",
  "Flowery Branch",
] as const;

export const DEFAULT_LISTING_COUNTIES = ["Gwinnett", "Forsyth"] as const;

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80";

export function isListingsConfigured(): boolean {
  return Boolean(
    process.env.SIMPLYRETS_KEY && process.env.SIMPLYRETS_SECRET
  );
}

function getAuthHeader(): string {
  const key = process.env.SIMPLYRETS_KEY ?? "";
  const secret = process.env.SIMPLYRETS_SECRET ?? "";
  const encoded =
    typeof Buffer !== "undefined"
      ? Buffer.from(`${key}:${secret}`).toString("base64")
      : btoa(`${key}:${secret}`);
  return `Basic ${encoded}`;
}

function toQueryString(params: Record<string, string | number | undefined>): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  }
  return parts.join("&");
}

function normalizeListing(
  raw: ReturnType<typeof SimplyRetsListingSchema.parse>
): Listing {
  const photos = raw.photos ?? [];
  const bathsFull = raw.property?.bathsFull ?? 0;
  const bathsHalf = raw.property?.bathsHalf ?? 0;

  return {
    mlsId: raw.mlsId,
    address: raw.address?.deliveryLine ?? "Address available on request",
    city: raw.address?.city ?? "",
    state: raw.address?.state ?? "GA",
    zip: raw.address?.postalCode ?? "",
    price: raw.listPrice ?? 0,
    beds: raw.property?.bedrooms ?? 0,
    baths: bathsFull + bathsHalf * 0.5,
    sqft: raw.property?.area ?? 0,
    photos,
    image: photos[0] ?? PLACEHOLDER_IMAGE,
    status: raw.mls?.status ?? "Active",
  };
}

function buildDefaultParams(query: ListingQuery = {}): Record<string, string | number> {
  const cities =
    query.cities ??
    process.env.SIMPLYRETS_DEFAULT_CITIES ??
    DEFAULT_LISTING_CITIES.join(",");

  const params: Record<string, string | number | undefined> = {
    status: query.status ?? "Active",
    cities,
    counties:
      process.env.SIMPLYRETS_DEFAULT_COUNTIES ??
      DEFAULT_LISTING_COUNTIES.join(","),
    limit: query.limit ?? 24,
    offset: query.offset ?? 0,
    sort: query.sort ?? "listdate",
    sortdir: query.sortdir ?? "desc",
    minprice: query.minprice,
    maxprice: query.maxprice,
    minbeds: query.minbeds,
    maxbeds: query.maxbeds,
    minbaths: query.minbaths,
    zipcodes: query.zipcodes,
  };

  return Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined)
  ) as Record<string, string | number>;
}

export async function getListings(query: ListingQuery = {}): Promise<Listing[]> {
  if (!isListingsConfigured()) {
    return [];
  }

  const qs = toQueryString(buildDefaultParams(query));
  const response = await fetch(`${SIMPLYRETS_API}?${qs}`, {
    headers: {
      Authorization: getAuthHeader(),
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`SimplyRETS error ${response.status}: ${body}`);
  }

  const json = await response.json();
  const parsed = SimplyRetsListSchema.parse(json);
  return parsed.map(normalizeListing);
}

export async function getListing(mlsId: string): Promise<Listing | null> {
  if (!isListingsConfigured()) {
    return null;
  }

  const response = await fetch(
    `${SIMPLYRETS_API}/${encodeURIComponent(mlsId)}`,
    {
      headers: {
        Authorization: getAuthHeader(),
        Accept: "application/json",
      },
      next: { revalidate: 1800 },
    }
  );

  if (response.status === 404) return null;
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`SimplyRETS error ${response.status}: ${body}`);
  }

  const json = await response.json();
  const parsed = SimplyRetsListingSchema.parse(json);
  return normalizeListing(parsed);
}

export async function getFeaturedListings(limit = 6): Promise<Listing[]> {
  return getListings({ limit, sort: "listdate", sortdir: "desc" });
}
