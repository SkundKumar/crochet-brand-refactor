import type { Metadata } from "next"
import { absoluteUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: "Shop Handcrafted Crochet",
  description: "Browse Crux handcrafted crochet accessories, charms, flowers, keychains, plushies, and rakhi gifts.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop Handcrafted Crochet | Crux",
    description: "Browse the complete Crux collection of handcrafted crochet pieces.",
    url: absoluteUrl("/shop"),
  },
}

export default function ShopLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Shop", item: absoluteUrl("/shop") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  )
}
