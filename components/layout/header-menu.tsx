"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import MegaMenu from "./mega-menu"

interface HeaderMenuProps {
  categories: {
    name: string
    slug: string
    subcategories: {
      name: string
      slug: string
    }[]
  }[]
}

export default function HeaderMenu({ categories }: HeaderMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleMouseEnter = (slug: string) => {
    setActiveCategory(slug)
  }

  const handleMouseLeave = () => {
    setActiveCategory(null)
  }

  return (
    <div className="bg-amber-600 text-white">
      <div className="container mx-auto">
        <div className="flex items-center">
          <div className="relative group">
            <div className="bg-amber-800 px-4 py-2 font-medium flex items-center cursor-pointer">
              SHOP BY BRANDS
              <ChevronDown className="ml-2 h-4 w-4" />
            </div>
            <div className="absolute left-0 top-full z-50 w-64 bg-white shadow-lg rounded-b-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-y-0 group-hover:scale-y-100">
              <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-3 border-b pb-2">Popular Brands</h3>
                <ul className="space-y-2">
                  {["Macallan", "Hennessy", "Dom Pérignon", "Grey Goose", "Jack Daniel's"].map((brand, i) => (
                    <li key={i}>
                      <Link
                        href={`/brand/${brand.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-gray-700 hover:text-amber-600"
                      >
                        {brand}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-2 border-t">
                  <Link href="/brands" className="text-amber-600 hover:text-amber-800 font-medium">
                    View All Brands
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {categories.map((category) => (
            <div
              key={category.slug}
              className="relative"
              onMouseEnter={() => handleMouseEnter(category.slug)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={`/category/${category.slug}`}
                className="px-4 py-2 hover:bg-amber-700 transition-colors inline-flex items-center"
              >
                {category.name}
                <ChevronDown className="ml-1 h-3 w-3" />
              </Link>

              <MegaMenu
                isOpen={activeCategory === category.slug}
                onClose={() => setActiveCategory(null)}
                category={category.name}
                items={category.subcategories}
              />
            </div>
          ))}

          <Link href="/products" className="px-4 py-2 hover:bg-amber-700 transition-colors">
            All Products
          </Link>
        </div>
      </div>
    </div>
  )
}
