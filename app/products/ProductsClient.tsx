"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useCart } from "@/context/cart-context"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

// Define a fallback Product type based on your data/products.ts
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  slug: string;
  category?: string;
  rating?: number;
  inStock?: boolean;
  stockCount?: number;
  description?: string;
}

interface ProductsClientProps {
  products: Product[];
  categories: any;
  formatCurrency: (value: number) => string;
}

export default function ProductsClient({
  products,
  categories,
  formatCurrency,
}: ProductsClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { addToCart } = useCart()

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")

  if (!products || !categories || !formatCurrency) {
    return <div className="text-red-500 p-4">Error: Missing products, categories, or formatCurrency data.</div>;
  }

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category)
    const params = new URLSearchParams(searchParams.toString())
    if (category) {
      params.set("category", category)
    } else {
      params.delete("category")
    }
    router.push(`?${params.toString()}`)
  }

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (searchQuery) {
      params.set("search", searchQuery)
    } else {
      params.delete("search")
    }
    router.push(`?${params.toString()}`)
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  // Filter products by search and category
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Toaster />
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="md:w-1/4">
          {/* Category Filter */}
          <div className="mb-4">
            <label htmlFor="category-select" className="block mb-2 font-semibold">Category</label>
            <select
              id="category-select"
              className="w-full border rounded p-2"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">All</option>
              {Object.entries(categories).map(([slug, data]: [string, any]) => (
                <option key={slug} value={data.title}>{data.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="md:w-3/4">
          {/* Move the search form outside the product grid */}
          <form onSubmit={handleSearch} className="mb-4">
            <Input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button type="submit" className="mt-2 w-full md:w-auto">
              Search
            </Button>
          </form>
          {/* Product grid is NOT inside a form anymore */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} className="h-40 object-cover mb-2 rounded" />
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                <span className="font-bold text-amber-600 mb-2">{formatCurrency(product.price)}</span>
                <Button
                  className="mt-auto bg-amber-600 hover:bg-amber-700"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.inStock === false}
                >
                  Add to Cart
                </Button>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-8">No products found.</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}