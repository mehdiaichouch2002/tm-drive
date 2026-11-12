# TM Drive — site vitrine

Site de TM Drive, location de voitures à Meknès, en français (`/`) et en arabe (`/ar`).
Next.js (App Router) + TypeScript + Tailwind CSS. Pas de serveur, pas de base de données,
pas de clé d'API : tous les formulaires ouvrent WhatsApp avec un message déjà rédigé.

## Lancer le site sur son ordinateur

Il faut [Node.js](https://nodejs.org) 20 ou plus récent.

```bash
npm install     # une seule fois
npm run dev     # puis ouvrir http://localhost:3000
```

Avant de mettre en ligne, vérifier que tout est bon :

```bash
npm run lint
npm run build
```

## Mettre en ligne (Vercel)

1. Envoyer le projet sur GitHub.
2. Sur [vercel.com](https://vercel.com) : **Add New → Project**, choisir le dépôt, **Deploy**. Aucun réglage à faire.
3. Avec un nom de domaine : l'ajouter dans Vercel, puis créer la variable d'environnement
   `NEXT_PUBLIC_SITE_URL` (ex. `https://www.tmdrive.ma`) et redéployer.
   Sans cette variable, le site utilise automatiquement son adresse `*.vercel.app`.

## Où modifier quoi

| Je veux changer…                                  | Fichier                    |
| ------------------------------------------------- | -------------------------- |
| Téléphone, horaires, note Google, prénom affiché  | `src/config/site.ts`       |
| Les voitures (ajouter, modifier, retirer)         | `src/data/voitures.ts`     |
| Les avis affichés                                 | `src/data/avis.ts`         |
| Les textes en français                            | `src/i18n/fr.ts`           |
| Les textes en arabe                               | `src/i18n/ar.ts`           |
| Les couleurs                                      | `src/app/globals.css` (bloc `@theme`) |

### Téléphone, horaires, prénom (`src/config/site.ts`)

```ts
phoneDisplay: "06 12 51 12 12",   // tel qu'il s'affiche
phoneIntl: "212612511212",        // même numéro, format international (WhatsApp + appels)
hours: { opens: "00:00", closes: "24:00" },        // 00:00 → 24:00 = ouvert 24h/24
rating: { value: 5, count: 57, fiveStars: 57 },    // note Google, nombre d'avis, dont 5 étoiles : à mettre à jour à la main
advisorName: { fr: "Tarik", ar: "طارق" },
```

- **Horaires normaux** : par exemple `{ opens: "08:00", closes: "20:00" }`. Le site affiche alors « Ouvert / Fermé » selon l'heure de Meknès.
- **Ne plus afficher de prénom** : mettre `{ fr: "", ar: "" }`. La ligne disparaît partout.
- **Instagram / Facebook** : coller le lien dans `instagram: ""` ou `facebook: ""`. Tant que c'est vide, rien ne s'affiche.
- **Voitures à la une** (page d'accueil) : `featuredRefs: ["TMD-010", "TMD-008", "TMD-002"]`.

## Ajouter une voiture (`src/data/voitures.ts`)

Copier ce bloc, le coller **en haut** de la liste `voitures` (juste après `export const voitures: Voiture[] = [`),
puis changer les valeurs. La première voiture de la liste est considérée comme la plus récente.

```ts
{
  ref: "TMD-014",
  slug: "dacia-logan-diesel",              // adresse de la page : minuscules, tirets, sans accents
  type: "berline",                         // citadine | berline | suv | 4x4 | monospace | utilitaire
  boite: "manuelle",                       // "manuelle" ou "automatique"
  carburant: "Diesel",                     // "Diesel", "Essence" ou "Hybride"
  titre: {
    fr: "Dacia Logan diesel",
    ar: "داسيا لوغان ديزل",
  },
  prix: 300,                               // en DH par jour, sans espaces
  places: 5,
  portes: 4,
  bagages: 3,                              // nombre de valises
  atouts: {
    fr: ["Climatisation", "Bluetooth"],
    ar: ["مكيف", "بلوتوث"],
  },
  description: {
    fr: "Description en français.",
    ar: "الوصف بالعربية.",
  },
  images: [
    "/voitures/TMD-014/1.jpg",
    "/voitures/TMD-014/2.jpg",
    "/voitures/TMD-014/3.jpg",
  ],
  statut: "disponible",                    // "disponible" ou "réservée"
  demo: false,                             // false = vraie voiture
},
```

À savoir :

- `ref` et `slug` doivent être **uniques**.
- Le prix s'écrit sans espaces (`1200`) ; le site affiche `1 200 DH / jour`.
- Voiture indisponible : changer `statut`, ou supprimer le bloc pour la retirer du site.

## Remplacer les photos d'exemple

1. Créer un dossier par voiture : `public/voitures/TMD-001/`.
2. Y déposer 3 à 6 photos nommées `1.jpg`, `2.jpg`, … (format paysage, environ 1600 px de large ; la n° 1 est la photo principale).
3. Dans `src/data/voitures.ts`, remplacer la ligne `images: [...]` de la voiture par :

```ts
images: ["/voitures/TMD-001/1.jpg", "/voitures/TMD-001/2.jpg", "/voitures/TMD-001/3.jpg"],
```

Le site redimensionne et compresse les photos tout seul (AVIF / WebP).
Les photos d'ambiance de l'accueil (section « Pourquoi TM Drive » et formulaire de réservation) sont à la fin du même fichier, dans `photosAccueil`.

## Passer des exemples aux vraies voitures (`demo`)

Les 13 voitures livrées sont des **exemples** : modèles, photos et tarifs inventés pour la présentation (`demo: true`).
Tant qu'une voiture est en `demo: true` :

- l'étiquette « Exemple » s'affiche sur sa carte et sur sa page, avec une phrase d'explication ;
- un bandeau prévient sur la page « Voitures » ;
- sa page n'est **pas proposée à Google** (balise `noindex`, absente du `sitemap.xml`, pas de données structurées).

Pour une vraie voiture : mettre `demo: false` (ou supprimer les exemples et ajouter les vraies).
Quand plus aucune voiture n'est en `demo: true`, les étiquettes et le bandeau disparaissent d'eux-mêmes.

## Règles d'honnêteté du site

- Aucun chiffre inventé : seuls la note Google (5,0 / 57 avis) et les horaires de la fiche Google apparaissent.
- Les avis de `src/data/avis.ts` sont de vrais avis Google recopiés mot pour mot : ne pas en modifier le texte.
- Les arguments de « Pourquoi TM Drive » reprennent ce que disent les avis ; ne pas y ajouter de promesse que l'agence ne tient pas.
- Aucune adresse postale n'est écrite : seulement « Meknès » et la position sur la carte.

## À confirmer avec l'agence avant la mise en ligne

- Le numéro `06 12 51 12 12` est bien celui de WhatsApp.
- Le prénom « Tarik » peut être affiché (il vient des avis clients).
- L'agence est bien ouverte 24h/24 (information de la fiche Google).
- La prise en charge « à l'aéroport » proposée dans le formulaire (citée dans des avis) : la garder ou la retirer dans `booking.lieux` (`src/i18n/fr.ts` et `ar.ts`).
- Les vraies voitures, photos et tarifs.

## Structure

```
src/
  app/            routes : (fr)/ = français, (ar)/ar/ = arabe, + sitemap, robots, image de partage
  components/     en-tête, pied de page, cartes, sections de l'accueil, galerie, filtres
  config/site.ts  informations de l'agence
  data/           voitures.ts (voitures), avis.ts (avis Google)
  i18n/           fr.ts et ar.ts (tous les textes)
  lib/            formats (prix, liens WhatsApp), filtres, référencement
```

Notes techniques :

- Toutes les pages sont générées à l'avance (statiques). L'optimisation des images est faite par Vercel.
- L'image de partage (`/opengraph-image`) et les icônes sont générées à partir du code : rien à dessiner.
- Animations : tout est en CSS (bloc « MOUVEMENT » de `src/app/globals.css`) avec quelques petits
  composants dans `src/components/fx.tsx`. Aucune bibliothèque d'animation. Tout respecte le réglage
  « réduire les animations » du téléphone.
- Les filtres de la page « Voitures » se lisent dans l'adresse : `?type=suv&boite=automatique&budget=700`.
