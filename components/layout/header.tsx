"use client";

import type React from "react";
import type { products as ProductsArrayType } from "@/data/products";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Menu, Phone, Star, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import MobileMenu from "@/components/layout/mobile-menu";
import { categories } from "@/data/products";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/format-currency";
import { ChevronDown } from "lucide-react";
import AnimatedShopByBrand from "@/components/layout/AnimatedShopByBrand";

const categoryItems = Object.entries(categories).map(([slug, data]) => ({
  slug,
  title: data.title,
}));

// Use the type of a product from products array
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Product = (typeof ProductsArrayType)[0];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { cartItems, totalItems: cartTotalItems } = useCart();
  const { totalItems: wishlistTotalItems } = useWishlist();
  const { language, setLanguage, t } = useLanguage();
  const headerRef = useRef(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { scrollDirection, scrolledToTop } = useScrollDirection(10);
  const [isHovered, setIsHovered] = useState(false);
  const [orderTimer, setOrderTimer] = useState(0);
  const [deliveryDay, setDeliveryDay] = useState("");
  const [headerHidden, setHeaderHidden] = useState(false);
  const [compactHeader, setCompactHeader] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const desktopHeaderRef = useRef<HTMLDivElement>(null);
  const mobileHeaderRef = useRef<HTMLDivElement>(null);

  // Calculate and set header height for proper content spacing
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (window.innerWidth >= 768 && desktopHeaderRef.current) {
        setHeaderHeight(desktopHeaderRef.current.offsetHeight);
      } else if (mobileHeaderRef.current) {
        setHeaderHeight(mobileHeaderRef.current.offsetHeight);
      }
    };

    // Initial calculation
    updateHeaderHeight();

    // Update on resize
    window.addEventListener("resize", updateHeaderHeight);

    // Add the CSS variable to the document for spacing
    document.documentElement.style.setProperty(
      "--header-height",
      `${headerHeight}px`
    );

    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, [compactHeader]);

  useEffect(() => {
    let lastScroll = window.scrollY;
    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollDelta = currentScroll - lastScroll;

      // Set isScrolled state for styling changes
      setIsScrolled(currentScroll > 10);

      // Show compact header when scrolled down
      setCompactHeader(currentScroll > 150);

      // Hide header on scroll down (after threshold), show on scroll up
      if (scrollDelta > 15 && currentScroll > 300) {
        setHeaderHidden(true);
      } else if (scrollDelta < -10) {
        setHeaderHidden(false);
      }

      // Show header when user stops scrolling
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setHeaderHidden(false);
      }, 1000);

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Focus search input when expanded
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  // Filter products for search suggestions
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products
        .filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    // Set cutoff time to 2pm today
    const cutoffHour = 14;
    const now = new Date();
    let cutoff = new Date();
    cutoff.setHours(cutoffHour, 0, 0, 0);
    if (now > cutoff) {
      // If after cutoff, set to 2pm tomorrow
      cutoff.setDate(cutoff.getDate() + 1);
    }
    setDeliveryDay(cutoff.toLocaleDateString(undefined, { weekday: "long" }));

    const updateTimer = () => {
      const now = new Date();
      let cutoff = new Date();
      cutoff.setHours(cutoffHour, 0, 0, 0);
      if (now > cutoff) {
        cutoff.setDate(cutoff.getDate() + 1);
      }
      const diff = cutoff.getTime() - now.getTime();
      setOrderTimer(diff > 0 ? diff : 0);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Use Next.js router to navigate to search results
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSuggestions(false);
      setIsSearchExpanded(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  // Format timer as HH:MM:SS
  const formatTimer = (ms: number) => {
    if (ms <= 0) return "00:00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Add spacer div for proper content spacing
  useEffect(() => {
    // Create spacer element if it doesn't exist
    let spacer = document.getElementById("header-spacer");
    if (!spacer) {
      spacer = document.createElement("div");
      spacer.id = "header-spacer";

      // Insert after the header
      if (headerRef.current && headerRef.current.parentNode) {
        headerRef.current.parentNode.insertBefore(
          spacer,
          headerRef.current.nextSibling
        );
      }
    }

    // Update height
    spacer.style.height = `${headerHeight}px`;

    return () => {
      // Clean up on unmount
      if (spacer && spacer.parentNode) {
        spacer.parentNode.removeChild(spacer);
      }
    };
  }, [headerHeight]);

  // Responsive Header
  return (
    <>
      {/* Mobile Header */}
      <header
        ref={mobileHeaderRef}
        className={cn(
          "md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-amber-200 flex items-center justify-between px-4 h-14",
          headerHidden ? "header-hidden" : "header-visible"
        )}
        role="banner"
      >
        {/* Logo - redesigned for mobile */}
        <Link href="/" className="flex items-center h-full">
          <div className="relative h-12 w-40 flex items-center justify-center overflow-hidden p-1">
            <Image
              src="/images/logo/jongmarket.jpg"
              alt="JongMarket Logo"
              fill
              className="object-cover object-center"
              priority
              sizes="160px"
            />
          </div>
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
            <div
              className="fixed inset-0 z-[100] bg-black/40 flex items-start justify-center pt-8"
              onClick={() => setIsSearchExpanded(false)}
            >
              <div
                className="w-11/12 max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <form
                  onSubmit={handleSearchSubmit}
                  className="bg-white rounded-t-lg shadow-lg flex items-center px-3 py-2 relative"
                >
                  <Input
                    type="text"
                    placeholder="Find Your Drink..."
                    className="flex-1 border-amber-200 focus-visible:ring-amber-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    ref={searchInputRef}
                    autoFocus
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="ml-2 bg-amber-600 hover:bg-amber-700"
                    aria-label="Search"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
                
                {/* Search Suggestions */}
                {showSuggestions && searchQuery.trim() && (
                  <div className="bg-white rounded-b-lg border-t border-amber-100 max-h-[60vh] overflow-y-auto">
                    {suggestions.length > 0 ? (
                      suggestions.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug}`}
                          className="flex items-center p-3 hover:bg-amber-50 transition-colors"
                          onClick={() => {
                            setIsSearchExpanded(false);
                            setSearchQuery('');
                            setShowSuggestions(false);
                          }}
                        >
                          <div className="relative h-12 w-12 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-800 line-clamp-1">
                              {product.name}
                            </p>
                            <p className="text-xs text-amber-600">
                              {formatCurrency(product.price)}
                            </p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="p-4 text-sm text-gray-500 text-center">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative p-2 rounded-full hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Cart"
          >
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
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        categories={categoryItems}
      />

      {/* Desktop Header */}
      <header
        ref={desktopHeaderRef}
        className={cn(
          "hidden md:block fixed top-0 left-0 right-0 z-50 header-scroll-transition w-full",
          isScrolled ? "bg-white shadow-md" : "bg-white",
          headerHidden ? "header-hidden" : "header-visible"
        )}
        role="banner"
      >
        {/* Top Bar - Only shows when not compact */}
        {!compactHeader && (
          <div className="bg-amber-950 text-white py-2 text-xs transition-all duration-300">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <Phone className="h-3 w-3 mr-1" />
                    <span>(+237) 683 181 515</span>
                  </div>
                  <div className="hidden md:flex items-center">
                    <span>
                      Order in the next{" "}
                      <span className="font-bold">
                        {formatTimer(orderTimer)}
                      </span>{" "}
                      for delivery on{" "}
                      <span className="font-bold">{deliveryDay}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    href="/"
                    className="hover:text-amber-300 transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href="/blog"
                    className="hover:text-amber-300 transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/delivery-info"
                    className="hover:text-amber-300 transition-colors"
                  >
                    Delivery Info
                  </Link>
                  <Link
                    href="/contact"
                    className="hover:text-amber-300 transition-colors"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/about"
                    className="hover:text-amber-300 transition-colors"
                  >
                    About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Header */}
        <div className="border-b border-gray-200 py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Logo - redesigned for desktop */}
              <Link href="/" className="flex items-center">
                <div
                  className={cn(
                    "relative flex items-center justify-center bg-white p-2 transition-all duration-300",
                    compactHeader ? "h-16 w-48" : "h-20 w-60"
                  )}
                >
                  <Image
                    src="/images/logo/jongmarket.jpg"
                    alt="JongMarket Logo"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="240px"
                  />
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
                    onBlur={() =>
                      setTimeout(() => setShowSuggestions(false), 150)
                    }
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
                          <span className="ml-2 text-sm text-gray-800 truncate">
                            {product.name}
                          </span>
                        </Link>
                      ))}
                      {suggestions.length === 0 && (
                        <div className="px-3 py-2 text-sm text-gray-500">
                          No results found.
                        </div>
                      )}
                    </div>
                  )}
                </form>
              </div>

              {/* Account Links */}
              <div className="flex items-center space-x-4">
                <div className="hidden md:block">
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/account"
                      className="text-sm hover:text-amber-600"
                    >
                      Login / Register
                    </Link>
                    <Link
                      href="/wishlist"
                      className="text-sm hover:text-amber-600 relative"
                    >
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
                    <Link
                      href="/cart"
                      className="text-sm hover:text-amber-600 relative flex items-center"
                    >
                      <ShoppingCart className="h-5 w-5 mr-1" />
                      Cart
                      {cartTotalItems > 0 && (
                        <Badge className="ml-1 bg-amber-600 hover:bg-amber-700">
                          {cartTotalItems}
                        </Badge>
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
                  aria-label={
                    language === "en" ? "Switch to French" : "Passer en anglais"
                  }
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
        <div className="bg-amber-600 text-white hidden md:block">
          <div
            className={cn(
              "w-full transition-all duration-300 ",
              compactHeader ? "h-[fi]" : "h-[fit]"
            )}
          >
            <div className="flex items-center h-[fit] flex-wrap">
              <div className="relative group flex items-center cursor-pointer">
                <AnimatedShopByBrand />
              </div>

              {/* Category Collections */}
              <div className="flex h-full items-center">
                {categoryItems
                  .slice(0, compactHeader ? 9 : 9)
                  .map((category) => (
                    <div key={category.slug} className="relative group border-2 border-green-500 w-[fit]">
                      <Link
                        href={`/category/${category.slug}`}
                        className="px-2 py-2 transition-colors inline-block md:text-ellipsis"
                      >
                        {category.title}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 ml-1 inline-block transition-transform duration-300 group-hover:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </Link>

                      {/* Products Dropdown */}
                      <div className="absolute left-0 top-full z-50 w-[400px] bg-white shadow-lg rounded-b-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-y-0 group-hover:scale-y-100">
                        <div className="p-4 border-2 ">
                          <h3 className="font-medium text-gray-800 mb-3 border-b pb-2 border-green-600">
                            {category.title}
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            {products
                              .filter(
                                (product) =>
                                  product.category.toLowerCase() ===
                                  category.slug.toLowerCase()
                              )
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
                                    <h4 className="text-xs font-medium text-gray-800 line-clamp-2">
                                      {product.name}
                                    </h4>
                                    <div className="flex items-center mt-1">
                                      <div className="flex text-amber-500">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className="h-2 w-2"
                                            fill={
                                              i < Math.floor(product.rating)
                                                ? "currentColor"
                                                : "none"
                                            }
                                          />
                                        ))}
                                      </div>
                                      <span className="text-xs text-gray-500 ml-1">
                                        ({product.rating})
                                      </span>
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
              
              {/* Sales and Offers button with dropdown */}
              <div className="relative group xl:ml-auto pt-1">
                <button className="flex items-center space-x-1 px-4 py-2 text-white hover:text-amber-100 transition-colors">
                  <span>Sales and Offers</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 ml-1 inline-block transition-transform duration-300 group-hover:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Sales Dropdown */}
                <div className="absolute right-0 left-3 xl:left-0 top-full z-50 w-48 bg-white shadow-lg rounded-b-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-y-0 group-hover:scale-y-100">
                  <div className="py-2">
                    <Link
                      href="/promotions?type=offers"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                    >
                      Special Offers
                    </Link>
                    <Link
                      href="/promotions?type=clearance"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                    >
                      Clearance
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
