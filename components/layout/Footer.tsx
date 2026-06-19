import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  SERVICE_AREA_DETAIL,
  SERVICE_CITIES,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/lib/site-content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-heading text-2xl font-light">Shweta Singh Realty</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-200">
              Helping buyers and sellers find the right home across the Northeast
              Atlanta suburbs — Gwinnett and Forsyth County communities.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-11 items-center border border-white/40 px-8 text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:border-gold-400 hover:text-gold-400"
            >
              Connect With Me
            </Link>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
              Navigate
            </p>
            <ul className="mt-6 space-y-3 text-sm text-navy-200">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/listings" className="hover:text-white">Listings</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
              Contact
            </p>
            <ul className="mt-6 space-y-4 text-sm text-navy-200">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <span>{SERVICE_AREA_DETAIL}<br />Serving {SERVICE_CITIES}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-gold-400" />
                <a href={`tel:${SITE_PHONE_TEL}`} className="hover:text-white">
                  {SITE_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-gold-400" />
                <a
                  href="mailto:shweta@shwetasinghrealty.com"
                  className="hover:text-white"
                >
                  shweta@shwetasinghrealty.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center text-xs text-navy-300 sm:px-8 md:flex-row md:text-left">
        <p>© {year} Shweta Singh Realty. All rights reserved.</p>
        <p>Equal Housing Opportunity · Georgia Real Estate License</p>
      </div>
    </footer>
  );
}
