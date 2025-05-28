"use client";
import { useRef, useState, useEffect } from "react";
import { Clock, ArrowRight, ChevronLeft, ChevronRight, Tag, Zap, Gift } from "lucide-react";
import Link from "next/link";
import { promotions, formatCurrency } from "@/data/products";

function SpecialPromotion() {
  const [currentTab, setCurrentTab] = useState(0);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  // Always show 3 cards per tab
  const productsPerTab = 3;
  const totalTabs = Math.ceil(promotions.length / productsPerTab);
  const promotionTabs = Array.from({ length: totalTabs }, (_, i) =>
    promotions.slice(i * productsPerTab, (i + 1) * productsPerTab)
  );

  // Auto-scroll
  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      setCurrentTab((prev) => (prev < totalTabs - 1 ? prev + 1 : 0));
    }, 7000);
    
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

  const getBadgeConfig = (badge: string) => {
    const configs = {
      sale: { bg: "from-red-500 to-pink-500", icon: Tag },
      new: { bg: "from-emerald-500 to-teal-500", icon: Zap },
      limited: { bg: "from-purple-500 to-indigo-500", icon: Gift },
      bundle: { bg: "from-orange-500 to-red-500", icon: Gift },
      premium: { bg: "from-amber-500 to-yellow-500", icon: Tag },
      daily: { bg: "from-blue-500 to-cyan-500", icon: Clock },
      weekend: { bg: "from-pink-500 to-rose-500", icon: Gift },
      tasting: { bg: "from-violet-500 to-purple-500", icon: Tag },
      student: { bg: "from-green-500 to-emerald-500", icon: Tag }
    } as const;
    type BadgeKey = keyof typeof configs;
    if (badge in configs) {
      return configs[badge as BadgeKey];
    }
    return { bg: "from-gray-500 to-slate-500", icon: Tag };
  };

  // Move style to a variable to avoid inline style warning
  const carouselStyle = { transform: `translateX(-${currentTab * 100}%)` };

  return (
    <section className="w-full mx-auto bg-gradient-to-br from-white via-amber-50 to-white p-6 sm:p-8 lg:p-12 rounded-2xl shadow-xl mb-12 border border-amber-200/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent mb-2">
            Special Promotions
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-medium">
            Don't miss out on these limited-time offers
          </p>
        </div>
        {/* Navigation Controls */}
        <div className="flex items-center gap-3">
          {totalTabs > 1 && (
            <>
              <button
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white border-2 border-amber-200 hover:border-amber-400 text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
                onClick={() => handleArrow("left")}
                aria-label="Previous promotions"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
              </button>
              <button
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white border-2 border-amber-200 hover:border-amber-400 text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
                onClick={() => handleArrow("right")}
                aria-label="Next promotions"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}
          <Link href="/promotions" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-400 text-white rounded-xl font-semibold text-sm hover:from-amber-700 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      {/* Promotion Carousel */}
      <div className="overflow-x-hidden w-full rounded-xl">
        <div
          className="flex transition-transform duration-700 ease-in-out w-full"
          style={carouselStyle}
        >
          {promotionTabs.map((tab, tabIdx) => (
            <div
              key={tabIdx}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 flex-shrink-0"
            >
              {tab.map((promo) => {
                const discountPercent = Math.round(((promo.originalPrice - promo.discountedPrice) / promo.originalPrice) * 100);
                
                return (
                  <div
                    key={promo.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-amber-100 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                  >
                    {/* Discount Badge - Top Right */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-gradient-to-r from-amber-600 to-amber-400 text-white px-3 py-1.5 rounded-full shadow-lg">
                        <span className="text-sm font-bold">-{promo.discount}</span>
                      </div>
                    </div>

                    {/* Status Badges - Top Left */}
                    <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 max-w-[60%]">
                      {promo.badges?.map((badge) => {
                        const config = getBadgeConfig(badge);
                        const IconComponent = config.icon;
                        
                        return (
                          <div
                            key={badge}
                            className={`bg-gradient-to-r ${config.bg.replace(/indigo|purple/g, "amber")} text-white px-2.5 py-1 text-xs font-bold uppercase rounded-full shadow-lg flex items-center gap-1`}
                          >
                            <IconComponent className="h-3 w-3" />
                            <span>{badge.replace("-", " ")}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Promotion Image */}
                    <div className="relative h-48 sm:h-52 bg-gradient-to-br from-amber-50 to-white overflow-hidden">
                      <img
                        src={promo.image}
                        alt={promo.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Promotion Info */}
                    <div className="p-6">
                      {/* Title */}
                      <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-3 leading-tight group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
                        {promo.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {promo.description}
                      </p>

                      {/* Price Section */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-bold text-xl sm:text-2xl text-gray-900">
                          {formatCurrency(promo.discountedPrice)}
                        </span>
                        <span className="text-base text-gray-400 line-through font-medium">
                          {formatCurrency(promo.originalPrice)}
                        </span>
                      </div>

                      {/* Time & Extra Info */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-amber-600 font-medium">
                          <Clock className="h-4 w-4" />
                          <span>Ends in {promo.endsIn}</span>
                        </div>
                        {promo.extraInfo && (
                          <div className="text-xs text-amber-700 font-medium bg-amber-50 px-3 py-1.5 rounded-lg">
                            {promo.extraInfo}
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <Link href={`/promotions/${promo.slug}`} className="w-full block" tabIndex={-1}>
                        <button type="button" className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-400 hover:from-amber-700 hover:to-amber-500 text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2">
                          <span>View Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Pagination Dots */}
      {totalTabs > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalTabs }).map((_, tabIdx) => (
            <button
              key={tabIdx}
              onClick={() => setCurrentTab(tabIdx)}
              className={`transition-all duration-300 rounded-full ${
                currentTab === tabIdx 
                  ? "w-8 h-3 bg-gradient-to-r from-amber-500 to-amber-400 shadow-lg" 
                  : "w-3 h-3 bg-gray-300 hover:bg-amber-200"
              }`}
              aria-label={`Go to page ${tabIdx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default SpecialPromotion;