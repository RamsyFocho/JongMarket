"use client"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface MegaMenuProps {
  isOpen: boolean
  onClose: () => void
  category: string
  items: {
    name: string
    slug: string
    image?: string
  }[]
}

export default function MegaMenu({ isOpen, onClose, category, items }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 right-0 top-full bg-white shadow-lg z-40"
          onMouseLeave={onClose}
        >
          <div className="container mx-auto p-6">
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-1">
                <h3 className="text-lg font-bold mb-4 text-amber-800 border-b pb-2">{category}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/category/${category.toLowerCase()}/${item.slug}`}
                        className="text-gray-700 hover:text-amber-600 flex items-center py-1"
                      >
                        {item.image && (
                          <div className="w-6 h-6 mr-2 relative">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-2 border-t">
                  <Link
                    href={`/category/${category.toLowerCase()}`}
                    className="text-amber-600 hover:text-amber-800 font-medium"
                  >
                    View All {category}
                  </Link>
                </div>
              </div>
              <div className="col-span-3 bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <h4 className="font-bold mb-3 text-gray-800">Featured {category}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <Link key={i} href={`/product/featured-${category.toLowerCase()}-${i}`} className="group block">
                          <div className="relative h-32 rounded overflow-hidden mb-2">
                            <Image
                              src={`/placeholder.svg?height=200&width=300&text=Featured+${category}+${i}`}
                              alt={`Featured ${category} ${i}`}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <h5 className="text-sm font-medium group-hover:text-amber-600">
                            Premium {category} Selection {i}
                          </h5>
                          <p className="text-xs text-gray-500">From 29,999 FCFA</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3 text-gray-800">Popular Brands</h4>
                    <ul className="space-y-2">
                      {["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"].map((brand, i) => (
                        <li key={i}>
                          <Link
                            href={`/brand/${brand.toLowerCase().replace(/\s+/g, "-")}`}
                            className="text-gray-700 hover:text-amber-600 text-sm"
                          >
                            {brand}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <Link
                        href="/brands"
                        className="inline-block bg-amber-600 text-white text-sm px-3 py-1 rounded hover:bg-amber-700"
                      >
                        All Brands
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
