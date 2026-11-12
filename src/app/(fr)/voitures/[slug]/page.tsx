import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VoitureView } from "@/components/pages/VoitureView";
import { voitures, getVoiture } from "@/data/voitures";
import { getDict } from "@/i18n";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Une page statique par voiture ; toute autre adresse renvoie la page 404
export const dynamicParams = false;
export const generateStaticParams = () => voitures.map((b) => ({ slug: b.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const voiture = getVoiture((await params).slug);
  if (!voiture) return {};
  return buildMetadata({
    locale: "fr",
    path: `/voitures/${voiture.slug}`,
    title: getDict("fr").meta.voitureTitle(voiture.titre.fr),
    description: voiture.description.fr,
    // Les voitures d'exemple ne sont pas proposés à Google
    noindex: voiture.demo,
  });
}

export default async function Page({ params }: Props) {
  const voiture = getVoiture((await params).slug);
  if (!voiture) notFound();
  return <VoitureView voiture={voiture} locale="fr" />;
}
