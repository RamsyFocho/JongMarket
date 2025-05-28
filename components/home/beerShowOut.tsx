"use client";
import { useRef, useState, useEffect } from "react";
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { formatCurrency, products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

function BeerShowOut() {
  const [currentTab, setCurrentTab] = useState(0);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  // Get only beer products from products.ts
  const beerProducts = products.filter((p) => p.category.toLowerCase() === "beer");
  const productsPerTab = 3;
  const totalTabs = Math.ceil(beerProducts.length / productsPerTab);
  const productsTabs = Array.from({ length: totalTabs }, (_, i) =>
    beerProducts.slice(i * productsPerTab, (i + 1) * productsPerTab)
  );

  // Auto-scroll
  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      setCurrentTab((prev) => (prev < totalTabs - 1 ? prev + 1 : 0));
    }, 6000);
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [totalTabs]);

  const handleArrow = (dir: "left" | "right") => {
    setCurrentTab((prev) => {
      if (dir === "left") return prev > 0 ? prev - 1 : totalTabs - 1;
      return prev < totalTabs - 1 ? prev + 1 : 0;
    });
  };

  // Add to cart handler with toast
  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.currentPrice || product.price,
      image: product.image,
      quantity: 1,
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  // Wishlist handler with toast
  const handleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.currentPrice || product.price,
        image: product.image,
        slug: product.slug,
        category: product.category,
        rating: product.rating,
      });
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  return (
    <section className="w-full mx-auto bg-gradient-to-br from-white via-amber-50 to-white p-6 sm:p-8 lg:p-12 rounded-2xl shadow-xl mb-12 border border-amber-200/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Featured Beers
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-medium">
            Discover our premium selection of craft beers
          </p>
        </div>
        {/* Navigation Controls */}
        <div className="flex gap-3">
          <button
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white border-2 border-amber-200 hover:border-amber-400 text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
            onClick={() => handleArrow("left")}
            aria-label="Previous products"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
          </button>
          <button
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white border-2 border-amber-200 hover:border-amber-400 text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
            onClick={() => handleArrow("right")}
            aria-label="Next products"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
      {/* Product Carousel */}
      <div className="overflow-x-hidden w-full rounded-xl">
        <div
          className="flex transition-transform duration-700 ease-in-out w-full"
          style={{ transform: `translateX(-${currentTab * 100}%)` }}
        >
          {productsTabs.map((tab, tabIdx) => (
            <div
              key={tabIdx}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 flex-shrink-0"
            >
              {tab.map((product) => {
                const isSoldOut = product.badges?.includes("sold-out");
                const isOnSale = product.badges?.includes("sale");
                const isNew = product.badges?.includes("new");
                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-amber-100 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                  >
                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                      {isNew && (
                        <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-full shadow-lg">
                          New
                        </span>
                      )}
                      {isOnSale && (
                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-full shadow-lg">
                          Sale
                        </span>
                      )}
                      {isSoldOut && (
                        <span className="bg-gradient-to-r from-gray-500 to-slate-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-full shadow-lg">
                          Sold Out
                        </span>
                      )}
                    </div>
                    {/* Wishlist Button */}
                    <button
                      onClick={() => handleWishlist(product)}
                      className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-20 group/heart"
                      title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart
                        className={`h-5 w-5 transition-all duration-300 ${
                          isInWishlist(product.id)
                            ? 'fill-red-500 text-red-500 scale-110'
                            : 'text-slate-400 group-hover/heart:text-red-500 group-hover/heart:scale-110'
                        }`}
                      />
                    </button>
                    {/* Product Image */}
                    <div className="relative h-72 sm:h-80 bg-gradient-to-br from-amber-50 to-white overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {/* Product Info */}
                    <div className="p-6">
                      {/* Brand */}
                      {product.brand && (
                        <div className="text-amber-600 text-xs font-bold uppercase mb-2 tracking-wider">
                          {product.brand}
                        </div>
                      )}
                      {/* Product Name */}
                      <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-3 leading-tight group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </h3>
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.round(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 font-medium">
                          ({Array.isArray(product.reviews) ? product.reviews.length : product.reviews || 0} reviews)
                        </span>
                      </div>
                      {/* Price */}
                      <div className="flex items-center gap-3 mb-6">
                        <span className="font-bold text-xl sm:text-2xl text-gray-900">
                          {formatCurrency(product.currentPrice || product.price)}
                        </span>
                        {product.originalPrice && product.originalPrice !== product.currentPrice && (
                          <span className="text-base text-gray-400 line-through font-medium">
                            {formatCurrency(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={isSoldOut}
                          className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl ${
                            isSoldOut
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:scale-105"
                          }`}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2 inline" />
                          {isSoldOut ? "Sold Out" : "Add to Cart"}
                        </button>
                        <Link href={`/product/${product.slug}`} className="flex-1">
                          <button type="button" className="w-full px-4 py-3 border-2 border-amber-200 hover:border-amber-400 text-amber-700 hover:text-amber-900 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-amber-50">
                            View
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalTabs }).map((_, tabIdx) => (
          <button
            key={tabIdx}
            onClick={() => setCurrentTab(tabIdx)}
            className={`transition-all duration-300 rounded-full ${
              currentTab === tabIdx
                ? "w-8 h-3 bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg"
                : "w-3 h-3 bg-gray-300 hover:bg-amber-200"
            }`}
            aria-label={`Go to page ${tabIdx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default BeerShowOut;