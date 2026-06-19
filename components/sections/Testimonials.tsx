"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  const prev = () =>
    setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((i) => (i + 1) % testimonials.length);

  return (
    <section className="bg-navy-950 py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          eyebrow="Client Stories"
          title="What Clients Say"
          align="center"
          dark
          className="mx-auto"
        />

        <div className="relative mx-auto mt-14 max-w-4xl">
          <Quote className="mx-auto size-8 text-gold-400" aria-hidden />
          <blockquote className="mt-8 text-center font-heading text-2xl font-light leading-relaxed text-white/90 sm:text-3xl">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
          <div className="mt-8 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gold-400">
              {current.name}
            </p>
            <p className="mt-1 text-sm text-navy-200">
              {current.title} · {current.location}
            </p>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={prev}
              className="flex size-10 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === active ? "w-8 bg-gold-400" : "w-1.5 bg-white/40"
                  )}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="flex size-10 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
