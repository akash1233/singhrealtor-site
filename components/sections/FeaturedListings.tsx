import Link from "next/link";
import { PropertyCard } from "@/components/listings/PropertyCard";
import { SectionHeading } from "@/components/ui/section-heading";
import { fetchFeaturedListings } from "@/lib/listings";

export async function FeaturedListings() {
  const { listings, source } = await fetchFeaturedListings(6);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Featured Homes"
            title="Homes in Northeast Atlanta"
            subtitle={
              source === "mls"
                ? "Live MLS listings from Gwinnett & Forsyth County — refreshed hourly."
                : "Sample listings shown until MLS credentials are configured."
            }
          />
          <div className="flex gap-4">
            <Link
              href="/listings"
              className="text-xs font-medium uppercase tracking-[0.2em] text-navy-900 underline-offset-4 hover:underline"
            >
              View All Listings
            </Link>
            <Link
              href="/contact"
              className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground underline-offset-4 hover:text-navy-900 hover:underline"
            >
              Contact Shweta
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <PropertyCard key={listing.mlsId} {...listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
