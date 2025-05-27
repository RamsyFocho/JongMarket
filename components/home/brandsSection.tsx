"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const BrandsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Sample brand data - replace with your actual brand images
  const brands = [
    { id: 1, name: "Coca Cola", logo: "/api/placeholder/120/80", category: "Soft Drinks" },
    { id: 2, name: "Heineken", logo: "/api/placeholder/120/80", category: "Beer" },
    { id: 3, name: "Jack Daniels", logo: "/api/placeholder/120/80", category: "Whiskey" },
    { id: 4, name: "Absolut", logo: "/api/placeholder/120/80", category: "Vodka" },
    { id: 5, name: "Bacardi", logo: "/api/placeholder/120/80", category: "Rum" },
    { id: 6, name: "Johnnie Walker", logo: "/api/placeholder/120/80", category: "Whiskey" },
    { id: 7, name: "Grey Goose", logo: "/api/placeholder/120/80", category: "Vodka" },
    { id: 8, name: "Corona", logo: "/api/placeholder/120/80", category: "Beer" },
    { id: 9, name: "Dom Pérignon", logo: "/api/placeholder/120/80", category: "Champagne" },
    { id: 10, name: "Martini", logo: "/api/placeholder/120/80", category: "Vermouth" },
    { id: 11, name: "Chivas Regal", logo: "/api/placeholder/120/80", category: "Whiskey" },
    { id: 12, name: "Belvedere", logo: "/api/placeholder/120/80", category: "Vodka" }
  ];

  const itemsPerSlide = 6;
  const totalSlides = Math.ceil(brands.length / itemsPerSlide);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;
    
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

  const goToSlide = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 lg:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-400 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-600 tracking-wide">PREMIUM PARTNERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
            Trusted Brands
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our curated collection of world-renowned beverage brands
          </p>
        </div>

        {/* Brands Carousel */}
        <div className="relative w-full">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg border border-white/40 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl group"
            aria-label="Previous brands"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg border border-white/40 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl group"
            aria-label="Next brands"
          >
            <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" />
          </button>

          {/* Brands Container */}
          <div className="overflow-hidden mx-16">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                    {brands
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((brand, index) => (
                        <div
                          key={brand.id}
                          className="group relative"
                          style={{
                            animationDelay: `${index * 100}ms`
                          }}
                        >
                          {/* Brand Card */}
                          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/90 hover:-translate-y-2">
                            {/* Brand Logo Container */}
                            <div className="border-2 border-yellow-500 aspect-[3/2] flex items-center justify-center mb-3 relative overflow-hidden rounded-lg bg-gray-50/50">
                              <img
                                src={brand.logo}
                                alt={`${brand.name} logo`}
                                className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                              />
                              
                              {/* Hover overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                            {/* Brand Info */}
                            <div className="text-center">
                              <h3 className="font-semibold text-gray-900 text-sm lg:text-base mb-1 group-hover:text-amber-600 transition-colors duration-300">
                                {brand.name}
                              </h3>
                              <p className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {brand.category}
                              </p>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-amber-500 scale-125 shadow-lg' 
                    : 'bg-white/60 hover:bg-white/80 border border-gray-200'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Bottom decorative line */}
        <div className="flex justify-center mt-12">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;