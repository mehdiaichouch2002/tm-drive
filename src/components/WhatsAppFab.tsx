import { getDict, type Locale } from "@/i18n";
import { waLink } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

/** Bouton WhatsApp flottant : en bas à droite (en bas à gauche en arabe) */
export function WhatsAppFab({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <a
      href={waLink(t.wa.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.fab.aria}
      className="fab fixed end-4 bottom-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-navy-deep shadow-lift transition-transform hover:scale-105 sm:end-6 sm:bottom-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span
        aria-hidden="true"
        className="fab-tip absolute end-[calc(100%+0.75rem)] rounded-full bg-navy px-4 py-2 text-[0.85rem] font-medium whitespace-nowrap text-paper shadow-soft"
      >
        {t.fab.tip}
      </span>
    </a>
  );
}
