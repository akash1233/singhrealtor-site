import { Suspense } from "react";
import type { Metadata } from "next";
import { PropertyCard } from "@/components/listings/PropertyCard";
import { ListingDisclaimer } from "@/components/listings/ListingDisclaimer";
import { ListingFilters } from "@/components/listings/ListingFilters";
import { PageContent, PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchListings } from "@/lib/listings";
import { ListingQuerySchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Homes for Sale",
  description:
    "Browse active homes for sale in Northeast Atlanta suburbs — Buford, Suwanee, Duluth, Lawrenceville, and Gwinnett & Forsyth County.",
};

export const revalidate = 3600;

type SearchParams = Record<string, string | string[] | undefined>;

function parseListingQuery(params: SearchParams) {
  const raw: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") raw[key] = value;
  }
  return ListingQuerySchema.safeParse({ ...raw, limit: 48 });
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const parsed = parseListingQuery(params);
  const query = parsed.success ? parsed.data : { limit: 48 };

  const { listings, source } = await fetchListings(query);

  return (
    <>
      <PageHero
        title="Homes for Sale"
        subtitle="Active listings across Northeast Atlanta suburbs — updated from the MLS."
        image="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&q=80"
        imageAlt="Homes for sale in Northeast Atlanta"
      />
      <PageContent>
        <SectionHeading
          eyebrow="Search"
          title="Find your next home"
          subtitle={
            source === "mls"
              ? "Live MLS listings in Gwinnett & Forsyth County. Refreshed hourly."
              : "Showing sample listings — add SimplyRETS credentials for live MLS data."
          }
        />

        <Suspense fallback={<Skeleton className="mt-8 h-32 w-full rounded-xl" />}>
          <div className="mt-8">
            <ListingFilters />
          </div>
        </Suspense>

        <p className="mt-8 text-sm text-muted-foreground">
          {listings.length} home{listings.length !== 1 ? "s" : ""} found
        </p>

        {listings.length === 0 ? (
          <div className="mt-12 rounded-xl border border-border bg-cream-50 p-10 text-center">
            <p className="font-heading text-xl text-navy-900">No listings match your search</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your filters or{" "}
              <a href="/contact" className="text-navy-900 underline">
                contact us
              </a>{" "}
              for off-market options.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <PropertyCard key={listing.mlsId} {...listing} />
            ))}
          </div>
        )}

        <ListingDisclaimer />
      </PageContent>
    </>
  );
}
