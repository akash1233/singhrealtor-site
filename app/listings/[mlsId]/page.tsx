import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingDisclaimer } from "@/components/listings/ListingDisclaimer";
import { ListingImage } from "@/components/listings/ListingImage";
import { PageContent } from "@/components/layout/PageHero";
import { formatCurrency } from "@/lib/utils";
import { getListing, isListingsConfigured } from "@/lib/simplyrets";
import { getStaticListings } from "@/lib/listings-fallback";

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mlsId: string }>;
}): Promise<Metadata> {
  const { mlsId } = await params;
  const listing = await resolveListing(mlsId);
  if (!listing) return { title: "Listing Not Found" };

  return {
    title: `${listing.address}, ${listing.city}`,
    description: `${formatCurrency(listing.price)} — ${listing.beds} bed, ${listing.baths} bath home in ${listing.city}, ${listing.state}.`,
  };
}

async function resolveListing(mlsId: string) {
  if (isListingsConfigured()) {
    const mls = await getListing(mlsId);
    if (mls) return mls;
  }
  return getStaticListings().find((l) => l.mlsId === mlsId) ?? null;
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ mlsId: string }>;
}) {
  const { mlsId } = await params;
  const listing = await resolveListing(mlsId);

  if (!listing) notFound();

  const bathsDisplay =
    Number.isInteger(listing.baths) ? String(listing.baths) : listing.baths.toFixed(1);

  return (
    <PageContent className="pt-28">
      <Link
        href="/listings"
        className="text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-navy-900"
      >
        ← Back to listings
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          {listing.photos.length > 0 ? (
            listing.photos.slice(0, 6).map((photo, i) => (
              <div key={photo} className="overflow-hidden">
                <ListingImage
                  src={photo}
                  alt={`${listing.address} photo ${i + 1}`}
                  className="w-full object-cover"
                  priority={i === 0}
                />
              </div>
            ))
          ) : (
            <ListingImage
              src={listing.image}
              alt={listing.address}
              className="w-full object-cover"
              priority
            />
          )}
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-600">
            {listing.status}
          </p>
          <h1 className="mt-3 font-heading text-3xl font-light text-navy-900 sm:text-4xl">
            {listing.address}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {listing.city}, {listing.state} {listing.zip}
          </p>
          <p className="mt-6 font-heading text-3xl font-medium text-navy-900">
            {formatCurrency(listing.price)}
          </p>
          <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">
            {listing.beds} BD / {bathsDisplay} BA /{" "}
            {listing.sqft > 0 ? listing.sqft.toLocaleString() : "—"} SQFT
          </p>

          <div className="mt-10 border border-border bg-cream-50 p-6">
            <h2 className="font-heading text-lg text-navy-900">
              Interested in this home?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Contact Shweta to schedule a showing or ask questions about this
              property.
            </p>
            <Link
              href={`/contact?listing=${listing.mlsId}`}
              className="mt-4 inline-flex h-11 items-center bg-navy-900 px-8 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-navy-800"
            >
              Request a Showing
            </Link>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            MLS# {listing.mlsId}
          </p>
        </div>
      </div>

      <ListingDisclaimer />
    </PageContent>
  );
}
