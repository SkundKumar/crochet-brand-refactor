import { Header } from "@/components/boty/header"
import { Hero } from "@/components/boty/hero"
import { TrustBadges } from "@/components/boty/trust-badges"
import { ProductGrid } from "@/components/boty/product-grid"
import { Footer } from "@/components/boty/footer"
import { absoluteUrl } from "@/lib/site"

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cruxs",
    alternateName: ["Crux", "Cruxs Crochet", "Cruxs Crochet and Crafts"],
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    sameAs: ["https://x.com/Kerroudjm"],
  }
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cruxs",
    url: absoluteUrl("/"),
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }} />
      <Header />
      <Hero />
      <TrustBadges />
      <ProductGrid />
     
      
      <Footer />
    </main>
  )
}
