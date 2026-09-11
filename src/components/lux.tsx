/** Shared luxury UI primitives used across all sections. */
import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  zoom = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  zoom?: boolean;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={cn("reveal", zoom && "reveal-zoom", visible && "is-visible", className)}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  invert?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-medium uppercase tracking-[0.35em]",
            invert ? "text-secondary" : "text-secondary",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl leading-tight font-semibold sm:text-4xl md:text-5xl",
          invert ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-sm leading-relaxed sm:text-base",
            invert ? "text-primary-foreground/75" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      ) : null}
      <span
        className={cn(
          "mt-6 block h-px w-24 gradient-gold",
          align === "center" && "mx-auto",
        )}
      />
    </Reveal>
  );
}

export function LuxButton({
  as = "a",
  href,
  onClick,
  variant = "primary",
  children,
  className,
  type,
}: {
  as?: "a" | "button";
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "gold" | "outline" | "ghost";
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
}) {
  const base =
    "ripple inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-all duration-500 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
  const variants: Record<string, string> = {
    primary: "gradient-royal text-primary-foreground shadow-luxe",
    gold: "gradient-gold text-ink shadow-luxe",
    outline: "border border-secondary/70 text-secondary hover:bg-secondary/10",
    ghost: "border border-border text-foreground hover:bg-accent",
  };
  const cls = cn(base, variants[variant], className);

  if (as === "button") {
    return (
      <button type={type ?? "button"} onClick={onClick} className={cls}>
        {children}
      </button>
    );
  }
  return (
    <a href={href} onClick={onClick} className={cls}>
      {children}
    </a>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("section-pad relative", className)}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

/** Lazy image with skeleton shimmer while loading. */
export function LuxImage({
  src,
  alt,
  className,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
