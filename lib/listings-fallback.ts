import type { Listing } from "@/lib/schemas";
import { featuredListings as staticListings } from "@/lib/site-content";

export function staticListingToCard(
  listing: typeof staticListings[number]
): Listing {
  return {
    mlsId: listing.id,
    address: listing.address,
    city: listing.city,
    state: listing.state,
    zip: listing.zip,
    price: listing.price,
    beds: listing.beds,
    baths: listing.baths,
    sqft: listing.sqft,
    photos: [listing.image],
    image: listing.image,
    status: "Active",
  };
}

export function getStaticListings(limit?: number): Listing[] {
  const all = staticListings.map(staticListingToCard);
  return limit ? all.slice(0, limit) : all;
}
