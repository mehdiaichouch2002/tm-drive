"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent,
  type ReactNode,
} from "react";
import { alwaysOpen, site } from "@/config/site";
import { getDict, type Locale } from "@/i18n";
import { hourLabel, hoursLabel } from "@/lib/utils";

/**
 * Suit le curseur : expose sa position en variables CSS (--mx, --my),
 * utilisées par la classe .spotlight pour éclairer les marquages de route.
 */
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - r.left}px`);
      el.style.setProperty("--my", `${clientY - r.top}px`);
    });
  };

  return (
    <div ref={ref} onPointerMove={onMove} className={className}>
      {children}
    </div>
  );
}

/** Nombre qui se compte quand il entre dans l'écran : 0 → 4,8 */
export function CountUp({
  value,
  decimals = 0,
  className,
}: {
  value: number;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => n.toFixed(decimals).replace(".", ",");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = (value * eased).toFixed(decimals).replace(".", ",");
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        el.textContent = (0).toFixed(decimals).replace(".", ",");
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, decimals]);

  // Le rendu initial contient déjà la vraie valeur (lecteurs d'écran, sans JavaScript)
  return (
    <span ref={ref} className={className} dir="ltr">
      {format(value)}
    </span>
  );
}

/* ---------- Ouvert / fermé en ce moment (heure de Meknès) ---------- */

const subscribeMinute = (cb: () => void) => {
  const id = setInterval(cb, 30_000);
  return () => clearInterval(id);
};
const meknesTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Casablanca",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

export function OpenStatus({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const t = getDict(locale);
  // null côté serveur : on affiche alors simplement les horaires
  const now = useSyncExternalStore(subscribeMinute, meknesTime, () => null);
  const { opens, closes } = site.hours;

  if (now === null) {
    return <span className={className}>{t.common.openDaily(hoursLabel(locale))}</span>;
  }
  if (alwaysOpen) {
    return (
      <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
        <span className="live-dot" aria-hidden="true" />
        <span>
          <strong className="font-semibold">{t.open.now}</strong>
          {" · "}
          {t.open.always}
        </span>
      </span>
    );
  }
  const open = now >= opens && now < closes;
  const next = open
    ? t.open.closes(hourLabel(closes, locale))
    : t.open.opens(hourLabel(opens, locale));

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <span className="live-dot" data-closed={open ? undefined : ""} aria-hidden="true" />
      <span>
        <strong className="font-semibold">{open ? t.open.now : t.open.closed}</strong>
        {" · "}
        {next}
      </span>
    </span>
  );
}

/**
 * Suit quel élément [data-step] est au milieu de l'écran et renvoie son numéro.
 * Sert à la section « Pourquoi TM Drive » (image qui change au défilement).
 */
export function useActiveStep<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return { ref, active };
}
