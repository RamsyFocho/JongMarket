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

// Only show products in the 'beer' category
const beerProducts = products.filter((p) => p.category && p.category.toLowerCase() === "beer");

function getBadgeTopClass(index: number) {
  return `badge-top-${index}`;
}

function getTabTransformClass(tab: number) {
  return `tab-transform-${tab}`;
}

export default function FeaturedDrinks() {
  const [currentTab, setCurrentTab] = useState(0);
  const [productsPerTab, setProductsPerTab] = useState(3);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const { t } = useLanguage();

  // Responsive products per tab
  useEffect(() => {
    const updateProductsPerTab = () => {
      if (window.innerWidth < 640) {
        setProductsPerTab(1);
      } else if (window.innerWidth < 1024) {
        setProductsPerTab(2);
      } else {
        setProductsPerTab(3);
      }
    };
    updateProductsPerTab();
    window.addEventListener("resize", updateProductsPerTab);
    return () => window.removeEventListener("resize", updateProductsPerTab);
  }, []);

  // Tab logic
  const totalTabs = Math.ceil(beerProducts.length / productsPerTab);
  const productsTabs = Array.from({ length: totalTabs }, (_, i) =>
    beerProducts.slice(i * productsPerTab, (i + 1) * productsPerTab)
  );

  // Auto-scroll
  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      setCurrentTab((prev) => (prev < totalTabs - 1 ? prev + 1 : 0));
    }, 5000);
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

  return (
    <section className="w-full mx-auto bg-white p-8 rounded-lg shadow mb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Featured Beers</h2>
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
        <div
          className={`flex transition-transform duration-500 ${getTabTransformClass(currentTab)}`}
        >
          {productsTabs.map((tab, tabIdx) => (
            <div
              key={tabIdx}
              className="flex min-w-[30rem] gap-8 px-2"
            >
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
                    className=" bg-white rounded-lg shadow group border border-gray-100 flex-1 transition-transform hover:-translate-y-1 hover:shadow-lg relative flex flex-col"
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
                            description: `${product.name} ${t("has been added to your wishlist") || "has been added to your wishlist."}`,
                          });
                        }
                      }}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10"
                      title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
                    </button>
                    {/* Image */}
                    <div className="h-[19rem] bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
<<<<<<< HEAD
                        height={500}
=======
                        height={200}
>>>>>>> fdbd92afd537fb96f949c49a424343127199ce80
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
                            ...product,
                            quantity: 1
                          });
                          toast({
                            title: t("addedToCart") || "Added to Cart",
                            description: `${product.name} ${t("has been added to your cart") || "has been added to your cart."}`,
                          });
                        }}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-4 py-2 transition-all duration-200"
                      >
                        {isSoldOut ? t("soldOut") || "Sold Out" : t("addToCart") || "Add to Cart"}
                      </Button>
                      <Link href={`/product/${product.slug}`}>
                        <Button
                          variant="outline"
                          className="flex-1 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-100 transition-all duration-200"
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
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalTabs }).map((_, tabIdx) => (
          <button
            key={tabIdx}
            onClick={() => setCurrentTab(tabIdx)}
            className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${currentTab === tabIdx ? "bg-amber-500" : "bg-gray-300"}`}
            aria-label={`Go to tab ${tabIdx + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
