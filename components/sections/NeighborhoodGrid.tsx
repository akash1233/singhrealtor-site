import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { neighborhoods } from "@/lib/site-content";

export function NeighborhoodGrid() {
  return (
    <section className="bg-cream-100 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          eyebrow="Communities"
          title="Neighborhoods We Serve"
          subtitle="Explore the Northeast Atlanta suburbs where Shweta helps buyers and sellers every day."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.map((n) => (
            <Link
              key={n.slug}
              href="/contact"
              className="group relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src={n.image}
                alt={n.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-heading text-2xl font-medium text-white">
                  {n.name}
                </h3>
                <p className="mt-2 text-sm text-white/75 opacity-0 transition-opacity group-hover:opacity-100">
                  {n.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link
            href="/contact"
            className="text-xs font-medium uppercase tracking-[0.2em] text-navy-900 underline-offset-4 hover:underline"
          >
            View More Communities
          </Link>
        </p>
      </div>
    </section>
  );
}
