/**
 * Toutes les informations de l'agence sont ici.
 * Modifier une valeur dans ce fichier la change partout sur le site.
 */
export const site = {
  name: {
    fr: "TM Drive Location de voiture",
    ar: "تي إم درايف لكراء السيارات",
  },
  wordmark: "TM Drive",
  city: { fr: "Meknès", ar: "مكناس" },

  /** Téléphone tel qu'il s'affiche sur le site */
  phoneDisplay: "06 12 51 12 12",
  /** Même numéro au format international, sans « + » ni espaces (WhatsApp et appels) */
  phoneIntl: "212612511212",

  /**
   * Horaires, tous les jours. Format 24 h « HH:MM ».
   * « 00:00 » → « 24:00 » = ouvert 24h/24 (c'est ce qu'indique la fiche Google).
   */
  hours: { opens: "00:00", closes: "24:00" },

  /** Note Google affichée sur le site. À mettre à jour à la main de temps en temps. */
  rating: { value: 5, count: 57, fiveStars: 57 },

  /** Position sur la carte (aucune adresse postale n'est affichée) */
  geo: { lat: 33.8994492, lng: -5.5203278 },

  /**
   * Prénom affiché dans le bloc Contact (cité par les clients dans leurs avis Google).
   * Laisser les deux valeurs vides ("") pour ne rien afficher.
   */
  advisorName: { fr: "Tarik", ar: "طارق" },

  /** Réseaux sociaux : rien ne s'affiche tant que la valeur est vide */
  instagram: "",
  facebook: "",

  /** Lien « Voir tous les avis sur Google » */
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=TM+DRIVE+Location+de+voiture+Mekn%C3%A8s",

  /** Références des 3 voitures mises en avant sur la page d'accueil */
  featuredRefs: ["TMD-010", "TMD-008", "TMD-002"],

  /**
   * Adresse publique du site (pour le référencement et l'aperçu WhatsApp).
   * Sur Vercel, elle est détectée automatiquement. Avec un nom de domaine,
   * définir la variable NEXT_PUBLIC_SITE_URL (ex. https://www.tmdrive.ma).
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  credit: { name: "Mehdi Aichouch", url: "https://www.mehdiaichouch.com" },
} as const;

/** Vrai si l'agence est ouverte en continu */
export const alwaysOpen = (site.hours.opens as string) === "00:00" && (site.hours.closes as string) === "24:00";

export type Site = typeof site;
