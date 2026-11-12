import { HomeView } from "@/components/pages/HomeView";
import { site } from "@/config/site";
import { getDict } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import { hoursLabel, ratingLabel } from "@/lib/utils";

const t = getDict("fr");

export const metadata = buildMetadata({
  locale: "fr",
  path: "/",
  title: t.meta.homeTitle,
  description: t.meta.homeDescription(ratingLabel(), site.rating.count, hoursLabel("fr")),
});

export default function Page() {
  return <HomeView locale="fr" />;
}
