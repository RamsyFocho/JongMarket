
"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/Card/ProductCard';
import { products } from '@/data/products';


const accessoryItems = products
  .filter((p: any) => p.category && p.category.toLowerCase() === 'accessories')
  .map((p: any) => ({
    ...p,
    badges: Array.isArray(p.badges) ? p.badges : [],
    isInStock: typeof p.inStock === 'boolean' ? p.inStock : true,
  }));

const DrinkAccessories = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [productsPerTab, setProductsPerTab] = useState(4);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  
  // Update products per tab based on screen size
  useEffect(() => {
    const updateProductsPerTab = () => {
      setProductsPerTab(window.innerWidth >= 1024 ? 4 : 2);
      setCurrentTab(0); // Reset to first tab when screen size changes
    };

    // Set initial value
    updateProductsPerTab();

    // Add resize listener
    window.addEventListener('resize', updateProductsPerTab);
    return () => window.removeEventListener('resize', updateProductsPerTab);
  }, []);

  // Calculate total tabs needed
  const totalTabs = Math.ceil(accessoryItems.length / productsPerTab);
  
  // Get products for current tab
  const getCurrentTabProducts = () => {
    const startIndex = currentTab * productsPerTab;
    const endIndex = startIndex + productsPerTab;
    return accessoryItems.slice(startIndex, endIndex);
  };

  const handlePrevious = () => {
    setSlideDirection('left');
    setCurrentTab(prev => prev > 0 ? prev - 1 : totalTabs - 1);
  };

  const handleNext = () => {
    setSlideDirection('right');
    setCurrentTab(prev => prev < totalTabs - 1 ? prev + 1 : 0);
  };

  // Auto-slide effect for tabs with slide
  useEffect(() => {
    if (totalTabs <= 1) return;
    const interval = setInterval(() => {
      setSlideDirection('right');
      setCurrentTab((prev) => (prev < totalTabs - 1 ? prev + 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, [totalTabs]);

  // Slide animation state
  const [animating, setAnimating] = useState(false);
  useEffect(() => {
    if (!animating) return;
    const timer = setTimeout(() => setAnimating(false), 800); // match new animation duration
    return () => clearTimeout(timer);
  }, [animating]);

  // Trigger animation on tab change
  useEffect(() => {
    setAnimating(true);
  }, [currentTab]);

  return (
    <section className="w-full py-8 px-4 bg-white">
      <div className="max-w-[fit] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide"
          style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Accessorize Your Bar
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={handlePrevious}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={handleNext}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Product Grid - Single row with dynamic tab content */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative overflow-hidden min-h-[280px] md:min-h-[350px]"
          // style={{ minHeight: 450 }}
        >
        
          <div
            className={`absolute inset-0 w-full h-full transition-transform duration-400 will-change-transform ${
              animating
                ? slideDirection === 'right'
                  ? 'translate-x-[-100%] animate-slide-in-right'
                  : 'translate-x-[100%] animate-slide-in-left'
                : 'translate-x-0'
            }`}
            style={{ pointerEvents: animating ? 'none' : 'auto' }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {getCurrentTabProducts().map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* Tab indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalTabs }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTab(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentTab === index ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slide-in-left {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default DrinkAccessories;