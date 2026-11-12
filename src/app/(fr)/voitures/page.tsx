import { VoituresView } from "@/components/pages/VoituresView";
import { getDict } from "@/i18n";
import { buildMetadata } from "@/lib/seo";

const t = getDict("fr");

export const metadata = buildMetadata({
  locale: "fr",
  path: "/voitures",
  title: t.meta.voituresTitle,
  description: t.meta.voituresDescription,
});

export default function Page() {
  return <VoituresView locale="fr" />;
}
