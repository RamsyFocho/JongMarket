"use client";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { formatCurrency } from "@/data/products";
import Link from "next/link";
import { Heart, ShoppingCart, Eye, ChevronLeft, ChevronRight } from "lucide-react";
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

// Optimized Product Card Component
const ProductCard = React.memo<ProductCardProps>(({ 
  product, 
  isCompact, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist 
}) => {
  const { t } = useLanguage();
  const isSoldOut = product.badges?.includes("sold-out");
  const primaryBadge = product.badges?.[0];

  // Arrow badge shape
  const badgeClass = (badge: string, idx: number) =>
    `absolute left-3 z-20 badge-arrow badge-top-${idx} ${badge === "new" ? "bg-orange-500" : badge === "sale" ? "bg-red-600" : badge === "sold-out" ? "bg-gray-500" : "bg-gray-400"} text-white px-3 py-1 text-xs font-bold uppercase rounded-l rounded-r-none flex items-center`;

  const currentPrice = product.currentPrice ?? product.price;
  const reviewCount = Array.isArray(product.reviews) ? product.reviews.length : (product.reviews || 0);

  return (
    <article className={`group bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col min-w-0 flex-1 relative overflow-hidden max-w-xs mx-auto`}>  
      {/* Badges (arrow shape, stacked) */}
      {product.badges?.map((badge, idx) => (
        <span key={badge} className={badgeClass(badge, idx)}>{badge.replace("-", " ")}</span>
      ))}
      {/* Wishlist Button */}
      <button
        onClick={() => onToggleWishlist(product)}
        className="absolute top-3 right-3 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart className={`h-4 w-4 transition-colors ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
      </button>
      {/* Image Container - priority, large, always on top */}
      <div className="relative w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden rounded-t-xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-110 z-10"
          loading="eager"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 288px"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-product.jpg';
          }}
        />
        {isSoldOut && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center z-20">
            <span className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
              {t('outOfStock') || 'Out of Stock'}
            </span>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-between min-h-0">
        {product.brand && (
          <div className="text-amber-700 text-xs font-semibold uppercase mb-1 tracking-wider">
            {product.brand}
          </div>
        )}
        <Link href={`/product/${product.slug}`} className="block mb-2">
          <h3 className="font-medium text-gray-900 text-sm leading-5 hover:text-amber-600 transition-colors duration-200 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex" role="img" aria-label={`${product.rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={`text-yellow-400 text-sm ${i < product.rating ? '' : 'opacity-20'}`}>★</span>
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
          </span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="font-bold text-lg text-red-600">
            {formatCurrency(currentPrice, "FCFA")}
          </span>
          {product.originalPrice && product.originalPrice !== currentPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatCurrency(product.originalPrice, "FCFA")}
            </span>
          )}
        </div>
        <div className="flex gap-2 mt-auto">
          <Button
            onClick={() => onAddToCart(product)}
            disabled={isSoldOut}
            size="sm"
            className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isSoldOut ? t('outOfStock') || 'Out of Stock' : t('addToCart') || 'Add to Cart'}
          </Button>
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href={`/product/${product.slug}`}>
              {t('viewDetails') || 'View Details'}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
});
ProductCard.displayName = 'ProductCard';

// Loading Skeleton Component
const ProductCardSkeleton = ({ isCompact }: { isCompact: boolean }) => (
  <div className={`
    bg-white rounded-xl shadow-sm border border-gray-100 
    flex ${isCompact ? 'flex-col max-w-sm mx-auto' : 'flex-row lg:flex-col xl:flex-row'}
    min-w-0 flex-1 overflow-hidden animate-pulse
  `}>
    <div className={`
      bg-gray-200
      ${isCompact ? 'w-full h-72' : 'w-full sm:w-72 h-72 lg:w-full lg:h-72 xl:w-72 xl:h-72'}
    `} />
    <div className="flex-1 p-4 space-y-3">
      <div className="h-3 bg-gray-200 rounded w-1/4" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-5 bg-gray-200 rounded w-1/3" />
      <div className="flex gap-2">
        <div className="h-8 bg-gray-200 rounded flex-1" />
        <div className="h-8 bg-gray-200 rounded flex-1" />
      </div>
    </div>
  </div>
);

// Main Component
export default function FeaturedDrinks() {
  const [currentTab, setCurrentTab] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [productsPerTab, setProductsPerTab] = useState(3); // SSR-safe default
  const [isCompact, setIsCompact] = useState(false); // SSR-safe default
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const screenSize = useResponsive();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const { t } = useLanguage();

  // Hydration fix
  useEffect(() => {
    setIsClient(true);
    // Responsive logic for productsPerTab and isCompact
    const updateResponsive = () => {
      if (window.innerWidth < 640) {
        setProductsPerTab(1);
        setIsCompact(true);
      } else if (window.innerWidth < 1024) {
        setProductsPerTab(2);
        setIsCompact(false);
      } else {
        setProductsPerTab(3);
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

  // SSR-safe: Always use desktop layout on server, responsive after hydration
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

  // Show skeleton during hydration
  if (!isClient) {
    return (
      <section className="max-w-7xl mx-auto bg-white p-6 lg:p-8 rounded-xl shadow-sm mb-12">
        <div className="flex items-center justify-between mb-8">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }, (_, i) => (
            <ProductCardSkeleton key={i} isCompact={false} />
          ))}
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto bg-white p-6 lg:p-8 rounded-xl shadow-sm mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
          {t('featuredProducts') || 'Featured Products'}
        </h2>
        
        {totalTabs > 1 && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              className="w-8 h-8 p-0 rounded-full border-gray-300 hover:border-amber-500 hover:text-amber-600"
              aria-label="Previous products"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              className="w-8 h-8 p-0 rounded-full border-gray-300 hover:border-amber-500 hover:text-amber-600"
              aria-label="Next products"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Products Carousel */}
      <div className="overflow-hidden rounded-lg">
        <div 
          className={`flex transition-transform duration-500 ease-in-out tab-transform-${currentTab}`}
        >
          {productsTabs.map((tabProducts, tabIndex) => (
            <div
              key={tabIndex}
              className={`min-w-full grid gap-6 ${isClient ? (effectiveProductsPerTab === 1 ? 'grid-cols-1' : effectiveProductsPerTab === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3') : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}
            >
              {tabProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isCompact={effectiveIsCompact}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  isInWishlist={isInWishlist(product.id)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Tab Indicators */}
      {totalTabs > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {productsTabs.map((_, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`
                h-2 rounded-full transition-all duration-300
                ${index === currentTab 
                  ? 'bg-amber-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400 w-2'}
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}