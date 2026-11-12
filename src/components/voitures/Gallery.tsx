"use client";

import Image from "next/image";
import {
  ViewTransition,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { getDict, isRtl, type Locale } from "@/i18n";

/**
 * Galerie : grande photo qui se fait glisser au doigt (scroll-snap natif),
 * miniatures, flèches clavier, et affichage plein écran.
 */
export function Gallery({
  images,
  titre,
  locale,
  viewName,
}: {
  images: string[];
  titre: string;
  locale: Locale;
  viewName?: string;
}) {
  const t = getDict(locale);
  const rtl = isRtl(locale);
  const scroller = useRef<HTMLDivElement>(null);
  const lightbox = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const n = images.length;
  const slide = (i: number, node: ReactNode) =>
    // La première photo porte le même nom que celle de la carte : elle « voyage » d'une page à l'autre
    i === 0 && viewName ? (
      <ViewTransition name={viewName} share="morph" default="none">
        {node}
      </ViewTransition>
    ) : (
      node
    );

  // Suit la photo visible quand on fait défiler au doigt
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setCurrent(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { root, threshold: 0.6 },
    );
    Array.from(root.children).forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    const root = scroller.current;
    const idx = (i + n) % n;
    const slide = root?.children[idx] as HTMLElement | undefined;
    if (!root || !slide) return;
    // Le conteneur est « relative » : offsetLeft est déjà mesuré depuis son bord (négatif en arabe)
    root.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  };

  const open = (i: number) => {
    setZoomed(i);
    lightbox.current?.showModal();
  };
  const zoomTo = (i: number) => setZoomed((i + n) % n);

  // Flèches du clavier : « suivant » est à gauche en arabe
  const arrowKeys = (e: KeyboardEvent, prev: () => void, next: () => void) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const forward = (e.key === "ArrowRight") !== rtl;
    (forward ? next : prev)();
  };

  const Prev = rtl ? ChevronRight : ChevronLeft;
  const Next = rtl ? ChevronLeft : ChevronRight;
  const round =
    "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-paper/95 text-navy shadow-soft transition-colors hover:bg-white";

  return (
    <div>
      <div className="relative">
        <div
          ref={scroller}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={t.gallery.region}
          onKeyDown={(e) => arrowKeys(e, () => go(current - 1), () => go(current + 1))}
          className="no-scrollbar relative flex snap-x snap-mandatory overflow-x-auto rounded-2xl bg-mist"
        >
          {images.map((src, i) => (
            <div
              key={src}
              data-i={i}
              className="relative aspect-[4/3] w-full shrink-0 snap-center sm:aspect-[16/10]"
            >
              {slide(
                i,
                <Image
                  src={src}
                  alt={t.voiture.photoAlt(titre, i + 1)}
                  fill
                  preload={i === 0}
                  fetchPriority={i === 0 ? "high" : undefined}
                  quality={90}
                  sizes="(min-width: 1200px) 1136px, 100vw"
                  className="object-cover"
                />,
              )}
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={t.gallery.zoom(i + 1)}
                className="absolute inset-0 cursor-zoom-in rounded-2xl"
              />
            </div>
          ))}
        </div>

        {n > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(current - 1)}
              aria-label={t.gallery.prev}
              className={`${round} absolute start-3 top-1/2 hidden -translate-y-1/2 sm:flex`}
            >
              <Prev className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => go(current + 1)}
              aria-label={t.gallery.next}
              className={`${round} absolute end-3 top-1/2 hidden -translate-y-1/2 sm:flex`}
            >
              <Next className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </>
        )}

        <div className="pointer-events-none absolute end-3 bottom-3 flex items-center gap-2">
          <span
            dir="ltr"
            className="rounded-full bg-navy-deep/85 px-3 py-1.5 text-[0.8rem] font-medium text-paper"
          >
            {current + 1} / {n}
          </span>
          <span className="hidden h-9 w-9 items-center justify-center rounded-full bg-navy-deep/85 text-paper sm:flex">
            <Expand className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </span>
        </div>
      </div>

      {n > 1 && (
        <ul className="no-scrollbar mt-3 flex gap-3 overflow-x-auto p-1">
          {images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={t.gallery.show(i + 1)}
                aria-current={i === current ? "true" : undefined}
                className={`relative block h-16 w-[5.5rem] cursor-pointer overflow-hidden rounded-xl transition-opacity sm:h-20 sm:w-28 ${
                  i === current
                    ? "outline-2 outline-offset-2 outline-signal"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="112px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Plein écran */}
      <dialog
        ref={lightbox}
        aria-label={t.gallery.lightbox}
        onClose={() => setZoomed(null)}
        onClick={(e) => e.target === e.currentTarget && lightbox.current?.close()}
        onKeyDown={(e) =>
          zoomed != null && arrowKeys(e, () => zoomTo(zoomed - 1), () => zoomTo(zoomed + 1))
        }
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0"
      >
        {zoomed != null && (
          <div className="pointer-events-none relative flex h-full w-full items-center justify-center p-3 sm:p-12">
            <div className="relative h-full w-full">
              <Image
                key={images[zoomed]}
                src={images[zoomed]}
                alt={t.voiture.photoAlt(titre, zoomed + 1)}
                fill
                quality={90}
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <button
              type="button"
              onClick={() => lightbox.current?.close()}
              aria-label={t.gallery.close}
              className={`${round} pointer-events-auto absolute end-4 top-4`}
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </button>
            {n > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => zoomTo(zoomed - 1)}
                  aria-label={t.gallery.prev}
                  className={`${round} pointer-events-auto absolute start-4 top-1/2 -translate-y-1/2`}
                >
                  <Prev className="h-5 w-5" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => zoomTo(zoomed + 1)}
                  aria-label={t.gallery.next}
                  className={`${round} pointer-events-auto absolute end-4 top-1/2 -translate-y-1/2`}
                >
                  <Next className="h-5 w-5" strokeWidth={1.75} />
                </button>
              </>
            )}
            <span
              dir="ltr"
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-paper/95 px-3 py-1.5 text-[0.8rem] font-medium text-navy"
            >
              {zoomed + 1} / {n}
            </span>
          </div>
        )}
      </dialog>
    </div>
  );
}
