"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight, Filter, Star, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { products, categories, formatCurrency } from "@/data/products"
import { useLanguage } from "@/context/language-context"
import WishlistButton from "@/components/product/wishlist-button"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("featured")
  const { t } = useLanguage()
  const { addToCart } = useCart()
  const { toast } = useToast()

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products]

    // Filter by price
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category.toLowerCase()))
    }

    // Apply sorting
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortOption === "rating") {
      result.sort((a, b) => b.rating - a.rating)
    }

    setFilteredProducts(result)
  }, [priceRange, selectedCategories, sortOption])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  const categoryOptions = Object.entries(categories).map(([slug, data]) => ({
    value: slug,
    label: data.title,
  }))

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-amber-600">
          {t("home")}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700 font-medium">All Products</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Filter className="h-5 w-5 text-gray-500" />
            </div>

            {/* Price Range Filter */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-4">Price Range</h3>
              <Slider
                defaultValue={[0, 500]}
                max={500}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-4"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{formatCurrency(priceRange[0])}</span>
                <span className="text-sm text-gray-600">{formatCurrency(priceRange[1])}</span>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-4">Categories</h3>
              <div className="space-y-3">
                {categoryOptions.map((category) => (
                  <div key={category.value} className="flex items-center">
                    <Checkbox
                      id={`category-${category.value}`}
                      checked={selectedCategories.includes(category.value)}
                      onCheckedChange={() => handleCategoryChange(category.value)}
                    />
                    <Label htmlFor={`category-${category.value}`} className="ml-2 text-sm font-normal cursor-pointer">
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset Filters */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setPriceRange([0, 500])
                setSelectedCategories([])
                setSortOption("featured")
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-2xl font-bold mb-4 sm:mb-0">All Products</h1>

            {/* Sort Options */}
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="text-sm border rounded-md px-2 py-1"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
                    <Link href={`/product/${product.slug}`}>
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              {t("outOfStock")}
                            </span>
                          </div>
                        )}
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

                        <div className="flex items-center">
                          <WishlistButton product={product} variant="icon" />
                          <Button
                            size="icon"
                            className="h-9 w-9 rounded-full bg-amber-600 hover:bg-amber-700 ml-2"
                            disabled={!product.inStock}
                            onClick={() => {
                              if (product.inStock) {
                                addToCart({
                                  id: product.id,
                                  name: product.name,
                                  price: product.price,
                                  image: product.image,
                                  quantity: 1,
                                })
                                toast({
                                  title: "Added to cart",
                                  description: `${product.name} has been added to your cart.`,
                                })
                              }
                            }}
                          >
                            <ShoppingBag className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No products found</h2>
              <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setPriceRange([0, 500])
                  setSelectedCategories([])
                  setSortOption("featured")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
