"use client"

import { useState, useEffect } from "react"
import Image from "@/components/Image"
import Link from "next/link"
import { ShoppingBag, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { useCart } from "@/components/boty/cart-context"
import { products } from "@/data/products"
import { useInView } from "@/hooks/use-in-view"

const categories = ["all", "accessories", "charms", "flowers", "keychain", "plushie", "rakhi"]
const ITEMS_PER_PAGE = 12

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const { ref: gridRef, inView: _gridInView } = useInView()

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory)

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  useEffect(() => {
    const categoryParam = new URLSearchParams(window.location.search).get("category")
    const categoryFromUrl = categoryParam && categories.includes(categoryParam) ? categoryParam : "all"
    setSelectedCategory(categoryFromUrl)

    const syncPageFromUrl = () => {
      const pageParam = Number(new URLSearchParams(window.location.search).get("page"))
      const pageFromUrl = Number.isInteger(pageParam) && pageParam >= 1 && pageParam <= totalPages
        ? pageParam
        : 1

      setCurrentPage(pageFromUrl)
    }

    syncPageFromUrl()
    window.addEventListener("popstate", syncPageFromUrl)
    return () => window.removeEventListener("popstate", syncPageFromUrl)
  }, [totalPages])

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    setShowFilters(false)

    const url = new URL(window.location.href)
    if (category === "all") {
      url.searchParams.delete("category")
    } else {
      url.searchParams.set("category", category)
    }
    url.searchParams.delete("page")
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`)
  }

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return
    setCurrentPage(page)

    const url = new URL(window.location.href)
    if (page === 1) {
      url.searchParams.delete("page")
    } else {
      url.searchParams.set("page", String(page))
    }
    window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`)

    if (gridRef.current) {
      const topOffset = gridRef.current.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top: Math.max(0, topOffset), behavior: "smooth" })
    }
  }

  // Fade cards out then back in on filter/page change
  useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [selectedCategory, currentPage])

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push("...")

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) pages.push("...")
      pages.push(totalPages)
    }
    return pages
  }

  const startCount = filteredProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1
  const endCount = Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Crux Collection
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 text-balance">
              Shop Handcrafted Crochet
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Discover our complete range of artisan crochet pieces
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-border/50">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden inline-flex items-center gap-2 text-sm text-foreground"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Desktop Categories */}
            <div className="hidden lg:flex items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategorySelect(category)}
                  className={`px-4 py-2 rounded-full text-sm capitalize boty-transition bg-popover ${selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : category === "rakhi"
                      ? "bg-card text-primary font-semibold border-2 border-primary shadow-[0_0_15px] shadow-primary/60 hover:bg-primary/10 hover:shadow-[0_0_20px] hover:shadow-primary/80 transition-all duration-300"
                      : "bg-card text-foreground/70 hover:text-foreground boty-shadow"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <span className="text-sm text-muted-foreground">
              {filteredProducts.length === 0
                ? "0 products"
                : `Showing ${startCount}–${endCount} of ${filteredProducts.length} products`}
            </span>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-background">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-2xl text-foreground">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setShowFilters(false)}
                    className="p-2 text-foreground/70 hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategorySelect(category)}
                      className={`w-full px-6 py-4 rounded-2xl text-left capitalize boty-transition ${selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : category === "rakhi"
                          ? "bg-card text-primary font-semibold border-2 border-primary shadow-[0_0_15px] shadow-primary/60 hover:bg-primary/10 hover:shadow-[0_0_20px] hover:shadow-primary/80 transition-all duration-300"
                          : "bg-card text-foreground boty-shadow"
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div
            ref={gridRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {paginatedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/50">
              <span className="text-sm text-muted-foreground order-2 sm:order-1">
                Page {currentPage} of {totalPages}
              </span>

              <div className="flex items-center gap-2 order-1 sm:order-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2.5 rounded-full border border-border/70 bg-card text-foreground/80 hover:text-foreground hover:border-primary disabled:opacity-30 disabled:pointer-events-none boty-transition boty-shadow"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5">
                  {getPageNumbers().map((page, idx) =>
                    typeof page === "number" ? (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-full text-sm font-medium boty-transition ${currentPage === page
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-card text-foreground/70 hover:text-foreground hover:bg-muted/50 border border-border/40"
                          }`}
                      >
                        {page}
                      </button>
                    ) : (
                      <span key={idx} className="w-8 text-center text-muted-foreground text-sm">
                        {page}
                      </span>
                    )
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-full border border-border/70 bg-card text-foreground/80 hover:text-foreground hover:border-primary disabled:opacity-30 disabled:pointer-events-none boty-transition boty-shadow"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

function ProductCard({
  product,
  index,
  isVisible,
}: {
  product: typeof products[0]
  index: number
  isVisible: boolean
}) {
  const { addItem, setIsOpen } = useCart()
  const [imgLoaded, setImgLoaded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    })
    setIsOpen(true)
  }

  return (
    <Link
      href={`/product/${encodeURIComponent(product.id)}`}
      className={`group transition-all duration-700 ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="bg-card rounded-3xl overflow-hidden boty-shadow boty-transition group-hover:scale-[1.02]">
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            priority={index < 3}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover boty-transition group-hover:scale-105"
          />
          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs tracking-wide ${product.badge === "Sale"
                ? "bg-destructive/10 text-destructive"
                : product.badge === "New"
                  ? "bg-primary/10 text-primary"
                  : "bg-accent text-accent-foreground"
                }`}
            >
              {product.badge}
            </span>
          )}
          {/* Quick add button */}
          <button
            type="button"
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 boty-transition boty-shadow"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="font-serif text-xl text-foreground mb-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-foreground">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}