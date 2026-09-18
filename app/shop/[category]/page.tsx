import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Image from "@/components/Image"
import { Footer } from "@/components/boty/footer"
import { Header } from "@/components/boty/header"
import { products } from "@/data/products"
import { absoluteUrl } from "@/lib/site"

type CategoryConfig = {
  title: string
  description: string
  intro: string
  category: (typeof products)[number]["category"] | "all"
}

const categoryConfig: Record<string, CategoryConfig> = {
  "crochet-gifts": {
    title: "Handmade Crochet Gifts",
    description: "Shop thoughtful handmade crochet gifts, accessories, charms, keychains, and plushies from Cruxs.",
    intro: "Find playful, useful, and personal crochet gifts made by Cruxs for birthdays, celebrations, and everyday surprises.",
    category: "all",
  },
  "crochet-accessories": {
    title: "Crochet Accessories",
    description: "Shop handmade crochet accessories from Cruxs, including earrings and wearable pieces made in small batches.",
    intro: "Add a handmade detail to your style with crochet accessories designed and finished by Cruxs.",
    category: "accessories",
  },
  "crochet-charms": {
    title: "Crochet Charms",
    description: "Shop handmade crochet bag charms and decorative charms from Cruxs.",
    intro: "Give your everyday bag, keys, or favourite space a little personality with handmade crochet charms from Cruxs.",
    category: "charms",
  },
  "crochet-keychains": {
    title: "Crochet Keychains",
    description: "Shop handmade crochet keychains from Cruxs, made as thoughtful gifts and everyday companions.",
    intro: "Carry a small piece of handmade craft with Cruxs crochet keychains, designed for gifts, bags, and keys.",
    category: "keychain",
  },
  "crochet-plushies": {
    title: "Crochet Plushies",
    description: "Shop handmade crochet plushies from Cruxs, made with soft materials and playful details.",
    intro: "Meet the soft and playful side of Cruxs with handmade crochet plushies created in small batches.",
    category: "plushie",
  },
}

type Props = { params: Promise<{ category: string }> }

export function generateStaticParams() {
  return Object.keys(categoryConfig).map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const config = categoryConfig[category]
  if (!config) return {}

  return {
    title: config.title,
    description: config.description,
    alternates: { canonical: `/shop/${category}` },
    openGraph: {
      title: `${config.title} | Cruxs`,
      description: config.description,
      url: absoluteUrl(`/shop/${category}`),
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const config = categoryConfig[category]
  if (!config) notFound()

  const categoryProducts = config.category === "all"
    ? products
    : products.filter((product) => product.category === config.category)
  const pageUrl = absoluteUrl(`/shop/${category}`)
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Shop", item: absoluteUrl("/shop") },
      { "@type": "ListItem", position: 3, name: config.title, item: pageUrl },
    ],
  }
  const collectionData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: config.title,
    description: config.description,
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: "Cruxs", url: absoluteUrl("/") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categoryProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/product/${encodeURIComponent(product.id)}`),
        name: product.name,
      })),
    },
  }

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionData) }} />
      <Header />
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="max-w-3xl mb-12">
            <Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground">
              Browse all Cruxs products
            </Link>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground mt-6 mb-5">{config.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{config.intro}</p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <Link key={product.id} href={`/product/${encodeURIComponent(product.id)}`} className="group">
                <div className="bg-card rounded-3xl overflow-hidden boty-shadow">
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={`${product.name} - handmade crochet by Cruxs`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 boty-transition"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="font-serif text-lg text-foreground mb-2">{product.name}</h2>
                    <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                    <span className="font-medium text-foreground">₹{product.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <nav aria-label="Cruxs crochet categories" className="mt-16 border-t border-border pt-8">
            <h2 className="font-serif text-2xl text-foreground mb-4">Explore more crochet categories</h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(categoryConfig)
                .filter(([slug]) => slug !== category)
                .map(([slug, otherConfig]) => (
                  <Link key={slug} href={`/shop/${slug}`} className="rounded-full border border-border px-4 py-2 text-sm hover:bg-muted">
                    {otherConfig.title}
                  </Link>
                ))}
            </div>
          </nav>
        </div>
      </div>
      <Footer />
    </main>
  )
}
