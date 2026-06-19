import { Hero } from "@/components/sections/Hero";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { FeaturedListings } from "@/components/sections/FeaturedListings";
import { MarketSnapshot } from "@/components/sections/MarketSnapshot";
import { NeighborhoodGrid } from "@/components/sections/NeighborhoodGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { ValuationCTA } from "@/components/sections/ValuationCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <NewsletterSignup />
      <AboutPreview />
      <MarketSnapshot />
      <FeaturedListings />
      <Testimonials />
      <NeighborhoodGrid />
      <ValuationCTA />
    </>
  );
}
