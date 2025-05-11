"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight, Heart, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/context/wishlist-context"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/context/language-context"
import { formatCurrency } from "@/data/products"

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const handleRemoveItem = (itemId, itemName) => {
    removeFromWishlist(itemId)
    toast({
      title: "Removed from wishlist",
      description: `${itemName} has been removed from your wishlist.`,
    })
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Heart className="h-16 w-16 mx-auto text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">{t("emptyWishlist")}</h1>
          <p className="text-gray-600 mb-8">{t("emptyWishlistDesc")}</p>
          <Link href="/products">
            <Button className="bg-amber-600 hover:bg-amber-700">{t("exploreProducts")}</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-amber-600">
          {t("home")}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700 font-medium">{t("wishlist")}</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">
          {t("wishlist")} ({wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"})
        </h1>
        {wishlistItems.length > 0 && (
          <Button variant="outline" className="text-red-600" onClick={() => clearWishlist()}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Wishlist
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
              <Link href={`/product/${item.slug}`}>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>

              <div className="p-4">
                {item.category && (
                  <Link href={`/category/${item.category.toLowerCase().replace(/\s+/g, "-")}`}>
                    <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">{item.category}</span>
                  </Link>
                )}

                <Link href={`/product/${item.slug}`}>
                  <h3 className="font-semibold text-lg mt-1 group-hover:text-amber-600 transition-colors">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-lg">{formatCurrency(item.price)}</span>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500"
                      onClick={() => handleRemoveItem(item.id, item.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="h-8 w-8 bg-amber-600 hover:bg-amber-700"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
