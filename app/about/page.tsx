import type { Metadata } from "next"
import Link from "next/link"
import { SiteInfoPage } from "@/components/site-info-page"
import { absoluteUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: "About Cruxs | Handmade Crochet",
  description: "Learn about Cruxs, a handmade crochet brand creating thoughtful crafts, gifts, accessories, charms, keychains, and plushies.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Cruxs | Handmade Crochet",
    description: "Learn about Cruxs and the small-batch process behind our handmade crochet crafts and gifts.",
    url: absoluteUrl("/about"),
  },
}

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Cruxs",
    description: "The story and craftsmanship behind Cruxs handmade crochet crafts and gifts.",
    url: absoluteUrl("/about"),
    mainEntity: {
      "@type": "Organization",
      name: "Cruxs",
      url: absoluteUrl("/"),
      logo: absoluteUrl("/icon.svg"),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteInfoPage title="About Cruxs" description="Handmade crochet crafts and gifts created slowly, thoughtfully, and with care.">
        <section>
          <h2 id="brand" className="font-serif text-2xl text-foreground mb-3">The Cruxs story</h2>
          <p>Cruxs is a handmade crochet brand creating small-batch crafts, accessories, charms, keychains, plushies, and thoughtful gifts.</p>
          <p className="mt-3">Our collection is made for people who appreciate useful, playful, and personal objects with the character of handmade work.</p>
        </section>
      <section>
        <h2 id="craftsmanship" className="font-serif text-2xl text-foreground mb-3">Craftsmanship</h2>
        <p>Each Cruxs piece is made by hand, so subtle variations are part of its character. We focus on careful finishing and designs that are made to be enjoyed, gifted, or carried every day.</p>
      </section>
      <section>
        <h2 id="sustainability" className="font-serif text-2xl text-foreground mb-3">Sustainability</h2>
        <p>We choose durable materials and make pieces to order where possible, helping reduce unnecessary production while creating crochet crafts designed to be enjoyed for a long time.</p>
      </section>
      <section>
        <h2 id="visit" className="font-serif text-2xl text-foreground mb-3">Explore Cruxs</h2>
        <p>Browse the <Link href="/shop" className="underline underline-offset-4">Cruxs crochet collection</Link> or <Link href="/contact" className="underline underline-offset-4">contact us</Link> with questions about products, partnerships, or wholesale enquiries.</p>
      </section>
      </SiteInfoPage>
    </>
  )
}
