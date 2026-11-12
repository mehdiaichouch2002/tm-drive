import type { Metadata } from "next";
import { alwaysOpen, site } from "@/config/site";
import type { Voiture } from "@/data/voitures";
import { getDict, type Locale } from "@/i18n";
import { localePath } from "@/lib/utils";

/** Métadonnées communes : canonical, hreflang, Open Graph (aperçu WhatsApp) */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  noindex = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}): Metadata {
  const t = getDict(locale);
  const url = localePath(locale, path);
  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: localePath("fr", path),
        ar: localePath("ar", path),
        "x-default": localePath("fr", path),
      },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name[locale],
      locale: locale === "ar" ? "ar_MA" : "fr_MA",
      alternateLocale: locale === "ar" ? "fr_MA" : "ar_MA",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
    robots: noindex ? { index: false, follow: true } : undefined,
    formatDetection: { telephone: false },
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Fiche « agence de location de voitures » pour Google */
export function agencyJsonLd(locale: Locale) {
  const opens = site.hours.opens;
  const closes = alwaysOpen ? "23:59" : site.hours.closes;
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${site.url}/#agence`,
    name: site.name[locale],
    alternateName: site.name[locale === "ar" ? "fr" : "ar"],
    url: `${site.url}${localePath(locale)}`,
    image: `${site.url}/opengraph-image`,
    telephone: `+${site.phoneIntl}`,
    address: { "@type": "PostalAddress", addressLocality: "Meknès", addressCountry: "MA" },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHours: `Mo-Su ${opens}-${closes}`,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens,
      closes,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    areaServed: { "@type": "City", name: "Meknès" },
  };
}

/** Offre de location (uniquement pour les vraies voitures, jamais pour les exemples) */
export function voitureJsonLd(voiture: Voiture, locale: Locale) {
  const t = getDict(locale);
  const url = `${site.url}${localePath(locale, `/voitures/${voiture.slug}`)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    url,
    sku: voiture.ref,
    priceCurrency: "MAD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: voiture.prix,
      priceCurrency: "MAD",
      unitCode: "DAY",
    },
    businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
    availability:
      voiture.statut === "disponible" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    seller: { "@id": `${site.url}/#agence` },
    itemOffered: {
      "@type": "Car",
      name: voiture.titre[locale],
      description: voiture.description[locale],
      image: voiture.images.map((src) => (src.startsWith("/") ? `${site.url}${src}` : src)),
      bodyType: t.types[voiture.type],
      vehicleTransmission: t.boites[voiture.boite],
      fuelType: t.carburants[voiture.carburant],
      vehicleSeatingCapacity: voiture.places,
      numberOfDoors: voiture.portes,
    },
  };
}
