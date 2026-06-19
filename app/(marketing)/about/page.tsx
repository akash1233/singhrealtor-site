import type { Metadata } from "next";
import Image from "next/image";
import {
  agentPhoto,
  AGENT_NAME,
  SERVICE_CITIES,
  SITE_NAME,
} from "@/lib/site-content";
import { PrimaryLink, PageContent, PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "About Us",
  description: `${SITE_NAME} — trusted real estate serving Northeast Atlanta suburbs in Gwinnett and Forsyth County.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={`About ${SITE_NAME}`}
        subtitle="Local expertise for buyers and sellers across Northeast Atlanta suburbs."
        image="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&q=80"
        imageAlt="Suburban home in Northeast Atlanta"
      />
      <PageContent>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
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
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-600">
              {SITE_NAME}
            </p>
            <h2 className="mt-4 font-heading text-3xl font-light text-navy-900 sm:text-4xl">
              Helping families find the right home
            </h2>
            <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
              <p>
                {SITE_NAME} serves buyers and sellers across the Northeast Atlanta
                suburbs in Gwinnett and Forsyth County. Led by {AGENT_NAME}, our
                team helps clients navigate the market with clear advice, responsive
                communication, and genuine care.
              </p>
              <p>
                Whether you&apos;re buying your first home, upsizing for a
                growing family, relocating to the area, or selling a home
                you&apos;ve loved for years, we are there to guide you through
                each step.
              </p>
              <p>
                We work across {SERVICE_CITIES} — matching clients with
                neighborhoods that fit their lifestyle and budget throughout the
                Northeast Atlanta suburban market.
              </p>
            </div>

            <div className="mt-10 border border-border bg-cream-50 p-8">
              <h3 className="font-heading text-xl font-medium text-navy-900">
                Credentials &amp; Service Areas
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>Licensed Georgia Real Estate — {SITE_NAME}</li>
                <li>Buford · Suwanee · Duluth · Lawrenceville · Sugar Hill · Cumming · Dacula</li>
                <li>First-time buyers · Move-up buyers · Sellers · Relocation</li>
                <li>Equal Housing Opportunity</li>
              </ul>
            </div>

            <div className="mt-8">
              <PrimaryLink href="/contact">Schedule a Consultation</PrimaryLink>
            </div>
          </div>
        </div>
      </PageContent>
    </>
  );
}
