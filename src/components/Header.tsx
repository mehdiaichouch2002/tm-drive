"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { getDict, type Locale } from "@/i18n";
import { localePath, waLink } from "@/lib/utils";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./icons";

export function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const menu = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // L'en-tête se range quand on descend, revient dès qu'on remonte
      setHidden(y > 500 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: localePath(locale, "/voitures"), label: t.nav.voitures },
    { href: `${localePath(locale, "/voitures")}?boite=automatique`, label: t.nav.automatiques },
    { href: `${localePath(locale)}#reserver`, label: t.nav.reserver },
    { href: `${localePath(locale)}#contact`, label: t.nav.contact },
  ];

  // Même page dans l'autre langue
  const bare = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  // Pages qui commencent par un bandeau bleu nuit : en-tête transparent tant qu'on est tout en haut
  const overlay = (bare === "/" || bare === "/voitures") && !scrolled;
  const frHref = bare;
  const arHref = bare === "/" ? "/ar" : `/ar${bare}`;

  const openMenu = () => {
    menu.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };
  const closeMenu = () => menu.current?.close();
  const onClosed = () => {
    document.documentElement.style.overflow = "";
  };

  const langSwitch = (light: boolean) => (
    <nav
      aria-label={t.nav.langSwitch}
      className={`flex items-center text-[0.85rem] font-medium ${light ? "text-paper" : "text-navy"}`}
    >
      <a
        href={frHref}
        hrefLang="fr"
        lang="fr"
        aria-current={locale === "fr" ? "true" : undefined}
        className={`flex h-11 items-center px-2 ${locale === "fr" ? "font-semibold underline decoration-signal decoration-2 underline-offset-[6px]" : "opacity-70 hover:opacity-100"}`}
      >
        FR
      </a>
      <span aria-hidden="true" className={`h-4 w-px ${light ? "bg-paper/30" : "bg-navy/25"}`} />
      <a
        href={arHref}
        hrefLang="ar"
        lang="ar"
        aria-current={locale === "ar" ? "true" : undefined}
        className={`flex h-11 items-center px-2 ${locale === "ar" ? "font-semibold underline decoration-signal decoration-2 underline-offset-[6px]" : "opacity-70 hover:opacity-100"}`}
      >
        عربية
      </a>
    </nav>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow,translate] duration-500 ${
        hidden ? "-translate-y-full" : ""
      } ${
        scrolled
          ? "border-line bg-paper/85 shadow-[0_6px_24px_-18px_rgba(14,27,51,.5)] backdrop-blur-md"
          : overlay
            ? "border-transparent bg-transparent"
            : "border-transparent bg-paper"
      }`}
    >
      <div className="wrap flex h-(--header-h) items-center justify-between gap-4">
        <Link href={localePath(locale)} aria-label={t.nav.home} className="flex min-h-11 shrink-0 items-center">
          <Logo locale={locale} light={overlay} />
        </Link>

        <nav aria-label={t.nav.main} className="hidden lg:block">
          <ul
            className={`flex items-center gap-8 text-[0.95rem] font-medium transition-colors duration-300 ${overlay ? "text-paper" : "text-ink"}`}
          >
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="relative inline-flex min-h-11 items-center transition-colors after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-center after:scale-x-0 after:bg-signal after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          {langSwitch(overlay)}
          <a
            href={waLink(t.wa.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa hidden min-h-11 px-5 sm:inline-flex"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {t.common.whatsapp}
          </a>
          <button
            type="button"
            onClick={openMenu}
            aria-label={t.nav.openMenu}
            aria-haspopup="dialog"
            className={`-me-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full lg:hidden ${overlay ? "text-paper" : "text-navy"}`}
          >
            <Menu className="h-6 w-6" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Menu mobile plein écran */}
      <dialog
        ref={menu}
        onClose={onClosed}
        aria-label={t.nav.main}
        className="m-0 h-dvh max-h-none w-screen max-w-none flex-col bg-navy p-0 text-paper open:flex"
      >
        <div className="wrap flex h-(--header-h) shrink-0 items-center justify-between">
          <Logo locale={locale} light />
          <button
            type="button"
            onClick={closeMenu}
            aria-label={t.nav.closeMenu}
            className="-me-2 flex h-11 w-11 items-center justify-center rounded-full"
          >
            <X className="h-6 w-6" strokeWidth={1.75} />
          </button>
        </div>
        <nav aria-label={t.nav.main} className="wrap flex-1 overflow-y-auto pt-6">
          <ul>
            {links.map((l) => (
              <li key={l.href} className="border-b border-paper/15">
                <Link
                  href={l.href}
                  onClick={closeMenu}
                  className="block py-5 font-display text-[1.75rem] leading-tight"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4">{langSwitch(true)}</div>
        </nav>
        <div className="wrap shrink-0 pt-4 pb-8">
          <a
            href={waLink(t.wa.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa min-h-14 w-full text-base"
          >
            <WhatsAppIcon className="h-6 w-6" />
            {t.hero.ctaWa}
          </a>
        </div>
      </dialog>
    </header>
  );
}
