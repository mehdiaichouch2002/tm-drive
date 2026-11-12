import { BOITES, CARBURANTS, TYPES } from "@/data/voitures";
import { getDict, type Locale } from "@/i18n";
import { BUDGETS } from "@/lib/filters";
import { formatNumber, localePath } from "@/lib/utils";

/** Recherche rapide : un simple formulaire GET vers /voitures (fonctionne même sans JavaScript) */
export function SearchBar({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  return (
    <form
      action={localePath(locale, "/voitures")}
      method="get"
      role="search"
      aria-label={t.search.legend}
      className="grid grid-cols-2 gap-x-3 gap-y-4 rounded-2xl bg-surface p-4 shadow-lift sm:p-6 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end lg:gap-x-4"
    >
      <div>
        <label htmlFor="s-type" className="label">
          {t.search.type}
        </label>
        <select id="s-type" name="type" className="field" defaultValue="">
          <option value="">{t.search.allTypes}</option>
          {TYPES.map((v) => (
            <option key={v} value={v}>
              {t.types[v]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="s-boite" className="label">
          {t.search.boite}
        </label>
        <select id="s-boite" name="boite" className="field" defaultValue="">
          <option value="">{t.search.allBoites}</option>
          {BOITES.map((b) => (
            <option key={b} value={b}>
              {t.boites[b]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="s-carburant" className="label">
          {t.search.carburant}
        </label>
        <select id="s-carburant" name="carburant" className="field" defaultValue="">
          <option value="">{t.search.allCarburants}</option>
          {CARBURANTS.map((c) => (
            <option key={c} value={c}>
              {t.carburants[c]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="s-budget" className="label">
          {t.search.budgetMax}
        </label>
        <select id="s-budget" name="budget" className="field" defaultValue="">
          <option value="">{t.search.noMax}</option>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>
              {formatNumber(b)} {t.common.currency}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-accent col-span-2 lg:col-span-1 lg:px-8">
        {t.search.submit}
      </button>
    </form>
  );
}
