"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/Card/ProductCard';
import { products } from '@/data/products';


const wineProducts = products.filter((p) => p.category.toLowerCase() === 'wine');

const FeaturedWine = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [productsPerTab, setProductsPerTab] = useState(4);
  
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
  const totalTabs = Math.ceil(wineProducts.length / productsPerTab);
  
  // Get products for current tab
  const getCurrentTabProducts = () => {
    const startIndex = currentTab * productsPerTab;
    const endIndex = startIndex + productsPerTab;
    return wineProducts.slice(startIndex, endIndex);
  };

  const handlePrevious = () => {
    setCurrentTab(prev => prev > 0 ? prev - 1 : totalTabs - 1);
  };

  const handleNext = () => {
    setCurrentTab(prev => prev < totalTabs - 1 ? prev + 1 : 0);
  };

  // Auto-slide effect for tabs
  useEffect(() => {
    if (totalTabs <= 1) return;
    const interval = setInterval(() => {
      setCurrentTab((prev) => (prev < totalTabs - 1 ? prev + 1 : 0));
    }, 4000); // 4 seconds per tab
    return () => clearInterval(interval);
  }, [totalTabs]);

  return (
    <section className="w-full py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
            EXQUISITE WINES
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {getCurrentTabProducts().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
    </section>
  );
};

export default FeaturedWine;