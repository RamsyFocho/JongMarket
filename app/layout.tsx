import type React from "react"
import type { Metadata } from "next"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"
import { LanguageProvider } from "@/context/language-context"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import LoadingScreen from "@/components/loading-screen"
import AgeVerification from "@/components/age-verification"
import "./globals.css"
// dd this to your layout.js or layout.tsx file

import { Inter, Playfair_Display, Poppins } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})


export const metadata: Metadata = {
  title: "Jong Market | Premium Drinks & Accessories",
  description:
    "Discover our curated selection of premium whiskey, wine, beer, champagne and accessories. Fast delivery and exceptional quality guaranteed.",
  keywords: "drinks, whiskey, wine, beer, champagne, accessories, online store, premium drinks",
  openGraph: {
    title: "Jong Market | Premium Drinks & Accessories",
    description: "Discover our curated selection of premium whiskey, wine, beer, champagne and accessories.",
    url: "https://jongmarket.com",
    siteName: "Jong Market",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jong Market - Premium Drinks & Accessories",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${poppins.variable}`}>
      <body >
        <CartProvider>
          <WishlistProvider>
            <LanguageProvider>
              <TooltipProvider>
                <AgeVerification />
                <LoadingScreen />
                <Header />
                <main>{children}</main>
                <Footer />
                <Toaster />
              </TooltipProvider>
            </LanguageProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}