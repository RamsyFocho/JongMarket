"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { formatCurrency } from "@/data/products";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context";
import "@/styles/featured-drinks.css";
import { products } from "@/data/products";

// Only show products in the 'accessories' category
const accessoriesProducts = products.filter((p) => p.category && p.category.toLowerCase() === "accessories");

// Split accessories into 2 tabs, evenly (first tab gets extra if odd)
const mid = Math.ceil(accessoriesProducts.length / 2);
const accessoriesTabs = [
  accessoriesProducts.slice(0, mid),
  accessoriesProducts.slice(mid)
];

// Helper for badge vertical stacking
function getBadgeTopClass(index: number) {
  // Stacks badges vertically with spacing
  return `top-[${index * 2.2 + 1}rem]`;
}

export default function DrinkAccessories() {
  const [currentTab, setCurrentTab] = useState(0);
  const [productsPerRow, setProductsPerRow] = useState(3); // SSR-safe default
  const [isClient, setIsClient] = useState(false);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const { t } = useLanguage();

  // Hydration-safe responsive products per row
  useEffect(() => {
    setIsClient(true);
    const updateProductsPerRow = () => {
      if (window.innerWidth < 640) {
        setProductsPerRow(1);
      } else if (window.innerWidth < 1024) {
        setProductsPerRow(2);
      } else {
        setProductsPerRow(3);
      }
    };
    updateProductsPerRow();
    window.addEventListener("resize", updateProductsPerRow);
    return () => window.removeEventListener("resize", updateProductsPerRow);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (accessoriesTabs.length <= 1) return;
    autoScrollRef.current = setInterval(() => {
      setCurrentTab((prev: number) => (prev < accessoriesTabs.length - 1 ? prev + 1 : 0));
    }, 6000);
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, []);

  const handleArrow = (dir: "left" | "right") => {
    setCurrentTab((prev: number) => {
      if (dir === "left") return prev > 0 ? prev - 1 : accessoriesTabs.length - 1;
      return prev < accessoriesTabs.length - 1 ? prev + 1 : 0;
    });
  };

  return (
    <section className="w-full mx-auto bg-white p-8 rounded-lg shadow mb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Drinks Accessories</h2>
        <div className="flex gap-2">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-amber-500 text-gray-500 hover:text-amber-600 transition"
            onClick={() => handleArrow("left")}
            aria-label="Previous tab"
          >
            &#8249;
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-amber-500 text-gray-500 hover:text-amber-600 transition"
            onClick={() => handleArrow("right")}
            aria-label="Next tab"
          >
            &#8250;
          </button>
        </div>
      </div>
      <div className="overflow-hidden">
        {/* Tab slider container */}
        <div
          className={`transition-transform duration-500 flex w-full accessories-tab-slider tab-transform-${currentTab}`}
          data-tab-count={accessoriesTabs.length}
        >
          {accessoriesTabs.map((tab, tabIdx) => (
            <div
              key={tabIdx}
              className="w-full flex flex-wrap gap-6 justify-center items-stretch px-2 flex-shrink-0"
            >
              {tab.length === 0 && (
                <div className="text-gray-400 text-center w-full py-12">No accessories in this tab.</div>
              )}
              {tab.map((product, i) => {
                const badgeColor =
                  product.badges?.[0] === "new"
                    ? "bg-orange-500"
                    : product.badges?.[0] === "sale"
                    ? "bg-red-600"
                    : product.badges?.[0] === "sold-out"
                    ? "bg-gray-500"
                    : "bg-gray-400";
                const isSoldOut = product.badges?.includes("sold-out");
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow group border border-gray-200 flex flex-col relative min-w-[220px] max-w-xs w-full sm:w-[45%] md:w-[30%] flex-1 transition-transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* Badges (with right border arrow shape) */}
                    {product.badges?.map((badge, j) => (
                      <span
                        key={badge}
                        className={`absolute left-3 z-10 ${getBadgeTopClass(j)} badge-arrow ${badge === "new" ? "bg-orange-500" : badge === "sale" ? "bg-red-600" : badge === "sold-out" ? "bg-gray-500" : "bg-gray-400"} text-white px-3 py-1 text-xs font-bold uppercase rounded-l rounded-r-none flex items-center`}
                      >
                        {badge.replace("-", " ")}
                      </span>
                    ))}
                    {/* Wishlist Button */}
                    <button
                      onClick={() => {
                        if (isInWishlist(product.id)) {
                          removeFromWishlist(product.id);
                          toast({
                            title: t("removedFromWishlist") || "Removed from wishlist",
                            description: `${product.name} ${t("removedFromWishlistDesc") || "has been removed from your wishlist."}`,
                          });
                        } else {
                          addToWishlist({
                            id: product.id,
                            name: product.name,
                            price: product.currentPrice !== undefined ? product.currentPrice : product.price,
                            image: product.image,
                            slug: product.slug,
                          });
                          toast({
                            title: t("AddedToWishlist") || "Added to wishlist",
                            description: `${product.name} ${t("hasBeenAddedToYourWishlist") || "has been added to your wishlist."}`,
                          });
                        }
                      }}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10"
                      title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
                    </button>
                    {/* Image */}
                    <div className="h-[16rem] bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    {/* Info */}
                    <div className="p-4 text-center flex-1 flex flex-col justify-between">
                      {product.brand && (
                        <div className="text-amber-700 text-xs font-bold uppercase mb-1 tracking-wider">
                          {product.brand}
                        </div>
                      )}
                      <Link href={`/product/${product.slug}`}>
                        <div className="font-medium text-gray-900 text-sm mb-2 h-10 leading-5 overflow-hidden hover:text-amber-600 transition-colors">
                          {product.name}
                        </div>
                      </Link>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-yellow-400 text-xs ${i < product.rating ? "" : "opacity-20"}`}>★</span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">
                          {Array.isArray(product.reviews) ? product.reviews.length : product.reviews || 0} review{(Array.isArray(product.reviews) ? product.reviews.length : product.reviews || 0) !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="font-bold text-lg text-red-600">
                          {formatCurrency(
                            product.currentPrice !== undefined ? product.currentPrice : product.price,
                            "FCFA"
                          )}
                        </span>
                        {product.originalPrice !== undefined && (
                          <span className="text-sm text-gray-400 line-through">
                            {formatCurrency(
                              product.originalPrice,
                              "FCFA"
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Add to Cart & View More Buttons */}
                    <div className="flex gap-2 p-4 pt-0">
                      <Button
                        onClick={() => {
                          if (isSoldOut) {
                            toast({
                              title: t("soldOut") || "Sold Out",
                              description: t("thisProductIsSoldOut") || "This product is currently sold out.",
                              variant: "destructive",
                            });
                            return;
                          }
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.currentPrice !== undefined ? product.currentPrice : product.price,
                            image: product.image,
                            quantity: 1
                          });
                          toast({
                            title: t("addedToCart") || "Added to Cart",
                            description: `${product.name} ${t("hasBeenAddedToYourCart") || "has been added to your cart."}`,
                          });
                        }}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        {t("addToCart") || "Add to Cart"}
                      </Button>
                      <Link href={`/product/${product.slug}`} className="flex-1">
                        <Button
                          variant="outline"
                          className="flex-1 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          {t("viewMore") || "View More"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Mobile Tab Indicators */}
      {accessoriesTabs.length > 1 && isClient && (
        <div className="flex justify-center gap-2 mt-4">
          {accessoriesTabs.map((_, tabIdx) => (
            <button
              key={tabIdx}
              onClick={() => setCurrentTab(tabIdx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTab === tabIdx ? "bg-amber-500 scale-110" : "bg-gray-300 hover:bg-gray-400"}`}
              aria-label={`Go to tab ${tabIdx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
