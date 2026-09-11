/** Luxury footer with quick links, hours, socials and the discreet admin link. */
import { Link } from "@tanstack/react-router";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";

export function Footer() {
  const { data } = useSiteData();
  const c = data['contact'];
  const s = data['settings'];

  return (
    <footer className="relative overflow-hidden bg-ink text-primary-foreground">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl">{s.logoText}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-secondary">{s.tagline}</p>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            Wedding planning, decor, execution and destination celebrations — designed around your story.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wide text-secondary">Quick Links</h4>
          <ul className="mt-4 grid gap-2 text-sm text-primary-foreground/75">
            {["About", "Services", "Portfolio", "Gallery", "Blog", "Contact"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="transition-colors hover:text-secondary">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wide text-secondary">Business Hours</h4>
          <ul className="mt-4 grid gap-2 text-sm text-primary-foreground/75">
            {c.hours.map((h: { day: string; time: string }) => (
              <li key={h.day}>
                <span className="block">{h.day}</span>
                <span className="text-primary-foreground/55">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wide text-secondary">Contact</h4>
          <ul className="mt-4 grid gap-3 text-sm text-primary-foreground/75">
            <li className="flex gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-secondary" />
              <a href={`tel:${c.phone}`}>{c.phone}</a>
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-secondary" />
              <a href={`mailto:${c.email}`}>{c.email}</a>
            </li>
            <li className="flex gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-secondary" />
              <span>{c.address}</span>
            </li>
            <li className="flex gap-2">
              <Instagram size={16} className="mt-0.5 shrink-0 text-secondary" />
              <a href={c.instagram} target="_blank" rel="noreferrer">
                @confianza_events
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {c.business}. All rights reserved.
          </p>
          <Link to="/admin" className="text-right transition-colors hover:text-secondary">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
