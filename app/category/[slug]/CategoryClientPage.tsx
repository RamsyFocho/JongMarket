"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronRight, Filter, Star, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { categories, formatCurrency } from "@/data/products"
import { useLanguage } from "@/context/language-context"
import WishlistButton from "@/components/product/wishlist-button"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { getBrandsForCategory } from '@/lib/getBrandsForCategory';

export default function CategoryClientPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const category = categories[slug]

  if (!category) {
    notFound()
  }

  const [filteredProducts, setFilteredProducts] = useState(category.products)
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortOption, setSortOption] = useState("featured")
  const { t } = useLanguage()
  const { addToCart } = useCart()
  const { toast } = useToast()

  // SEO: Update page title when component mounts
  useEffect(() => {
    document.title = `${category.title} | Premium Drinks Collection | Jong Market`
  }, [category])

  // Apply filters and sorting
  useEffect(() => {
    let result = [...category.products]

    // Filter by price
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Apply sorting
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortOption === "rating") {
      result.sort((a, b) => b.rating - a.rating)
    }

    setFilteredProducts(result)
  }, [category.products, priceRange, sortOption])

  // Find max price in this category
  const maxPrice = Math.max(...category.products.map((product) => product.price))

  // Get all brands for this category
  const brands = getBrandsForCategory(category.title || slug)

  return (
    <>
      {/* Structured data for category */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: category.title,
            description: category.description,
            url: `https://jongmarket.com/category/${slug}`,
            numberOfItems: category.products.length,
            itemListElement: category.products.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Product",
                name: product.name,
                description: product.description,
                image: product.image,
                url: `https://jongmarket.com/product/${product.slug}`,
                offers: {
                  "@type": "Offer",
                  price: product.price * 600, // Convert to FCFA
                  priceCurrency: "XAF",
                  availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                },
              },
            })),
          }),
        }}
      />

      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-amber-600">
            {t("home")}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/products" className="hover:text-amber-600">
            Products
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-700 font-medium">{category.title}</span>
        </div>

        {/* Category Header */}
        <div className="relative h-64 rounded-xl overflow-hidden mb-12">
          <Image
            src={`/images/categories/${slug}.jpg` || "/placeholder.svg?height=400&width=1200"}
            alt={`${category.title} - Premium collection at Jong Market`}
            fill
            className="object-contain"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="px-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{category.title}</h1>
              <p className="text-white/80 max-w-xl">{category.description}</p>
            </div>
          </div>
        </div>

        {/* Brands for this category */}
        {brands.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Brands in this category</h2>
            <div className="flex flex-wrap gap-4">
              {brands.map(brand => (
                <Link key={brand.id} href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center gap-2 bg-white rounded-lg border px-3 py-2 shadow hover:shadow-md transition">
                  <img src={brand.logo} alt={brand.name} className="w-8 h-8 object-contain rounded" />
                  <span className="font-medium text-gray-800">{brand.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

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
                  defaultValue={[0, maxPrice]}
                  max={maxPrice}
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

              {/* Reset Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setPriceRange([0, maxPrice])
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
              <h2 className="text-2xl font-bold mb-4 sm:mb-0">
                {category.title} <span className="text-gray-500 text-lg">({filteredProducts.length} products)</span>
              </h2>

              {/* Sort Options */}
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="text-sm border rounded-md px-2 py-1"
                  aria-label="Sort products"
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
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group"
                    itemScope
                    itemType="https://schema.org/Product"
                  >
                    <meta itemProp="name" content={product.name} />
                    <meta itemProp="description" content={product.description} />
                    <meta itemProp="sku" content={`JM-${product.id}`} />
                    <meta itemProp="brand" content="Jong Market" />

                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col">
                      <Link href={`/product/${product.slug}`}>
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={`${product.name} - ${category.title} - Jong Market`}
                            fill
                            className="object-contain transition-transform duration-500 group-hover:scale-105"
                            itemProp="image"
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

                      <div className="p-4 flex-1 flex flex-col">
                        <Link href={`/product/${product.slug}`}>
                          <h3
                            className="font-semibold text-lg mt-1 group-hover:text-amber-600 transition-colors"
                            itemProp="name"
                          >
                            {product.name}
                          </h3>
                        </Link>

                        <div
                          className="flex items-center mt-2"
                          itemProp="aggregateRating"
                          itemScope
                          itemType="https://schema.org/AggregateRating"
                        >
                          <meta itemProp="ratingValue" content={product.rating.toString()} />
                          <meta itemProp="reviewCount" content={(product.reviews?.length || 1).toString()} />
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

                        <div className="mt-auto">
                          <div
                            className="flex items-center justify-between mt-4"
                            itemProp="offers"
                            itemScope
                            itemType="https://schema.org/Offer"
                          >
                            <meta itemProp="price" content={(product.price * 600).toString()} />
                            <meta itemProp="priceCurrency" content="XAF" />
                            <meta
                              itemProp="availability"
                              content={product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"}
                            />
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
                                aria-label={
                                  product.inStock ? `Add ${product.name} to cart` : `${product.name} is out of stock`
                                }
                              >
                                <ShoppingBag className="h-5 w-5" />
                              </Button>
                            </div>
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
                    setPriceRange([0, maxPrice])
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
    </>
  )
}
