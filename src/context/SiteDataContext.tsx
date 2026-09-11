/**
 * SiteDataContext
 * Single source of truth for all website content.
 * Defaults come from src/mock/*, admin edits are persisted to LocalStorage.
 * No backend, no database.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { hero } from "@/mock/hero";
import { services, whyChooseUs, process, packages } from "@/mock/services";
import { portfolio, portfolioCategories, beforeAfter } from "@/mock/portfolio";
import { testimonials, clientLogos } from "@/mock/testimonials";
import { blogs } from "@/mock/blogs";
import { faq } from "@/mock/faq";
import { team } from "@/mock/team";
import { stats, calendar } from "@/mock/stats";
import { gallery, instagramFeed } from "@/mock/gallery";
import { contact } from "@/mock/contact";
import { settings } from "@/mock/settings";

export const STORAGE_KEY = "confianza:site-data";
export const MESSAGES_KEY = "confianza:messages";
export const AUTH_KEY = "confianza:admin-session";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type SiteData = Record<string, any>;

export const defaultData: SiteData = {
  hero,
  services,
  whyChooseUs,
  process,
  packages,
  portfolio,
  portfolioCategories,
  beforeAfter,
  testimonials,
  clientLogos,
  blogs,
  faq,
  team,
  stats,
  calendar,
  gallery,
  instagramFeed,
  contact,
  settings,
};

type Ctx = {
  data: SiteData;
  update: (key: string, value: unknown) => void;
  reset: () => void;
  messages: any[];
  addMessage: (m: any) => void;
  removeMessage: (id: number) => void;
  hydrated: boolean;
};

const SiteDataContext = createContext<Ctx | null>(null);

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultData);
  const [messages, setMessages] = useState<any[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from LocalStorage after mount (avoids SSR mismatch).
  useEffect(() => {
    const stored = readStored<SiteData>(STORAGE_KEY, {});
    setData({ ...defaultData, ...stored });
    setMessages(readStored<any[]>(MESSAGES_KEY, []));
    setHydrated(true);
  }, []);

  const persist = useCallback((next: SiteData) => {
    setData(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — keep in-memory only */
    }
  }, []);

  const update = useCallback(
    (key: string, value: unknown) => {
      setData((prev) => {
        const next = { ...prev, [key]: value };
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setData(defaultData);
  }, []);

  const persistMessages = useCallback((next: any[]) => {
    setMessages(next);
    try {
      window.localStorage.setItem(MESSAGES_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const addMessage = useCallback(
    (m: any) => persistMessages([{ ...m, id: Date.now() }, ...messages]),
    [messages, persistMessages],
  );

  const removeMessage = useCallback(
    (id: number) => persistMessages(messages.filter((m) => m.id !== id)),
    [messages, persistMessages],
  );

  const value = useMemo(
    () => ({ data, update, reset, messages, addMessage, removeMessage, hydrated }),
    [data, update, reset, messages, addMessage, removeMessage, hydrated],
  );

  // `persist` retained for future bulk writes
  void persist;

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used inside SiteDataProvider");
  return ctx;
}
