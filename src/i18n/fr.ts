import type { Voiture } from "@/data/voitures";

export const fr = {
  meta: {
    homeTitle: "TM Drive | Location de voitures à Meknès, 24h/24",
    homeDescription: (note: string, avis: number, horaires: string) =>
      `Location de voitures à Meknès. Notée ${note}/5 sur Google (${avis} avis). Ouverte tous les jours, ${horaires}. Réservation en un message WhatsApp.`,
    voituresTitle: "Voitures à louer à Meknès | TM Drive",
    voituresDescription:
      "Citadines, berlines, SUV, 4x4, monospaces et utilitaires à louer à Meknès. Filtrez par catégorie, boîte et budget, puis réservez sur WhatsApp.",
    voitureTitle: (titre: string) => `${titre} | TM Drive`,
    ogAlt: "TM Drive, location de voitures à Meknès",
  },

  common: {
    skip: "Aller au contenu",
    whatsapp: "WhatsApp",
    call: "Appeler",
    directions: "Itinéraire",
    perDay: "/ jour",
    currency: "DH",
    demo: "Exemple",
    openDaily: (h: string) => `Ouvert tous les jours, ${h}`,
    everyDay: (h: string) => `Tous les jours, ${h}`,
    ratingLine: (note: string, avis: number) => `${note} sur Google · ${avis} avis`,
    ratingAria: (note: string) => `Note : ${note} sur 5`,
    newTab: "(nouvel onglet)",
  },

  nav: {
    home: "Accueil",
    voitures: "Nos voitures",
    automatiques: "Automatiques",
    reserver: "Réserver",
    contact: "Contact",
    main: "Navigation principale",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    langSwitch: "Langue du site",
    logoSub: "Location de voitures · Meknès",
  },

  hero: {
    title: "Votre voiture à Meknès, prête quand vous l'êtes.",
    titleLines: ["Votre voiture à Meknès,", "prête quand vous l'êtes."],
    slideshow: "Voitures à la une",
    showSlide: (i: number) => `Afficher la voiture ${i}`,
    stamp: (avis: number) => `AVIS GOOGLE • ${avis} AVIS • MEKNÈS • `,
    sub: "Location de voitures à Meknès, 24h/24. Donnez-nous vos dates sur WhatsApp : nous vous répondons avec la voiture et le tarif.",
    ctaVoitures: "Voir les voitures",
    ctaWa: "Réserver sur WhatsApp",
  },

  open: {
    now: "Ouvert en ce moment",
    closes: (h: string) => `ferme à ${h}`,
    closed: "Fermé pour le moment",
    opens: (h: string) => `ouvre à ${h}`,
    always: "24h/24, 7j/7",
  },

  marquee: {
    label: "Ce qui revient dans les avis de nos clients",
    items: [
      "Voitures propres",
      "Véhicules récents",
      "Équipe réactive",
      "Prix raisonnables",
      "Bon accueil",
      "Toujours disponible",
    ],
  },

  search: {
    legend: "Rechercher une voiture",
    type: "Catégorie",
    allTypes: "Toutes",
    boite: "Boîte de vitesses",
    allBoites: "Peu importe",
    carburant: "Carburant",
    allCarburants: "Tous",
    budgetMax: "Budget max / jour",
    noMax: "Sans max.",
    submit: "Rechercher",
  },

  featured: {
    title: "Voitures à la une",
    intro: "Quelques exemples de voitures à louer, de la citadine au 4x4.",
    all: "Voir toutes les voitures",
  },

  why: {
    title: "Pourquoi TM Drive",
    intro: "Ce que nos clients retiennent de nous, dans leurs propres mots.",
    imageAlt: "Voitures propres alignées, prêtes à partir",
    items: [
      {
        title: "Des voitures propres et récentes",
        text: "C'est ce qui revient le plus souvent dans les avis : une voiture propre, bien entretenue, prête à l'heure.",
      },
      {
        title: "Une équipe qui répond vite",
        text: "Réactive et à l'écoute, selon nos clients. Sur WhatsApp, vous avez une réponse, pas un formulaire.",
      },
      {
        title: "Ouvert 24h/24, 7j/7",
        text: "Vol tardif ou départ à l'aube : l'agence est ouverte à toute heure, tous les jours.",
      },
      {
        title: "Des prix raisonnables, annoncés avant",
        text: "Nos clients parlent de prix corrects. Demandez votre tarif sur WhatsApp : vous le connaissez avant de réserver.",
      },
    ],
  },

  reviews: {
    title: "Ce que disent nos clients",
    outOf: "sur 5",
    count: (n: number) => `${n} avis Google`,
    badge: "Avis Google",
    all: "Voir tous les avis sur Google",
    prev: "Avis précédents",
    next: "Avis suivants",
    region: "Avis de clients",
    intro: "Six avis parmi ceux laissés sur notre fiche Google, recopiés mot pour mot.",
    fiveStars: (n: number, total: number) =>
      n === total ? `Les ${total} avis nous donnent 5 étoiles` : `${n} avis sur ${total} nous donnent 5 étoiles`,
    pick: "Choisir un avis",
    by: (name: string) => `Avis de ${name}`,
    original: "Avis rédigé en arabe",
    pause: "Mettre le défilement en pause",
    play: "Reprendre le défilement",
  },

  booking: {
    title: "Réservez en un message",
    text: "Indiquez vos dates et le type de voiture. Nous vous répondons sur WhatsApp avec les voitures disponibles et le tarif.",
    imageAlt: "Route du Maroc vue depuis le volant",
    type: "Catégorie",
    anyType: "Peu importe",
    boite: "Boîte de vitesses",
    anyBoite: "Peu importe",
    du: "Du",
    au: "Au",
    lieu: "Prise en charge",
    lieux: ["À l'agence (Meknès)", "À l'aéroport", "Autre lieu, à préciser"],
    nom: "Votre nom",
    submit: "Envoyer sur WhatsApp",
    steps: [
      { title: "Vous indiquez vos dates", text: "Dates, catégorie, lieu de prise en charge : c'est tout." },
      { title: "Nous vous répondons sur WhatsApp", text: "Avec les voitures disponibles et le tarif." },
      { title: "Vous prenez le volant", text: "La voiture vous attend à l'heure convenue." },
    ],
    note: "Rien n'est enregistré sur ce site : le bouton ouvre WhatsApp avec votre message, prêt à envoyer. La réservation est confirmée par l'agence.",
  },

  contact: {
    title: "Passez nous voir ou écrivez-nous",
    advisor: (name: string) => `${name}, votre interlocuteur`,
    phone: "Téléphone",
    hours: "Horaires",
    place: "Meknès, Maroc",
    where: "Où nous trouver",
    mapTitle: "Carte : emplacement de l'agence à Meknès",
    write: "Écrire sur WhatsApp",
  },

  footer: {
    tagline: "Location de voitures à Meknès, 24h/24.",
    links: "Liens rapides",
    hours: "Horaires",
    contact: "Contact",
    rights: (year: number, name: string) => `© ${year} ${name}`,
    credit: "Site réalisé par",
  },

  fab: {
    tip: "Une question ? Écrivez-nous",
    aria: "Écrire à l'agence sur WhatsApp",
  },

  listing: {
    title: "Voitures à louer à Meknès",
    intro: "Choisissez vos critères. Une voiture vous plaît ? Un message WhatsApp suffit.",
    filters: "Filtres",
    results: "Résultats",
    places: "Places min.",
    anyPlaces: "Peu importe",
    sort: "Trier par",
    sortRecent: "Plus récentes",
    sortAsc: "Prix croissant",
    sortDesc: "Prix décroissant",
    count: (n: number) => (n === 0 ? "Aucune voiture" : n === 1 ? "1 voiture" : `${n} voitures`),
    reset: "Réinitialiser les filtres",
    emptyTitle: "Aucune voiture ne correspond à ces critères",
    emptyText: "Vous ne trouvez pas ? Dites-nous ce que vous cherchez.",
    emptyCta: "Écrire sur WhatsApp",
    demoNotice:
      "Les voitures portant la mention « Exemple » sont des exemples de présentation, avec des tarifs d'exemple. Contactez-nous pour connaître les voitures disponibles et les tarifs réels.",
  },

  card: {
    details: "Détails",
    detailsAria: (titre: string) => `Détails : ${titre}`,
    waAria: (titre: string) => `Demander cette voiture sur WhatsApp : ${titre}`,
    places: "Places",
    boite: "Boîte",
    carburant: "Carburant",
  },

  voiture: {
    back: "Toutes les voitures",
    ref: "Réf.",
    type: "Catégorie",
    boite: "Boîte",
    carburant: "Carburant",
    places: "Places",
    portes: "Portes",
    bagages: "Valises",
    specs: "Caractéristiques",
    atouts: "Équipements",
    description: "Description",
    interested: "Cette voiture vous intéresse ?",
    interestedText:
      "Écrivez-nous ou appelez : nous vous disons si elle est disponible à vos dates et à quel tarif.",
    similar: "Voitures similaires",
    demoNote:
      "Cette voiture est un exemple de présentation : le modèle, la photo et le tarif ne correspondent pas à une offre réelle.",
    photoAlt: (titre: string, i: number) => `${titre} : photo ${i}`,
  },

  gallery: {
    region: "Photos de la voiture",
    prev: "Photo précédente",
    next: "Photo suivante",
    zoom: (i: number) => `Agrandir la photo ${i}`,
    show: (i: number) => `Afficher la photo ${i}`,
    close: "Fermer",
    lightbox: "Photos en grand format",
  },

  notFound: {
    title: "Page introuvable",
    text: "Cette page n'existe pas ou n'existe plus.",
    home: "Retour à l'accueil",
  },

  types: {
    citadine: "Citadine",
    berline: "Berline",
    suv: "SUV",
    "4x4": "4x4",
    monospace: "Monospace",
    utilitaire: "Utilitaire",
  } satisfies Record<Voiture["type"], string>,

  boites: {
    manuelle: "Manuelle",
    automatique: "Automatique",
  } satisfies Record<Voiture["boite"], string>,

  carburants: {
    Diesel: "Diesel",
    Essence: "Essence",
    Hybride: "Hybride",
  } satisfies Record<Voiture["carburant"], string>,

  statuts: {
    disponible: "Disponible",
    réservée: "Réservée",
  } satisfies Record<Voiture["statut"], string>,

  wa: {
    general: "Bonjour, je vous contacte depuis votre site. Je souhaite louer une voiture.",
    search: "Bonjour, je cherche une voiture à louer à Meknès. Voici ce que je recherche : ",
    voiture: (ref: string, titre: string, prix: string) =>
      `Bonjour, je suis intéressé(e) par la voiture ${ref} — ${titre} (${prix}). Est-elle disponible ?`,
    booking: (d: { type: string; boite: string; du: string; au: string; lieu: string; nom: string }) =>
      [
        "Bonjour, je souhaite réserver une voiture chez TM Drive.",
        `Catégorie : ${d.type}`,
        `Boîte : ${d.boite}`,
        `Du : ${d.du}`,
        `Au : ${d.au}`,
        `Prise en charge : ${d.lieu}`,
        `Nom : ${d.nom}`,
      ].join("\n"),
  },
};

export type Dict = typeof fr;
