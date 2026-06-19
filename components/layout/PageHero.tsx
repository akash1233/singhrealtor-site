import Image from "next/image";
import Link from "next/link";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
}

export function PageHero({ title, subtitle, image, imageAlt }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[45vh] items-end">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-8">
        <h1 className="font-heading text-4xl font-light text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-white/80">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

export function PageContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-7xl px-4 py-16 sm:px-8 md:py-20 ${className ?? ""}`}>
      {children}
    </div>
  );
}

export function PrimaryLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-11 items-center border border-navy-900 px-8 text-xs font-medium uppercase tracking-[0.2em] text-navy-900 transition-colors hover:bg-navy-900 hover:text-white"
    >
      {children}
    </Link>
  );
}
