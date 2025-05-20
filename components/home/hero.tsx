"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

// Preload strategy to improve performance - browser-only
const preloadImages = (slides) => {
  if (typeof window !== 'undefined') {
    slides.forEach((slide) => {
      if (slide.image) {
        const img = new window.Image();
        img.src = slide.image;
      }
    });
  }
};

const slides = [
  {
    id: 1,
    title: "Premium Whiskey Collection",
    subtitle:
      "Discover our exclusive selection of fine whiskeys from around the world",
    image: "/images/hero/whiskey-collection.jpg",
    cta: "Explore Collection",
    link: "/category/whiskey",
  },
  {
    id: 2,
    title: "Luxury Wine Selection",
    subtitle: "Indulge in the finest wines from renowned vineyards worldwide",
    image: "/images/hero/wine-selection.jpg",
    cta: "Browse Wines",
    link: "/category/wine",
  },
  {
    id: 3,
    title: "Craft Beer Experience",
    subtitle: "Explore our curated collection of artisanal and craft beers",
    image: "/images/hero/craft-beer.jpg",
    cta: "Discover Beers",
    link: "/category/beer",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const { t } = useLanguage();

  // Preload images for better performance - client-side only
  useEffect(() => {
    // Only run in browser, not during SSR
    if (typeof window !== 'undefined') {
      preloadImages(slides);
    }
  }, []);

  // Navigation handlers with memoization for better performance
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setAutoplay(false); // Pause autoplay when user interacts
    // Restart autoplay after 10 seconds of inactivity
    const timer = setTimeout(() => setAutoplay(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate slides with improved handling
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [autoplay, nextSlide]);

  // Pause autoplay when user hovers over controls
  const pauseAutoplay = () => setAutoplay(false);
  const resumeAutoplay = () => setAutoplay(true);

  return (
    <section className="relative overflow-hidden rounded shadow-xl bg-gray-900">
      {/* Full height hero with dynamic height based on viewport */}
      <div className="h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] xl:h-[90vh] relative">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            currentSlide === index && (
              <motion.div
                key={slide.id}
                className="w-full h-full absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              >
                {/* Mobile layout */}
                <div className="lg:hidden relative h-full">
                  <div className="absolute inset-0">
                    <Image
                      src={slide.image || "/placeholder.svg?height=600&width=1200"}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      style={{ objectPosition: "center 25%" }}
                      sizes="100vw"
                      priority={index === 0}
                      quality={85}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40" />

                  <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="px-6 py-12 md:px-10 md:py-16 text-center max-w-xl mx-auto">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="space-y-4"
                      >
                        <motion.span 
                          className="inline-block px-3 py-1 rounded-full bg-amber-600/80 text-white text-sm font-medium tracking-wider uppercase"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          Featured
                        </motion.span>
                        
                        <motion.h1 
                          className="text-4xl sm:text-5xl font-extrabold mb-4 text-white drop-shadow-md tracking-tight"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                          {slide.title}
                        </motion.h1>
                        
                        <motion.p 
                          className="text-lg sm:text-xl mb-8 text-gray-100 drop-shadow-sm font-light leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                        >
                          {slide.subtitle}
                        </motion.p>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.7 }}
                        >
                          <Link href={slide.link}>
                            <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-6 h-auto rounded-lg text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md">
                              {slide.cta}
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </Link>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Desktop split layout */}
                <div className="hidden lg:grid lg:grid-cols-2 h-full">
                  {/* Text Section */}
                  <div className="relative z-10 flex items-center p-12 xl:p-16 2xl:p-20 bg-gradient-to-r from-gray-950 to-gray-900">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="w-full max-w-xl ml-auto mr-4"
                    >
                      <motion.span 
                        className="inline-block px-3 py-1 rounded-full bg-amber-600/90 text-white text-sm font-medium tracking-wider uppercase mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        Featured
                      </motion.span>
                      
                      <motion.h1 
                        className="text-4xl xl:text-5xl 2xl:text-6xl font-extrabold mb-6 text-white drop-shadow-md tracking-tight leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        {slide.title}
                      </motion.h1>
                      
                      <motion.p 
                        className="text-xl xl:text-2xl mb-8 text-gray-100 drop-shadow-sm font-light leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        {slide.subtitle}
                      </motion.p>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                      >
                        <Link href={slide.link}>
                          <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-7 h-auto rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg">
                            {slide.cta}
                            <ArrowRight className="ml-2 h-6 w-6" />
                          </Button>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    {/* Improved gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/100 via-gray-900/40 to-gray-900/80 z-10" />

                    <motion.div 
                      className="absolute inset-0"
                      initial={{ scale: 1.1, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 7, ease: "easeOut" }}
                    >
                      <Image
                        src={slide.image || "/placeholder.svg?height=600&width=1200"}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        style={{ objectPosition: "center 30%" }}
                        sizes="50vw"
                        priority={index === 0}
                        quality={90}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Enhanced slide indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
          <div 
            className="flex space-x-3 px-3 py-2 rounded-full bg-black/20 backdrop-blur-md"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 transition-all duration-300 ease-out ${
                  currentSlide === index
                    ? "w-10 bg-amber-500"
                    : "w-2.5 bg-white/60 hover:bg-white/80"
                } rounded-full`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Improved navigation arrows */}
        <div>
          <button
            onClick={prevSlide}
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
            className="absolute left-4 lg:left-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
          </button>
          <button
            onClick={nextSlide}
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
            className="absolute right-4 lg:right-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}