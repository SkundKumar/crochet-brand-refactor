import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { ProductClient } from "@/components/boty/product-client"
import { products, getProductById } from "@/data/products"
import type { Metadata } from "next"

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id) ?? products[0]
  return {
    title: `${product.name} — Crux`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = getProductById(id) ?? products[0]

  return (
    <main className="min-h-screen">
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