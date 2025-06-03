'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { products } from '@/data/products'; // Import your products data
import { useWishlist } from '@/context/wishlist-context';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency } from '@/lib/format-currency';

// Filter wine products from the main products data
const featuredWines = products.filter(
  (p) => p.category?.toLowerCase().includes('wine') || p.category?.toLowerCase().includes('vin')
);

export default function FeaturedWine() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  // Calculate total slides (2 items per slide)
  const totalSlides = Math.ceil(featuredWines.length / 2);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoSliding) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoSliding, totalSlides]);

  const handleTouchStart = () => {
    setIsAutoSliding(false);
  };

  const handleTouchEnd = () => {
    // Resume auto-sliding after 5 seconds of no interaction
    setTimeout(() => setIsAutoSliding(true), 5000);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoSliding(false);
    setTimeout(() => setIsAutoSliding(true), 5000);
  };

  // Group wines into pairs for 2-per-row display
  const wineRows = [];
  for (let i = 0; i < featuredWines.length; i += 2) {
    wineRows.push(featuredWines.slice(i, i + 2));
  }

  return (
    <section className="bg-gradient-to-b from-amber-50 to-yellow-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 ">
          <h2 className="text-2xl font-bold text-amber-900 mb-2">
            SELECTED WINES
          </h2>
          <p className="text-amber-700 text-sm">
            Discover our best and finest wine
          </p>
        </div>

        {/* Wines Grid - responsive card layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5 lg:gap-6">
          {featuredWines.map((wine) => (
            <div
              key={wine.id}
              className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col items-center h-full relative group"
            >
              {/* Wishlist Heart Icon */}
              <button
                className={`absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-amber-100 transition-colors ${isInWishlist(wine.id) ? 'text-red-500' : 'text-amber-500'}`}
                aria-label="Ajouter aux favoris"
                type="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (isInWishlist(wine.id)) {
                    removeFromWishlist(wine.id);
                    toast({
                      title: 'Removed from wishlist',
                      description: `${wine.name} has been removed from your wishlist.`,
                    });
                  } else {
                    addToWishlist({
                      id: wine.id,
                      name: wine.name,
                      price: wine.price,
                      image: wine.image,
                      slug: wine.slug,
                      category: wine.category,
                      rating: wine.rating,
                    });
                    toast({
                      title: 'Added to wishlist',
                      description: `${wine.name} has been added to your wishlist.`,
                    });
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isInWishlist(wine.id) ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 3.75a5.25 5.25 0 00-4.5 2.472A5.25 5.25 0 007.5 3.75 5.25 5.25 0 003 9c0 7.25 9 11.25 9 11.25s9-4 9-11.25a5.25 5.25 0 00-5.25-5.25z"
                  />
                </svg>
              </button>
              {/* Wine Image Container - card style, clickable */}
              <a href={`/product/${wine.slug}`} className="flex w-full flex-col items-center justify-center pt-3 focus:outline-none">
                <div className="relative w-full h-60 sm:h-72 md:h-84 flex items-center justify-center mx-auto rounded-lg bg-gray-50 overflow-hidden">
                  {wine.image ? (
                    <Image
                      src={wine.image}
                      alt={wine.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-contain"
                      priority={false}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 rounded"></div>
                  )}
                </div>
                {/* Wine Info */}
                <div className="p-2 w-full flex flex-col items-center">
                  <h3 className="text-xs md:text-sm font-semibold text-amber-900 mb-1 text-center line-clamp-2 leading-tight">
                    {wine.name}
                  </h3>
                  <p className="text-[11px] md:text-xs text-yellow-600 font-medium mb-1 text-center">
                    {wine.category}
                  </p>
                  {/* Price only */}
                  <div className="flex items-center justify-center w-full mt-1">
                    <span className="text-base md:text-lg font-bold text-amber-900">
                      {formatCurrency(wine.price, 'FCFA')}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}