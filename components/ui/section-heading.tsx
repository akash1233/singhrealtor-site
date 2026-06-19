import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-xs font-medium uppercase tracking-[0.3em]",
            dark ? "text-gold-400" : "text-gold-600"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-3 font-heading text-3xl font-light leading-tight tracking-tight sm:text-4xl md:text-[2.75rem]",
          dark ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed",
            align === "center" && "mx-auto",
            dark ? "text-navy-200" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
