"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { formatCurrency } from "@/data/products";

const featuredProducts = [
  // ... (same featuredProducts array as before) ...
  {
    id: 1,
    brand: "PHILIPS",
    name: "Philips PerfectDraft Home Beer Dispenser Draft System - HD3720 - Black & Silver",
    image: "/placeholder.svg",
    badges: ["new", "sale", "sold-out"],
    rating: 5,
    reviews: 2,
    currentPrice: 249.99,
    originalPrice: 289.99,
    currency: "£",
  },
  {
    id: 2,
    brand: "",
    name: "Blade 8 Litre Countertop Draught System",
    image: "/placeholder.svg",
    badges: ["sale"],
    rating: 5,
    reviews: 1,
    currentPrice: 449.95,
    originalPrice: 549.99,
    currency: "£",
  },
  {
    id: 3,
    brand: "",
    name: "Old Monk Indian Rum 70cl",
    image: "/placeholder.svg",
    badges: ["sale"],
    rating: 5,
    reviews: 3,
    currentPrice: 25.5,
    originalPrice: 34.95,
    currency: "£",
  },
  {
    id: 4,
    brand: "",
    name: "Royal Stag Premium Whisky 750ml",
    image: "/placeholder.svg",
    badges: ["sold-out"],
    rating: 4,
    reviews: 5,
    currentPrice: 42.99,
    originalPrice: 49.99,
    currency: "£",
  },
  {
    id: 5,
    brand: "BOMBAY",
    name: "Bombay Sapphire London Dry Gin 700ml",
    image: "/placeholder.svg",
    badges: ["new"],
    rating: 5,
    reviews: 7,
    currentPrice: 35.99,
    originalPrice: 42.99,
    currency: "£",
  },
  {
    id: 6,
    brand: "MOËT",
    name: "Moët & Chandon Brut Imperial Champagne 750ml",
    image: "/placeholder.svg",
    badges: ["sale"],
    rating: 4,
    reviews: 4,
    currentPrice: 89.99,
    originalPrice: 109.99,
    currency: "£",
  },
  {
    id: 7,
    brand: "GREY GOOSE",
    name: "Grey Goose Original Vodka 700ml",
    image: "/placeholder.svg",
    badges: ["new"],
    rating: 5,
    reviews: 6,
    currentPrice: 65.99,
    originalPrice: null,
    currency: "£",
  },
  {
    id: 8,
    brand: "HENNESSY",
    name: "Hennessy VS Cognac 700ml",
    image: "/placeholder.svg",
    badges: ["sale"],
    rating: 4,
    reviews: 8,
    currentPrice: 79.99,
    originalPrice: 95.99,
    currency: "£",
  },
  {
    id: 9,
    brand: "PATRON",
    name: "Patron Silver Tequila 750ml",
    image: "/placeholder.svg",
    badges: ["sold-out"],
    rating: 5,
    reviews: 9,
    currentPrice: 125.99,
    originalPrice: 149.99,
    currency: "£",
  },
];

export default function FeaturedDrinks() {
  const [currentTab, setCurrentTab] = useState(0);
  const [productsPerTab, setProductsPerTab] = useState(3);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

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
  const totalTabs = Math.ceil(featuredProducts.length / productsPerTab);
  const productsTabs = Array.from({ length: totalTabs }, (_, i) =>
    featuredProducts.slice(i * productsPerTab, (i + 1) * productsPerTab)
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
    <section className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow mb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Featured Products</h2>
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
          className={`flex transition-transform duration-500`}
          style={{ transform: `translateX(-${currentTab * 100}%)` } as React.CSSProperties}
        >
          {productsTabs.map((tab, tabIdx) => (
            <div
              key={tabIdx}
              className="flex min-w-full gap-8 px-2"
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
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow group border border-gray-100 flex-1 min-w-0 transition-transform hover:-translate-y-1 hover:shadow-lg relative"
                  >
                    {/* Badges (no arrow) */}
                    {product.badges?.map((badge, j) => {
                      const badgeColor =
                        badge === "new"
                          ? "bg-orange-500"
                          : badge === "sale"
                          ? "bg-red-600"
                          : badge === "sold-out"
                          ? "bg-gray-500"
                          : "bg-gray-400";
                      return (
                        <span
                          key={badge}
                          className={`absolute left-3 z-10 mt-1 ${badgeColor} text-white px-3 py-1 text-xs font-bold uppercase rounded`}
                          style={{ top: `${10 + j * 32}px` }}
                        >
                          {badge.replace("-", " ")}
                        </span>
                      );
                    })}
                    {/* Image */}
                    <div className="h-48 bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    {/* Info */}
                    <div className="p-4 text-center">
                      {product.brand && (
                        <div className="text-amber-700 text-xs font-bold uppercase mb-1 tracking-wider">
                          {product.brand}
                        </div>
                      )}
                      <div className="font-medium text-gray-900 text-sm mb-2 h-10 leading-5 overflow-hidden">
                        {product.name}
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-yellow-400 text-xs ${i < product.rating ? "" : "opacity-20"}`}>★</span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">{product.reviews} review{product.reviews !== 1 ? "s" : ""}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="font-bold text-lg text-red-600">
                          {formatCurrency(product.currentPrice, "£")}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {formatCurrency(product.originalPrice, "£")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Tab indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {productsTabs.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentTab(idx)}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              idx === currentTab ? "bg-gray-800 w-12" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to tab ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
