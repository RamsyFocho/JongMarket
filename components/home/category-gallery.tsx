"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/language-context"

// Import categories from data
import { categories } from "@/data/products"

// Convert categories object to array
const categoryItems = Object.entries(categories).map(([slug, data]) => ({
  slug,
  title: data.title,
  description: data.description,
  image: `/images/categories/${slug}.jpg`,
}))

export default function CategoryGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const { t } = useLanguage()

  // Handle auto-play
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % categoryItems.length)
      }, 5000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  // Navigation handlers
  const handlePrev = () => {
    setIsAutoPlaying(false)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + categoryItems.length) % categoryItems.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categoryItems.length)
  }

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.85,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.85,
      transition: {
        duration: 0.5,
      },
    }),
  }

  return (
    <section className=" px-2 py-16 bg-gradient-to-b from-white to-gray-50  ">
      {/* In case of error, include container class in the classes  */}
      <div className=" w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Explore Our Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of drinks and accessories, carefully curated for the discerning connoisseur.
          </p>
        </div>

        <div
          className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl shadow-2xl"
          // className="relative h-full md:h-full overflow-hidden rounded-xl shadow-2xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main Carousel */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <div className="relative h-full w-full">
                <Image
                  src={categoryItems[currentIndex].image || "/placeholder.svg?height=600&width=1200"}
                  alt={categoryItems[currentIndex].title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center max-w-3xl px-6">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {categoryItems[currentIndex].title}
                      </h3>
                      <p className="text-lg text-white/90 mb-8">{categoryItems[currentIndex].description}</p>
                      <Link href={`/category/${categoryItems[currentIndex].slug}`}>
                        <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
                          Explore Collection
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>

                {/* Spinning category icon */}
                <motion.div
                  className="absolute top-10 right-10 hidden md:block"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <div className="relative h-32 w-32 rounded-full bg-amber-600/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-amber-500/50" />
                    <div className="text-white font-bold text-xl">
                      {categoryItems[currentIndex].slug.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all z-10"
            aria-label="Previous category"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all z-10"
            aria-label="Next category"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
            {categoryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  currentIndex === index ? "bg-amber-500 w-8" : "bg-white/50 hover:bg-white/80",
                )}
                aria-label={`Go to category ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Category Thumbnails */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 border-2 border-red-500">
          {categoryItems.map((category, index) => (
            <motion.div
              key={category.slug}
              whileHover={{ y: -5, scale: 1.05 }}
              className={cn(
                "relative rounded-lg overflow-hidden cursor-pointer transition-all",
                currentIndex === index ? "ring-4 ring-amber-500" : "",
              )}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
            >
              <div className="relative aspect-square">
                <Image
                  src={category.image || "/placeholder.svg?height=200&width=200"}
                  alt={category.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-white text-xs font-medium truncate">{category.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
