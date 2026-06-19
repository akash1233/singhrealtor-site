"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/lib/site-content";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overlayMode = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        overlayMode
          ? "border-transparent bg-transparent"
          : "border-b border-border/40 bg-cream-50/95 backdrop-blur-md shadow-sm"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link href="/" className="group flex flex-col leading-none">
          <span
            className={cn(
              "font-heading text-xl font-medium tracking-wide transition-colors",
              overlayMode ? "text-white" : "text-navy-900"
            )}
          >
            Shweta Singh
          </span>
          <span
            className={cn(
              "mt-0.5 text-[10px] font-medium uppercase tracking-[0.35em]",
              overlayMode ? "text-gold-400" : "text-gold-600"
            )}
          >
            Realty
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs font-medium uppercase tracking-[0.2em] transition-colors",
                overlayMode
                  ? "text-white/80 hover:text-white"
                  : "text-muted-foreground hover:text-navy-900",
                pathname === link.href &&
                  (overlayMode ? "text-white" : "text-navy-900")
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${SITE_PHONE_TEL}`}
            className={cn(
              "hidden items-center gap-2 text-sm font-medium transition-colors md:inline-flex",
              overlayMode
                ? "text-white hover:text-gold-400"
                : "text-navy-900 hover:text-gold-600"
            )}
          >
            <Phone className="size-4" />
            {SITE_PHONE_DISPLAY}
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-full border transition-colors lg:hidden",
                overlayMode
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-border text-navy-900 hover:bg-muted"
              )}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="font-heading text-xl">Navigate</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-border/60 py-4 text-sm font-medium uppercase tracking-widest text-navy-900"
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href={`tel:${SITE_PHONE_TEL}`}
                  className="mt-4 flex items-center gap-2 py-2 text-sm text-muted-foreground"
                >
                  <Phone className="size-4" />
                  {SITE_PHONE_DISPLAY}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
