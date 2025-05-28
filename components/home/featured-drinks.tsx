"use client";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { formatCurrency } from "@/data/products";
import Link from "next/link";
import { Heart, ShoppingCart, Eye, ChevronLeft, ChevronRight, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context";
import { products } from "@/data/products";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import React from "react";

// Constants
const AUTO_SCROLL_INTERVAL = 5000;
const ANIMATION_DURATION = 500;

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  currentPrice?: number;
  originalPrice?: number;
  image: string;
  slug: string;
  brand?: string;
  badges?: string[];
  rating: number;
  reviews?: any[] | number;
}

interface ProductCardProps {
  product: Product;
  isCompact: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
  index: number;
}

// Custom hook for responsive behavior
const useResponsive = () => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) setScreenSize('mobile');
      else if (width < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);
  
  return screenSize;
};

// Enhanced Product Card Component with premium styling
const ProductCard = React.memo<ProductCardProps>(({ 
  product, 
  isCompact, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist,
  index
}) => {
  const { t } = useLanguage();
  const isSoldOut = product.badges?.includes("sold-out");
  const primaryBadge = product.badges?.[0];

  const getBadgeColor = (badge: string) => {
    const colors = {
      'new': 'bg-gradient-to-r from-green-500 to-emerald-500',
      'sale': 'bg-gradient-to-r from-red-500 to-pink-500',
      'sold-out': 'bg-gradient-to-r from-gray-500 to-slate-500',
      'popular': 'bg-gradient-to-r from-purple-500 to-violet-500',
      'limited': 'bg-gradient-to-r from-orange-500 to-amber-500'
    };
    return colors[badge as keyof typeof colors] || 'bg-gradient-to-r from-blue-500 to-indigo-500';
  };

  const currentPrice = product.currentPrice ?? product.price;
  const reviewCount = Array.isArray(product.reviews) ? product.reviews.length : (product.reviews || 0);

  return (
    <article 
      className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 flex flex-col min-w-0 flex-1 overflow-hidden"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'slideInUp 0.6s ease-out forwards'
      }}
    >
      {/* Enhanced Badge */}
      {product.badges?.map((badge, idx) => (
        <div 
          key={badge} 
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white z-10 ${getBadgeColor(badge)} shadow-lg`}
        >
          {badge.replace("-", " ").toUpperCase()}
        </div>
      ))}

      {/* Enhanced Wishlist Button */}
      <button
        onClick={() => onToggleWishlist(product)}
        className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group-hover:scale-110 z-10 shadow-lg"
        aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart className={`h-5 w-5 transition-colors duration-300 ${
          isInWishlist ? 'fill-pink-500 text-pink-500' : 'text-white hover:text-pink-400'
        }`} />
      </button>

      {/* Enhanced Image Container */}
      <div className="relative overflow-hidden rounded-2xl mb-6 aspect-square bg-white/5">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
          loading="eager"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-product.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {isSoldOut && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center z-20 backdrop-blur-sm">
            <span className="bg-gray-900/80 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg backdrop-blur-sm">
              {t('outOfStock') || 'Out of Stock'}
            </span>
          </div>
        )}
      </div>

      {/* Enhanced Content */}
      <div className="flex-1 flex flex-col justify-between space-y-4">
        {/* Brand */}
        {product.brand && (
          <div className="text-purple-200 text-xs font-semibold uppercase tracking-wider">
            {product.brand}
          </div>
        )}

        {/* Product Name */}
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Enhanced Rating */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-400'
                }`}
              />
            ))}
          </div>
          <span className="text-yellow-400 font-semibold text-sm">
            {product.rating}
          </span>
          <span className="text-gray-300 text-sm">
            ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
          </span>
        </div>

        {/* Enhanced Price */}
        <div className="flex items-center gap-2 py-2">
          <span className="text-2xl font-bold text-white">
            {formatCurrency(currentPrice, "FCFA")}
          </span>
          {product.originalPrice && product.originalPrice !== currentPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatCurrency(product.originalPrice, "FCFA")}
            </span>
          )}
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex items-center justify-between flex-col gap-2 md:flex-row pt-4 border-t border-white/10">
          <Button
            onClick={() => onAddToCart(product)}
            disabled={isSoldOut}
            className="w-full md:w-[fit] flex-1 mr-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:from-gray-500 disabled:to-gray-600"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isSoldOut ? t('outOfStock') || 'Out of Stock' : t('addToCart') || 'Add to Cart'}
          </Button>
          
          <Button 
            asChild 
            variant="outline" 
            className="w-full md:w-[fit] bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:border-white/50 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <Link href={`/product/${product.slug}`}>
              <Eye className="h-4 w-4 mr-2" />
              {t('viewDetails') || 'View'}
            </Link>
          </Button>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-500 pointer-events-none"></div>
    </article>
  );
});
ProductCard.displayName = 'ProductCard';

// Enhanced Loading Skeleton Component
const ProductCardSkeleton = ({ isCompact, index }: { isCompact: boolean; index: number }) => (
  <div 
    className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-xl animate-pulse"
    style={{
      animationDelay: `${index * 100}ms`
    }}
  >
    <div className="aspect-square bg-white/10 rounded-2xl mb-6" />
    <div className="space-y-4">
      <div className="h-3 bg-white/10 rounded w-1/4" />
      <div className="h-6 bg-white/10 rounded w-3/4" />
      <div className="h-4 bg-white/10 rounded w-1/2" />
      <div className="h-6 bg-white/10 rounded w-1/3" />
      <div className="flex gap-2 pt-4">
        <div className="h-10 bg-white/10 rounded-xl flex-1" />
        <div className="h-10 bg-white/10 rounded-xl w-20" />
      </div>
    </div>
  </div>
);

// Main Component with Premium Styling
export default function FeaturedDrinks() {
  const [currentTab, setCurrentTab] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [productsPerTab, setProductsPerTab] = useState(3);
  const [isCompact, setIsCompact] = useState(false);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const screenSize = useResponsive();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const { t } = useLanguage();

  // Hydration fix with responsive logic
  useEffect(() => {
    setIsClient(true);
    const updateResponsive = () => {
      if (window.innerWidth < 640) {
        setProductsPerTab(1);
        setIsCompact(true);
      } else if (window.innerWidth < 1024) {
        setProductsPerTab(2);
        setIsCompact(false);
      } else if (window.innerWidth < 1536) {
        setProductsPerTab(3);
        setIsCompact(false);
      } else {
        setProductsPerTab(4);
        setIsCompact(false);
      }
    };
    updateResponsive();
    window.addEventListener('resize', updateResponsive);
    return () => window.removeEventListener('resize', updateResponsive);
  }, []);

  // Memoized featured products
  const featuredProducts = useMemo(
    () => products.filter(p => p.badges?.some(badge => ['sale', 'new'].includes(badge))),
    []
  );

  const effectiveProductsPerTab = isClient ? productsPerTab : 3;
  const effectiveIsCompact = isClient ? isCompact : false;

  // Memoized tab calculation
  const { totalTabs, productsTabs } = useMemo(() => {
    const tabs = Math.ceil(featuredProducts.length / effectiveProductsPerTab);
    const tabsData = Array.from({ length: tabs }, (_, i) =>
      featuredProducts.slice(i * effectiveProductsPerTab, (i + 1) * effectiveProductsPerTab)
    );
    return { totalTabs: tabs, productsTabs: tabsData };
  }, [featuredProducts, effectiveProductsPerTab]);

  // Auto-scroll effect
  useEffect(() => {
    if (!isClient || totalTabs <= 1) return;
    
    autoScrollRef.current = setInterval(() => {
      setCurrentTab(prev => (prev + 1) % totalTabs);
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isClient, totalTabs]);

  // Navigation handlers
  const handlePrevious = useCallback(() => {
    setCurrentTab(prev => prev === 0 ? totalTabs - 1 : prev - 1);
  }, [totalTabs]);

  const handleNext = useCallback(() => {
    setCurrentTab(prev => (prev + 1) % totalTabs);
  }, [totalTabs]);

  const handleTabClick = useCallback((index: number) => {
    setCurrentTab(index);
  }, []);

  // Product action handlers
  const handleAddToCart = useCallback((product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.currentPrice ?? product.price,
      image: product.image,
      quantity: 1,
    });
    
    toast({
      title: t('AddedToCart') || 'Added to cart',
      description: `${product.name} ${t('addedToCartDesc') || 'has been added to your cart.'}`,
    });
  }, [addToCart, toast, t]);

  const handleToggleWishlist = useCallback((product: Product) => {
    const inWishlist = isInWishlist(product.id);
    
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: t('removedFromWishlist') || 'Removed from wishlist',
        description: `${product.name} ${t('removedFromWishlistDesc') || 'has been removed from your wishlist.'}`,
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.currentPrice ?? product.price,
        image: product.image,
        slug: product.slug,
      });
      toast({
        title: t('AddedToWishlist') || 'Added to wishlist',
        description: `${product.name} ${t('has been added to your wishlist') || 'has been added to your wishlist.'}`,
      });
    }
  }, [isInWishlist, removeFromWishlist, addToWishlist, toast, t]);

  // Show enhanced skeleton during hydration
  if (!isClient) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 bg-white/10 rounded w-64 mx-auto mb-6 animate-pulse" />
            <div className="h-6 bg-white/5 rounded w-96 mx-auto animate-pulse" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }, (_, i) => (
              <ProductCardSkeleton key={i} isCompact={false} index={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-amber-900 via-yellow-900 to-slate-900 py-16 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-purple-400" />
            <h2 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              {t('Feature Products') || 'Feature Products'}
            </h2>
            <Zap className="w-8 h-8 text-pink-400" />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover our carefully curated collection of premium beverages and featured products
          </p>
        </div>

        {/* Enhanced Navigation */}
        {totalTabs > 1 && (
          <div className="flex justify-center gap-4 mb-12">
            <Button
              onClick={handlePrevious}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-2xl p-4 transition-all duration-300 hover:scale-110"
              aria-label="Previous products"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              onClick={handleNext}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-2xl p-4 transition-all duration-300 hover:scale-110"
              aria-label="Next products"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        )}

        {/* Enhanced Products Carousel */}
        <div className="overflow-hidden rounded-3xl mb-12">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentTab * 100}%)` }}
          >
            {productsTabs.map((tabProducts, tabIndex) => (
              <div
                key={tabIndex}
                className={`min-w-full grid gap-8 ${
                  isClient 
                    ? (effectiveProductsPerTab === 1 
                        ? 'grid-cols-1' 
                        : effectiveProductsPerTab === 2 
                        ? 'grid-cols-1 sm:grid-cols-2' 
                        : effectiveProductsPerTab === 3
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4') 
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {tabProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isCompact={effectiveIsCompact}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isInWishlist={isInWishlist(product.id)}
                    index={index}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Tab Indicators */}
        {totalTabs > 1 && (
          <div className="flex justify-center items-center gap-4">
            <div className="flex gap-2">
              {productsTabs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={`transition-all duration-300 ${
                    index === currentTab
                      ? 'w-8 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full scale-125'
                      : 'w-3 h-3 bg-white/30 hover:bg-white/50 rounded-full hover:scale-110'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}