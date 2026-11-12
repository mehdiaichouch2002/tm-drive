import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react";
import { site } from "@/config/site";
import { voitures, type Voiture } from "@/data/voitures";
import { getDict, isRtl, type Locale } from "@/i18n";
import { JsonLd, voitureJsonLd } from "@/lib/seo";
import { formatPrice, localePath, telLink, waLink } from "@/lib/utils";
import { DemoTag, StatutBadge, VoitureCard } from "../VoitureCard";
import { Gallery } from "../voitures/Gallery";
import { WhatsAppIcon } from "../icons";

export function VoitureView({ voiture, locale }: { voiture: Voiture; locale: Locale }) {
  const t = getDict(locale);
  const titre = voiture.titre[locale];
  const prix = formatPrice(voiture.prix, locale);
  const wa = waLink(t.wa.voiture(voiture.ref, titre, prix));
  const Back = isRtl(locale) ? ArrowRight : ArrowLeft;
  const advisor = site.advisorName[locale];

  const specs: { label: string; value: string }[] = [
    { label: t.voiture.type, value: t.types[voiture.type] },
    { label: t.voiture.boite, value: t.boites[voiture.boite] },
    { label: t.voiture.carburant, value: t.carburants[voiture.carburant] },
    { label: t.voiture.places, value: String(voiture.places) },
    { label: t.voiture.portes, value: String(voiture.portes) },
    { label: t.voiture.bagages, value: String(voiture.bagages) },
  ];

  // D'abord la même catégorie, puis les autres
  const similaires = [
    ...voitures.filter((v) => v.type === voiture.type && v.ref !== voiture.ref),
    ...voitures.filter((v) => v.type !== voiture.type),
  ].slice(0, 3);

  return (
    <>
      {!voiture.demo && <JsonLd data={voitureJsonLd(voiture, locale)} />}

      <div className="wrap pt-[calc(var(--header-h)+1.5rem)] pb-16 lg:pt-[calc(var(--header-h)+2rem)] lg:pb-24">
        <Link
          href={localePath(locale, "/voitures")}
          className="inline-flex min-h-11 items-center gap-2 text-[0.9rem] font-semibold text-navy hover:text-signal-deep"
        >
          <Back className="h-4 w-4" aria-hidden="true" />
          {t.voiture.back}
        </Link>

        <div className="mt-3">
          <Gallery images={voiture.images} titre={titre} locale={locale} viewName={`photo-${voiture.ref}`} />
        </div>

        <div className="mt-8 grid gap-12 lg:mt-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <StatutBadge voiture={voiture} locale={locale} />
              <span className="rounded-full border border-line px-3 py-1 text-[0.75rem] leading-tight font-medium text-ink">
                {t.types[voiture.type]}
              </span>
              <span className="rounded-full border border-line px-3 py-1 text-[0.75rem] leading-tight font-medium text-ink">
                {t.voiture.ref} <bdi>{voiture.ref}</bdi>
              </span>
              {voiture.demo && <DemoTag locale={locale} />}
            </div>

            <h1
              className={`mt-5 text-[1.9rem] font-semibold text-navy sm:text-[2.5rem] ${
                locale === "ar" ? "leading-[1.4]" : "leading-[1.1] tracking-[-0.025em]"
              }`}
            >
              {titre}
            </h1>
            <p className="mt-5 font-display text-[2rem] leading-none font-semibold text-navy lg:hidden">
              <bdi>{prix}</bdi>
            </p>

            {voiture.demo && (
              <p className="mt-6 rounded-xl border-s-4 border-signal bg-mist px-4 py-3 text-[0.9rem] text-ink">
                {t.voiture.demoNote}
              </p>
            )}

            <section aria-labelledby="specs" className="mt-10">
              <h2 id="specs" className="sr-only">
                {t.voiture.specs}
              </h2>
              <dl className="grid grid-cols-2 border-t border-line sm:grid-cols-3">
                {specs.map((s) => (
                  <div key={s.label} className="border-b border-line py-4 pe-4">
                    <dt className="text-[0.85rem] text-muted">{s.label}</dt>
                    <dd className="mt-0.5 text-[1.1rem] font-medium text-ink">
                      <bdi>{s.value}</bdi>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="description" className="mt-10">
              <h2 id="description" className="text-[1.5rem] font-semibold text-navy">
                {t.voiture.description}
              </h2>
              <p className="mt-4 max-w-[62ch] text-[1.05rem] leading-[1.8] text-ink">
                {voiture.description[locale]}
              </p>
            </section>

            <section aria-labelledby="atouts" className="mt-10">
              <h2 id="atouts" className="text-[1.5rem] font-semibold text-navy">
                {t.voiture.atouts}
              </h2>
              <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {voiture.atouts[locale].map((a) => (
                  <li key={a} className="flex items-start gap-3 text-[1.02rem] text-ink">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy text-paper">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Encart contact (colonne fixe sur ordinateur) */}
          <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            <div className="rounded-2xl bg-surface p-6 shadow-soft sm:p-7">
              <p className="hidden font-display text-[2rem] leading-none font-semibold text-navy lg:block">
                <bdi>{prix}</bdi>
              </p>
              <span className="mt-5 hidden h-1 w-12 rounded-full bg-signal lg:block" />
              <h2 className="text-[1.3rem] leading-snug font-semibold text-navy lg:mt-5">
                {t.voiture.interested}
              </h2>
              <p className="mt-2 text-[0.95rem] text-muted">{t.voiture.interestedText}</p>
              <div className="mt-5 flex flex-col gap-3">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.contact.write}
                </a>
                <a href={telLink} className="btn btn-outline">
                  <Phone className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} aria-hidden="true" />
                  <span dir="ltr">{site.phoneDisplay}</span>
                </a>
              </div>
              {advisor && (
                <p className="mt-5 border-t border-line pt-4 text-[0.9rem] text-muted">
                  {t.contact.advisor(advisor)}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>

      {similaires.length > 0 && (
        <section className="bg-mist py-16 lg:py-24" aria-labelledby="similaires">
          <div className="wrap">
            <h2 id="similaires" className="h2">
              {t.voiture.similar}
            </h2>
            <span className="rule" />
            <ul className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {similaires.map((v) => (
                <li key={v.ref}>
                  <VoitureCard voiture={v} locale={locale} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Barre fixe sur mobile */}
      <div
        data-sticky-bar
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-3 border-t border-line bg-paper/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
      >
        <a href={telLink} className="btn btn-primary">
          <Phone className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} aria-hidden="true" />
          {t.common.call}
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
          <WhatsAppIcon className="h-5 w-5" />
          {t.common.whatsapp}
        </a>
      </div>
    </>
  );
}
