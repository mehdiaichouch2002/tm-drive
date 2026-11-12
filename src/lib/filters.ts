import { BOITES, CARBURANTS, TYPES, type Voiture } from "@/data/voitures";

/** Paliers de budget (DH par jour) proposés dans les listes déroulantes */
export const BUDGETS = [300, 400, 500, 700, 1000, 1500];

export type Tri = "recents" | "prix-asc" | "prix-desc";

export type Filters = {
  type: Voiture["type"] | "";
  boite: Voiture["boite"] | "";
  carburant: Voiture["carburant"] | "";
  budgetMax: number;
  places: number;
  tri: Tri;
};

const num = (v: string | null) => {
  const n = Number(v);
  return v && Number.isFinite(n) && n > 0 ? n : 0;
};

const oneOf = <T extends string>(list: readonly T[], v: string | null): T | "" =>
  (list as readonly string[]).includes(v ?? "") ? (v as T) : "";

/** Lit les filtres depuis l'adresse de la page (?type=…&boite=…) */
export function parseFilters(sp: URLSearchParams): Filters {
  const tri = sp.get("tri");
  return {
    type: oneOf(TYPES, sp.get("type")),
    boite: oneOf(BOITES, sp.get("boite")),
    carburant: oneOf(CARBURANTS, sp.get("carburant")),
    budgetMax: num(sp.get("budget")),
    places: num(sp.get("places")),
    tri: tri === "prix-asc" || tri === "prix-desc" ? tri : "recents",
  };
}

export function applyFilters(list: Voiture[], f: Filters): Voiture[] {
  const out = list.filter(
    (v) =>
      (!f.type || v.type === f.type) &&
      (!f.boite || v.boite === f.boite) &&
      (!f.carburant || v.carburant === f.carburant) &&
      (!f.budgetMax || v.prix <= f.budgetMax) &&
      (!f.places || v.places >= f.places),
  );
  // « Plus récentes » = ordre du fichier src/data/voitures.ts (la première est la plus récente)
  if (f.tri === "prix-asc") out.sort((a, b) => a.prix - b.prix);
  if (f.tri === "prix-desc") out.sort((a, b) => b.prix - a.prix);
  return out;
}
