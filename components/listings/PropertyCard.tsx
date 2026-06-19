import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { ListingImage } from "./ListingImage";

interface PropertyCardProps {
  mlsId?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  href?: string;
}

export function PropertyCard({
  mlsId,
  address,
  city,
  state,
  zip,
  price,
  beds,
  baths,
  sqft,
  image,
  href,
}: PropertyCardProps) {
  const link = href ?? (mlsId ? `/listings/${mlsId}` : "/contact");

  const bathsDisplay =
    Number.isInteger(baths) ? String(baths) : baths.toFixed(1);

  return (
    <Link
      href={link}
      className="group block overflow-hidden bg-cream-50 transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ListingImage
          src={image}
          alt={`${address}, ${city}`}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="border border-border/60 bg-white px-5 py-5">
        <p className="font-heading text-lg font-medium text-navy-900 transition-colors group-hover:text-gold-600">
          {address}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {city}, {state} {zip}
        </p>
        <p className="mt-3 font-heading text-xl font-medium text-navy-900">
          {formatCurrency(price)}
        </p>
        <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
          {beds} BD / {bathsDisplay} BA / {sqft > 0 ? sqft.toLocaleString() : "—"} SQFT
        </p>
      </div>
    </Link>
  );
}
