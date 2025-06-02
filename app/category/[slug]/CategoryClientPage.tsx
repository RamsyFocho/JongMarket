"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronRight, Filter, Star, ShoppingBag, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react"
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
  const category = (categories as any)[slug];

  if (!category) {
    notFound()
  }

  // Ensure productsForCategory is always an array
  const productsForCategory = Array.isArray(category?.products) ? category.products : [];

  // Find max price in this category robustly
  const maxPrice = productsForCategory.length > 0 ? Math.max(...productsForCategory.map((product: { price: any }) => product.price)) : 500;

  const [filteredProducts, setFilteredProducts] = useState(productsForCategory)
  const [priceRange, setPriceRange] = useState([0, maxPrice])
  const [sortOption, setSortOption] = useState("featured")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoSliding, setIsAutoSliding] = useState(false)
  const { t } = useLanguage()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const brandSliderRef = useRef<HTMLDivElement | null>(null)
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null)

  // SEO: Update page title when component mounts
  useEffect(() => {
    document.title = `${category.title} | Premium Drinks Collection | Jong Market`
  }, [category])

  // Apply filters and sorting
  useEffect(() => {
    let result = [...productsForCategory]

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
  }, [productsForCategory, priceRange, sortOption])

  // Get all brands for this category
  const brandsForCategory = getBrandsForCategory(slug)

  // Auto-slide functionality
  useEffect(() => {
    if (brandsForCategory.length > 0 && isAutoSliding) {
      const itemsPerView = getItemsPerView()
      const maxSlides = Math.max(0, brandsForCategory.length - itemsPerView)
      
      if (maxSlides > 0) {
        autoSlideRef.current = setInterval(() => {
          setCurrentSlide(prev => (prev >= maxSlides ? 0 : prev + 1))
        }, 3000)
      }
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current)
      }
    }
  }, [brandsForCategory.length, isAutoSliding])

  // Check if auto-slide should be enabled based on screen size and content
  useEffect(() => {
    const checkAutoSlide = () => {
      if (typeof window !== 'undefined' && brandSliderRef.current) {
        const containerWidth = brandSliderRef.current.offsetWidth
        const itemWidth = 120 // Approximate width of each brand item
        const itemsPerView = Math.floor(containerWidth / itemWidth)
        const shouldAutoSlide = window.innerWidth < 768 || brandsForCategory.length > itemsPerView
        setIsAutoSliding(shouldAutoSlide)
      }
    }

    checkAutoSlide()
    window.addEventListener('resize', checkAutoSlide)
    return () => window.removeEventListener('resize', checkAutoSlide)
  }, [brandsForCategory.length])

  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 4
    if (window.innerWidth < 640) return 2
    if (window.innerWidth < 768) return 3
    if (window.innerWidth < 1024) return 4
    return Math.floor(window.innerWidth / 120)
  }

  const nextSlide = () => {
    const itemsPerView = getItemsPerView()
    const maxSlides = Math.max(0, brandsForCategory.length - itemsPerView)
    setCurrentSlide(prev => (prev >= maxSlides ? 0 : prev + 1))
  }

  const prevSlide = () => {
    const itemsPerView = getItemsPerView()
    const maxSlides = Math.max(0, brandsForCategory.length - itemsPerView)
    setCurrentSlide(prev => (prev <= 0 ? maxSlides : prev - 1))
  }

  return (
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

      {/* Brands Horizontal Slider */}
      {brandsForCategory.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Featured Brands</h2>
          <div className="relative" ref={brandSliderRef}>
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out gap-4"
                style={{ 
                  transform: `translateX(-${currentSlide * (100 / getItemsPerView())}%)`,
                  width: `${(brandsForCategory.length / getItemsPerView()) * 100}%`
                }}
              >
                {brandsForCategory.map(brand => (
                  <div 
                    key={brand.id} 
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / brandsForCategory.length}%` }}
                  >
                    <Link 
                      href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="flex flex-col items-center group block"
                    >
                      <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-amber-200 bg-white group-hover:border-amber-500 transition-all duration-300 group-hover:shadow-lg">
                        <Image 
                          src={brand.logo || '/placeholder-logo.png'} 
                          alt={brand.name} 
                          fill 
                          className="object-contain p-2" 
                        />
                      </div>
                      <span className="mt-2 text-xs md:text-sm text-center text-gray-800 group-hover:text-amber-700 font-medium truncate max-w-[80px] md:max-w-[100px]">
                        {brand.name}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows - only show if auto-sliding or overflowing */}
            {isAutoSliding && brandsForCategory.length > getItemsPerView() && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 z-10 border border-gray-200 hover:border-amber-300"
                  aria-label="Previous brands"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 z-10 border border-gray-200 hover:border-amber-300"
                  aria-label="Next brands"
                >
                  <ChevronRightIcon className="h-4 w-4 text-gray-600" />
                </button>
              </>
            )}

            {/* Slide Indicators */}
            {isAutoSliding && brandsForCategory.length > getItemsPerView() && (
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: Math.max(0, brandsForCategory.length - getItemsPerView()) + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      currentSlide === index ? 'bg-amber-600' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
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
  )
}