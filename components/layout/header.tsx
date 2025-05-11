"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Heart,
  LogIn,
  LogOut,
  Settings,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  Truck,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";
import SearchBar from "@/components/search/search-bar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { categories } from "@/data/products";

const categoryItems = Object.entries(categories).map(([slug, data]) => ({
  slug,
  title: data.title,
  description: data.description,
  image: `/images/categories/${slug}.jpg`,
}));

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { cartItems, totalItems: cartTotalItems } = useCart();
  const { totalItems: wishlistTotalItems } = useWishlist();
  const { language, setLanguage, t } = useLanguage();
  const headerRef = useRef(null);
  const lastScrollY = useRef(0);

  // Handle scroll events for header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show header at top of page
      if (currentScrollY < 50) {
        setIsHidden(false);
        setIsScrolled(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Apply scrolled styles once we scroll past threshold
      if (currentScrollY > 50) {
        setIsScrolled(true);
      }

      // Hide when scrolling down, show when scrolling up
      if (
        currentScrollY > lastScrollY.current &&
        !isHidden &&
        currentScrollY > 200
      ) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current && isHidden) {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHidden]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsShopDropdownOpen(false);
  }, [pathname]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  return (
    <TooltipProvider>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ",
          isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white",
          isHidden ? "-translate-y-full" : "translate-y-0"
        )}
        style={{
          fontFamily: "'Playfair Display', 'Poppins', system-ui, sans-serif",
        }}
      >
        {/* Top Bar */}
        <div className="bg-amber-900 text-white py-2 hidden md:block">
          <div className="container mx-auto px-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center ">
                  <Phone className="h-3 w-3 mr-2" />
                  <span className="font-light truncate text-ellipsis">
                    +237 677 889 900
                  </span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-3 w-3 mr-2" />
                  <span className="font-light w-36 truncate text-ellipsis">
                    info@jongmarket.com
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-2" />
                  <span className="font-light w-36 truncate text-ellipsis">
                    123 Drink Avenue, Yaoundé
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-2" />
                  <span className="font-light w-36 truncate text-ellipsis">
                    Mon-Fri: 9AM-8PM
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-amber-300">
                  <Truck className="h-3 w-3 mr-4" />
                  <span className="text-sm w-36 font-medium truncate text-ellipsis mr-4">
                    {t("freeShipping")}
                  </span>
                </div>
                <button
                  onClick={toggleLanguage}
                  className="flex items-center text-sm hover:text-amber-300 transition-colors"
                >
                  <Globe className="h-3 w-3 mr-1" />
                  {language === "en" ? "FR" : "EN"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div
          className={cn(
            "py-2 transition-all duration-300",
            isScrolled && "py-2"
          )}
        >
          <div className="container ml-4 mr-8 px-4 ">
            <div className="flex items-center justify-between ">
              <div className="flex items-center ">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isScrolled ? "ghost" : "outline"}
                      size="icon"
                      className={cn(
                        "mr-2 md:hidden",
                        !isScrolled &&
                          "text-amber-800 border-amber-200 hover:bg-amber-50"
                      )}
                      onClick={() => setIsMobileMenuOpen(true)}
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Menu</p>
                  </TooltipContent>
                </Tooltip>

                <Link href="/" className="flex items-center ">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center"
                  >
                    <div className="mr-2 relative h-12 w-12 rounded-full overflow-hidden bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg">
                      <span
                        className="text-white font-bold text-2xl"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        J
                      </span>
                    </div>
                    <div className="mr-12 ">
                      <h1
                        className="text-2xl font-bold text-amber-800"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Jong<span className="text-amber-500">Market</span>
                      </h1>
                      <span
                        className="text-xs tracking-wider text-amber-700 uppercase hidden sm:block"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Premium Liquor Store
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </div>

              <nav className="hidden md:flex items-center space-x-1">
                <Link
                  href="/"
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-amber-600/10 hover:text-amber-700",
                    pathname === "/"
                      ? "text-amber-700 font-semibold"
                      : "text-gray-700"
                  )}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {t("home")}
                </Link>

                <div
                  className="relative"
                  onMouseEnter={() => setIsShopDropdownOpen(true)}
                  onMouseLeave={() => setIsShopDropdownOpen(false)}
                >
                  <button
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-amber-600/10 hover:text-amber-700",
                      pathname.includes("/category") ||
                        pathname.includes("/product")
                        ? "text-amber-700 font-semibold"
                        : "text-gray-700"
                    )}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {t("shop")}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>

                  <AnimatePresence>
                    {isShopDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full z-50 mt-1 w-[800px] rounded-md bg-white py-6 px-4 shadow-xl -translate-x-1/3 border border-amber-100"
                      >
                        <div className="grid grid-cols-3 gap-6">
                          {categoryItems.map((category) => (
                            <Link
                              key={category.slug}
                              href={`/category/${category.slug}`}
                              className="group flex flex-col rounded-md transition-colors hover:bg-amber-50"
                            >
                              <div className="relative h-40 w-full overflow-hidden rounded-md">
                                <Image
                                  src={category.image || "/placeholder.svg"}
                                  alt={category.title}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-3">
                                  <h3
                                    className="text-white font-semibold"
                                    style={{
                                      fontFamily: "'Playfair Display', serif",
                                    }}
                                  >
                                    {category.title}
                                  </h3>
                                </div>
                              </div>
                              <div className="p-3">
                                <p
                                  className="text-xs text-gray-600 line-clamp-2"
                                  style={{
                                    fontFamily: "'Poppins', sans-serif",
                                  }}
                                >
                                  {category.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-amber-100 text-center">
                          <Link
                            href="/products"
                            className="inline-flex items-center text-amber-700 font-medium hover:text-amber-800"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            {t("viewAll")}
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/blog"
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-amber-600/10 hover:text-amber-700",
                    pathname === "/blog"
                      ? "text-amber-700 font-semibold"
                      : "text-gray-700"
                  )}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {t("blog")}
                </Link>

                <Link
                  href="/about"
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-amber-600/10 hover:text-amber-700",
                    pathname === "/about"
                      ? "text-amber-700 font-semibold"
                      : "text-gray-700"
                  )}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {t("about")}
                </Link>

                <Link
                  href="/contact"
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-amber-600/10 hover:text-amber-700",
                    pathname === "/contact"
                      ? "text-amber-700 font-semibold"
                      : "text-gray-700"
                  )}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {t("contact")}
                </Link>
              </nav>

              <div className="flex items-center space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-amber-100 hover:text-amber-700"
                      onClick={() => setIsSearchOpen(true)}
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("search")}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full hover:bg-amber-100 hover:text-amber-700"
                        >
                          <User className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-56 border-amber-100"
                      >
                        <DropdownMenuLabel
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {t("account")}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="hover:bg-amber-50"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          <LogIn className="mr-2 h-4 w-4" />
                          <span>{t("signIn")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:bg-amber-50"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          <User className="mr-2 h-4 w-4" />
                          <span>{t("profile")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:bg-amber-50"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          <span>{t("settings")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="hover:bg-amber-50"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>{t("signOut")}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("account")}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/wishlist">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full relative hover:bg-amber-100 hover:text-amber-700"
                      >
                        <Heart className="h-5 w-5" />
                        {wishlistTotalItems > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                          >
                            {wishlistTotalItems}
                          </motion.span>
                        )}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("wishlist")}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/cart">
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-8 rounded-full relative border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 hover:border-amber-400 hidden sm:flex"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        <span style={{ fontFamily: "'Poppins', sans-serif" }}>
                          {t("cart")}
                        </span>
                        {cartTotalItems > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-sm"
                          >
                            {cartTotalItems}
                          </motion.span>
                        )}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("cart")}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Mobile cart icon */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/cart" className="sm:hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full relative hover:bg-amber-100 hover:text-amber-700"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        {cartTotalItems > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                          >
                            {cartTotalItems}
                          </motion.span>
                        )}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("cart")}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 bg-white z-50 md:hidden overflow-y-auto h-screen"
            >
              <div className="flex justify-between items-center p-4 border-b border-amber-100">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center">
                    <div className="mr-2 relative h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
                      <span
                        className="text-white font-bold text-xl"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        J
                      </span>
                    </div>
                    <div>
                      <h2
                        className="text-xl font-bold text-amber-800"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Jong<span className="text-amber-500">Market</span>
                      </h2>
                      <span
                        className="text-xs tracking-wider text-amber-700 uppercase"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Premium Liquor
                      </span>
                    </div>
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <Link
                      href="/cart"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="relative border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        {t("cart")}
                        {cartTotalItems > 0 && (
                          <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            {cartTotalItems}
                          </span>
                        )}
                      </Button>
                    </Link>

                    <Link
                      href="/wishlist"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="relative border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100"
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        {t("wishlist")}
                        {wishlistTotalItems > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            {wishlistTotalItems}
                          </span>
                        )}
                      </Button>
                    </Link>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-amber-700 border-amber-300 hover:bg-amber-50"
                    onClick={() => {
                      setIsSearchOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Search className="h-4 w-4 mr-1" />
                    {t("search")}
                  </Button>
                </div>

                <nav>
                  <ul className="space-y-1">
                    <li>
                      <Link
                        href="/"
                        className={cn(
                          "flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors hover:bg-amber-50 hover:text-amber-800",
                          pathname === "/"
                            ? "bg-amber-50 text-amber-800"
                            : "text-gray-700"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {t("home")}
                      </Link>
                    </li>

                    <li className="py-1">
                      <div
                        className="flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        <span>{t("shop")}</span>
                      </div>
                      <ul className="mt-1 ml-3 space-y-1">
                        {categoryItems.map((category) => (
                          <li key={category.slug}>
                            <Link
                              href={`/category/${category.slug}`}
                              className={cn(
                                "flex items-center px-3 py-2 rounded-md text-sm transition-colors hover:bg-amber-50 hover:text-amber-800",
                                pathname === `/category/${category.slug}`
                                  ? "bg-amber-50 text-amber-800"
                                  : "text-gray-700"
                              )}
                              onClick={() => setIsMobileMenuOpen(false)}
                              style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                              {category.title}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href="/products"
                            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-amber-700 transition-colors hover:bg-amber-50"
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            {t("viewAll")}
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <Link
                        href="/blog"
                        className={cn(
                          "flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors hover:bg-amber-50 hover:text-amber-800",
                          pathname === "/blog"
                            ? "bg-amber-50 text-amber-800"
                            : "text-gray-700"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {t("blog")}
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/about"
                        className={cn(
                          "flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors hover:bg-amber-50 hover:text-amber-800",
                          pathname === "/about"
                            ? "bg-amber-50 text-amber-800"
                            : "text-gray-700"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {t("about")}
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/contact"
                        className={cn(
                          "flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors hover:bg-amber-50 hover:text-amber-800",
                          pathname === "/contact"
                            ? "bg-amber-50 text-amber-800"
                            : "text-gray-700"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {t("contact")}
                      </Link>
                    </li>
                  </ul>
                </nav>

                <div className="mt-8 pt-6 border-t border-amber-100">
                  <div className="space-y-1">
                    <h3
                      className="px-3 text-sm font-medium text-amber-800 uppercase tracking-wider"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {t("account")}
                    </h3>
                    <Link
                      href="/account/login"
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 transition-colors hover:bg-amber-50 hover:text-amber-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <LogIn className="h-5 w-5 mr-3 text-amber-600" />
                      {t("signIn")}
                    </Link>
                    <Link
                      href="/account/register"
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 transition-colors hover:bg-amber-50 hover:text-amber-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <User className="h-5 w-5 mr-3 text-amber-600" />
                      Register
                    </Link>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-amber-100">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 transition-colors hover:bg-amber-50 hover:text-amber-800 w-full"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <Globe className="h-5 w-5 mr-3 text-amber-600" />
                    {language === "en"
                      ? "Switch to French"
                      : "Passer à l'anglais"}
                  </button>
                </div>

                {/* Contact buttons - Mobile */}
                <div className="mt-8 bg-amber-50 rounded-lg p-4">
                  <h3
                    className="text-sm font-semibold text-amber-800 mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Get in Touch
                  </h3>
                  <div className="space-y-2">
                    <a
                      href="tel:+237677889900"
                      className="flex items-center text-sm text-gray-700 hover:text-amber-800"
                    >
                      <Phone className="h-4 w-4 mr-2 text-amber-600" />
                      <span style={{ fontFamily: "'Poppins', sans-serif" }}>
                        +237 677 889 900
                      </span>
                    </a>
                    <a
                      href="mailto:info@jongmarket.com"
                      className="flex items-center text-sm text-gray-700 hover:text-amber-800"
                    >
                      <Mail className="h-4 w-4 mr-2 text-amber-600" />
                      <span style={{ fontFamily: "'Poppins', sans-serif" }}>
                        info@jongmarket.com
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer for header height */}
      <div
        className={cn(
          "w-full transition-all duration-300",
          isScrolled ? "h-20" : "h-16"
        )}
      ></div>
    </TooltipProvider>
  );
}
