import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"
import { LanguageProvider } from "@/context/language-context"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import OrganizationSchema from "@/components/seo/organization-schema"
import "./globals.css"
import LoadingScreen from "@/components/loading-screen"
import AgeVerification from "@/components/age-verification"
import ScrollToTop from "@/components/ui/scroll-to-top"

// Load fonts properly using next/font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: {
    default: "Jong Market | Premium Drinks & Accessories",
    template: "%s | Jong Market",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  description:
    "Discover our curated selection of premium whiskey, wine, beer, champagne and accessories. Fast delivery and exceptional quality guaranteed.",
  keywords: "drinks, whiskey, wine, beer, champagne, accessories, online store, premium drinks, Cameroon",
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
  twitter: {
    card: "summary_large_image",
    title: "Jong Market | Premium Drinks & Accessories",
    description: "Discover our curated selection of premium whiskey, wine, beer, champagne and accessories.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://jongmarket.com",
    languages: {
      "en-US": "https://jongmarket.com",
      "fr-FR": "https://jongmarket.com/fr",
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Toaster />
        <LanguageProvider>
          <WishlistProvider>
            <CartProvider>
              <TooltipProvider>
                <OrganizationSchema />
                <LoadingScreen/>
                <AgeVerification/>
                <div className="block min-h-screen w-full overflow-x-hidden">
                  <Header />
                  <main className="flex-1 w-full max-w-full px-2 mt-16 md:mt-24 lg:mt-32 xl:mt-40">{children}</main>
                  <Footer />
                  <ScrollToTop />
                </div>
              </TooltipProvider>
            </CartProvider>
          </WishlistProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
