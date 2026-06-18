"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#e3e1e2" }}
    >

      {/* ── Layer 1: Green glow orb ──────────────────────────────────────── */}
      {/*
        The circle blurs itself (blur-[80px]) so the edges dissolve into
        the background — a soft, organic glow rather than a crisp disc.
      */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[300px] h-[300px]
                   sm:w-[480px] sm:h-[480px]
                   lg:w-[640px] lg:h-[640px]
                   rounded-full bg-[#86a156]
                   blur-[90px]"
      />

      {/* ── Layer 2: Frosted glass overlay ──────────────────────────────── */}
      {/*
        backdrop-blur blurs everything rendered BEHIND this element,
        including the green orb. The semi-transparent tint pulls it back
        toward the base color, giving the "translucent layer" the user wants.
      */}
      <div
        className="absolute inset-0
                   backdrop-blur-2xl
                   bg-[#e3e1e2]/40"
      />

      {/* ── Layer 3: Bottom fade — connects hero to the next section ─────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[45%]
                   bg-gradient-to-t from-background via-background/60 to-transparent
                   z-10"
      />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-20 w-full py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">

          <span
            className="text-sm uppercase mb-6 block text-black/60
                       tracking-[0.35em]
                       animate-blur-in opacity-0"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            Handcrafted Crochet
          </span>

          <h2 className="font-serif text-balance text-black leading-[1.05] mb-6">
            <span
              className="block font-semibold
                         text-5xl sm:text-6xl lg:text-7xl
                         animate-blur-in opacity-0"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              Handcrafted.
            </span>
            <span
              className="block font-semibold
                         text-[clamp(3.5rem,12vw,7rem)]
                         sm:text-8xl lg:text-9xl
                         animate-blur-in opacity-0"
              style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
            >
              Beautifully You.
            </span>
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed mb-10
                       max-w-sm sm:max-w-md mx-auto text-black/65
                       animate-blur-in opacity-0"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
            Artisan crochet pieces made with love. Sustainable materials,
            timeless designs, unique craftsmanship.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center
                       animate-blur-in opacity-0"
            style={{ animationDelay: "1s", animationFillMode: "forwards" }}
          >
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-3
                         bg-primary text-primary-foreground
                         px-8 py-4 rounded-full
                         text-sm tracking-wide
                         boty-transition hover:bg-primary/90 boty-shadow"
            >
              Shop Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 boty-transition" />
            </Link>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20
                   flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-[0.25em] uppercase font-semibold text-black/50">
          Scroll
        </span>
        <div className="w-px h-10 bg-black/15 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-black/40 animate-pulse" />
        </div>
      </div>

    </section>
  )
}