import type { Listing } from "@/lib/schemas";
import { getStaticListings } from "@/lib/listings-fallback";
import {
  getFeaturedListings,
  getListings,
  isListingsConfigured,
} from "@/lib/simplyrets";
import type { ListingQuery } from "@/lib/schemas";

export type ListingsSource = "mls" | "static";

export interface ListingsResult {
  listings: Listing[];
  source: ListingsSource;
}

export async function fetchListings(
  query: ListingQuery = {}
): Promise<ListingsResult> {
  if (!isListingsConfigured()) {
    return {
      listings: getStaticListings(query.limit ?? 24),
      source: "static",
    };
  }

  try {
    const listings = await getListings(query);
    return { listings, source: "mls" };
  } catch (error) {
    console.error("MLS fetch failed, using static fallback:", error);
    return {
      listings: getStaticListings(query.limit ?? 24),
      source: "static",
    };
  }
}

export async function fetchFeaturedListings(limit = 6): Promise<ListingsResult> {
  if (!isListingsConfigured()) {
    return { listings: getStaticListings(limit), source: "static" };
  }

  try {
    const listings = await getFeaturedListings(limit);
    if (listings.length === 0) {
      return { listings: getStaticListings(limit), source: "static" };
    }
    return { listings, source: "mls" };
  } catch (error) {
    console.error("Featured MLS fetch failed:", error);
    return { listings: getStaticListings(limit), source: "static" };
  }
}
