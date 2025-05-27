"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight, Tag, Clock, ArrowRight, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/data/products"
import { useLanguage } from "@/context/language-context"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useToast } from "@/hooks/use-toast"

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
    category: "wine",
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
    category: "whiskey",
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
    category: "accessories",
  },
  {
    id: 4,
    title: "Craft Beer Selection",
    description: "Explore our handpicked selection of craft beers from around the world",
    image: "/images/promotions/craft-beer.jpg",
    discount: "10%",
    originalPrice: 79.99,
    discountedPrice: 71.99,
    endsIn: "10 days",
    link: "/promotions/craft-beer",
    category: "beer",
  },
  {
    id: 5,
    title: "Premium Champagne Bundle",
    description: "Celebrate in style with our premium champagne selection",
    image: "/images/promotions/champagne-bundle.jpg",
    discount: "15%",
    originalPrice: 399.99,
    discountedPrice: 339.99,
    endsIn: "4 days",
    link: "/promotions/champagne-bundle",
    category: "champagne",
  },
  {
    id: 6,
    title: "Coffee Lovers Package",
    description: "Premium coffee beans and accessories for the perfect brew",
    image: "/images/promotions/coffee-package.jpg",
    discount: "20%",
    originalPrice: 129.99,
    discountedPrice: 103.99,
    endsIn: "6 days",
    link: "/promotions/coffee-package",
    category: "hot-drinks",
  },
]

export default function PromotionsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { t } = useLanguage()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  const filteredPromotions =
    activeTab === "all" ? promotions : promotions.filter((promo) => promo.category === activeTab)

  // Add to cart handler
  const handleAddToCart = (promo: typeof promotions[0]) => {
    addToCart({
      id: promo.id,
      name: promo.title,
      price: promo.discountedPrice,
      image: promo.image,
      quantity: 1,
    })
    toast({
      title: t("addedToCart") || "Added to cart",
      description: `${promo.title} ${t("hasBeenAddedToCart") || "has been added to your cart."}`,
    })
  }

  // Wishlist toggle handler
  const handleWishlist = (promo: typeof promotions[0]) => {
    if (isInWishlist(promo.id)) {
      removeFromWishlist(promo.id)
      toast({
        title: t("removedFromWishlist") || "Removed from wishlist",
        description: `${promo.title} ${t("removedFromWishlistDesc") || "has been removed from your wishlist."}`,
      })
    } else {
      addToWishlist({
        id: promo.id,
        name: promo.title,
        price: promo.discountedPrice,
        image: promo.image,
        slug: promo.link.replace("/promotions/", ""),
        category: promo.category,
      })
      toast({
        title: t("AddedToWishlist") || "Added to wishlist",
        description: `${promo.title} ${t("hasBeenAddedToWishlist") || "has been added to your wishlist."}`,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-amber-600">
          {t("home")}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700 font-medium">{t("specialPromotions")}</span>
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center mb-2">
          <Tag className="h-6 w-6 text-amber-600 mr-2" />
          <h1 className="text-3xl font-bold">{t("specialPromotions")}</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">{t("specialPromotionsDesc")}</p>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="w-full max-w-3xl mx-auto">
          <TabsTrigger value="all">All Promotions</TabsTrigger>
          <TabsTrigger value="whiskey">Whiskey</TabsTrigger>
          <TabsTrigger value="wine">Wine</TabsTrigger>
          <TabsTrigger value="beer">Beer</TabsTrigger>
          <TabsTrigger value="champagne">Champagne</TabsTrigger>
          <TabsTrigger value="hot-drinks">Hot Drinks</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPromotions.map((promo) => (
          <motion.div
            key={promo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
              <div className="relative">
                <Link href={promo.link}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={promo.image || "/placeholder.svg?height=300&width=400"}
                      alt={promo.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                  {t("limitedTimeOffer")}
                </div>
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                  -{promo.discount}
                </div>
              </div>

              <div className="p-4">
                <Link href={promo.link}>
                  <h3 className="font-semibold text-lg group-hover:text-amber-600 transition-colors">{promo.title}</h3>
                </Link>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{promo.description}</p>

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
                      {t("endsIn")} {promo.endsIn}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant={isInWishlist(promo.id) ? "secondary" : "outline"}
                    className={isInWishlist(promo.id) ? "text-red-600 border-red-200" : ""}
                    onClick={() => handleWishlist(promo)}
                    title={isInWishlist(promo.id) ? t("removeFromWishlist") || "Remove from wishlist" : t("addToWishlist") || "Add to wishlist"}
                  >
                    <Heart className={`h-5 w-5 mr-2 ${isInWishlist(promo.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                    {isInWishlist(promo.id) ? t("inWishlist") || "In Wishlist" : t("addToWishlist") || "Add to Wishlist"}
                  </Button>
                  <Button
                    className="bg-amber-600 hover:bg-amber-700 flex-1"
                    onClick={() => handleAddToCart(promo)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {t("addToCart") || "Add to Cart"}
                  </Button>
                  <Link href={promo.link} className="flex-1">
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      {t("viewDeal")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPromotions.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <Tag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No promotions found</h2>
          <p className="text-gray-500 mb-6">There are currently no promotions in this category.</p>
          <Button variant="outline" onClick={() => setActiveTab("all")}>
            View All Promotions
          </Button>
        </div>
      )}
    </div>
  )
}
