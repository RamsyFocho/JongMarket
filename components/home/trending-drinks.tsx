"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Star, TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products, formatCurrency } from "@/data/products"
import { useLanguage } from "@/context/language-context"

// Get top rated products as trending
const trendingProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4)

export default function TrendingDrinks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-16 bg-white">
      <div className="w-70% ml-2 mr-2 px-4 ">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-2">
            <TrendingUp className="h-5 w-5 text-amber-600 mr-2" />
            <h2 className="text-3xl font-bold">{t("trendingDrinks")}</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("trendingDrinksDesc")}</p>
          <div className="mt-4">
            <Link href="/products">
              <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                {t("viewAll")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          // className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  place-items-center border-2 border-red-500"
          className="flex flex-wrap gap-4 justify-center"
        >
          {trendingProducts.map((product, index) => (
            <motion.div key={product.id} variants={itemVariants} className="relative group w-80 ">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
                <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                  #{index + 1} Trending
                </div>

                <Link href={`/product/${product.slug}`}>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  {product.category && (
                    <Link href={`/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`}>
                      <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">
                        {product.category}
                      </span>
                    </Link>
                  )}

                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-semibold text-lg mt-1 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center mt-2">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4"
                          fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="font-bold text-lg">{formatCurrency(product.price)}</span>

                    <Link href={`/product/${product.slug}`}>
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                        {t("viewDetails")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
