import type { Metadata } from "next"
import { SiteInfoPage } from "@/components/site-info-page"

export const metadata: Metadata = {
  title: "Our Story",
  description: "Learn about Crux, our handcrafted crochet process, and our commitment to thoughtful materials.",
}

export default function AboutPage() {
  return (
    <SiteInfoPage title="Our Story" description="Handcrafted crochet pieces made slowly, thoughtfully, and with care.">
      <section>
        <h2 id="craftsmanship" className="font-serif text-2xl text-foreground mb-3">Craftsmanship</h2>
        <p>Crux creates small-batch crochet accessories, charms, keychains, plushies, and gifts. Each piece is made by hand, so subtle variations are part of its character.</p>
      </section>
      <section>
        <h2 id="sustainability" className="font-serif text-2xl text-foreground mb-3">Sustainability</h2>
        <p>We choose durable materials and make pieces to order where possible, helping reduce unnecessary production while creating objects designed to be enjoyed for a long time.</p>
      </section>
      <section>
        <h2 id="press" className="font-serif text-2xl text-foreground mb-3">Press</h2>
        <p>For press, partnership, or wholesale enquiries, contact us through WhatsApp using the product enquiry option or email the Crux team.</p>
      </section>
    </SiteInfoPage>
  )
}
