"use client"
import { products } from '@/data/products';
import React, { useState, useRef, useEffect } from 'react';
import { Heart, ShoppingCart, Eye, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/format-currency';
import { useToast } from "@/components/ui/use-toast";

const FeatureDrinks = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  // Get 10 featured drinks (with 'featured', 'new', or 'sale' badges)
  const featuredDrinks = products
    .filter(p => Array.isArray(p.badges) && (p.badges.includes('featured') || p.badges.includes('new') || p.badges.includes('sale')))
    .slice(0, 10);

  const getBadgeStyle = (badge: string) => {
    const styles: Record<string, string> = {
      featured: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white',
      new: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
      sale: 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
      'best seller': 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white',
      limited: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
      'sold-out': 'bg-gray-500 text-white',
      organic: 'bg-gradient-to-r from-green-600 to-lime-600 text-white',
      'hot deal': 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
    };
    return styles[badge.toLowerCase()] || 'bg-gray-500 text-white';
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(id)) {
        newWishlist.delete(id);
      } else {
        newWishlist.add(id);
      }
      return newWishlist;
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-amber-400 fill-amber-400'
            : i < rating
            ? 'text-amber-400 fill-amber-200'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  // Touch and mouse handlers for smooth sliding
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Approximate card width
      scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  const scrollToPrev = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320;
      scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  // Sync local wishlist with global wishlist
  // useEffect(() => {
  //   if (globalWishlist) {
  //     setWishlist(new Set(globalWishlist.map((item: any) => item.id)));
  //   }
  // }, [globalWishlist]);

  // Touch and mouse handlers for smooth sliding
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mouseleave', handleMouseUp);
      container.addEventListener('touchmove', handleTouchMove);
      container.addEventListener('touchend', handleTouchEnd);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mouseleave', handleMouseUp);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, startX, scrollLeft]);

  // --- Handlers with correct object structure ---
  const handleAddToCart = (drink: any) => {
  addToCart({
    id: drink.id,
    name: drink.name,
    price: drink.currentPrice ?? drink.price,
    image: drink.image,
    quantity: 1,
  });
  toast({
    title: "Added to cart",
    description: `${drink.name} has been added to your cart.`,
  });
};

const handleToggleWishlist = (drink: any) => {
  if (isInWishlist(drink.id)) {
    removeFromWishlist(drink.id);
    toast({
      title: "Removed from wishlist",
      description: `${drink.name} has been removed from your wishlist.`,
    });
  } else {
    addToWishlist({
      id: drink.id,
      name: drink.name,
      price: drink.currentPrice ?? drink.price,
      image: drink.image,
      slug: drink.slug,
      category: drink.category,
      rating: drink.rating,
    });
    toast({
      title: "Added to wishlist",
      description: `${drink.name} has been added to your wishlist.`,
    });
  }
};

  const handleView = (drink: any) => {
    router.push(`/product/${drink.slug}`);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-yellow-50 to-white dark:from-background dark:via-background dark:to-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 via-yellow-200/20 to-amber-200/20 blur-3xl -z-10 animate-pulse dark:hidden"></div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-4 tracking-tight dark:text-foreground dark:bg-none">
            Featured Drinks
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed dark:text-gray-300">
            Discover our handcrafted selection of premium beverages, made with the finest ingredients
          </p>
        </div>
        {/* Navigation Buttons - Desktop */}
        <div className="hidden md:flex justify-between items-center mb-8">
          <button
            onClick={scrollToPrev}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-amber-100"
            title="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-amber-600" />
          </button>
          <button
            onClick={scrollToNext}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-amber-100"
            title="Next"
          >
            <ChevronRight className="w-6 h-6 text-amber-600" />
          </button>
        </div>
        {/* Scrollable Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {featuredDrinks.map((drink, index) => (
              <div
                key={drink.id}
                className={`flex-shrink-0 w-80 group relative animate-slideIn delay-[${index * 100}ms]`}
                onMouseEnter={() => setHoveredCard(drink.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Container */}
                <div className="relative bg-white/80 dark:bg-background backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-amber-100/50 h-full">
                  {/* Floating Elements (Desktop only) */}
                  <div className="absolute top-4 right-4 z-30 gap-2 hidden md:flex">
                    <button
                      onClick={() => handleToggleWishlist(drink)}
                      className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                        isInWishlist(drink.id)
                          ? ' text-white shadow-lg scale-110'
                          : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500 dark:bg-background dark:text-gray-300'
                      }`}
                      title={isInWishlist(drink.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart className={`w-5 h-5 ${isInWishlist(drink.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                    {drink.badges && drink.badges.map((badge: string, badgeIndex: number) => (
                      <span
                        key={badgeIndex}
                        className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm shadow-lg ${getBadgeStyle(badge)}`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  {/* Image Container */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-background dark:to-background">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none"></div>
                    <img
                      src={drink.image}
                      alt={drink.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Hover Overlay (Desktop only) */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-600/40 to-transparent transition-opacity duration-500 z-20 hidden md:flex items-end ${
                      hoveredCard === drink.id ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex gap-3">
                          <button className="flex-1 bg-white/90 hover:bg-white text-gray-900 py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm dark:bg-background dark:text-foreground" title="View details" onClick={() => handleView(drink)}>
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm ${
                              drink.badges && drink.badges.includes('sold-out')
                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                : 'bg-amber-500 hover:bg-amber-600 text-white'
                            }`}
                            disabled={drink.badges && drink.badges.includes('sold-out')}
                            title={drink.badges && drink.badges.includes('sold-out') ? 'Sold Out' : 'Add to cart'}
                            onClick={() => handleAddToCart(drink)}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            {drink.badges && drink.badges.includes('sold-out') ? 'Sold Out' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6 pb-7">
                    <div className="mb-2">
                      <span className="text-sm font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full dark:bg-background dark:text-amber-400">
                        {drink.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors duration-300 dark:text-foreground">
                      {drink.name}
                    </h3>
                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1">
                        {renderStars(drink.rating)}
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {drink.rating}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({Array.isArray(drink.reviews) ? drink.reviews.length : 0} reviews)
                      </span>
                    </div>
                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                          {formatCurrency(drink.currentPrice ?? drink.price, 'FCFA')}
                        </span>
                        {drink.originalPrice && (
                          <span className="text-lg text-gray-400 line-through dark:text-gray-500">
                            {formatCurrency(drink.originalPrice, 'FCFA')}
                          </span>
                        )}
                      </div>
                      {/* Mobile Action Buttons (Mobile only) */}
                      <div className="flex gap-2 md:hidden">
                        <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-300 dark:bg-background dark:text-foreground" title="View details" onClick={() => handleView(drink)}>
                          <Eye className="w-4 h-4 text-gray-600 dark:text-amber-400" />
                        </button>
                        <button
                          className={`p-2 rounded-xl transition-colors duration-300 ${
                            drink.badges && drink.badges.includes('sold-out')
                              ? 'bg-gray-300 cursor-not-allowed'
                              : 'bg-amber-500 hover:bg-amber-600'
                          }`}
                          disabled={drink.badges && drink.badges.includes('sold-out')}
                          title={drink.badges && drink.badges.includes('sold-out') ? 'Sold Out' : 'Add to cart'}
                          onClick={() => handleAddToCart(drink)}
                        >
                          <ShoppingCart className={`w-4 h-4 ${
                            drink.badges && drink.badges.includes('sold-out') ? 'text-gray-500' : 'text-white'
                          }`} />
                        </button>
                        <button
                          onClick={() => handleToggleWishlist(drink)}
                          className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                            isInWishlist(drink.id)
                              ? 'bg-red-500 text-white shadow-lg scale-110'
                              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500 dark:bg-background dark:text-gray-300'
                          }`}
                          title={isInWishlist(drink.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          <Heart className={`w-5 h-5 ${isInWishlist(drink.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br from-amber-200/30 to-yellow-200/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 dark:hidden"></div>
                  <div className="absolute -bottom-2 -left-2 w-32 h-32 bg-gradient-to-tr from-yellow-200/20 to-amber-200/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 dark:hidden"></div>
                </div>
              </div>
            ))}
          </div>
          {/* Scroll Indicator - Mobile */}
          <div className="flex justify-center mt-6 md:hidden">
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(featuredDrinks.length / 2) }, (_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-amber-300 opacity-50"
                ></div>
              ))}
            </div>
          </div>
        </div>
        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" title="View all drinks">
            View All Drinks
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default FeatureDrinks;