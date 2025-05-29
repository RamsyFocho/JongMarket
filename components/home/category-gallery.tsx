"use client"

import React, { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Heart, Share2, Download, Eye } from "lucide-react"
import { categories as productCategories } from "@/data/products"

// Transform product categories data for the gallery
const categoryItems = Object.entries(productCategories).map(([slug, data]) => ({
  slug,
  title: data.title,
  description: data.description,
  // Use a fallback image or a representative image from the first product in the category
  image: data.products && data.products.length > 0 && data.products[0].image
    ? data.products[0].image
    : '/placeholder.jpg',
  // No views/likes in products.ts, so use fallback or empty string
}))

export default function CinematicImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(true)
  const [liked, setLiked] = useState(false)
  const [showInfo, setShowInfo] = useState(true)
  const [transition, setTransition] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Handle auto-play
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        handleNext()
      }, 4000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, currentIndex])

  // Fix: add explicit type for index
  const handleImageTransition = (index: number) => {
    setTransition(true)
    setImageLoaded(false)
    setTimeout(() => {
      setCurrentIndex(index)
      setTransition(false)
      setTimeout(() => setImageLoaded(true), 100)
    }, 300)
  }

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + categoryItems.length) % categoryItems.length
    handleImageTransition(prevIndex)
  }

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % categoryItems.length
    handleImageTransition(nextIndex)
  }

  const toggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying)
  const toggleLike = () => setLiked(!liked)
  const toggleInfo = () => setShowInfo(!showInfo)

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Main Image Display - Full Screen */}
      <div className="absolute inset-0">
        <div 
          className={`absolute inset-0 bg-center transition-all duration-700
            ${imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-60'}
            ${transition ? 'blur-sm' : 'blur-0'}
            bg-cover md:bg-contain lg:bg-contain xl:bg-contain
            md:scale-100 lg:scale-100 xl:scale-100
          `}
          style={{
            backgroundImage: `url(${categoryItems[currentIndex].image})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            // backgroundSize is handled by Tailwind classes above
          }}
        />
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
        
        {/* Subtle Film Grain Effect */}
        <div className="absolute inset-0 opacity-20 bg-noise animate-pulse" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Top Control Bar */}
      <div className={`absolute top-0 left-0 right-0 z-30 p-6 bg-gradient-to-b from-black/80 to-transparent transition-all duration-500 ${
        showInfo ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/80">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">{categoryItems[currentIndex].views || '—'} views</span>
            </div>
            <div className="w-px h-4 bg-white/30" />
            <div className="text-white/60 text-sm">
              {currentIndex + 1} / {categoryItems.length}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLike}
              title="Like"
              className={`p-2 rounded-full transition-all duration-300 ${
                liked ? 'bg-red-500 text-white' : 'bg-black/40 text-white/80 hover:bg-black/60'
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 bg-black/40 text-white/80 hover:bg-black/60 rounded-full transition-all duration-300" title="Share">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 bg-black/40 text-white/80 hover:bg-black/60 rounded-full transition-all duration-300" title="Download">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation - Side Arrows */}
      <button
        onClick={handlePrev}
        title="Previous"
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-4 bg-black/20 backdrop-blur-md text-white/90 hover:bg-black/40 hover:text-white transition-all duration-300 rounded-full border border-white/10 hover:border-white/30 hover:scale-110"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      
      <button
        onClick={handleNext}
        title="Next"
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-4 bg-black/20 backdrop-blur-md text-white/90 hover:bg-black/40 hover:text-white transition-all duration-300 rounded-full border border-white/10 hover:border-white/30 hover:scale-110"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Bottom Information Panel */}
      <div className={`absolute bottom-0 left-0 right-0 z-30 transition-all duration-500 ${
        showInfo ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        <div className="bg-gradient-to-t from-black/90 via-black/70 to-transparent p-8 pt-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  <span className="text-amber-400 text-sm font-mono uppercase tracking-wider">
                    Premium Collection
                  </span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {categoryItems[currentIndex].title}
                </h1>
                <p className="text-gray-300 text-lg lg:text-xl max-w-2xl leading-relaxed mb-6">
                  {categoryItems[currentIndex].description}
                </p>
                
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Heart className={`w-5 h-5 ${liked ? 'text-red-400 fill-current' : 'text-gray-400'}`} />
                    <span className="text-gray-300">{/* No likes in data, fallback */}—</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">{/* No views in data, fallback */}—</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col items-end gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleAutoPlay}
                    title={isAutoPlaying ? 'Pause' : 'Play'}
                    className={`p-3 rounded-full transition-all duration-300 border ${
                      isAutoPlaying 
                        ? 'bg-amber-500 text-black border-amber-500' 
                        : 'bg-black/40 text-white/80 border-white/20 hover:bg-black/60'
                    }`}
                  >
                    {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={toggleInfo}
                    title="Toggle Info"
                    className="p-3 bg-black/40 text-white/80 hover:bg-black/60 rounded-full transition-all duration-300 border border-white/20"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Image Counter */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    {String(currentIndex + 1).padStart(2, '0')}
                  </div>
                  <div className="text-sm text-gray-400">
                    of {String(categoryItems.length).padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Strip - Hidden by Default, Shows on Hover */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-3 p-4 bg-black/60 backdrop-blur-lg rounded-2xl border border-white/10">
          {categoryItems.map((category, index) => (
            <button
              key={category.slug}
              onClick={() => handleImageTransition(index)}
              title={category.title}
              className={`relative w-16 h-10 rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                currentIndex === index 
                  ? 'border-amber-400 scale-110 shadow-lg shadow-amber-500/50' 
                  : 'border-white/20 hover:border-white/40 hover:scale-105'
              }`}
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              {currentIndex === index && (
                <div className="absolute inset-0 bg-amber-400/20" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40 z-10">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / categoryItems.length) * 100}%` }}
        />
      </div>

      {/* Keyboard Hints - Subtle */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-10 opacity-30 hover:opacity-100 transition-opacity duration-300">
        <div className="text-white/60 text-xs space-y-1">
          <div>← → Navigate</div>
          <div>Space Play/Pause</div>
          <div>I Info Toggle</div>
        </div>
      </div>

      {/* Loading Indicator */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/50">
          <div className="w-12 h-12 border-3 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
        </div>
      )}

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.8) 100%);
        }
        
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          10% { transform: translate(-5%, -10%) }
          20% { transform: translate(-15%, 5%) }
          30% { transform: translate(7%, -25%) }
          40% { transform: translate(-5%, 25%) }
          50% { transform: translate(-15%, 10%) }
          60% { transform: translate(15%, 0%) }
          70% { transform: translate(0%, 15%) }
          80% { transform: translate(3%, 35%) }
          90% { transform: translate(-10%, 10%) }
        }
        
        .bg-noise {
          animation: grain 8s steps(10) infinite;
        }
      `}</style>
    </div>
  )
}