"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Grid3x3, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categories } from "@/data/products"
import { useLanguage } from "@/context/language-context"

// Convert categories object to array
const categoryItems = Object.entries(categories).map(([slug, data]) => ({
  slug,
  title: data.title,
  description: data.description,
  image: `/images/categories/${slug}.jpg`,
}))

export default function FeaturedCategories() {
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-2">
            <Grid3x3 className="h-5 w-5 text-amber-600 mr-2" />
            <h2 className="text-3xl font-bold">{t("categories")}</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our wide range of premium drinks and accessories</p>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categoryItems.slice(0, 6).map((category) => (
            <motion.div key={category.slug} variants={itemVariants}>
              <Link href={`/category/${category.slug}`} className="group block">
                <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={category.image || "/placeholder.svg?height=400&width=600"}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                    <p className="text-gray-200 text-sm line-clamp-2">{category.description}</p>
                    <div className="mt-4">
                      <span className="inline-flex items-center text-amber-400 font-medium group-hover:text-amber-300 transition-colors">
                        Explore
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
