"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setActive((i) => (i - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setActive((i) => (i + 1) % heroSlides.length);

  return (
    <section className="relative min-h-screen w-full">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === active ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/45" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"
        aria-hidden
      />

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center text-white sm:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold-400">
          {heroSlides[active].caption}
        </p>
        <h1 className="mt-6 max-w-4xl font-heading text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Find Your Home in</span>
          <span className="mt-2 block font-medium text-white/95">
            Northeast Atlanta
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          Friendly, local guidance for buyers and sellers in Buford, Suwanee,
          Duluth, Lawrenceville, Sugar Hill, and surrounding Gwinnett &amp;
          Forsyth communities.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center border border-white bg-white px-8 text-xs font-medium uppercase tracking-[0.2em] text-navy-900 transition-colors hover:bg-gold-400 hover:text-navy-950"
          >
            Schedule Consultation
          </Link>
          <Link
            href="/about"
            className="inline-flex h-11 items-center justify-center border border-white/50 px-8 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white/10"
          >
            About Shweta
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={prev}
          className="flex size-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === active ? "w-8 bg-gold-400" : "w-1.5 bg-white/50"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          className="flex size-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
          aria-label="Next slide"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  );
}
