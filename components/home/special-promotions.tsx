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
import { motion } from "framer-motion";
import { Tag, Clock, ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { promotions } from "@/data/products";

// Select featured products (e.g., those with 'sale' or 'new' badges)
const featuredProducts = promotions.filter(
  (p) => p.badges && (p.badges.includes("sale") || p.badges.includes("new"))
);

function getBadgeTopClass(index: number) {
  return `badge-top-${index}`;
}

function getTabTransformClass(tab: number) {
  return `tab-transform-${tab}`;
}

export default function SpecialPromotion() {
  const { t } = useLanguage();
  const [currentTab, setCurrentTab] = useState(0);
  
  // SSR-safe: always render 3 per tab on server, update on client
  const getInitialPerTab = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 1024) return 1;
      if (window.innerWidth <= 1280) return 2;
      if (window.innerWidth <= 1536) return 3;
      return 4;
    }
    return 3;
  };
  
  const [perTab, setPerTab] = useState(getInitialPerTab);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const updatePerTab = () => {
      if (window.innerWidth <= 1024) setPerTab(1);
      else if (window.innerWidth <= 1280) setPerTab(2);
      else if (window.innerWidth <= 1536) setPerTab(3);
      else setPerTab(4);
    };
    updatePerTab();
    window.addEventListener('resize', updatePerTab);
    return () => window.removeEventListener('resize', updatePerTab);
  }, []);

  // Create tabs only when we have actual content to display
  const displayedPromotions = promotions.slice(0, 12);
  
  // Create tabs by chunking promotions, but only include non-empty chunks
  const createValidTabs = () => {
    const tabs = [];
    for (let i = 0; i < displayedPromotions.length; i += perTab) {
      const tabContent = displayedPromotions.slice(i, i + perTab);
      // Only add tab if it has actual content (promotions)
      if (tabContent.length > 0) {
        tabs.push(tabContent);
      }
    }
    return tabs;
  };

  // Get only tabs that contain actual promotions
  const validPromoTabs = createValidTabs();
  const totalValidTabs = validPromoTabs.length;

  // Ensure currentTab is always valid when tabs change
  useEffect(() => {
    if (currentTab >= totalValidTabs && totalValidTabs > 0) {
      setCurrentTab(totalValidTabs - 1);
    } else if (totalValidTabs === 0) {
      setCurrentTab(0);
    }
  }, [totalValidTabs, currentTab, perTab]);

  // Arrow navigation - only works if we have valid tabs
  const handleArrow = (dir: 'left' | 'right') => {
    if (totalValidTabs <= 1) return; // No navigation needed for single or no tabs
    
    setCurrentTab((prev) => {
      if (dir === 'left') {
        return prev > 0 ? prev - 1 : totalValidTabs - 1;
      }
      return prev < totalValidTabs - 1 ? prev + 1 : 0;
    });
  };

  // Don't render if no promotions exist
  if (!hydrated) {
    return <section className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow mb-12 min-h-[400px]" />;
  }

  // If no valid tabs exist (no promotions), don't render the component
  if (totalValidTabs === 0) {
    return null; // Or return a "No promotions available" message
  }

  return (
    <section className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow mb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Special Promotion</h2>
        <div className="flex gap-2 items-center">
          {/* Only show navigation arrows if we have multiple tabs */}
          {totalValidTabs > 1 && (
            <>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-amber-500 text-gray-500 hover:text-amber-600 transition"
                onClick={() => handleArrow('left')}
                aria-label="Previous tab"
              >
                &#8249;
              </button>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-amber-500 text-gray-500 hover:text-amber-600 transition"
                onClick={() => handleArrow('right')}
                aria-label="Next tab"
              >
                &#8250;
              </button>
            </>
          )}
          <Link href="/promotions">
            <Button variant="outline" className="flex items-center gap-2 ml-2">
              View More <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <div className={`transition-transform duration-500 tab-transform-${currentTab}`}>
          <div
            className={`grid gap-8 ${
              perTab === 1 
                ? 'grid-cols-1' 
                : perTab === 2 
                ? 'grid-cols-1 sm:grid-cols-2' 
                : perTab === 3 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            {/* Render current tab's promotions - with safety check */}
            {validPromoTabs[currentTab]?.map((promo: any) => (
              <div key={promo.id} className="bg-white rounded-lg shadow border border-gray-100 flex flex-col relative p-4 min-h-[420px]">
                {/* Badges */}
                <div className="flex gap-2 mb-2">
                  {promo.badges?.map((badge: any) => (
                    <span key={badge} className="px-2 py-1 text-xs font-bold uppercase rounded bg-amber-500 text-white">
                      {badge.replace("-", " ")}
                    </span>
                  ))}
                </div>
                
                <Image 
                  src={promo.image} 
                  alt={promo.title} 
                  width={320} 
                  height={180} 
                  className="rounded mb-3 object-cover w-full h-40" 
                />
                
                <h3 className="font-semibold text-lg mb-1">{promo.title}</h3>
                <p className="text-gray-600 mb-2">{promo.description}</p>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-600 font-bold text-xl">
                    {promo.discountedPrice.toLocaleString()} $
                  </span>
                  <span className="line-through text-gray-400">
                    {promo.originalPrice.toLocaleString()} $
                  </span>
                  <span className="ml-2 text-green-600 font-semibold">{promo.discount} OFF</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <Clock size={14} /> Ends in {promo.endsIn}
                </div>
                
                {promo.extraInfo && (
                  <div className="text-xs text-blue-600 font-medium mb-2">{promo.extraInfo}</div>
                )}
                
                <Link href={`/promotions/${promo.slug}`} className="mt-auto">
                  <Button variant="default" className="w-full mt-2">View Details</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tab indicators - only show if we have multiple tabs */}
      {totalValidTabs > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {validPromoTabs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentTab(idx)}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                idx === currentTab 
                  ? "bg-gray-800 w-12" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to tab ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}