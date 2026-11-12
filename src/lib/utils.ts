import { alwaysOpen, site } from "@/config/site";
import type { Voiture } from "@/data/voitures";
import { getDict, type Locale } from "@/i18n";

const NBSP = " ";

/** 1250 -> "1 250" (espace insécable : le nombre reste entier, y compris en arabe) */
export const formatNumber = (n: number) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);

/** "450 DH / jour", "450 درهم / لليوم" */
export function formatPrice(prix: number, locale: Locale) {
  const t = getDict(locale).common;
  return `${formatNumber(prix)}${NBSP}${t.currency} ${t.perDay}`;
}

/** Préfixe /ar pour la version arabe */
export function localePath(locale: Locale, path = "/") {
  if (locale === "fr") return path;
  return path === "/" ? "/ar" : `/ar${path}`;
}

export const waLink = (message: string) =>
  `https://wa.me/${site.phoneIntl}?text=${encodeURIComponent(message)}`;

export const telLink = `tel:+${site.phoneIntl}`;

export const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}`;

export const agencyMapEmbed = `https://maps.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=15&output=embed`;

/** "11:00" -> "11h" ; "11:30" -> "11h30" */
const frHour = (h: string) => {
  const [hh, mm] = h.split(":");
  return `${Number(hh)}h${mm === "00" ? "" : mm}`;
};

/** Une heure seule : "19h" en français, "19:00" en arabe */
export const hourLabel = (h: string, locale: Locale) => (locale === "ar" ? h : frHour(h));

/** "24h/24" si l'agence ne ferme pas ; sinon "11h–19h" en français, "من 11:00 إلى 19:00" en arabe */
export function hoursLabel(locale: Locale) {
  if (alwaysOpen) return locale === "ar" ? "24 ساعة على 24" : "24h/24";
  const { opens, closes } = site.hours;
  return locale === "ar"
    ? `من ${opens} إلى ${closes}`
    : `${frHour(opens)}–${frHour(closes)}`;
}

/** 5 -> "5,0" ; 4.8 -> "4,8" */
export const ratingLabel = () => site.rating.value.toFixed(1).replace(".", ",");

export const hasDemo = (list: Voiture[]) => list.some((v) => v.demo);

export const cx = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(" ");
