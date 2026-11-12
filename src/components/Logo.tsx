import { getDict, type Locale } from "@/i18n";
import { Monogram } from "./icons";

export function Logo({ locale, light = false }: { locale: Locale; light?: boolean }) {
  const t = getDict(locale);
  return (
    <span className={`flex items-center gap-3 transition-colors duration-300 ${light ? "text-paper" : "text-navy"}`}>
      <Monogram className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          lang="fr"
          dir="ltr"
          className="font-wordmark text-[1.4rem] leading-none font-extrabold tracking-[-0.03em] uppercase"
        >
          TM <span className={light ? "text-signal" : "text-signal-deep"}>Drive</span>
        </span>
        <span
          className={`mt-1.5 text-[0.62rem] leading-none font-medium ${
            locale === "ar" ? "text-[0.7rem]" : ""
          } ${light ? "text-paper/75" : "text-muted"}`}
        >
          {t.nav.logoSub}
        </span>
      </span>
    </span>
  );
}
