import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import { getDict, type Locale } from "@/i18n";
import { ratingLabel } from "@/lib/utils";
import { CountUp, Spotlight } from "../fx";
import { Stars, RoadLines } from "../icons";
import { Reveal } from "../Motion";
import { GoogleG, ReviewsShowcase } from "./ReviewsShowcase";

export function Reviews({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const note = ratingLabel();
  const { value, count, fiveStars } = site.rating;
  const share = Math.round((fiveStars / count) * 100);

  return (
    <section className="relative bg-navy text-paper" aria-labelledby="avis-titre">
      {/* Frise d'arcades : la section « monte » dans la précédente */}
      <div aria-hidden="true" className="arcade absolute inset-x-0 bottom-full" />

      <Spotlight className="relative overflow-hidden py-20 lg:py-28">
        <RoadLines className="absolute inset-0 h-full w-full text-paper opacity-[0.045]" />
        <RoadLines className="spotlight absolute inset-0 h-full w-full text-signal opacity-50" />

        <div className="wrap relative">
          <Reveal>
            <h2 id="avis-titre" className="h2 !text-paper">
              {t.reviews.title}
            </h2>
            <span className="rule" />
            <p className="mt-5 max-w-xl text-[1.05rem] text-paper/80">{t.reviews.intro}</p>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[21rem_1fr] lg:gap-20">
            {/* Résumé de la note : la preuve, d'un coup d'œil */}
            <Reveal className="self-start rounded-2xl bg-paper p-7 text-ink shadow-lift sm:p-8">
              <p className="flex items-center gap-2 text-[0.9rem] font-semibold text-ink">
                <GoogleG className="h-5 w-5" />
                {t.reviews.badge}
              </p>

              <div className="mt-5 flex items-end gap-4">
                <p
                  role="img"
                  aria-label={t.common.ratingAria(note)}
                  className="font-wordmark text-[5.5rem] leading-[0.8] font-medium tracking-[-0.04em] text-navy"
                >
                  <CountUp value={value} decimals={1} />
                </p>
                <div className="pb-1">
                  <Stars value={value} className="text-[1.3rem] text-signal" />
                  <p className="mt-1 text-[0.95rem] text-muted">
                    {t.reviews.outOf} · {t.reviews.count(count)}
                  </p>
                </div>
              </div>

              {/* Part des avis à 5 étoiles (chiffre réel de la fiche Google) */}
              <div className="mt-7 border-t border-line pt-6">
                <div className="flex items-baseline justify-between gap-3 text-[0.9rem]">
                  <span className="flex items-center gap-1.5 font-semibold text-ink">
                    5
                    <svg viewBox="0 0 20 20" className="h-4 w-4 text-signal" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.6 4.9 17.3l1-5.7-4.1-4 5.7-.8L10 1.6Z"
                      />
                    </svg>
                  </span>
                  <span dir="ltr" className="font-wordmark text-[1.05rem] text-navy">
                    {fiveStars} / {count}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist">
                  <div className="bar-fill h-full rounded-full bg-signal" style={{ "--w": `${share}%` } as CSSProperties} />
                </div>
                <p className="mt-3 text-[0.9rem] text-muted">{t.reviews.fiveStars(fiveStars, count)}</p>
              </div>

              <a
                href={site.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary group/g mt-7 w-full"
              >
                {t.reviews.all}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover/g:translate-x-0.5 group-hover/g:-translate-y-0.5 rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </a>
            </Reveal>

            <Reveal delay={0.15} className="min-w-0">
              <ReviewsShowcase locale={locale} />
            </Reveal>
          </div>
        </div>
      </Spotlight>
    </section>
  );
}
