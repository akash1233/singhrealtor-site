import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageContent, PageHero } from "@/components/layout/PageHero";
import {
  SERVICE_AREA_DETAIL,
  SERVICE_CITIES,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE_NAME} for buying or selling homes in Northeast Atlanta suburbs — Gwinnett and Forsyth County.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        subtitle="Whether you're buying your first home or selling your current one, we're here to help."
        image="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"
        imageAlt="Family home with front porch"
      />
      <PageContent>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-600">
                Contact Information
              </p>
              <ul className="mt-6 space-y-6 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold-600" />
                  <span>
                    {SERVICE_AREA_DETAIL}
                    <br />
                    Serving {SERVICE_CITIES}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-gold-600" />
                  <a
                    href={`tel:${SITE_PHONE_TEL}`}
                    className="transition-colors hover:text-navy-900"
                  >
                    {SITE_PHONE_DISPLAY}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-gold-600" />
                  <a
                    href={`mailto:${SITE_EMAIL}`}
                    className="transition-colors hover:text-navy-900"
                  >
                    {SITE_EMAIL}
                  </a>
                </li>
              </ul>
            </div>

            <div className="border border-border bg-cream-50 p-6">
              <p className="font-heading text-lg text-navy-900">
                Response within one business day
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {SITE_NAME} personally reviews every inquiry and will follow up
                to understand your goals before recommending next steps.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="border border-border bg-white p-8 md:p-10">
              <h2 className="font-heading text-2xl font-light text-navy-900">
                Send a message
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell us about your real estate goals and timeline.
              </p>
              <ContactForm className="mt-8" />
            </div>
          </div>
        </div>
      </PageContent>
    </>
  );
}
