"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, ChevronDown, Home, Tag, Info, Phone, User, Heart, ShoppingCart, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useLanguage } from "@/context/language-context"
import { cn } from "@/lib/utils"
import { products } from "@/data/products"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  categories: { slug: string; title: string }[]
}

export default function MobileMenu({ isOpen, onClose, categories }: MobileMenuProps) {
  const pathname = usePathname()
  const { totalItems: cartTotalItems } = useCart()
  const { totalItems: wishlistTotalItems } = useWishlist()
  const { t, language, setLanguage } = useLanguage()
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof products>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en")
  }

  const toggleCategory = (slug: string) => {
    setExpandedCategory(expandedCategory === slug ? null : slug)
  }

  // Get popular products for a category
  const getCategoryProducts = (categorySlug: string) => {
    return products.filter((product) => product.category.toLowerCase() === categorySlug.toLowerCase()).slice(0, 3)
  }

  // Filter products for search suggestions
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex flex-col gap-2 p-4 border-b">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-amber-600 font-serif">
                  Jong<span className="text-amber-800">Market</span>
                </span>
                <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {/* Search Bar */}
              <div className="relative mt-2">
                <input
                  type="text"
                  className="w-full rounded-md border border-amber-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder={t("search") || "Search products..."}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                />
                {/* Suggestions Dropdown */}
                <AnimatePresence>
                  {showSuggestions && searchQuery.trim() && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 right-0 mt-1 bg-white border border-amber-200 rounded-md shadow-lg z-50 max-h-72 overflow-y-auto"
                    >
                      {suggestions.length > 0 ? (
                        suggestions.map(product => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="flex items-center px-3 py-2 hover:bg-amber-50 transition-colors"
                            onClick={onClose}
                          >
                            <div className="relative h-8 w-8 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="ml-2 text-sm text-gray-800 truncate">{product.name}</span>
                          </Link>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-sm text-gray-500">No results found.</div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto">
              <nav className="p-2">
                <Link
                  href="/"
                  className={cn(
                    "flex items-center py-2.5 px-3 rounded-md",
                    pathname === "/" ? "bg-amber-50 text-amber-600" : "text-gray-700",
                  )}
                  onClick={onClose}
                >
                  <Home className="h-5 w-5 mr-3" />
                  <span>{t("home")}</span>
                </Link>

                <div className="mt-3">
                  <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    {t("categories")}
                  </h3>

                  {categories.map((category) => (
                    <div key={category.slug} className="mb-1">
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/category/${category.slug}`}
                          className={cn(
                            "flex-1 flex items-center py-2 px-3 rounded-md",
                            pathname === `/category/${category.slug}` ? "text-amber-600" : "text-gray-700",
                          )}
                          onClick={onClose}
                        >
                          <span>{category.title}</span>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 mr-1"
                          onClick={() => toggleCategory(category.slug)}
                          aria-label={expandedCategory === category.slug ? "Collapse category" : "Expand category"}
                        >
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              expandedCategory === category.slug ? "rotate-180" : "",
                            )}
                          />
                        </Button>
                      </div>

                      {/* Expanded Category Content */}
                      <AnimatePresence>
                        {expandedCategory === category.slug && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pr-2 py-2 bg-gray-50 rounded-md mx-2 mb-2">
                              {getCategoryProducts(category.slug).map((product) => (
                                <Link
                                  key={product.id}
                                  href={`/product/${product.slug}`}
                                  className="flex items-center py-2 hover:bg-gray-100 rounded-md px-2"
                                  onClick={onClose}
                                >
                                  <div className="relative h-10 w-10 rounded overflow-hidden bg-white">
                                    <Image
                                      src={product.image || "/placeholder.svg"}
                                      alt={product.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{product.name}</p>
                                    <p className="text-xs text-amber-600">{t("viewProduct")}</p>
                                  </div>
                                  <ChevronRight className="h-4 w-4 text-gray-400" />
                                </Link>
                              ))}
                              <Link
                                href={`/category/${category.slug}`}
                                className="flex items-center justify-center py-2 mt-1 text-sm font-medium text-amber-600 hover:bg-amber-50 rounded-md"
                                onClick={onClose}
                              >
                                {t("viewAll")} {category.title}
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <Separator className="my-3" />

                <Link
                  href="/promotions"
                  className={cn(
                    "flex items-center py-2.5 px-3 rounded-md",
                    pathname === "/promotions" ? "bg-amber-50 text-amber-600" : "text-gray-700",
                  )}
                  onClick={onClose}
                >
                  <Tag className="h-5 w-5 mr-3" />
                  <span>{t("specialPromotions")}</span>
                </Link>

                <Link
                  href="/blog"
                  className={cn(
                    "flex items-center py-2.5 px-3 rounded-md",
                    pathname === "/blog " ? "bg-amber-50 text-amber-600" : "text-gray-700",
                  )}
                  onClick={onClose}
                >
                  <Info className="h-5 w-5 mr-3" />
                  <span>{t("about")}</span>
                </Link>
                <Link
                  href="/about"
                  className={cn(
                    "flex items-center py-2.5 px-3 rounded-md",
                    pathname === "/about" ? "bg-amber-50 text-amber-600" : "text-gray-700",
                  )}
                  onClick={onClose}
                >
                  <Info className="h-5 w-5 mr-3" />
                  <span>{t("about")}</span>
                </Link>

                <Link
                  href="/contact"
                  className={cn(
                    "flex items-center py-2.5 px-3 rounded-md",
                    pathname === "/contact" ? "bg-amber-50 text-amber-600" : "text-gray-700",
                  )}
                  onClick={onClose}
                >
                  <Phone className="h-5 w-5 mr-3" />
                  <span>{t("contact")}</span>
                </Link>
              </nav>
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <div className="grid grid-cols-3 gap-2">
                <Link
                  href="/account"
                  className="flex flex-col items-center justify-center p-2 text-gray-700 hover:text-amber-600"
                  onClick={onClose}
                >
                  <User className="h-5 w-5 mb-1" />
                  <span className="text-xs">{t("account")}</span>
                </Link>

                <Link
                  href="/wishlist"
                  className="flex flex-col items-center justify-center p-2 text-gray-700 hover:text-amber-600 relative"
                  onClick={onClose}
                >
                  <Heart className="h-5 w-5 mb-1" />
                  {wishlistTotalItems > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                    >
                      {wishlistTotalItems}
                    </Badge>
                  )}
                  <span className="text-xs">{t("wishlist")}</span>
                </Link>

                <Link
                  href="/cart"
                  className="flex flex-col items-center justify-center p-2 text-gray-700 hover:text-amber-600 relative"
                  onClick={onClose}
                >
                  <ShoppingCart className="h-5 w-5 mb-1" />
                  {cartTotalItems > 0 && (
                    <Badge className="absolute -top-1 right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-amber-600">
                      {cartTotalItems}
                    </Badge>
                  )}
                  <span className="text-xs">{t("cart")}</span>
                </Link>
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-between">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center text-sm text-gray-700 hover:text-amber-600"
                >
                  <Globe className="h-4 w-4 mr-1.5" />
                  {language === "en" ? "Switch to French" : "Passer à l'anglais"}
                </button>

                <Link
                  href="/account/login"
                  className="text-sm font-medium text-amber-600 hover:text-amber-700"
                  onClick={onClose}
                >
                  {t("signIn")}
                </Link>
              </div>

              {/* Language Switcher Button (place near bottom of menu) */}
              <div className="flex justify-center mt-6 mb-2">
                <button
                  type="button"
                  aria-label={language === "en" ? "Switch to French" : "Passer en anglais"}
                  onClick={() => setLanguage(language === "en" ? "fr" : "en")}
                  className="flex items-center px-3 py-1 rounded hover:bg-amber-100 transition text-base font-medium border border-gray-200 bg-white"
                >
                  <Globe className="w-5 h-5 mr-2 text-amber-600" />
                  {language === "en" ? "FR" : "EN"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
