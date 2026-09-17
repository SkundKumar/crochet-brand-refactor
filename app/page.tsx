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
    name: "Crux",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/heroo.png"),
    sameAs: ["https://x.com/Kerroudjm"],
  }
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Crux",
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
