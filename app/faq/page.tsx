import type { Metadata } from "next"
import { SiteInfoPage } from "@/components/site-info-page"

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about Crux crochet products, care, delivery, and orders.",
}

export default function FaqPage() {
  return (
    <SiteInfoPage title="Frequently Asked Questions" description="Helpful answers before and after you order.">
      <section><h2 className="font-serif text-2xl text-foreground mb-3">Are products handmade?</h2><p>Yes. Crux products are handcrafted in small batches, so each piece may have small variations.</p></section>
      <section><h2 className="font-serif text-2xl text-foreground mb-3">How long does delivery take?</h2><p>Most products are prepared and delivered within 1–2 weeks. Product-specific delivery information appears on each product page.</p></section>
      <section><h2 className="font-serif text-2xl text-foreground mb-3">How should I care for crochet pieces?</h2><p>Keep products dry, away from direct sunlight and perfume, and follow the care instructions shown on the product page.</p></section>
    </SiteInfoPage>
  )
}
