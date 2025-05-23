"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Tag, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/data/products"
import { useLanguage } from "@/context/language-context"
import "@/styles/featured-drinks.css"
import WishlistButton from "@/components/product/wishlist-button"

// Mock promotions data
const promotions = [
  {
    id: 1,
    title: "Summer Wine Collection",
    description: "Get 20% off on our curated selection of summer wines",
    image: "/images/promotions/summer-wine.jpg",
    discount: "20%",
    originalPrice: 299.99,
    discountedPrice: 239.99,
    endsIn: "7 days",
    link: "/promotions/summer-wine",
  },
  {
    id: 2,
    title: "Whiskey Tasting Set",
    description: "Premium whiskey tasting set with 5 different varieties",
    image: "/images/promotions/whiskey-tasting.jpg",
    discount: "15%",
    originalPrice: 149.99,
    discountedPrice: 127.49,
    endsIn: "3 days",
    link: "/promotions/whiskey-tasting",
  },
  {
    id: 3,
    title: "Cocktail Accessories Bundle",
    description: "Complete set of premium cocktail making tools and accessories",
    image: "/images/promotions/cocktail-accessories.jpg",
    discount: "25%",
    originalPrice: 89.99,
    discountedPrice: 67.49,
    endsIn: "5 days",
    link: "/promotions/cocktail-accessories",
  },
]

function getTabTransformClass(tab: number) {
  return `tab-transform-${tab}`;
}

export default function SpecialPromotions() {
  const { t } = useLanguage()
  const [currentTab, setCurrentTab] = useState(0)
  const [itemsPerTab, setItemsPerTab] = useState(3)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  // Responsive items per tab
  useEffect(() => {
    const updateItemsPerTab = () => {
      if (window.innerWidth < 640) {
        setItemsPerTab(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerTab(2)
      } else {
        setItemsPerTab(3)
      }
    }
    updateItemsPerTab()
    window.addEventListener("resize", updateItemsPerTab)
    return () => window.removeEventListener("resize", updateItemsPerTab)
  }, [])

  const totalTabs = Math.ceil(promotions.length / itemsPerTab)
  const currentPromos = promotions.slice(
    currentTab * itemsPerTab,
    (currentTab + 1) * itemsPerTab
  )

  // Auto-scroll
  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      setCurrentTab((prev) => (prev < totalTabs - 1 ? prev + 1 : 0))
    }, 7000)
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current)
    }
  }, [totalTabs])

  const goToPreviousTab = () => {
    setCurrentTab((prev) => (prev > 0 ? prev - 1 : totalTabs - 1))
  }
  const goToNextTab = () => {
    setCurrentTab((prev) => (prev < totalTabs - 1 ? prev + 1 : 0))
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with tab nav */}
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center">
            <Tag className="h-5 w-5 text-amber-600 mr-2" />
            <h2 className="text-2xl font-bold uppercase tracking-wide">
              {t("specialPromotions") || "Special Promotions"}
            </h2>
          </div>
          {totalTabs > 1 && (
            <div className="flex gap-2">
              <button
                onClick={goToPreviousTab}
                className="p-2 rounded-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-600 transition-all duration-200"
                aria-label="Previous tab"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goToNextTab}
                className="p-2 rounded-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-600 transition-all duration-200"
                aria-label="Next tab"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        <div className="text-gray-600 max-w-2xl mb-8">
          {t("specialPromotionsDesc") || "Don't miss these limited-time deals on our best products!"}
        </div>
        {/* Promotions Grid/Carousel */}
        <div className="relative">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={`grid gap-8 ${getTabTransformClass(currentTab)}`}
            style={{ gridTemplateColumns: `repeat(${currentPromos.length}, 1fr)` }}
          >
            {currentPromos.map((promo, idx) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-white via-gray-50 to-amber-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group border border-amber-100 flex flex-col relative overflow-hidden premium-promo-card"
              >
                {/* Badge Stack (Discount + Limited Time) */}
                <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
                  <span className="badge-arrow bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase rounded-l rounded-r-none flex items-center shadow-md">
                    -{promo.discount}
                  </span>
                  <span className="badge-arrow bg-amber-600 text-white px-3 py-1 text-xs font-bold uppercase rounded-l rounded-r-none flex items-center shadow-md">
                    {t("limitedTimeOffer") || "Limited Time Offer"}
                  </span>
                </div>
                {/* Wishlist Button */}
                <div className="absolute top-3 right-3 z-20">
                  <WishlistButton product={{
                    id: promo.id,
                    name: promo.title,
                    price: promo.discountedPrice,
                    image: promo.image,
                    slug: promo.link,
                  }} variant="icon" />
                </div>
                {/* Promo Image */}
                <div className="relative overflow-hidden rounded-t-2xl h-56 bg-gray-100 flex items-center justify-center border-b border-amber-100">
                  <Link href={promo.link}>
                    <Image
                      src={promo.image || "/placeholder.svg?height=300&width=400"}
                      alt={promo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                </div>
                {/* Promo Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <Link href={promo.link}>
                    <h3 className="font-semibold text-xl group-hover:text-amber-700 transition-colors min-h-[2.5rem] mb-1">
                      {promo.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{promo.description}</p>
                  {/* Price/Discount Area */}
                  <div className="mb-4">
                    <div className="flex items-end gap-2">
                      <span className="text-gray-400 line-through text-base font-medium">
                        {formatCurrency(promo.originalPrice)}
                      </span>
                      <span className="font-bold text-2xl text-amber-700">
                        {formatCurrency(promo.discountedPrice)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="badge-arrow bg-red-600 text-white px-2 py-0.5 text-xs font-bold uppercase rounded-l rounded-r-none flex items-center">
                        -{promo.discount}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {t("endsIn") || "Ends in"} {promo.endsIn}
                      </span>
                    </div>
                  </div>
                  <Link href={promo.link}>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-base font-semibold shadow-md">
                      {t("viewDeal") || "View Deal"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* Tab Indicators */}
        {totalTabs > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalTabs }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTab(index)}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  index === currentTab
                    ? 'bg-gray-800 w-12'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to tab ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
