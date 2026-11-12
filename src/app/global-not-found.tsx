import type { Metadata } from "next";
import { Monogram } from "@/components/icons";
import { ar } from "@/i18n/ar";
import { fr } from "@/i18n/fr";
import { site } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${fr.notFound.title} | TM Drive`,
  robots: { index: false },
};

/* Liens <a> classiques : les deux langues ont chacune leur mise en page racine. */
/* eslint-disable @next/next/no-html-link-for-pages */

/**
 * Page 404, commune aux deux langues.
 * Volontairement sans police web : tout ce qui est importé ici serait préchargé sur toutes les pages.
 */
export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body className="antialiased">
        <main className="flex min-h-dvh flex-col items-center justify-center bg-navy px-6 py-16 text-center text-paper">
          <Monogram className="h-16 w-16" />
          <p className="mt-8 font-display text-[4.5rem] leading-none text-signal">404</p>

          <h1 className="mt-6 text-[1.9rem] font-medium">{fr.notFound.title}</h1>
          <p className="mt-2 text-paper/80">{fr.notFound.text}</p>
          <a href="/" className="btn btn-light mt-6">
            {fr.notFound.home}
          </a>

          <span className="my-10 block h-px w-16 bg-signal" />

          <div lang="ar" dir="rtl">
            <p className="text-[1.6rem] font-semibold">{ar.notFound.title}</p>
            <p className="mt-2 text-paper/80">{ar.notFound.text}</p>
            <a href="/ar" className="btn btn-light mt-6">
              {ar.notFound.home}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
