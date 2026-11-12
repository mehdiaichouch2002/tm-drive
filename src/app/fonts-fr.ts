import { Bricolage_Grotesque, Inter } from "next/font/google";

/*
 * Aucune police n'est préchargée (preload: false) : avec deux mises en page racine,
 * Next.js préchargerait les polices d'une langue sur les pages de l'autre.
 * Elles se chargent dès la lecture du CSS, avec une police de secours ajustée
 * (pas de saut de mise en page), et laissent la priorité à la photo principale.
 */

/** Titres en français, et logo « TM Drive » dans les deux langues */
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  preload: false,
});

/** Texte courant en français */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: false,
});

// L'avis rédigé en arabe utilise la police arabe du téléphone (pas de téléchargement)
export const fontsFr = `${bricolage.variable} ${inter.variable}`;
