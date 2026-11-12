import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { bricolage } from "./fonts-fr";

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-plex-arabic",
  preload: false,
});

// Bricolage Grotesque (même fichier que la version française) sert au logo « TM Drive »
export const fontsAr = `${plexArabic.variable} ${bricolage.variable}`;
