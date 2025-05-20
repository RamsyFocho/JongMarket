"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

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
  const { t } = useLanguage();

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    // TODO: redesign it at height md:70vh
    <section className="h-[60vh] md:h-[90vh] relative overflow-hidden rounded">
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          className={`w-full h-screen ${
            currentSlide === index ? "block" : "hidden"
          }`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            zIndex: currentSlide === index ? 10 : 0,
          }}
          transition={{ duration: 1 }}
        >
          {/* Mobile layout (full width with image background) */}
          <div className="md:hidden relative min-h-[60vh] md:min-h-[70vh]">
            <div className="absolute inset-0 bg-gray-900">
              <Image
                src={slide.image || "/placeholder.svg?height=600&width=1200"}
                alt={slide.title}
                fill
                className="object-cover opacity-70"
                style={{ objectPosition: "center center" }}
                sizes="100vw"
                priority={index === 0}
                quality={85}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70" />

            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="px-6 py-12 md:px-10 md:py-16 text-center max-w-xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    y: currentSlide === index ? 0 : 30,
                  }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 text-gray-100 drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  <Link href={slide.link}>
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md text-lg transition-all duration-300 transform hover:scale-105">
                      {slide.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Desktop split layout (only visible on lg screens and up) */}
          <div className="hidden h-screen md:grid md:grid-cols-2 min-h-[70vh] xl:min-h-[75vh] 2xl:min-h-[80vh]">
            {/* Text Section */}
            <div className="relative z-10 flex items-center bg-gradient-to-r from-gray-900 to-gray-800 p-6 md:p-12 lg:p-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: currentSlide === index ? 1 : 0,
                  y: currentSlide === index ? 0 : 30,
                }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full max-w-xl mx-auto lg:mx-0"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-100 drop-shadow-md">
                  {slide.subtitle}
                </p>
                <Link href={slide.link}>
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md text-lg transition-all duration-300 transform hover:scale-105">
                    {slide.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Image Section */}
            <div className="relative overflow-hidden min-h-[70vh]">
              {/* Background color overlay that will blend with the image */}
              <div className="absolute inset-0 bg-gradient-to-l from-gray-800/80 via-gray-800/60 to-gray-800/90 z-10" />

              {/* The image container with fixed dimensions */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={
                      slide.image || "/placeholder.svg?height=600&width=1200"
                    }
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="50vw"
                    priority={index === 0}
                    quality={90}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all ${
                currentSlide === index
                  ? "w-10 bg-amber-500"
                  : "w-3 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation arrows (always visible but positioned differently based on screen size) */}
      <div>
        <button
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length
            )
          }
          className="absolute left-4 lg:left-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all"
          aria-label="Previous slide"
        >
          <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6 transform rotate-180" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 lg:right-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all"
          aria-label="Next slide"
        >
          <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6" />
        </button>
      </div>
    </section>
  );
}
