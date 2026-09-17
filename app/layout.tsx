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
    default: 'Crux | Handcrafted Crochet',
    template: '%s | Crux',
  },
  description: 'Handcrafted crochet accessories, charms, keychains, plushies, and gifts made with care by Crux artisans.',
  openGraph: {
    type: 'website',
    siteName: 'Crux',
    title: 'Crux | Handcrafted Crochet',
    description: 'Handcrafted crochet accessories, charms, keychains, plushies, and gifts made with care.',
    url: absoluteUrl('/'),
    images: [{ url: absoluteUrl('/images/heroo.png'), width: 1200, height: 630, alt: 'Crux handcrafted crochet' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crux | Handcrafted Crochet',
    description: 'Handcrafted crochet pieces made with care.',
    images: [absoluteUrl('/images/heroo.png')],
  },
  icons: {
    icon: [
      {
        url: '/images/heroo.png',
        type: 'image/png',
      },
    ],
    apple: '/images/heroo.png',
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
