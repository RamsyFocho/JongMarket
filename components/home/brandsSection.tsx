"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const BrandsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Sample brand data with real image paths
  const brands = [
    { id: 1, name: "Coca Cola", logo: "/images/brands/coca-logo.jpg", category: "Soft Drinks" },
    { id: 2, name: "Heineken", logo: "/images/brands/heineken-logo.jpg", category: "Beer" },
    { id: 3, name: "Jack Daniels", logo: "/images/brands/jack-daniels.jpg", category: "Whiskey" },
    { id: 4, name: "Absolut", logo: "/images/brands/absolut.jpg", category: "Vodka" },
    { id: 5, name: "Bacardi", logo: "/images/brands/bacardi.jpg", category: "Rum" },
    { id: 6, name: "Johnnie Walker", logo: "/images/brands/jhonny-walker.jpg", category: "Whiskey" },
    { id: 7, name: "Grey Goose", logo: "/images/brands/grey-groose.jpg", category: "Vodka" },
    { id: 8, name: "Corona", logo: "/images/brands/corona.jpg", category: "Beer" },
    { id: 9, name: "Dom Pérignon", logo: "/images/brands/perignon.jpg", category: "Champagne" },
    { id: 10, name: "Martini", logo: "/images/brands/martini.jpg", category: "Vermouth" },
    { id: 11, name: "Chivas Regal", logo: "/images/brands/regal.jpg", category: "Whiskey" },
    { id: 12, name: "Belvedere", logo: "/images/brands/belved.jpg", category: "Vodka" }
  ];

  // Responsive items per slide - optimized for single row display
  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 4; // mobile: 2x2 grid
      if (window.innerWidth < 768) return 3; // sm: 3 in a row
      if (window.innerWidth < 1024) return 4; // md: 4 in a row
      if (window.innerWidth < 1280) return 5; // lg: 5 in a row
      return 6; // xl: 6 in a row
    }
    return 6;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());
  const totalSlides = Math.ceil(brands.length / itemsPerSlide);

  // Handle responsive updates
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerSlide = getItemsPerSlide();
      setItemsPerSlide(newItemsPerSlide);
      // Adjust current slide to prevent showing empty slides
      const newTotalSlides = Math.ceil(brands.length / newItemsPerSlide);
      if (currentSlide >= newTotalSlides) {
        setCurrentSlide(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [brands.length, currentSlide]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || totalSlides <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides, isAutoPlay]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlay(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-700 tracking-wide">PREMIUM PARTNERS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Trusted Brands
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
            Discover our curated collection of world-renowned beverage brands
          </p>
        </div>

        {/* Brands Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 bg-white/95 backdrop-blur-sm hover:bg-white rounded-full shadow-lg border border-gray-200/50 items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl group -translate-x-3 lg:-translate-x-6"
                aria-label="Previous brands"
              >
                <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
              </button>
              
              <button
                onClick={nextSlide}
                className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 bg-white/95 backdrop-blur-sm hover:bg-white rounded-full shadow-lg border border-gray-200/50 items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl group translate-x-3 lg:translate-x-6"
                aria-label="Next brands"
              >
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
              </button>
            </>
          )}

          {/* Brands Container */}
          <div className="overflow-hidden px-2 sm:px-8 lg:px-12">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  {/* Mobile: 2x2 grid, MD+: Single row with equal spacing */}
                  <div className={
                    itemsPerSlide === 4 && window?.innerWidth < 640
                      ? 'grid grid-cols-2 gap-4' // mobile: 2x2 grid
                      : 'flex justify-center items-stretch gap-3 md:gap-4 lg:gap-6' // single row
                  }>
                    {brands
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((brand, index) => (
                        <div
                          key={brand.id}
                          className={`group ${
                            itemsPerSlide === 4 && window?.innerWidth < 640
                              ? 'w-full' // mobile: full width in grid
                              : 'flex-1 max-w-xs' // single row: flexible width with max constraint
                          }`}
                          style={{
                            animationDelay: `${index * 150}ms`
                          }}
                        >
                          {/* Brand Card */}
                          <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 border border-gray-200/60 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:border-gray-300/60 h-full flex flex-col">
                            {/* Brand Logo Container */}
                            <div className="aspect-[4/3] w-full flex items-center justify-center mb-3 md:mb-4 relative overflow-hidden rounded-lg bg-gray-50/80 border border-gray-100">
                              <img
                                src={brand.logo}
                                alt={`${brand.name} logo`}
                                className="w-full h-full object-contain p-2 md:p-3 lg:p-4 group-hover:scale-105 transition-all duration-500"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.src = `https://via.placeholder.com/300x225/F3F4F6/6B7280?text=${encodeURIComponent(brand.name)}`;
                                }}
                              />
                              
                              {/* Hover overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                            </div>
                            
                            {/* Brand Info */}
                            <div className="text-center flex-grow flex flex-col justify-center">
                              <h3 className="font-semibold text-gray-900 text-sm md:text-base lg:text-lg mb-1 md:mb-2 group-hover:text-amber-600 transition-colors duration-300 leading-tight">
                                {brand.name}
                              </h3>
                              <p className="text-xs md:text-sm text-gray-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                                {brand.category}
                              </p>
                            </div>

                            {/* Premium indicator */}
                            <div className="absolute top-2 right-2 w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm"></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-amber-500 scale-125 shadow-md' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Auto-play control */}
        <div className="flex justify-center mt-4 md:mt-6">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:bg-white/80"
          >
            {isAutoPlay ? 'Pause' : 'Play'} Auto-scroll
          </button>
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-8 md:mt-12">
          <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;