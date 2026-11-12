"use client";

import type { FormEvent } from "react";
import { BOITES, TYPES } from "@/data/voitures";
import { getDict, type Locale } from "@/i18n";
import { waLink } from "@/lib/utils";
import { WhatsAppIcon } from "../icons";

/** "2026-11-20" -> "20/11/2026" */
const frDate = (iso: string) => (iso ? iso.split("-").reverse().join("/") : "—");

/** Demande de réservation : ouvre WhatsApp avec un message déjà rédigé */
export function BookingForm({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const type = get("type") as (typeof TYPES)[number] | "";
    const boite = get("boite") as (typeof BOITES)[number] | "";

    const message = t.wa.booking({
      type: type ? t.types[type] : t.booking.anyType,
      boite: boite ? t.boites[boite] : t.booking.anyBoite,
      du: frDate(get("du")),
      au: frDate(get("au")),
      lieu: get("lieu") || "—",
      nom: get("nom") || "—",
    });
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 gap-x-3 gap-y-4">
      <div>
        <label htmlFor="r-du" className="label">
          {t.booking.du}
        </label>
        <input id="r-du" name="du" type="date" required className="field" />
      </div>
      <div>
        <label htmlFor="r-au" className="label">
          {t.booking.au}
        </label>
        <input id="r-au" name="au" type="date" required className="field" />
      </div>
      <div>
        <label htmlFor="r-type" className="label">
          {t.booking.type}
        </label>
        <select id="r-type" name="type" className="field" defaultValue="">
          <option value="">{t.booking.anyType}</option>
          {TYPES.map((v) => (
            <option key={v} value={v}>
              {t.types[v]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="r-boite" className="label">
          {t.booking.boite}
        </label>
        <select id="r-boite" name="boite" className="field" defaultValue="">
          <option value="">{t.booking.anyBoite}</option>
          {BOITES.map((b) => (
            <option key={b} value={b}>
              {t.boites[b]}
            </option>
          ))}
        </select>
      </div>
      <div className="col-span-2">
        <label htmlFor="r-lieu" className="label">
          {t.booking.lieu}
        </label>
        <select id="r-lieu" name="lieu" className="field" defaultValue={t.booking.lieux[0]}>
          {t.booking.lieux.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <div className="col-span-2">
        <label htmlFor="r-nom" className="label">
          {t.booking.nom}
        </label>
        <input id="r-nom" name="nom" type="text" autoComplete="name" required className="field" />
      </div>

      <button type="submit" className="btn btn-wa col-span-2 mt-1 min-h-13">
        <WhatsAppIcon className="h-5 w-5" />
        {t.booking.submit}
      </button>
      <p className="col-span-2 text-[0.85rem] leading-relaxed text-muted">{t.booking.note}</p>
    </form>
  );
}
