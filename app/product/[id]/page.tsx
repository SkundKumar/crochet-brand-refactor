import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { ProductClient } from "@/components/boty/product-client"
import { products, getProductById } from "@/data/products"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { absoluteUrl } from "@/lib/site"

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)
  if (!product) return {}
  return {
    title: product.name,
    description: `${product.description} Handcrafted by Crux artisans.`,
    alternates: { canonical: `/product/${encodeURIComponent(product.id)}` },
    openGraph: {
      type: "website",
      title: `${product.name} | Crux`,
      description: product.description,
      url: absoluteUrl(`/product/${encodeURIComponent(product.id)}`),
      images: product.images.map((image) => ({ url: absoluteUrl(image), alt: product.name })),
    },
  }
}

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }))
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) notFound()

  const productUrl = absoluteUrl(`/product/${encodeURIComponent(product.id)}`)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => absoluteUrl(image)),
    sku: product.id,
    brand: { "@type": "Brand", name: "Crux" },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Crux" },
    },
  }
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Shop", item: absoluteUrl("/shop") },
      { "@type": "ListItem", position: 3, name: product.name, item: productUrl },
    ],
  }

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <Header />

      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground boty-transition mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          {/* All interactive content lives in the client component */}
          <ProductClient product={product} />
        </div>
      </div>

      <Footer />
    </main>
  )
}