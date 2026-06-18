"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft, ChevronRight, Minus, Plus, ChevronDown, Leaf, Heart, Award, Recycle, Check } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { useCart } from "@/components/boty/cart-context"
import { products, getProductById } from "@/data/products"

const benefits = [
  { icon: Leaf, label: "Handcrafted" },
  { icon: Heart, label: "Artisan Made" },
  { icon: Recycle, label: "Sustainable" },
  { icon: Award, label: "Premium Quality" },
]

type AccordionSection = "details" | "materials" | "careInstructions" | "delivery"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId) ?? products[0]

  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<AccordionSection | null>("details")
  const [isAdded, setIsAdded] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { addItem, setIsOpen } = useCart()

  const totalImages = product.images.length

  useEffect(() => {
    window.scrollTo(0, 0)
    setCurrentIndex(0)
  }, [productId])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages)
  }, [totalImages])

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalImages)
  }, [totalImages])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [goPrev, goNext])

  const toggleAccordion = (section: AccordionSection) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  const handleAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
    })
    setIsOpen(true)
  }

  const accordionItems: { key: AccordionSection; title: string; content: string }[] = [
    { key: "details", title: "Details", content: product.details },
    { key: "materials", title: "Materials", content: product.materials },
    { key: "careInstructions", title: "Care Instructions", content: product.careInstructions },
    { key: "delivery", title: "Delivery & Returns", content: product.delivery },
  ]

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

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

            {/* ── LEFT COLUMN: Image Carousel ── */}
            <div className="flex flex-col gap-4">

              {/* Main image with crossfade carousel */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-card boty-shadow group">

                {/* Crossfade slides */}
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} – view ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}

                {/* Prev / Next arrows — only if multiple images */}
                {totalImages > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20
                                 w-10 h-10 rounded-full
                                 bg-background/80 backdrop-blur-sm boty-shadow
                                 flex items-center justify-center
                                 text-foreground
                                 opacity-0 group-hover:opacity-100
                                 boty-transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20
                                 w-10 h-10 rounded-full
                                 bg-background/80 backdrop-blur-sm boty-shadow
                                 flex items-center justify-center
                                 text-foreground
                                 opacity-0 group-hover:opacity-100
                                 boty-transition"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Pill dot indicators */}
                {totalImages > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
                    {product.images.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`View image ${idx + 1}`}
                        className={`rounded-full boty-transition ${
                          idx === currentIndex
                            ? "w-5 h-2 bg-white"
                            : "w-2 h-2 bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Image counter badge */}
                {totalImages > 1 && (
                  <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-sm text-xs font-medium text-foreground/80 boty-shadow">
                    {currentIndex + 1} / {totalImages}
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-black/40 px-1">
                *Product may vary from images shown.
              </p>

              {/* Thumbnail strip */}
              {totalImages > 1 && (
                <div
                  role="tablist"
                  aria-label="Product image thumbnails"
                  className="flex gap-3 overflow-x-auto pb-1"
                  style={{ scrollbarWidth: "none" }}
                >
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      type="button"
                      role="tab"
                      aria-selected={index === currentIndex}
                      aria-label={`View image ${index + 1}`}
                      onClick={() => setCurrentIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden boty-transition ${
                        index === currentIndex
                          ? "ring-2 ring-primary ring-offset-2 opacity-100"
                          : "opacity-50 hover:opacity-80"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── RIGHT COLUMN: Product Info ── */}
            <div className="flex flex-col">

              {/* Header */}
              <div className="mb-8">
                <span className="text-sm tracking-[0.3em] uppercase text-primary mb-2 block">
                  Crux Collection
                </span>
                <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-3">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground italic mb-4">{product.tagline}</p>
                <p className="text-foreground/80 leading-relaxed">{product.description}</p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl font-medium text-foreground">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-3 block">Size</label>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-full text-sm boty-transition boty-shadow ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-foreground hover:bg-card/80"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="text-sm font-medium text-foreground mb-3 block">Quantity</label>
                <div className="inline-flex items-center gap-4 bg-card rounded-full px-2 py-2 boty-shadow">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium text-foreground">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  type="button"
                  onClick={() => {
                    handleAddItem()
                    setIsAdded(true)
                    setTimeout(() => setIsAdded(false), 2000)
                  }}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm tracking-wide boty-transition boty-shadow ${
                    isAdded
                      ? "bg-primary/80 text-primary-foreground"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Cart
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-transparent border border-foreground/20 text-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-foreground/5"
                >
                  Buy Now
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.label}
                    className="flex flex-col items-center gap-2 p-4 rounded-md"
                  >
                    <benefit.icon className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground text-center">{benefit.label}</span>
                  </div>
                ))}
              </div>

              {/* Accordion */}
              <div className="border-t border-border/50">
                {accordionItems.map((item) => (
                  <div key={item.key} className="border-b border-border/50">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.key)}
                      className="w-full flex items-center justify-between py-5 text-left"
                    >
                      <span className="font-medium text-foreground">{item.title}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground boty-transition ${
                          openAccordion === item.key ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden boty-transition ${
                        openAccordion === item.key ? "max-h-96 pb-5" : "max-h-0"
                      }`}
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}