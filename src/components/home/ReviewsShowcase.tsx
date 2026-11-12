"use client";

import { useEffect, useRef, useState, type CSSProperties, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { avis } from "@/data/avis";
import { getDict, isRtl, type Locale } from "@/i18n";
import { Stars } from "../icons";

const DURATION = 7000;

export function GoogleG({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={`shrink-0 ${className}`} aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.96 10.71a5.4 5.4 0 0 1 0-3.42V4.96H.96a9 9 0 0 0 0 8.08l3-2.33Z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58Z" />
    </svg>
  );
}

/**
 * Avis clients : un avis à la fois, en grand, voiture lisible.
 * - défile tout seul (7 s), s'arrête au survol, au clavier, ou avec le bouton pause
 * - flèches, glissement du doigt sur mobile, ou clic sur un prénom pour choisir
 */
export function ReviewsShowcase({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const rtl = isRtl(locale);
  const n = avis.length;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const touchX = useRef<number | null>(null);
  const tabs = useRef<HTMLDivElement>(null);
  const current = avis[index];
  const running = playing && !hover;

  const go = (i: number) => setIndex((i + n) % n);

  useEffect(() => {
    if (!running) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setIndex((v) => (v + 1) % n), DURATION);
    return () => clearTimeout(id);
  }, [index, running, n]);

  // Garde le prénom actif visible dans la rangée (mobile)
  useEffect(() => {
    const row = tabs.current;
    const el = row?.children[index] as HTMLElement | undefined;
    if (!row || !el) return;
    row.scrollTo({
      left: el.offsetLeft - row.clientWidth / 2 + el.clientWidth / 2,
      behavior: "smooth",
    });
  }, [index]);

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 45) return;
    // Glisser vers la gauche = avis suivant (inversé en arabe)
    go(index + ((dx < 0) !== rtl ? 1 : -1));
  };

  const Prev = rtl ? ChevronRight : ChevronLeft;
  const Next = rtl ? ChevronLeft : ChevronRight;
  const round =
    "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:border-signal hover:bg-signal hover:text-navy-deep";
  const quoteAr = current.langue === "ar";
  const foreign = current.langue !== locale;
  const words = current.texte.split(" ");

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={t.reviews.region}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="flex h-full flex-col"
    >
      {/* L'avis affiché */}
      <figure
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-live={running ? "off" : "polite"}
        className="relative flex-1"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 font-wordmark text-[9rem] leading-none text-signal/35 select-none ltr:-left-2 rtl:-right-2 sm:-top-14 sm:text-[12rem]"
        >
          “
        </span>

        <blockquote
          key={index}
          lang={current.langue}
          dir={quoteAr ? "rtl" : "ltr"}
          className={`relative min-h-[13.5rem] pt-10 text-paper sm:min-h-[12.5rem] sm:pt-12 ${
            quoteAr
              ? "text-[1.45rem] leading-[1.85] font-semibold sm:text-[1.9rem]"
              : "font-wordmark text-[1.55rem] leading-[1.32] font-medium tracking-[-0.01em] sm:text-[2.15rem]"
          }`}
        >
          <p className="sr-only">{current.texte}</p>
          <p aria-hidden="true">
            {words.map((w, i) => (
              <span key={i}>
                <span className="quote-word" style={{ "--i": i } as CSSProperties}>
                  {w}
                </span>{" "}
              </span>
            ))}
          </p>
        </blockquote>

        <figcaption key={`c${index}`} className="caption-in mt-7 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-signal font-wordmark text-[1.5rem] font-semibold text-navy-deep"
          >
            {current.auteur.charAt(0)}
          </span>
          <span className="min-w-0">
            <bdi lang="fr" className="block text-[1.1rem] font-semibold text-paper">
              {current.auteur}
            </bdi>
            <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.85rem] text-paper/75">
              <Stars className="text-[0.95rem] text-signal" label={t.common.ratingAria("5")} />
              <span className="inline-flex items-center gap-1.5">
                <GoogleG className="h-3.5 w-3.5" />
                {t.reviews.badge}
              </span>
              {foreign && <span>· {t.reviews.original}</span>}
            </span>
          </span>
        </figcaption>
      </figure>

      {/* Commandes */}
      <div className="mt-9 flex items-center gap-3">
        <button type="button" onClick={() => go(index - 1)} aria-label={t.reviews.prev} className={round}>
          <Prev className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <button type="button" onClick={() => go(index + 1)} aria-label={t.reviews.next} className={round}>
          <Next className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? t.reviews.pause : t.reviews.play}
          aria-pressed={!playing}
          className={round}
        >
          {playing ? (
            <Pause className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} />
          ) : (
            <Play className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} />
          )}
        </button>

        {/* Barre de temps + compteur */}
        <span className="relative ms-2 block h-px flex-1 bg-paper/20" aria-hidden="true">
          <span
            key={`${index}-${running}`}
            className={`absolute inset-0 bg-signal ${running ? "slide-bar" : ""}`}
            style={{ animationDuration: `${DURATION}ms` }}
          />
        </span>
        <span className="font-wordmark text-[1.05rem] text-paper/80" dir="ltr" aria-hidden="true">
          <span className="text-signal">{index + 1}</span> / {n}
        </span>
      </div>

      {/* Choisir un avis par prénom */}
      <div
        ref={tabs}
        role="group"
        aria-label={t.reviews.pick}
        className="no-scrollbar relative -mx-5 mt-7 flex gap-2.5 overflow-x-auto px-5 py-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {avis.map((a, i) => {
          const on = i === index;
          return (
            <button
              key={a.auteur}
              type="button"
              onClick={() => go(i)}
              aria-label={t.reviews.by(a.auteur)}
              aria-current={on ? "true" : undefined}
              className={`flex min-h-12 shrink-0 cursor-pointer items-center gap-2.5 rounded-full border py-1.5 ps-1.5 pe-4 text-[0.9rem] font-medium transition-colors duration-300 ${
                on
                  ? "border-paper bg-paper text-navy-deep"
                  : "border-paper/25 text-paper/85 hover:border-signal hover:text-paper"
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex h-9 w-9 items-center justify-center rounded-full font-wordmark text-[1rem] font-semibold transition-colors duration-300 ${
                  on ? "bg-navy text-paper" : "bg-paper/10 text-signal"
                }`}
              >
                {a.auteur.charAt(0)}
              </span>
              <bdi lang="fr">{a.auteur}</bdi>
            </button>
          );
        })}
      </div>
    </div>
  );
}
