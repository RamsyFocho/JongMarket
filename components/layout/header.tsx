"use client"

import type React from "react"
import type { products as ProductsArrayType } from "@/data/products"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search, ShoppingCart, Menu, Phone, Star, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useLanguage } from "@/context/language-context"
import { cn } from "@/lib/utils"
import { useScrollDirection } from "@/hooks/use-scroll-direction"
import MobileMenu from "@/components/layout/mobile-menu"
import { categories } from "@/data/products"
import { products } from "@/data/products"
import { formatCurrency } from "@/lib/format-currency"
import { ChevronDown } from 'lucide-react';
import AnimatedShopByBrand from "@/components/layout/AnimatedShopByBrand"

const categoryItems = Object.entries(categories).map(([slug, data]) => ({
  slug,
  title: data.title,
}))

// Use the type of a product from products array
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Product = (typeof ProductsArrayType)[0]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const pathname = usePathname()
  const { cartItems, totalItems: cartTotalItems } = useCart()
  const { totalItems: wishlistTotalItems } = useWishlist()
  const { language, setLanguage, t } = useLanguage()
  const headerRef = useRef(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { scrollDirection, scrolledToTop } = useScrollDirection(10)
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Focus search input when expanded
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchExpanded])

  // Filter products for search suggestions
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Redirect to search results page
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en")
  }

  // Determine header visibility class based on scroll direction
  const headerVisibilityClass = scrolledToTop || scrollDirection === "up" ? "header-visible" : "header-hidden"

  // Responsive Header
  return (
    <>
      {/* Mobile Header */}
      <header
        ref={headerRef}
        className={cn(
          "md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-amber-200 flex items-center justify-between px-4 h-14",
          headerVisibilityClass
        )}
        role="banner"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center h-full">
          <span className="text-xl font-bold text-amber-600 font-serif">Jong<span className="text-amber-800">Market</span></span>
        </Link>
        <div className="flex items-center space-x-3">
          {/* Search Icon (expands to input) */}
          <button
            className="p-2 rounded-full hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Search"
            onClick={() => setIsSearchExpanded((v) => !v)}
          >
            <Search className="h-5 w-5 text-amber-700" />
          </button>
          {/* Search Input (overlay) */}
          {isSearchExpanded && (
            <div className="fixed inset-0 z-[100] bg-black/40 flex items-start justify-center pt-8" onClick={() => setIsSearchExpanded(false)}>
              <form
                onSubmit={handleSearchSubmit}
                className="bg-white rounded-lg shadow-lg w-11/12 max-w-md flex items-center px-3 py-2 relative"
                onClick={e => e.stopPropagation()}
              >
                <Input
                  type="text"
                  placeholder="Find Your Drink..."
                  className="flex-1 border-amber-200 focus-visible:ring-amber-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  ref={searchInputRef}
                  autoFocus
                />
                <Button type="submit" size="icon" className="ml-2 bg-amber-600 hover:bg-amber-700" aria-label="Search">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
          )}
          {/* Cart Icon */}
          <Link href="/cart" className="relative p-2 rounded-full hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400" aria-label="Cart">
            <ShoppingCart className="h-5 w-5 text-amber-700" />
            {cartTotalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                {cartTotalItems}
              </span>
            )}
          </Link>
          {/* Mobile Menu Button */}
          <button
            className="p-2 rounded-full hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-amber-700" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} categories={categoryItems} />

      {/* Desktop Header (unchanged) */}
      <header
        ref={headerRef}
        className={cn(
          "hidden md:block fixed top-0 left-0 right-0 z-50 header-scroll-transition w-full h-[fit] ",
          isScrolled ? "bg-white shadow-md" : "bg-white",
          headerVisibilityClass,
        )}
        role="banner"
      >
        {/* Top Bar */}
        <div className="bg-amber-950 text-white py-2 text-xs">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Phone className="h-3 w-3 mr-1" />
                  <span>+237 677 889 900</span>
                </div>
                <div className="hidden md:flex items-center">
                  <span>
                    Order in the next <span className="font-bold">01:53:22</span> for delivery on{" "}
                    <span className="font-bold">Tuesday</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/help" className="hover:text-amber-300 transition-colors">
                  Help
                </Link>
                <Link href="/blog" className="hover:text-amber-300 transition-colors">
                  Blog
                </Link>
                <Link href="/delivery-info" className="hover:text-amber-300 transition-colors">
                  Delivery Info
                </Link>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  Contact Us
                </Link>
                <Link href="/about" className="hover:text-amber-300 transition-colors">
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="border-b border-gray-200 py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <div className="relative h-10 w-32">
                  <span className="text-2xl font-bold text-amber-600 font-serif">
                    Jong<span className="text-amber-800">Market</span>
                  </span>
                </div>
              </Link>

              {/* Search Bar */}
              <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
                <form onSubmit={handleSearchSubmit} className="relative w-full">
                  <Input
                    type="text"
                    placeholder="Find Your Drink..."
                    className="pr-10 border-amber-200 focus-visible:ring-amber-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(suggestions.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    ref={searchInputRef}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-0 top-0 h-full bg-amber-600 hover:bg-amber-700 rounded-l-none"
                    aria-label="Search"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  {/* Suggestions Dropdown */}
                  {showSuggestions && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-amber-200 rounded-md shadow-lg z-50 animate-fade-in-down transition-all duration-200">
                      {suggestions.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug}`}
                          className="flex items-center px-3 py-2 hover:bg-amber-50 transition-colors"
                          onClick={() => setShowSuggestions(false)}
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
                      ))}
                      {suggestions.length === 0 && (
                        <div className="px-3 py-2 text-sm text-gray-500">No results found.</div>
                      )}
                    </div>
                  )}
                </form>
              </div>

              {/* Account Links */}
              <div className="flex items-center space-x-4">
                <div className="hidden md:block">
                  <div className="flex items-center space-x-4">
                    <Link href="/account" className="text-sm hover:text-amber-600">
                      Login / Register
                    </Link>
                    <Link href="/wishlist" className="text-sm hover:text-amber-600 relative">
                      Wishlist
                      {wishlistTotalItems > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                        >
                          {wishlistTotalItems}
                        </Badge>
                      )}
                    </Link>
                    <Link href="/cart" className="text-sm hover:text-amber-600 relative flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-1" />
                      Cart
                      {cartTotalItems > 0 && (
                        <Badge className="ml-1 bg-amber-600 hover:bg-amber-700">{cartTotalItems}</Badge>
                      )}
                    </Link>
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden flex items-center justify-center"
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
                <button
                  type="button"
                  aria-label={language === "en" ? "Switch to French" : "Passer en anglais"}
                  onClick={() => setLanguage(language === "en" ? "fr" : "en")}
                  className="flex items-center px-2 py-1 rounded hover:bg-amber-100 transition text-sm font-medium border border-gray-200 bg-white ml-2"
                >
                  <Globe className="w-4 h-4 mr-1 text-amber-600" />
                  {language === "en" ? "FR" : "EN"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="bg-amber-600 text-white hidden md:block ">
          <div className="w-full h-[10vh]">
            <div className="flex items-center">
              <div className="relative group flex items-center cursor-pointer">              
                <AnimatedShopByBrand />
              </div>

              {/* Category Collections */}
              <div className="flex  h-[10vh] items-center" >
              {categoryItems.slice(0, 7).map((category) => (
                <div key={category.slug} className="relative group">
                  <Link
                    href={`/category/${category.slug}`}
                    className="px-4 py-2  transition-colors inline-block md:text-ellipsis"
                  >
                    {category.title}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 ml-1 inline-block transition-transform duration-300 group-hover:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Products Dropdown */}
                  
                  <div className="absolute left-0 top-full z-50 w-[400px] bg-white shadow-lg rounded-b-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-y-0 group-hover:scale-y-100">
                    <div className="p-4">
                      <h3 className="font-medium text-gray-800 mb-3 border-b pb-2">{category.title}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {products
                          .filter((product) => product.category.toLowerCase() === category.slug.toLowerCase())
                          .slice(0, 4)
                          .map((product) => (
                            <Link
                              key={product.id}
                              href={`/product/${product.slug}`}
                              className="flex items-start hover:bg-amber-50 p-2 rounded-md transition-colors"
                            >
                              <div className="relative h-14 w-14 rounded overflow-hidden flex-shrink-0">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="ml-2 flex-1 min-w-0">
                                <h4 className="text-xs font-medium text-gray-800 line-clamp-2">{product.name}</h4>
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
                                <div className="text-xs font-medium text-amber-600 mt-1">
                                  {formatCurrency(product.price)}
                                </div>
                              </div>
                            </Link>
                          ))}
                      </div>
                      <div className="mt-3 pt-2 border-t text-right">
                        <Link
                          href={`/category/${category.slug}`}
                          className="text-sm font-medium text-amber-600 hover:text-amber-800"
                        >
                          View All {category.title} →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>              
            </div>
          </div>
        </div>

        {/* Delivery Banner */}
        {/* <div className="bg-amber-50 border-b border-amber-100 py-2 hidden md:block h-5">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="font-medium text-amber-800">
                Next Working Day Mainland Delivery* (Order placed before 2pm)
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">We also deliver on Saturday & Sunday</span>
                <Image
                  src="/images/delivery-van.png"
                  alt="Delivery van"
                  width={60}
                  height={24}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div> */}
      </header>
    </>
  )
}