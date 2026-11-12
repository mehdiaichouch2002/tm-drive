import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { voitures } from "@/data/voitures";
import { localePath } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  // Les voitures d'exemple (demo: true) ne sont pas listés
  const paths = ["/", "/voitures", ...voitures.filter((b) => !b.demo).map((b) => `/voitures/${b.slug}`)];
  return paths.flatMap((path) =>
    (["fr", "ar"] as const).map((locale) => ({
      url: `${site.url}${localePath(locale, path)}`,
      changeFrequency: path === "/" ? ("monthly" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: {
          fr: `${site.url}${localePath("fr", path)}`,
          ar: `${site.url}${localePath("ar", path)}`,
        },
      },
    })),
  );
}
