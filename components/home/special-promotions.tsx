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

  const displayedPromotions = promotions.slice(0, 12);
  const totalTabs = Math.ceil(displayedPromotions.length / perTab);
  const promoTabs = Array.from({ length: totalTabs }, (_, i) =>
    displayedPromotions.slice(i * perTab, (i + 1) * perTab)
  );

  const handleArrow = (dir: 'left' | 'right') => {
    setCurrentTab((prev) => {
      if (dir === 'left') return prev > 0 ? prev - 1 : totalTabs - 1;
      return prev < totalTabs - 1 ? prev + 1 : 0;
    });
  };

  if (!hydrated) {
    return <section className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow mb-12 min-h-[400px] border-2 border-red-500" />;
  }

  return (
    <section className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow mb-12 border-2 border-red-500">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Special Promotion</h2>
        <div className="flex gap-2 items-center">
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
          <Link href="/promotions">
            <Button variant="outline" className="flex items-center gap-2 ml-2">
              View More <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className={`flex transition-transform duration-500 tab-transform-${currentTab}`}>
          {promoTabs.map((tab, tabIdx) => (
            <div key={tabIdx} className="flex min-w-full gap-8 px-2">
              {tab.map((promo) => (
                <div key={promo.id} className="bg-white rounded-lg shadow border border-gray-100 flex flex-col relative p-4 w-full max-w-xs">
                  {/* Badges */}
                  <div className="flex gap-2 mb-2">
                    {promo.badges?.map((badge) => (
                      <span key={badge} className={`px-2 py-1 text-xs font-bold uppercase rounded bg-amber-500 text-white`}>{badge.replace("-", " ")}</span>
                    ))}
                  </div>
                  <Image src={promo.image} alt={promo.title} width={320} height={180} className="rounded mb-3 object-cover w-full h-40" />
                  <h3 className="font-semibold text-lg mb-1">{promo.title}</h3>
                  <p className="text-gray-600 mb-2">{promo.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-600 font-bold text-xl">{promo.discountedPrice.toLocaleString()} $</span>
                    <span className="line-through text-gray-400">{promo.originalPrice.toLocaleString()} $</span>
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
          ))}
        </div>
      </div>
      {/* Tab indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {promoTabs.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentTab(idx)}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${idx === currentTab ? "bg-gray-800 w-12" : "bg-gray-300 hover:bg-gray-400"}`}
            aria-label={`Go to tab ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
