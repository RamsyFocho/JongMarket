"use client"

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from "next/link"

// Export as default component instead of named export
export default function AnimatedShopByBrand() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center cursor-pointer h-[53px]">
        {/* Main button with arrow shape */}
        <div className="bg-amber-800 text-white px-5 py-3 font-medium flex items-center transition-all duration-300 hover:bg-amber-900 relative overflow-hidden h-full"
             style={{
               clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)"
             }}>
          <span className="relative z-10 flex items-center">
           <Link href="/products"> SHOP PRODUCTS</Link>
            {/* <ChevronDown 
              className={`ml-2 h-5 w-5 transition-transform duration-500 ${isHovered ? 'rotate-180' : ''}`}
            /> */}
          </span>
          
          {/* Animation overlay */}
          <div 
            className={`absolute inset-0 bg-amber-900 transform transition-transform duration-500 origin-left ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}
            style={{
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)"
            }}
          ></div>
        </div>
      </div>
      
      {/* Dropdown content (can be expanded) */}
      {/* <div 
        className={`absolute left-0 mt-1 bg-white shadow-lg transition-all duration-300 origin-top w-48 ${isHovered ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}
      >
        <div className="py-2 text-gray-800">
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Popular Brands</div>
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">New Brands</div>
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Premium Selection</div>
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">All Brands</div>
        </div>
      </div> */}
    </div>
  );
}