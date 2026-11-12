"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { getDict, type Locale } from "@/i18n";

export type Slide = {
  ref: string;
  href: string;
  titre: string;
  prix: string;
  image: string;
  alt: string;
  demo: boolean;
};

const DURATION = 6000;

/** Grand cadre du haut de page : fait défiler les voitures à la une */
export function HeroSlideshow({ slides, locale }: { slides: Slide[]; locale: Locale }) {
  const t = getDict(locale);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;
  const current = slides[index];

  useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setIndex((v) => (v + 1) % n), DURATION);
    return () => clearTimeout(id);
  }, [index, paused, n]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={t.hero.slideshow}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative"
    >
      {/* Second contour en jaune, décalé */}
      <span
        aria-hidden="true"
        className="arch load-in absolute inset-0 translate-x-3 -translate-y-3 border-2 border-signal sm:translate-x-5 sm:-translate-y-5 rtl:-translate-x-3 sm:rtl:-translate-x-5"
        style={{ "--d": "1.1s" } as React.CSSProperties}
      />

      <div className="arch arch-open relative aspect-[4/5] bg-navy-deep shadow-lift">
        {slides.map((s, k) => (
          <Image
            key={s.ref}
            src={s.image}
            alt={k === index ? s.alt : ""}
            fill
            preload={k === 0}
            fetchPriority={k === 0 ? "high" : undefined}
            quality={90}
            sizes="(min-width: 1280px) 448px, (min-width: 1024px) 416px, (min-width: 640px) 416px, 88vw"
            className={`object-cover transition-opacity duration-[1400ms] ease-out ${
              k === index ? "kenburns opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-navy-deep/85 to-transparent"
        />

        {/* Légende du voiture affiché */}
        <Link
          key={current.ref}
          href={current.href}
          className="caption-in group/c absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-paper/95 p-3.5 ps-4 text-ink shadow-soft backdrop-blur-sm transition-colors hover:bg-white sm:inset-x-5 sm:bottom-5"
        >
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 text-[0.75rem] font-medium text-muted">
              {t.featured.title}
              {current.demo && (
                <span className="rounded-full border border-line px-2 py-0.5 leading-tight">
                  {t.common.demo}
                </span>
              )}
            </span>
            <span className="mt-0.5 block truncate text-[0.95rem] font-semibold">
              {current.titre}
            </span>
            <bdi className="block font-display text-[1.05rem] font-semibold text-navy">
              {current.prix}
            </bdi>
          </span>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-paper transition-transform duration-300 group-hover/c:rotate-45 rtl:-scale-x-100">
            <ArrowUpRight className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </span>
        </Link>
      </div>

      {/* Barres de progression = boutons pour changer de voiture */}
      {n > 1 && (
        <div className="mt-5 flex justify-center gap-2">
          {slides.map((s, k) => (
            <button
              key={s.ref}
              type="button"
              onClick={() => setIndex(k)}
              aria-label={t.hero.showSlide(k + 1)}
              aria-current={k === index ? "true" : undefined}
              className="group/b flex h-11 w-12 cursor-pointer items-center"
            >
              <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-paper/25 transition-colors group-hover/b:bg-paper/50">
                {k === index && (
                  <span
                    key={`${index}-${paused}`}
                    className={`absolute inset-0 rounded-full bg-signal ${paused ? "" : "slide-bar"}`}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
