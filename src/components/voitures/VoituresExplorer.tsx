"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { RotateCcw } from "lucide-react";
import type { CSSProperties } from "react";
import { BOITES, CARBURANTS, TYPES, voitures, type Voiture } from "@/data/voitures";
import { getDict, type Locale } from "@/i18n";
import { BUDGETS, applyFilters, parseFilters } from "@/lib/filters";
import { formatNumber, waLink } from "@/lib/utils";
import { VoitureCard } from "../VoitureCard";
import { WhatsAppIcon } from "../icons";

/** Grille de voitures (aussi utilisée comme rendu initial côté serveur) */
export function VoituresGrid({ list, locale }: { list: Voiture[]; locale: Locale }) {
  return (
    <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((v, i) => (
        <li key={v.ref} className="card-in" style={{ "--i": i } as CSSProperties}>
          <VoitureCard voiture={v} locale={locale} priority={i === 0} />
        </li>
      ))}
    </ul>
  );
}

/** Filtres côté navigateur, synchronisés avec l'adresse de la page */
export function VoituresExplorer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const pathname = usePathname() ?? "/voitures";
  const sp = useSearchParams();
  const f = parseFilters(new URLSearchParams(sp?.toString()));
  const list = applyFilters(voitures, f);

  const update = (patch: Record<string, string | number>) => {
    const next = new URLSearchParams(sp?.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === "" || v === 0) next.delete(k);
      else next.set(k, String(v));
    }
    const qs = next.toString();
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  };

  const reset = () => window.history.replaceState(null, "", pathname);

  const hasFilters = Boolean(f.type || f.boite || f.carburant || f.budgetMax || f.places);
  const chip = (active: boolean) =>
    `flex min-h-11 shrink-0 cursor-pointer items-center rounded-full border px-4 text-[0.9rem] font-medium transition-colors ${
      active
        ? "border-navy bg-navy text-paper"
        : "border-line bg-surface text-ink hover:border-signal"
    }`;

  return (
    <div>
      <section
        aria-label={t.listing.filters}
        className="load-in rounded-2xl bg-surface p-4 shadow-lift sm:p-6"
      >
        {/* Catégories */}
        <div
          role="group"
          aria-label={t.search.type}
          className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          <button type="button" aria-pressed={!f.type} onClick={() => update({ type: "" })} className={chip(!f.type)}>
            {t.search.allTypes}
          </button>
          {TYPES.map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={f.type === v}
              onClick={() => update({ type: f.type === v ? "" : v })}
              className={chip(f.type === v)}
            >
              {t.types[v]}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 lg:grid-cols-5">
          <div>
            <label htmlFor="f-boite" className="label">
              {t.search.boite}
            </label>
            <select
              id="f-boite"
              className="field"
              value={f.boite}
              onChange={(e) => update({ boite: e.target.value })}
            >
              <option value="">{t.search.allBoites}</option>
              {BOITES.map((b) => (
                <option key={b} value={b}>
                  {t.boites[b]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-carburant" className="label">
              {t.search.carburant}
            </label>
            <select
              id="f-carburant"
              className="field"
              value={f.carburant}
              onChange={(e) => update({ carburant: e.target.value })}
            >
              <option value="">{t.search.allCarburants}</option>
              {CARBURANTS.map((c) => (
                <option key={c} value={c}>
                  {t.carburants[c]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-places" className="label">
              {t.listing.places}
            </label>
            <select
              id="f-places"
              className="field"
              value={f.places || ""}
              onChange={(e) => update({ places: e.target.value })}
            >
              <option value="">{t.listing.anyPlaces}</option>
              {[5, 7].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-max" className="label">
              {t.search.budgetMax}
            </label>
            <select
              id="f-max"
              className="field"
              value={f.budgetMax || ""}
              onChange={(e) => update({ budget: e.target.value })}
            >
              <option value="">{t.search.noMax}</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {formatNumber(b)} {t.common.currency}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <label htmlFor="f-tri" className="label">
              {t.listing.sort}
            </label>
            <select
              id="f-tri"
              className="field"
              value={f.tri}
              onChange={(e) => update({ tri: e.target.value === "recents" ? "" : e.target.value })}
            >
              <option value="recents">{t.listing.sortRecent}</option>
              <option value="prix-asc">{t.listing.sortAsc}</option>
              <option value="prix-desc">{t.listing.sortDesc}</option>
            </select>
          </div>
        </div>
      </section>

      <div className="mt-8 mb-6 flex min-h-11 flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="font-display text-[1.25rem] font-semibold text-navy">
          {t.listing.count(list.length)}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-[0.9rem] font-semibold text-navy underline decoration-signal decoration-2 underline-offset-[6px] hover:text-signal-deep"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            {t.listing.reset}
          </button>
        )}
      </div>

      {list.length > 0 ? (
        // La clé change à chaque filtre : les cartes se reposent une à une
        <VoituresGrid key={sp?.toString()} list={list} locale={locale} />
      ) : (
        <div className="rounded-2xl border border-dashed border-signal-deep/60 bg-surface px-6 py-14 text-center">
          <h2 className="text-[1.5rem] leading-snug font-semibold text-navy">{t.listing.emptyTitle}</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">{t.listing.emptyText}</p>
          <a
            href={waLink(t.wa.search)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa mt-7"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {t.listing.emptyCta}
          </a>
        </div>
      )}
    </div>
  );
}
