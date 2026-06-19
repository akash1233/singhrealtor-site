import Image from "next/image";
import Link from "next/link";
import { agentPhoto, AGENT_NAME, SITE_NAME } from "@/lib/site-content";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutPreview() {
  return (
    <section className="bg-cream-50 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={agentPhoto.src}
            alt={agentPhoto.alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow={`About ${SITE_NAME}`}
            title="Your Northeast Atlanta suburban real estate partner"
            subtitle={`${AGENT_NAME} and ${SITE_NAME} help families buy and sell homes across Gwinnett and Forsyth County with honest advice, local market knowledge, and a personal touch.`}
          />
          <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Whether you&apos;re a first-time buyer, growing family, or ready
              to sell, our team brings clear communication and neighborhood
              expertise to every transaction — from Buford to Suwanee and
              throughout the Northeast Atlanta suburbs.
            </p>
            <p>
              We focus on what matters most: finding a home that fits your
              life, your budget, and your timeline — without the pressure or
              jargon.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex h-11 items-center border border-navy-900 px-8 text-xs font-medium uppercase tracking-[0.2em] text-navy-900 transition-colors hover:bg-navy-900 hover:text-white"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center border border-transparent bg-gold-500 px-8 text-xs font-medium uppercase tracking-[0.2em] text-navy-950 transition-colors hover:bg-gold-400"
            >
              Browse Available Homes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
