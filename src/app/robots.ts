import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/ops", "/ops-access"],
    },
    sitemap: "https://10xai.us/sitemap.xml",
    host: "https://10xai.us",
  };
}
