"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, Filter, Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { products, categories, formatCurrency } from "@/data/products";
import { useLanguage } from "@/context/language-context";
import WishlistButton from "@/components/product/wishlist-button";
import { useCart } from "@/context/cart-context";
// import { useToast } from "@/components/ui/use-toast";
import ProductCard from '@/components/Card/ProductCard'


// Type definitions
interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  description?: string;
  category: string;
  price: number;
  currentPrice: number;
  originalPrice: number;
  badges: string[];
  image: string;
  rating: number;
  inStock: boolean;
  currency?: string;
  [key: string]: any; // For any additional properties
}

interface CategoryOption {
  value: string;
  label: string;
}

interface CacheEntry {
  search: string;
  price: number[];
  categories: string[];
  sort: string;
}

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

// Cache for filter results
const filterCache = new Map<string, Product[]>();
const CACHE_SIZE_LIMIT = 100;

// Generate cache key for filter combination
const generateCacheKey = (
  searchQuery: string,
  priceRange: number[],
  selectedCategories: string[],
  sortOption: SortOption
): string => {
  return JSON.stringify({
    search: searchQuery.toLowerCase(),
    price: priceRange,
    categories: [...selectedCategories].sort(),
    sort: sortOption,
  });
};

// Clean cache when it gets too large
const cleanCache = (): void => {
  if (filterCache.size > CACHE_SIZE_LIMIT) {
    const keysToDelete = Array.from(filterCache.keys()).slice(0, 20);
    keysToDelete.forEach((key) => filterCache.delete(key));
  }
};

// interface Props {
//   searchParams: Promise<{search?: string}>
// }
export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("search") || ""
  );

  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const { t } = useLanguage();
  const { addToCart } = useCart();
  // const { toast } = useToast();

  // Debounced search
  const [debouncedSearchQuery, setDebouncedSearchQuery] =
    useState<string>(searchQuery);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce search query
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Memoized category options
  const categoryOptions = useMemo((): CategoryOption[] => {
    return Object.entries(categories).map(([slug, data]) => ({
      value: slug,
      label: data.title,
    }));
  }, []);

  // Memoized filtered and sorted products with caching
  const filteredProducts = useMemo((): Product[] => {
    const cacheKey = generateCacheKey(
      debouncedSearchQuery,
      priceRange,
      selectedCategories,
      sortOption
    );

    // Check cache first
    if (filterCache.has(cacheKey)) {
      return filterCache.get(cacheKey)!;
    }

    let result: Product[] = [...(products as Product[])];

    // Apply search filter
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(
        (product: Product) =>
          product.name.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Filter by price
    result = result.filter(
      (product: Product) =>
        (product.currentPrice || product.price) >= priceRange[0] &&
        (product.currentPrice || product.price) <= priceRange[1]
    );

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((product: Product) =>
        selectedCategories.includes(product.category.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        result.sort(
          (a: Product, b: Product) =>
            (a.currentPrice || a.price) - (b.currentPrice || b.price)
        );
        break;
      case "price-desc":
        result.sort(
          (a: Product, b: Product) =>
            (b.currentPrice || b.price) - (a.currentPrice || a.price)
        );
        break;
      case "rating":
        result.sort((a: Product, b: Product) => b.rating - a.rating);
        break;
      default:
        // Keep original order for "featured"
        break;
    }

    // Cache the result
    filterCache.set(cacheKey, result);
    cleanCache();

    return result;
  }, [debouncedSearchQuery, priceRange, selectedCategories, sortOption]);

  // Update search query when URL parameter changes
  useEffect(() => {
    const search = searchParams.get("search");
    if (search && search !== searchQuery) {
      setSearchQuery(search);
    }
  }, [searchParams, searchQuery]);

  // Memoized event handlers
  const handleCategoryChange = useCallback((category: string): void => {
    setSelectedCategories((prev: string[]) => {
      if (prev.includes(category)) {
        return prev.filter((c: string) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  }, []);

  const handlePriceRangeChange = useCallback((newRange: number[]): void => {
    setPriceRange(newRange);
  }, []);

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      setSortOption(e.target.value as SortOption);
    },
    []
  );

  const handleResetFilters = useCallback((): void => {
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setSortOption("featured");
    setSearchQuery("");
  }, []);

  // const handleAddToCart = useCallback(
  //   (product: Product): void => {
  //     if (product.inStock) {
  //       addToCart({
  //         id: product.id,
  //         name: product.name,
  //         price: product.currentPrice || product.price,
  //         image: product.image,
  //         quantity: 1,
  //       });
  //       toast({
  //         title: "Added to cart",
  //         description: `${product.name} has been added to your cart.`,
  //       });
  //     }
  //   },
  //   [addToCart, toast]
  // );

  // Memoized product cards to prevent unnecessary re-renders
  // const ProductCard = useMemo(() => {
  //   return ({ product }: { product: Product }) => (
  //     <motion.div
  //       key={product.id}
  //       initial={{ opacity: 0, y: 20 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       transition={{ duration: 0.3 }}
  //       className="group">
  //       <div className="bg-white w-72 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
  //         <Link href={`/product/${product.slug}`}>
  //           <div className="relative aspect-square overflow-hidden">
  //             <Image
  //               src={product.image || "/placeholder.svg"}
  //               alt={product.name}
  //               fill
  //               className="object-cover transition-transform duration-500 group-hover:scale-105"
  //             />
  //             {!product.inStock && (
  //               <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
  //                 <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
  //                   {t("outOfStock")}
  //                 </span>
  //               </div>
  //             )}
  //           </div>
  //         </Link>

  //         <div className="p-4">
  //           {product.category && (
  //             <Link
  //               href={`/category/${product.category
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "-")}`}>
  //               <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">
  //                 {product.category}
  //               </span>
  //             </Link>
  //           )}

  //           <Link href={`/product/${product.slug}`}>
  //             <h3 className="font-semibold text-lg mt-1 group-hover:text-amber-600 transition-colors">
  //               {product.name}
  //             </h3>
  //           </Link>

  //           <div className="flex items-center mt-2">
  //             <div className="flex text-amber-500">
  //               {[...Array(5)].map((_, i) => (
  //                 <Star
  //                   key={i}
  //                   className="h-4 w-4"
  //                   fill={
  //                     i < Math.floor(product.rating) ? "currentColor" : "none"
  //                   }
  //                 />
  //               ))}
  //             </div>
  //             <span className="text-sm text-gray-500 ml-1">
  //               ({product.rating})
  //             </span>
  //           </div>

  //           <div className="flex items-center justify-between mt-4">
  //             <span className="font-bold text-lg">
  //               {formatCurrency(product.currentPrice || product.price)}
  //             </span>

  //             <div className="flex items-center">
  //               <WishlistButton product={product} variant="icon" />
  //               <Button
  //                 title="Add to cart"
  //                 size="icon"
  //                 className="h-9 w-9 rounded-full bg-amber-600 hover:bg-amber-700 ml-2"
  //                 disabled={!product.inStock}
  //                 onClick={() => handleAddToCart(product)}>
  //                 <ShoppingBag className="h-5 w-5" />
  //               </Button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </motion.div>
  //   );
  // }, [t, handleAddToCart]);

  return (
    <div className="w-full px-4 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-amber-600">
          {t("home")}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700 font-medium">All Products</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Filter className="h-5 w-5 text-gray-500" />
            </div>

            {/* Price Range Filter */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-4">Price Range</h3>
              <Slider
                defaultValue={[0, 500]}
                max={500}
                step={10}
                value={priceRange}
                onValueChange={handlePriceRangeChange}
                className="mb-4"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {formatCurrency(priceRange[0])}
                </span>
                <span className="text-sm text-gray-600">
                  {formatCurrency(priceRange[1])}
                </span>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-4">Categories</h3>
              <div className="space-y-3">
                {categoryOptions.map((category: CategoryOption) => (
                  <div key={category.value} className="flex items-center">
                    <Checkbox
                      id={`category-${category.value}`}
                      checked={selectedCategories.includes(category.value)}
                      onCheckedChange={() =>
                        handleCategoryChange(category.value)
                      }
                    />
                    <Label
                      htmlFor={`category-${category.value}`}
                      className="ml-2 text-sm font-normal cursor-pointer">
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset Filters */}
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-2xl font-bold mb-4 sm:mb-0">
              All Products ({filteredProducts.length})
            </h1>

            {/* Sort Options */}
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="text-sm border rounded-md px-2 py-1"
                title="Sort products by"
                aria-label="Sort products by">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No products found</h2>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters to find what you're looking for.
              </p>
              <Button variant="outline" onClick={handleResetFilters}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
