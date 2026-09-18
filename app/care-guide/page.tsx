import type { Metadata } from "next"
import Link from "next/link"
import { SiteInfoPage } from "@/components/site-info-page"
import { absoluteUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: "How to Care for Handmade Crochet",
  description: "Learn how to keep Cruxs handmade crochet accessories, charms, keychains, plushies, and gifts looking their best.",
  alternates: { canonical: "/care-guide" },
  openGraph: {
    title: "How to Care for Handmade Crochet | Cruxs",
    description: "Simple care instructions for Cruxs handmade crochet products.",
    url: absoluteUrl("/care-guide"),
  },
}

export default function CareGuidePage() {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Care for Handmade Crochet",
    description: "Simple care instructions for Cruxs handmade crochet products.",
    author: { "@type": "Organization", name: "Cruxs", url: absoluteUrl("/") },
    publisher: { "@type": "Organization", name: "Cruxs", logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") } },
    mainEntityOfPage: absoluteUrl("/care-guide"),
  }
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Care guide", item: absoluteUrl("/care-guide") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <SiteInfoPage
        title="How to Care for Handmade Crochet"
        description="Simple habits that help your Cruxs crochet accessories, charms, keychains, plushies, and gifts last longer."
      >
        <section>
          <h2 className="font-serif text-2xl text-foreground mb-3">Keep crochet pieces dry</h2>
          <p>Moisture can change the shape of yarn and may affect attached details. Keep handmade crochet away from rain, spills, damp storage, and prolonged humidity. If a piece gets damp, gently reshape it and let it air-dry completely.</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-foreground mb-3">Clean gently</h2>
          <p>Start by removing dust with a soft, dry cloth or a gentle brush. Do not scrub, wring, or put a crochet accessory in a washing machine unless its product page specifically says it is suitable. For a small mark, spot-test a little cool water in an inconspicuous area first.</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-foreground mb-3">Protect the shape and details</h2>
          <p>Store crochet items flat or in a way that does not compress them. Keep earrings, charms, and keychains away from sharp objects that could catch the yarn. Avoid perfume, cosmetics, and direct contact with heat because they can affect fibres, colour, or decorative parts.</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-foreground mb-3">Check the product instructions</h2>
          <p>Different yarns and embellishments may need different care. Read the care instructions on each product page before cleaning or storing your item. If you are unsure, <Link href="/contact" className="underline underline-offset-4">contact Cruxs</Link> before trying a treatment.</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-foreground mb-3">Find a handmade piece</h2>
          <p>Ready to choose something special? Browse the <Link href="/shop" className="underline underline-offset-4">Cruxs crochet collection</Link> for handmade accessories, charms, keychains, plushies, and gifts.</p>
        </section>
      </SiteInfoPage>
    </>
  )
}
