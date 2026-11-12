import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import type { CSSProperties } from "react";
import { site } from "@/config/site";
import { voitures, photosAccueil } from "@/data/voitures";
import { getDict, isRtl, type Locale } from "@/i18n";
import {
  agencyMapEmbed,
  directionsLink,
  hoursLabel,
  localePath,
  telLink,
  waLink,
} from "@/lib/utils";
import { VoitureCard } from "../VoitureCard";
import { OpenStatus } from "../fx";
import { WhatsAppIcon } from "../icons";
import { Reveal } from "../Motion";
import { BookingForm } from "./BookingForm";
import { WhyScrolly } from "./WhyScrolly";

/** Tiret incliné, comme un marquage de route */
function Dash({ className }: { className?: string }) {
  return <span aria-hidden="true" className={`block -skew-x-[24deg] rounded-sm bg-signal ${className ?? ""}`} />;
}

/** Bandeau défilant : ce qui revient dans les avis des clients */
export function TopicsMarquee({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {t.marquee.items.map((q, i) => (
        <li key={q} className="flex items-center">
          <span
            className={`px-6 font-display text-[2.6rem] leading-none whitespace-nowrap sm:px-9 sm:text-[4.25rem] ${
              locale === "ar" ? "py-4 font-semibold" : "font-bold tracking-[-0.04em]"
            } ${i % 2 ? "outline-text" : "text-navy"}`}
          >
            {q}
          </span>
          <Dash className="h-2 w-10 shrink-0 sm:h-3 sm:w-16" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label={t.marquee.label} className="marquee-wrap overflow-hidden pt-20 sm:pt-28">
      <div className="marquee" style={{ "--speed": "60s" } as CSSProperties}>
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}

export function Featured({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const Arrow = isRtl(locale) ? ArrowLeft : ArrowRight;
  const refs: readonly string[] = site.featuredRefs;
  const picked = refs.map((ref) => voitures.find((b) => b.ref === ref)).filter((b) => b != null);
  const list = (picked.length ? picked : voitures).slice(0, 3);

  return (
    <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="une-titre">
      <div className="wrap">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <h2 id="une-titre" className="h2">
              {t.featured.title}
            </h2>
            <span className="rule" />
            <p className="mt-5 max-w-xl text-[1.05rem] text-muted">{t.featured.intro}</p>
          </div>
          <Link href={localePath(locale, "/voitures")} className="btn btn-outline group/l">
            {t.featured.all}
            <Arrow
              className="h-4 w-4 transition-transform duration-300 group-hover/l:translate-x-1 rtl:group-hover/l:-translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Reveal>

        <ul className="mt-10 grid gap-7 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {list.map((b, i) => (
            <li key={b.ref} className={i === 2 ? "sm:max-lg:hidden" : undefined}>
              <Reveal delay={i * 0.12} className="h-full">
                <VoitureCard voiture={b} locale={locale} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Why({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <section className="bg-surface py-16 sm:py-20 lg:pt-28 lg:pb-10" aria-labelledby="pourquoi-titre">
      <div className="wrap">
        <Reveal className="mb-12 lg:mb-4">
          <h2 id="pourquoi-titre" className="h2">
            {t.why.title}
          </h2>
          <span className="rule" />
          <p className="mt-5 max-w-xl text-[1.05rem] text-muted">{t.why.intro}</p>
        </Reveal>
        <WhyScrolly locale={locale} />
      </div>
    </section>
  );
}

export function Booking({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <section id="reserver" className="section overflow-hidden" aria-labelledby="reserver-titre">
      <div className="wrap grid items-start gap-14 lg:grid-cols-[1fr_minmax(0,24rem)] lg:gap-20">
        <div>
          <Reveal>
            <h2 id="reserver-titre" className="h2">
              {t.booking.title}
            </h2>
            <span className="rule" />
            <p className="mt-5 max-w-xl text-[1.05rem] text-muted">{t.booking.text}</p>
          </Reveal>

          {/* Les trois étapes (une vraie séquence, donc numérotée) */}
          <ol className="mt-9 grid max-w-2xl gap-6 sm:grid-cols-3 sm:gap-5">
            {t.booking.steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.12} className="flex gap-4 sm:block">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy font-wordmark text-[1.15rem] font-bold text-signal"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-sans text-[1rem] leading-snug font-semibold text-navy sm:mt-4">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-[0.9rem] text-muted">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={0.1} className="mt-10 max-w-xl rounded-2xl bg-mist p-5 sm:p-7">
            <BookingForm locale={locale} />
          </Reveal>
        </div>

        <div className="relative mx-auto hidden w-full max-w-[19rem] sm:block lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:max-w-none">
          <span
            aria-hidden="true"
            className="arch absolute inset-0 translate-x-4 translate-y-4 border-2 border-signal rtl:-translate-x-4"
          />
          <Reveal variant="clip" className="arch relative aspect-[3/4] bg-mist shadow-soft">
            <Image
              src={photosAccueil.reserver}
              alt={t.booking.imageAlt}
              fill
              quality={90}
              sizes="(min-width: 1024px) 384px, 304px"
              className="parallax object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Contact({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const advisor = site.advisorName[locale];
  const rows = [
    {
      Icon: Phone,
      label: t.contact.phone,
      value: (
        <a href={telLink} className="hover:text-signal-deep">
          <span dir="ltr">{site.phoneDisplay}</span>
        </a>
      ),
    },
    { Icon: Clock, label: t.contact.hours, value: t.common.everyDay(hoursLabel(locale)) },
    { Icon: MapPin, label: t.contact.where, value: t.contact.place },
  ];

  return (
    <section id="contact" className="section bg-mist" aria-labelledby="contact-titre">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
        <Reveal>
          <h2 id="contact-titre" className="h2">
            {t.contact.title}
          </h2>
          <span className="rule" />
          {advisor && (
            <p className="mt-6 font-display text-[1.35rem] font-semibold text-navy">
              {t.contact.advisor(advisor)}
            </p>
          )}
          <p className="mt-4 inline-flex rounded-full bg-paper px-4 py-2 text-[0.9rem] text-ink shadow-soft">
            <OpenStatus locale={locale} />
          </p>

          <ul className="mt-6">
            {rows.map(({ Icon, label, value }) => (
              <li key={label} className="flex items-start gap-4 border-t border-navy/15 py-4">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-signal-deep" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="text-[0.85rem] text-muted">{label}</p>
                  <p className="text-[1.1rem] font-medium text-ink">{value}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={waLink(t.wa.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t.contact.write}
            </a>
            <a href={telLink} className="btn btn-primary">
              <Phone className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} aria-hidden="true" />
              {t.common.call}
            </a>
            <a
              href={directionsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <Navigation className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} aria-hidden="true" />
              {t.common.directions}
            </a>
          </div>
        </Reveal>

        <Reveal variant="clip" className="lg:h-full">
          <div className="h-[22rem] overflow-hidden rounded-2xl bg-paper shadow-soft lg:h-full lg:min-h-[30rem]">
            <iframe
              src={`${agencyMapEmbed}&hl=${locale}`}
              title={t.contact.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
