/** Sticky glass navbar with mobile menu. */
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import { cn } from "@/lib/utils";
import { LuxButton } from "@/components/lux";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { data } = useSiteData();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-card border-b py-2" : "bg-transparent py-4",
      )}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:flex lg:justify-between">
        <a href="#home" className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "font-display text-xl font-semibold tracking-wide sm:text-2xl",
              scrolled ? "text-foreground" : "text-primary-foreground",
            )}
          >
            {data['settings'].logoText}
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-secondary sm:inline">
            Events
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "relative text-sm transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-secondary after:transition-all after:duration-500 hover:after:w-full",
                  scrolled
                    ? "text-foreground hover:text-primary"
                    : "text-primary-foreground/90 hover:text-primary-foreground",
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LuxButton href="#contact" variant="gold" className="hidden px-5 py-2.5 sm:inline-flex">
            Book Consultation
          </LuxButton>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-full border lg:hidden",
              scrolled ? "border-border text-foreground" : "border-white/30 text-primary-foreground",
            )}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="glass-card mx-5 mt-3 rounded-2xl p-5 lg:hidden">
          <ul className="grid gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-1 text-sm text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <LuxButton href="#contact" variant="primary" className="mt-4 w-full">
            Book Consultation
          </LuxButton>
        </div>
      ) : null}
    </header>
  );
}
