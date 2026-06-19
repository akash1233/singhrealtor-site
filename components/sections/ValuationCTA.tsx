import Image from "next/image";
import Link from "next/link";

export function ValuationCTA() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&q=80"
        alt="Suburban home in Northeast Atlanta"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy-950/80" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-8 md:py-28">
        <div className="max-w-2xl text-white">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
            Home Valuation
          </p>
          <h2 className="mt-4 font-heading text-3xl font-light sm:text-4xl">
            What&apos;s your home worth?
          </h2>
          <p className="mt-4 leading-relaxed text-navy-200">
            Get a complimentary market analysis based on recent sales in your
            Northeast Atlanta neighborhood. Our team will walk you through what
            buyers are paying in Gwinnett and Forsyth County today.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-11 items-center bg-gold-500 px-8 text-xs font-medium uppercase tracking-[0.2em] text-navy-950 transition-colors hover:bg-gold-400"
          >
            Request a Free Analysis
          </Link>
        </div>
      </div>
    </section>
  );
}
