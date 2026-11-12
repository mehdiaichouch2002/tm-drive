import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fuel, Settings2, Users } from "lucide-react";
import type { Voiture } from "@/data/voitures";
import { getDict, type Locale } from "@/i18n";
import { formatPrice, localePath, waLink } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

const statutStyle: Record<Voiture["statut"], string> = {
  disponible: "bg-navy text-paper",
  réservée: "bg-signal-deep text-white",
};

export function StatutBadge({ voiture, locale }: { voiture: Voiture; locale: Locale }) {
  const t = getDict(locale);
  return (
    <span
      className={`rounded-full px-3 py-1 text-[0.75rem] leading-tight font-semibold ${statutStyle[voiture.statut]}`}
    >
      {t.statuts[voiture.statut]}
    </span>
  );
}

export function DemoTag({ locale }: { locale: Locale }) {
  return (
    <span className="rounded-full border border-line bg-paper/95 px-3 py-1 text-[0.75rem] leading-tight font-medium text-ink">
      {getDict(locale).common.demo}
    </span>
  );
}

export function VoitureCard({
  voiture,
  locale,
  priority = false,
}: {
  voiture: Voiture;
  locale: Locale;
  priority?: boolean;
}) {
  const t = getDict(locale);
  const titre = voiture.titre[locale];
  const prix = formatPrice(voiture.prix, locale);
  const href = localePath(locale, `/voitures/${voiture.slug}`);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-soft transition-[box-shadow,translate] duration-500 hover:-translate-y-1.5 hover:shadow-lift">
      {/* Au survol, un coin du cadre s'arrondit, comme une vitre de voiture */}
      <div className="relative m-2.5 mb-0 aspect-[4/3] overflow-hidden rounded-[0.9rem] bg-mist transition-[border-radius] duration-700 ease-out group-hover:rounded-se-[5.5rem]">
        <ViewTransition name={`photo-${voiture.ref}`} share="morph" default="none">
          <Image
            src={voiture.images[0]}
            alt={t.voiture.photoAlt(titre, 1)}
            fill
            preload={priority}
            fetchPriority={priority ? "high" : undefined}
            quality={85}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
          />
        </ViewTransition>
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2 transition-opacity duration-300 group-hover:opacity-0">
          <StatutBadge voiture={voiture} locale={locale} />
          {voiture.demo && <DemoTag locale={locale} />}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[0.8rem] font-medium text-muted">{t.types[voiture.type]}</p>
        <h3 className="mt-1 text-[1.15rem] leading-snug font-semibold text-ink">{titre}</h3>
        <p className="mt-2 font-display text-[1.4rem] leading-tight font-semibold text-navy">
          <bdi>{prix}</bdi>
        </p>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-[0.9rem] text-ink">
          <li className="flex items-center gap-1.5">
            <Settings2 className="h-4 w-4 text-muted" strokeWidth={1.75} aria-hidden="true" />
            <span className="sr-only">{t.card.boite} : </span>
            {t.boites[voiture.boite]}
          </li>
          <li className="flex items-center gap-1.5">
            <Fuel className="h-4 w-4 text-muted" strokeWidth={1.75} aria-hidden="true" />
            <span className="sr-only">{t.card.carburant} : </span>
            {t.carburants[voiture.carburant]}
          </li>
          <li className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-muted" strokeWidth={1.75} aria-hidden="true" />
            <span className="sr-only">{t.card.places} : </span>
            {voiture.places}
          </li>
        </ul>

        <div className="mt-auto flex items-center gap-3 pt-5">
          {/* Le lien « Détails » couvre toute la carte */}
          <Link
            href={href}
            aria-label={t.card.detailsAria(titre)}
            className="btn btn-outline min-h-11 flex-1 after:absolute after:inset-0 after:content-['']"
          >
            {t.card.details}
          </Link>
          <a
            href={waLink(t.wa.voiture(voiture.ref, titre, prix))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.card.waAria(titre)}
            className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-whatsapp text-navy-deep transition-colors hover:bg-[#1fbd5a]"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </article>
  );
}
