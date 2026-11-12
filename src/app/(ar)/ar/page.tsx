import { HomeView } from "@/components/pages/HomeView";
import { site } from "@/config/site";
import { getDict } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import { hoursLabel, ratingLabel } from "@/lib/utils";

const t = getDict("ar");

export const metadata = buildMetadata({
  locale: "ar",
  path: "/",
  title: t.meta.homeTitle,
  description: t.meta.homeDescription(ratingLabel(), site.rating.count, hoursLabel("ar")),
});

export default function Page() {
  return <HomeView locale="ar" />;
}
