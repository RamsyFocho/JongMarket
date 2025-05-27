"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Tag } from "lucide-react"
import { formatCurrency } from "@/data/products"

// Sample premium products for the slideshow
const premiumProducts = [
  {
    id: 1,
    name: "Macallan 18 Year Old",
    image: "/images/products/macallan-12-year-old.jpg",
    price: 299.99,
    discount: "15%",
    originalPrice: 349.99,
    slug: "macallan-18-year-old",
  },
  {
    id: 2,
    name: "Dom Pérignon 2012",
    image: "/images/products/dom-perignon-vintage-2010.jpg",
    price: 249.99,
    discount: "10%",
    originalPrice: 279.99,
    slug: "dom-perignon-2012",
  },
  {
    id: 3,
    name: "Hennessy XO Gift Set",
    image: "/images/products/hennessy-xo.jpg",
    price: 219.99,
    discount: "20%",
    originalPrice: 269.99,
    slug: "hennessy-xo-gift-set",
  },
]

export default function PremiumSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-rotate slides
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % premiumProducts.length)
      }, 5000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPaused])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + premiumProducts.length) % premiumProducts.length)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % premiumProducts.length)
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="bg-amber-600 text-white p-3 flex items-center justify-between">
        <div className="flex items-center">
          <Tag className="h-4 w-4 mr-2" />
          <h3 className="font-medium text-sm">Premium Offers</h3>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={handlePrev}
            className="h-6 w-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
            aria-label="Previous offer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            className="h-6 w-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
            aria-label="Next offer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative h-48 overflow-hidden">
        <AnimatePresence mode="wait">
          {premiumProducts.map(
            (product, index) =>
              index === currentIndex && (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Link href={`/product/${product.slug}`} className="block h-full">
                    <div className="relative h-full">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{product.discount}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
                        <div className="flex items-center mt-1">
                          <span className="text-gray-300 line-through text-xs mr-2">
                            {formatCurrency(product.originalPrice)}
                          </span>
                          <span className="font-bold text-amber-300">{formatCurrency(product.price)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="flex justify-center p-2 bg-gray-50">
        {premiumProducts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 w-2 rounded-full mx-1 ${
              idx === currentIndex ? "bg-amber-600" : "bg-gray-300 hover:bg-amber-300"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
