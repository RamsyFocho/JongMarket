"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/context/language-context"
import { formatCurrency } from "@/data/products"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart()
  const { toast } = useToast()
  const { t } = useLanguage()

  // Shipping cost
  const shippingCost = totalPrice > 0 ? 3.334 : 0
  const orderTotal = totalPrice + shippingCost

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(itemId, newQuantity)
  }

  const handleRemoveItem = (itemId: number, itemName: string) => {
    removeFromCart(itemId)
    toast({
      title: "Item removed",
      description: `${itemName} has been removed from your cart.`,
    })
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">{t("emptyCart")}</h1>
          <p className="text-gray-600 mb-8">{t("emptyCartDesc")}</p>
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
        <span className="text-gray-700 font-medium">{t("cart")}</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">
        {t("cart")} ({totalItems} {totalItems === 1 ? "item" : "items"})
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center py-4">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <span className="font-bold">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                      <p className="text-gray-500 text-sm mt-1">{formatCurrency(item.price)} each</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-red-50"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          aria-label="Remove from cart"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && <Separator />}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">{t("orderSummary")}</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">{t("subtotal")}</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t("shipping")}</span>
                <span>{formatCurrency(shippingCost)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>{t("total")}</span>
              <span className="text-amber-600">{formatCurrency(orderTotal)}</span>
            </div>

            <div className="mt-6 space-y-4">
              <Link href="/checkout">
                <Button className="w-full bg-amber-600 hover:bg-amber-700 mb-2">
                  {t("checkout")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="w-full">
                  {t("continueShoppingBtn")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
