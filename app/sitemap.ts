import type { MetadataRoute } from "next"
import { products } from "@/data/products"
import { absoluteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/shop"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    ...["crochet-gifts", "crochet-accessories", "crochet-charms", "crochet-keychains", "crochet-plushies"].map((category) => ({
      url: absoluteUrl(`/shop/${category}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...["about", "contact", "faq", "shipping", "returns", "privacy", "terms"].map((path) => ({
      url: absoluteUrl(`/${path}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/product/${encodeURIComponent(product.id)}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
