import { fr, type Dict } from "./fr";
import { ar } from "./ar";

export type Locale = "fr" | "ar";
export const locales: Locale[] = ["fr", "ar"];
export type { Dict };

export const getDict = (locale: Locale): Dict => (locale === "ar" ? ar : fr);
export const isRtl = (locale: Locale) => locale === "ar";
