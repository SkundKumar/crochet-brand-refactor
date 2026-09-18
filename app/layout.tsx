import React from "react"
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/components/boty/cart-context'
import { absoluteUrl, siteUrl } from '@/lib/site'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600']
});

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Cruxs | Handmade Crochet Crafts, Gifts & Accessories',
    template: '%s | Cruxs',
  },
  description: 'Cruxs creates handcrafted crochet crafts, accessories, charms, keychains, plushies, and thoughtful gifts made with care.',
  applicationName: 'Cruxs Crochet',
  openGraph: {
    type: 'website',
    siteName: 'Cruxs',
    title: 'Cruxs | Handmade Crochet Crafts, Gifts & Accessories',
    description: 'Handcrafted crochet crafts, accessories, charms, keychains, plushies, and gifts made with care.',
    url: absoluteUrl('/'),
    images: [{ url: absoluteUrl('/images/heroo.png'), width: 505, height: 494, alt: 'Crux handcrafted crochet' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cruxs | Handmade Crochet Crafts, Gifts & Accessories',
    description: 'Handcrafted crochet crafts and gifts made with care.',
    images: [absoluteUrl('/images/heroo.png')],
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#F7F4EF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
