"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronDown, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/language-context"
import { categories, products, formatCurrency } from "@/data/products"
import PremiumSlideshow from "@/components/sidebar/premium-slideshow"

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const { t } = useLanguage()
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const toggleCategory = (slug: string) => {
    setExpandedCategories((prev) => (prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]))
  }
  // Get products for a specific category
  const getCategoryProducts = (categorySlug: string) => {
    const category = categories[categorySlug]
    return category ? category.products.slice(0, 3) : [] // Limit to 3 products for the dropdown
  }

  // Convert categories object to array for easier mapping
  const categoryList = Object.entries(categories).map(([slug, data]) => ({
    slug,
    ...data
  }))

  return (
    <aside
      className={cn(
        "hidden md:block bg-white rounded-lg shadow-md overflow-hidden border border-amber-100",
        "sticky top-24 md:top-28 lg:top-32 xl:top-36",
        "w-full md:w-64 lg:w-72 xl:w-80",
        className
      )}
      aria-label="Sidebar navigation"
    >
      <div className="p-4 bg-amber-950 text-white">
        <h2 className="text-lg font-serif font-medium">Categories</h2>
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          {/* All Products */}
          <li>
            <Link
              href="/products"
              className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-amber-50 text-gray-800 font-medium"
            >
              <span>All Products</span>
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </Link>
          </li>          {/* Dynamic Categories */}
          {categoryList.map(({ slug, title, products }) => (
            <li key={slug}>
              <button
                onClick={() => toggleCategory(slug)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-md hover:bg-amber-50 text-gray-800 font-medium"
              >
                <span>{title} Collection</span>
                {expandedCategories.includes(slug) ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </button>

              <AnimatePresence>
                {expandedCategories.includes(slug) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                    animate={{ height: "auto", opacity: 1, overflow: "visible" }}
                    exit={{ height: 0, opacity: 0, overflow: "hidden" }}
                    transition={{ duration: 0.3 }}
                    className="mt-1 bg-gray-50 rounded-md overflow-hidden"
                  >
                    {getCategoryProducts(slug).map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        className="flex items-start p-2 hover:bg-amber-50 transition-colors border-b border-gray-100 last:border-0"
                      >
                        <div className="relative h-12 w-12 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-2 flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-gray-800 truncate">{product.name}</h4>
                          <div className="flex items-center mt-1">
                            <div className="flex text-amber-500">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-2 w-2"
                                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                          </div>
                          <div className="text-xs font-medium text-amber-600 mt-1">{formatCurrency(product.price)}</div>
                        </div>
                      </Link>
                    ))}
                    <div className="p-2 bg-amber-50 text-center">
                      <Link
                        href={`/category/${slug}`}
                        className="text-xs font-medium text-amber-800 hover:text-amber-600"
                      >
                        View All {title} →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </nav>

      {/* Promotions */}
      <div className="p-4 mt-2 bg-amber-50">
        <Link href="/promotions" className="block text-amber-800 font-medium hover:text-amber-600">
          Special Offers
        </Link>
      </div>

      {/* Premium Slideshow */}
      <div className="mt-4">
        <PremiumSlideshow />
      </div>
    </aside>
  )
}
