"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Tag, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/data/products"
import { useLanguage } from "@/context/language-context"

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
            className="grid gap-8"
            style={{ gridTemplateColumns: `repeat(${currentPromos.length}, 1fr)` }}
          >
            {currentPromos.map((promo) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 flex flex-col"
              >
                {/* Promo Image */}
                <div className="relative overflow-hidden rounded-t-lg h-56 bg-gray-100 flex items-center justify-center">
                  <Link href={promo.link}>
                    <Image
                      src={promo.image || "/placeholder.svg?height=300&width=400"}
                      alt={promo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    -{promo.discount}
                  </div>
                  {/* Limited Time Badge */}
                  <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    {t("limitedTimeOffer") || "Limited Time Offer"}
                  </div>
                </div>
                {/* Promo Info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <Link href={promo.link}>
                    <h3 className="font-semibold text-lg group-hover:text-amber-600 transition-colors min-h-[2.5rem]">
                      {promo.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2 flex-1">{promo.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-gray-500 line-through text-sm">{formatCurrency(promo.originalPrice)}</span>
                      <span className="font-bold text-lg text-amber-600 ml-2">
                        {formatCurrency(promo.discountedPrice)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>
                        {t("endsIn") || "Ends in"} {promo.endsIn}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link href={promo.link}>
                      <Button className="w-full bg-amber-600 hover:bg-amber-700">{t("viewDeal") || "View Deal"}</Button>
                    </Link>
                  </div>
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
