"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { products, formatCurrency } from "@/data/products";
import { useLanguage } from "@/context/language-context";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

// Get top rated products as trending
const getTrendingProducts = () => {
  return [...products]
    .sort((a, b) => {
      if (b.rating === a.rating) {
        return (b.reviews?.length || 0) - (a.reviews?.length || 0);
      }
      return b.rating - a.rating;
    })
    .slice(0, 12);
};

export default function TrendingDrinks() {
  const { t } = useLanguage();
  const trendingProducts = getTrendingProducts();
  const [currentTab, setCurrentTab] = useState(0);
  // SSR-safe: always start with 3 (desktop) columns
  const [itemsPerTab, setItemsPerTab] = useState(3);
  const [isClient, setIsClient] = useState(false);
  const hasSetInitial = useRef(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setIsClient(true);
    // Only run responsive logic after hydration
    const updateItemsPerTab = () => {
      if (window.innerWidth < 1024) {
        setItemsPerTab(window.innerWidth < 768 ? 1 : 2);
      } else {
        setItemsPerTab(3);
      }
    };
    updateItemsPerTab();
    window.addEventListener("resize", updateItemsPerTab);
    return () => window.removeEventListener("resize", updateItemsPerTab);
  }, []);

  // Group products into tabs
  const totalTabs = Math.ceil(trendingProducts.length / itemsPerTab);
  const currentProducts = trendingProducts.slice(
    currentTab * itemsPerTab,
    (currentTab + 1) * itemsPerTab
  );

  // Wishlist toggle handler
  const handleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast(
        <div>
          <strong>Removed from wishlist</strong>
          <div>{product.name} has been removed from your wishlist.</div>
        </div>
      );
    } else {
      addToWishlist(product);
      toast(
        <div>
          <strong>Added to wishlist</strong>
          <div>{product.name} has been added to your wishlist.</div>
        </div>
      );
    }
  };

  // Add to cart with toast
  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast(
      <div>
        <strong>Added to Cart</strong>
        <div>{product.name} has been added to your cart.</div>
      </div>
    );
  };

  const goToPreviousTab = () => {
    setCurrentTab((prev) => (prev > 0 ? prev - 1 : totalTabs - 1));
  };
  const goToNextTab = () => {
    setCurrentTab((prev) => (prev < totalTabs - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-full mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
            {t("trendingDrinks") || "BEST SELLERS"}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={goToPreviousTab}
              className="p-2 rounded-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-600 transition-all duration-200"
              aria-label="Previous tab"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNextTab}
              className="p-2 rounded-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-600 transition-all duration-200"
              aria-label="Next tab"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        {/* Products Grid */}
        <div className="relative">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}
            style={
              isClient
                ? { gridTemplateColumns: `repeat(${itemsPerTab}, 1fr)` }
                : {}
            }
          >
            {currentProducts.map((product: any, index: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100"
              >
                {/* Product Image Container */}
                <div className="relative overflow-hidden rounded-t-lg">
                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleWishlist(product)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10"
                    title={
                      isInWishlist(product.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isInWishlist(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400 hover:text-red-500"
                      }`}
                    />
                  </button>
                  {/* Product Image */}
                  <div className="h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 bg-white"
                    />
                  </div>
                  {/* Add to Cart & View Details Split */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white p-3 flex gap-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      title="Add to cart"
                      className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium bg-amber-600 hover:bg-amber-700 rounded transition-colors duration-200"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {t("addToCart") || "ADD TO CART"}
                    </Button>
                    <Link href={`/product/${product.slug}`} className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center py-2 text-sm font-medium border-white hover:bg-white text-black rounded transition-colors duration-200"
                        title="View details"
                      >
                        {t("viewDetails") || "View Details"}
                      </Button>
                    </Link>
                  </div>
                </div>
                {/* Product Info */}
                <div className="p-4">
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-medium text-gray-900 text-sm mb-2 h-10 leading-5 overflow-hidden hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {Array.isArray(product.rating)
                        ? product.rating.length
                        : product.rating
                        ? product.rating
                        : 0}{" "}
                      reviews
                    </span>
                  </div>
                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-gray-900">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* Tab Indicators */}
        {totalTabs > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalTabs }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTab(index)}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  index === currentTab
                    ? "bg-gray-800 w-12"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to tab ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
