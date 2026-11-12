/**
 * LISTE DES VOITURES
 * ------------------
 * Pour ajouter une voiture : copier un bloc { ... } complet, le coller EN HAUT de la
 * liste (la première voiture de la liste est considérée comme la plus récente), puis
 * changer les valeurs. Voir le README pour un exemple pas à pas.
 */

export type Voiture = {
  ref: string; // "TMD-001"
  slug: string; // adresse de la page : /voitures/<slug> (minuscules, tirets, sans accents)
  type: "citadine" | "berline" | "suv" | "4x4" | "monospace" | "utilitaire";
  boite: "manuelle" | "automatique";
  carburant: "Diesel" | "Essence" | "Hybride";
  titre: { fr: string; ar: string };
  prix: number; // en DH, par jour
  places: number;
  portes: number;
  bagages: number; // nombre de valises
  atouts: { fr: string[]; ar: string[] };
  description: { fr: string; ar: string };
  images: string[]; // 3 à 6 photos ; la première sert de photo principale
  statut: "disponible" | "réservée";
  demo: boolean; // true = voiture d'exemple (étiquette « Exemple » affichée)
};

export const TYPES: Voiture["type"][] = [
  "citadine",
  "berline",
  "suv",
  "4x4",
  "monospace",
  "utilitaire",
];

export const BOITES: Voiture["boite"][] = ["manuelle", "automatique"];

export const CARBURANTS: Voiture["carburant"][] = ["Diesel", "Essence", "Hybride"];

/** Raccourci pour les photos de démonstration hébergées sur Unsplash (haute définition) */
const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=85`;

/** Photos d'intérieur réutilisées par les voitures d'exemple */
const interieur = {
  volant: photo("1471174617910-3e9c04f58ff5"),
  volant2: photo("1547306220-c0ab7aba52b1"),
  volant3: photo("1497564245203-66a1216f073a"),
  tableau: photo("1758411897888-3ca658535fdf"),
  tableau2: photo("1611099711902-1228419f7113"),
  tableau3: photo("1710083521061-c1b1701c5d95"),
  suv: photo("1706589270240-b5696c0915b6"),
  suv2: photo("1741874092037-80951e183ce7"),
  coffre: photo("1602161755661-3781cddac355"),
  coffre2: photo("1688054004445-7c9108eb4005"),
  coffre3: photo("1763569799665-485826a970f6"),
  porte: photo("1675311149330-ff19be4aa6be"),
  chargement: photo("1742858492775-8f58f645aa12"),
};

export const voitures: Voiture[] = [
  {
    ref: "TMD-013",
    slug: "utilitaire-3-places-diesel",
    type: "utilitaire",
    boite: "manuelle",
    carburant: "Diesel",
    titre: { fr: "Utilitaire 3 places, grand volume", ar: "سيارة نفعية بثلاثة مقاعد وحجم كبير" },
    prix: 450,
    places: 3,
    portes: 4,
    bagages: 12,
    atouts: {
      fr: ["Climatisation", "Porte latérale coulissante", "Bluetooth", "Kilométrage à convenir"],
      ar: ["مكيف", "باب جانبي منزلق", "بلوتوث", "الكيلومترات حسب الاتفاق"],
    },
    description: {
      fr: "Un utilitaire pour un déménagement ou un transport de marchandises. Trois places à l'avant et un grand espace de chargement, accessible par l'arrière et par le côté.",
      ar: "سيارة نفعية للترحيل أو نقل البضائع. ثلاثة مقاعد في الأمام ومساحة تحميل كبيرة يمكن الوصول إليها من الخلف ومن الجانب.",
    },
    images: [photo("1768400554801-2002b63e0591"), interieur.chargement, interieur.volant2],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "TMD-012",
    slug: "monospace-7-places-diesel",
    type: "monospace",
    boite: "manuelle",
    carburant: "Diesel",
    titre: { fr: "Monospace 7 places pour la famille", ar: "سيارة عائلية بسبعة مقاعد" },
    prix: 550,
    places: 7,
    portes: 5,
    bagages: 5,
    atouts: {
      fr: ["Climatisation avant et arrière", "7 vraies places", "Portes coulissantes", "Siège enfant sur demande"],
      ar: ["مكيف أمامي وخلفي", "سبعة مقاعد حقيقية", "أبواب منزلقة", "مقعد أطفال عند الطلب"],
    },
    description: {
      fr: "Sept places et de la place pour les valises : le bon choix pour une famille ou un groupe d'amis. Les portes coulissantes facilitent la montée, même dans une rue étroite.",
      ar: "سبعة مقاعد ومكان للحقائب: الاختيار المناسب لعائلة أو مجموعة أصدقاء. الأبواب المنزلقة تسهل الصعود حتى في زقاق ضيق.",
    },
    images: [photo("1648902180388-e52c0fdebcd4"), interieur.porte, interieur.coffre3],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "TMD-011",
    slug: "4x4-tout-terrain-manuelle",
    type: "4x4",
    boite: "manuelle",
    carburant: "Diesel",
    titre: { fr: "4x4 tout-terrain pour les pistes", ar: "سيارة رباعية الدفع للمسالك الوعرة" },
    prix: 900,
    places: 5,
    portes: 5,
    bagages: 3,
    atouts: {
      fr: ["4 roues motrices", "Garde au sol élevée", "Climatisation", "Roue de secours complète"],
      ar: ["دفع رباعي", "ارتفاع كبير عن الأرض", "مكيف", "عجلة احتياطية كاملة"],
    },
    description: {
      fr: "Un vrai tout-terrain pour sortir de la route : pistes, montagne, désert. Quatre roues motrices et une garde au sol élevée.",
      ar: "سيارة رباعية حقيقية للخروج عن الطريق المعبدة: مسالك، جبال، صحراء. دفع رباعي وارتفاع كبير عن الأرض.",
    },
    images: [photo("1506015391300-4802dc74de2e"), interieur.volant3, interieur.coffre],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "TMD-010",
    slug: "4x4-7-places-automatique",
    type: "4x4",
    boite: "automatique",
    carburant: "Diesel",
    titre: { fr: "Grand 4x4 automatique 7 places", ar: "سيارة رباعية الدفع أوتوماتيكية بسبعة مقاعد" },
    prix: 1200,
    places: 7,
    portes: 5,
    bagages: 5,
    atouts: {
      fr: ["4 roues motrices", "Boîte automatique", "7 places", "Climatisation", "Régulateur de vitesse"],
      ar: ["دفع رباعي", "علبة أوتوماتيكية", "سبعة مقاعد", "مكيف", "مثبت السرعة"],
    },
    description: {
      fr: "Spacieux et confortable, pour les longues routes comme pour la montagne. Sept places, boîte automatique et quatre roues motrices.",
      ar: "واسعة ومريحة، للطرق الطويلة وللجبال. سبعة مقاعد، علبة أوتوماتيكية ودفع رباعي.",
    },
    images: [photo("1533473359331-0135ef1b58bf"), interieur.tableau, interieur.coffre3],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "TMD-009",
    slug: "suv-premium-automatique",
    type: "suv",
    boite: "automatique",
    carburant: "Diesel",
    titre: { fr: "SUV haut de gamme automatique", ar: "سيارة SUV فاخرة أوتوماتيكية" },
    prix: 1100,
    places: 5,
    portes: 5,
    bagages: 4,
    atouts: {
      fr: ["Boîte automatique", "Sièges en cuir", "Écran et GPS", "Caméra de recul", "Climatisation bi-zone"],
      ar: ["علبة أوتوماتيكية", "مقاعد جلدية", "شاشة و GPS", "كاميرا خلفية", "مكيف بمنطقتين"],
    },
    description: {
      fr: "Un SUV haut de gamme pour un déplacement professionnel ou une occasion particulière. Intérieur cuir, boîte automatique et grand coffre.",
      ar: "سيارة SUV فاخرة لتنقل مهني أو لمناسبة خاصة. مقصورة جلدية، علبة أوتوماتيكية وصندوق واسع.",
    },
    images: [photo("1615063029891-497bebd4f03c"), interieur.volant, interieur.tableau3],
    statut: "réservée",
    demo: true,
  },
  {
    ref: "TMD-008",
    slug: "suv-familial-hybride-automatique",
    type: "suv",
    boite: "automatique",
    carburant: "Hybride",
    titre: { fr: "SUV familial hybride automatique", ar: "سيارة SUV عائلية هجينة أوتوماتيكية" },
    prix: 650,
    places: 5,
    portes: 5,
    bagages: 4,
    atouts: {
      fr: ["Hybride : faible consommation", "Boîte automatique", "Climatisation", "Caméra de recul", "Grand coffre"],
      ar: ["هجينة: استهلاك منخفض", "علبة أوتوماتيكية", "مكيف", "كاميرا خلفية", "صندوق واسع"],
    },
    description: {
      fr: "Cinq places confortables, un grand coffre et une motorisation hybride qui consomme peu. Facile à conduire en ville comme sur la route.",
      ar: "خمسة مقاعد مريحة، صندوق واسع ومحرك هجين قليل الاستهلاك. سهلة القيادة في المدينة وعلى الطريق.",
    },
    images: [photo("1519641471654-76ce0107ad1b"), interieur.suv2, interieur.coffre2],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "TMD-007",
    slug: "suv-compact-diesel-manuelle",
    type: "suv",
    boite: "manuelle",
    carburant: "Diesel",
    titre: { fr: "SUV compact diesel", ar: "سيارة SUV مدمجة بالديزل" },
    prix: 400,
    places: 5,
    portes: 5,
    bagages: 3,
    atouts: {
      fr: ["Diesel économique", "Position de conduite haute", "Climatisation", "Bluetooth"],
      ar: ["ديزل اقتصادي", "وضعية قيادة مرتفعة", "مكيف", "بلوتوث"],
    },
    description: {
      fr: "Le SUV simple et robuste : position de conduite haute, diesel économique et de la place pour cinq. À l'aise sur route comme sur les chemins.",
      ar: "سيارة SUV بسيطة ومتينة: وضعية قيادة مرتفعة، ديزل اقتصادي ومكان لخمسة أشخاص. مرتاحة على الطريق وفي المسالك.",
    },
    images: [photo("1604395924490-a3a18bb7193e"), interieur.suv, interieur.coffre],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "TMD-006",
    slug: "berline-premium-automatique",
    type: "berline",
    boite: "automatique",
    carburant: "Essence",
    titre: { fr: "Berline haut de gamme automatique", ar: "سيارة سيدان فاخرة أوتوماتيكية" },
    prix: 900,
    places: 5,
    portes: 4,
    bagages: 3,
    atouts: {
      fr: ["Boîte automatique", "Sièges en cuir", "Climatisation bi-zone", "Régulateur de vitesse"],
      ar: ["علبة أوتوماتيكية", "مقاعد جلدية", "مكيف بمنطقتين", "مثبت السرعة"],
    },
    description: {
      fr: "Une berline élégante pour un mariage, un rendez-vous d'affaires ou un long trajet dans le confort.",
      ar: "سيارة سيدان أنيقة لحفل زفاف، موعد عمل أو رحلة طويلة في راحة تامة.",
    },
    images: [photo("1758179128122-6079c9cb3e4e"), interieur.volant, interieur.tableau2],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "TMD-005",
    slug: "berline-diesel-automatique",
    type: "berline",
    boite: "automatique",
    carburant: "Diesel",
    titre: { fr: "Berline diesel automatique", ar: "سيارة سيدان ديزل أوتوماتيكية" },
    prix: 500,
    places: 5,
    portes: 4,
    bagages: 3,
    atouts: {
      fr: ["Boîte automatique", "Diesel économique", "Climatisation", "Grand coffre"],
      ar: ["علبة أوتوماتيكية", "ديزل اقتصادي", "مكيف", "صندوق واسع"],
    },
    description: {
      fr: "Confortable sur autoroute et sobre en carburant. La boîte automatique rend les longs trajets plus reposants.",
      ar: "مريحة على الطريق السيار وقليلة الاستهلاك. العلبة الأوتوماتيكية تجعل الرحلات الطويلة أكثر راحة.",
    },
    images: [photo("1606400142640-69e81d222bcb"), interieur.tableau3, interieur.coffre2],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "TMD-004",
    slug: "berline-diesel-manuelle",
    type: "berline",
    boite: "manuelle",
    carburant: "Diesel",
    titre: { fr: "Berline diesel, grand coffre", ar: "سيارة سيدان ديزل بصندوق واسع" },
    prix: 350,
    places: 5,
    portes: 4,
    bagages: 3,
    atouts: {
      fr: ["Diesel économique", "Grand coffre", "Climatisation", "Bluetooth"],
      ar: ["ديزل اقتصادي", "صندوق واسع", "مكيف", "بلوتوث"],
    },
    description: {
      fr: "La berline pratique pour voyager à cinq avec des bagages, sans dépenser beaucoup en carburant.",
      ar: "السيدان العملية للسفر بخمسة أشخاص مع الأمتعة، دون مصاريف كبيرة في الوقود.",
    },
    images: [photo("1781120358201-8034aa10aa70"), interieur.volant2, interieur.coffre],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "TMD-003",
    slug: "citadine-diesel-5-portes",
    type: "citadine",
    boite: "manuelle",
    carburant: "Diesel",
    titre: { fr: "Citadine diesel 5 portes", ar: "سيارة مدينة ديزل بخمسة أبواب" },
    prix: 300,
    places: 5,
    portes: 5,
    bagages: 2,
    atouts: {
      fr: ["Diesel économique", "5 portes", "Climatisation", "Bluetooth"],
      ar: ["ديزل اقتصادي", "خمسة أبواب", "مكيف", "بلوتوث"],
    },
    description: {
      fr: "Compacte en ville, sobre sur la route. Cinq portes et un coffre suffisant pour deux valises.",
      ar: "صغيرة في المدينة وقليلة الاستهلاك على الطريق. خمسة أبواب وصندوق يكفي لحقيبتين.",
    },
    images: [photo("1788607359556-b1e67105b9b5"), interieur.tableau2, interieur.coffre2],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "TMD-002",
    slug: "citadine-automatique-essence",
    type: "citadine",
    boite: "automatique",
    carburant: "Essence",
    titre: { fr: "Citadine automatique", ar: "سيارة مدينة أوتوماتيكية" },
    prix: 320,
    places: 5,
    portes: 5,
    bagages: 2,
    atouts: {
      fr: ["Boîte automatique", "Facile à garer", "Climatisation", "Écran tactile"],
      ar: ["علبة أوتوماتيكية", "سهلة الركن", "مكيف", "شاشة لمسية"],
    },
    description: {
      fr: "Petite, maniable et automatique : idéale pour circuler et se garer en ville sans effort.",
      ar: "صغيرة، سهلة المناورة وأوتوماتيكية: مثالية للتنقل والركن في المدينة دون عناء.",
    },
    images: [photo("1714225317039-d685f0e1cd38"), interieur.volant3, interieur.tableau],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "TMD-001",
    slug: "citadine-essence-manuelle",
    type: "citadine",
    boite: "manuelle",
    carburant: "Essence",
    titre: { fr: "Citadine économique", ar: "سيارة مدينة اقتصادية" },
    prix: 250,
    places: 5,
    portes: 5,
    bagages: 2,
    atouts: {
      fr: ["Petit budget", "Faible consommation", "Climatisation", "Facile à garer"],
      ar: ["ثمن مناسب", "استهلاك منخفض", "مكيف", "سهلة الركن"],
    },
    description: {
      fr: "La solution la plus économique pour se déplacer à Meknès et aux alentours. Simple, sobre et facile à garer.",
      ar: "الحل الأكثر اقتصادا للتنقل في مكناس ونواحيها. بسيطة، قليلة الاستهلاك وسهلة الركن.",
    },
    images: [photo("1692305610636-f5157dbe6008"), interieur.volant2, interieur.coffre],
    statut: "disponible",
    demo: true,
  },
];

export const getVoiture = (slug: string) => voitures.find((v) => v.slug === slug);

/** Photos d'ambiance de la page d'accueil */
export const photosAccueil = {
  /** Une photo par argument de la section « Pourquoi TM Drive » (même ordre que dans les textes) */
  pourquoi: [
    photo("1565043666747-69f6646db940"),
    photo("1662577629898-484e7eb1d0d2"),
    photo("1706534314073-e8418c37d64d"),
    photo("1630107531564-8aef06219c86"),
  ],
  /** Photo à côté du formulaire de réservation */
  reserver: photo("1675793199343-82538d6a5a03"),
};
