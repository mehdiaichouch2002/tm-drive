"use client";

import Image from "next/image";
import { Clock, MessagesSquare, Sparkles, Tag } from "lucide-react";
import { photosAccueil } from "@/data/voitures";
import { getDict, type Locale } from "@/i18n";
import { useActiveStep } from "../fx";

const icons = [Sparkles, MessagesSquare, Clock, Tag];

/**
 * « Pourquoi TM Drive » : sur ordinateur, le cadre reste fixe à l'écran et sa photo
 * change à mesure que chaque argument passe au centre. Sur mobile, simple liste.
 */
export function WhyScrolly({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const { ref, active } = useActiveStep<HTMLDivElement>();
  const n = t.why.items.length;

  return (
    <div ref={ref} className="grid gap-12 lg:grid-cols-[minmax(0,25rem)_1fr] lg:gap-24">
      {/* Cadre : photos superposées, celle de l'argument actif est visible */}
      <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
        {/* Sur ordinateur, la hauteur de le cadre suit celle de l'écran pour rester entièrement visible */}
        <div className="relative mx-auto w-full max-w-[19rem] lg:mx-0 lg:aspect-[3/4] lg:h-[min(33rem,calc(100vh-var(--header-h)-6rem))] lg:w-auto lg:max-w-none">
          <span
            aria-hidden="true"
            className="arch absolute inset-0 -translate-x-3 translate-y-3 border-2 border-signal sm:-translate-x-5 sm:translate-y-5 rtl:translate-x-3 sm:rtl:translate-x-5"
          />
          <div className="arch relative aspect-[3/4] bg-mist shadow-soft lg:h-full">
            {photosAccueil.pourquoi.slice(0, n).map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={i === 0 ? t.why.imageAlt : ""}
                fill
                quality={90}
                sizes="(min-width: 1024px) 400px, 304px"
                className={`object-cover transition-[opacity,transform] duration-[900ms] ease-out ${
                  i === active ? "scale-100 opacity-100" : "scale-110 opacity-0"
                } ${i > 0 ? "max-lg:hidden" : "max-lg:!scale-100 max-lg:!opacity-100"}`}
              />
            ))}
          </div>
          {/* Compteur discret : 1 / 4 */}
          <p
            aria-hidden="true"
            dir="ltr"
            className="absolute -end-2 bottom-6 hidden rounded-full bg-navy px-4 py-2 font-wordmark text-[1.05rem] text-paper shadow-soft lg:block"
          >
            <span className="text-signal">{active + 1}</span> / {n}
          </p>
        </div>
      </div>

      <ul className="lg:py-[12vh]">
        {t.why.items.map((item, i) => {
          const Icon = icons[i];
          const on = i === active;
          return (
            <li
              key={item.title}
              data-step={i}
              className={`relative border-line py-8 transition-opacity duration-500 max-lg:border-t lg:flex lg:min-h-[52vh] lg:flex-col lg:justify-center lg:ps-10 ${
                on ? "lg:opacity-100" : "lg:opacity-30"
              }`}
            >
              {/* Trait de progression à gauche */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 start-0 hidden w-px bg-line lg:block"
              >
                <span
                  className={`absolute inset-x-0 top-0 bg-signal transition-[height] duration-700 ease-out ${
                    i <= active ? "h-full" : "h-0"
                  }`}
                />
              </span>
              <Icon className="h-8 w-8 text-signal-deep" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 text-[1.45rem] leading-snug font-semibold tracking-[-0.02em] text-navy lg:text-[2.1rem] lg:leading-[1.15]">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-[1rem] text-muted lg:text-[1.1rem]">{item.text}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
