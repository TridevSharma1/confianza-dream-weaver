/** Scroll progress bar, cursor glow, WhatsApp / Call buttons and back-to-top. */
import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import { cn } from "@/lib/utils";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div className="h-full gradient-gold transition-[width] duration-150" style={{ width: `${p}%` }} />
    </div>
  );
}

export function CursorGlow() {
  useEffect(() => {
    const el = document.getElementById("cursor-glow");
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX - 150}px, ${e.clientY - 150}px, 0)`;
      el.style.opacity = "1";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      id="cursor-glow"
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[55] h-[300px] w-[300px] rounded-full opacity-0 blur-3xl transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--primary) 22%, transparent), transparent 65%)",
      }}
    />
  );
}

export function FloatingActions() {
  const { data } = useSiteData();
  const c = data['contact'];
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <a
        href={`https://wa.me/${c.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full gradient-royal text-primary-foreground shadow-luxe transition-transform hover:scale-110"
      >
        <MessageCircle size={20} />
      </a>
      <a
        href={`tel:${c.phone}`}
        aria-label="Call now"
        className="grid h-12 w-12 place-items-center rounded-full gradient-gold text-ink shadow-luxe transition-transform hover:scale-110"
      >
        <Phone size={19} />
      </a>
      <button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "grid h-12 w-12 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition-all duration-500",
          show ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <ArrowUp size={19} />
      </button>
    </div>
  );
}

export function Loader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1100);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] grid place-items-center bg-ink transition-opacity duration-700",
        gone ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <div className="text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-secondary/50">
          <span className="font-display text-2xl text-gradient-gold">CE</span>
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.4em] text-primary-foreground/60">Confianza</p>
      </div>
    </div>
  );
}
