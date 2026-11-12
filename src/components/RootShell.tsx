import type { ReactNode } from "react";
import { getDict, isRtl, type Locale } from "@/i18n";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MotionProvider } from "./Motion";
import { WhatsAppFab } from "./WhatsAppFab";

/** Structure commune aux deux langues : <html>, en-tête, contenu, pied de page */
export function RootShell({
  locale,
  fonts,
  children,
}: {
  locale: Locale;
  fonts: string;
  children: ReactNode;
}) {
  const t = getDict(locale);
  return (
    <html lang={locale} dir={isRtl(locale) ? "rtl" : "ltr"} className={fonts}>
      <body className="antialiased">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-paper"
        >
          {t.common.skip}
        </a>
        <MotionProvider>
          <Header locale={locale} />
          <main id="contenu">{children}</main>
          <Footer locale={locale} />
          <WhatsAppFab locale={locale} />
        </MotionProvider>
      </body>
    </html>
  );
}
