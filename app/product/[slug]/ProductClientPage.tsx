"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Share2,
  Check,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context";
import { products, formatCurrency } from "@/data/products";
import WishlistButton from "@/components/product/wishlist-button";
import ProductSchema from "@/components/seo/product-schema";
import { Toaster } from "@/components/ui/toaster";

// Cache for product data and computed values
const productCache = new Map();
const relatedProductsCache = new Map();

// Memoized components for better performance
const MemoizedProductImage = React.memo(({ 
  src, 
  alt, 
  priority = false, 
  className = "" 
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) => (
  <Image
    src={src || "/placeholder.svg"}
    alt={alt}
    fill
    className={className}
    priority={priority}
    // Enable Next.js image optimization and caching
    quality={85}
    placeholder="blur"
    blurDataURL="data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8A0XqoVKjYuUVElpQKiVCpUalQqJUSolQqVCJRKWvAYiVCJRKWvAYiUSlrwGIlQiUSlrwGIlEpa8BiJUIlEpa8BiJRKWvAYiVCpUbFyiolU"
  />
));

const MemoizedStarRating = React.memo(({ rating }: { rating: number }) => (
  <div className="flex text-amber-500">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className="h-5 w-5"
        fill={i < Math.round(rating) ? "currentColor" : "none"}
      />
    ))}
  </div>
));

const MemoizedRelatedProduct = React.memo(({ 
  product, 
  t 
}: { 
  product: any; 
  t: (key: string) => string; 
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="group"
  >
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden">
          <MemoizedProductImage
            src={product.image}
            alt={product.name}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-4">
        {product.category && (
          <Link
            href={`/category/${product.category
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">
              {product.category}
            </span>
          </Link>
        )}

        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-lg mt-1 group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mt-2">
          <MemoizedStarRating rating={product.rating} />
          <span className="text-sm text-gray-500 ml-1">
            ({product.rating})
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-lg">
            {formatCurrency(product.price)}
          </span>
          <Link href={`/product/${product.slug}`}>
            <Button
              size="sm"
              className="bg-amber-600 hover:bg-amber-700"
            >
              {t("viewDetails")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
));

// Helper function to get cached product data
const getCachedProduct = (slug: string) => {
  const cacheKey = `product_${slug}`;
  if (productCache.has(cacheKey)) {
    return productCache.get(cacheKey);
  }
  
  const product = products.find((p) => p.slug === slug);
  if (product) {
    productCache.set(cacheKey, product);
  }
  return product;
};

// Helper function to get cached related products
const getCachedRelatedProducts = (product: any) => {
  const cacheKey = `related_${product.id}`;
  if (relatedProductsCache.has(cacheKey)) {
    return relatedProductsCache.get(cacheKey);
  }
  
  const related = product.relatedProducts
    ? products.filter((p) => product.relatedProducts.includes(p.id))
    : products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);
        
  relatedProductsCache.set(cacheKey, related);
  return related;
};

export default function ProductClientPage({
  slug,
}: {slug: string}) {
  console.log("Slug in PCP "+ slug);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { t } = useLanguage();
  const pathname = usePathname();
  
  // Memoized values for better performance
  const baseUrl = useMemo(() => 
    typeof window !== "undefined" ? window.location.origin : "", 
    []
  );
  
  const fullUrl = useMemo(() => `${baseUrl}${pathname}`, [baseUrl, pathname]);
  
  // Use cached product data
  // const product = useMemo(() => getCachedProduct(slug), [slug]);
  const product = products.find((p) => p.slug === slug);
  // Memoized product images
  const productImages = useMemo(() => [
    product?.image,
    "/placeholder.svg?height=500&width=500&text=Image+2",
    "/placeholder.svg?height=500&width=500&text=Image+3",
    "/placeholder.svg?height=500&width=500&text=Image+4",
  ], [product?.image]);
  
  // Memoized related products
  const relatedProducts = useMemo(() => 
    product ? getCachedRelatedProducts(product) : [], 
    [product]
  );
  
  // Memoized product keywords for SEO
  const productKeywords = useMemo(() => {
    if (!product) return "";
    return [
      product.name,
      product.category,
      "premium drinks",
      "buy online",
      "Cameroon",
      ...Object.values(product.details || {}).map(String),
    ].join(", ");
  }, [product]);

  if (!product) {
    notFound();
  }

  // SEO: Update page title when component mounts (cached)
  useEffect(() => {
    const title = `${product.name} | Premium ${product.category} | Jong Market`;
    if (document.title !== title) {
      document.title = title;
    }
  }, [product]);

  // Memoized handlers for better performance
  const handleQuantityChange = useCallback((value: number) => {
    if (value < 1) return;
    if (product.inStock && value > product.stockCount) return;
    setQuantity(value);
  }, [product.inStock, product.stockCount]);

  const handleAddToCart = useCallback(() => {
    if (!product.inStock) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  }, [product, quantity, addToCart, toast]);

  return (
    <>
      {/* Structured Data for SEO */}
      <ProductSchema product={product} url={fullUrl} />
      <Toaster />

      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-amber-600">
            {t("home")}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          {product.category && (
            <>
              <Link
                href={`/category/${product.category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="hover:text-amber-600"
              >
                {product.category}
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
            </>
          )}
          <span className="text-gray-700 font-medium">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="relative aspect-square h-80 md:h-96 rounded-lg overflow-hidden bg-white shadow-md flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full flex items-center justify-center"
                >
                  <MemoizedProductImage
                    src={productImages[activeImage]}
                    alt={`${product.name} - ${product.category} - Premium quality`}
                    priority={true}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex space-x-2 md:space-x-4 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative h-16 w-16 md:h-20 md:w-20 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === index
                      ? "border-amber-500 shadow-md"
                      : "border-gray-200"
                  }`}
                  aria-label={`View image ${index + 1} of ${product.name}`}
                >
                  <MemoizedProductImage
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              {product.category && (
                <Link
                  href={`/category/${product.category
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <span className="text-sm font-medium text-amber-600 uppercase tracking-wider">
                    {product.category}
                  </span>
                </Link>
              )}
              <h1 className="text-3xl md:text-4xl font-bold mt-1">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center">
              <MemoizedStarRating rating={product.rating} />
              <span className="text-gray-500 ml-2">({product.rating})</span>
              {product.reviews && (
                <span className="text-gray-500 ml-2">
                  {product.reviews.length} reviews
                </span>
              )}
            </div>

            <div className="flex items-center">
              <span className="text-3xl font-bold text-amber-600">
                {formatCurrency(product.price)}
              </span>
            </div>

            <div className="flex items-center">
              {product.inStock ? (
                <div className="flex items-center text-green-600">
                  <Check className="h-5 w-5 mr-2" />
                  <span className="font-medium">{t("inStock")}</span>
                  <span className="text-gray-500 ml-2">
                    ({product.stockCount} {t("available")})
                  </span>
                </div>
              ) : (
                <div className="flex items-center text-red-500">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span className="font-medium">{t("outOfStock")}</span>
                </div>
              )}
            </div>

            <div className="border-t border-b py-6 my-6">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.details && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="text-gray-500 capitalize w-24">
                      {key}:
                    </span>
                    <span className="font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-6 space-y-6">
              {product.inStock && (
                <div className="flex items-center">
                  <span className="mr-4 font-medium">{t("quantity")}:</span>
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stockCount}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="ml-4 text-sm text-gray-500">
                    {t("maximum")}: {product.stockCount}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <Button
                  className="flex-1 bg-amber-600 hover:bg-amber-700"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.inStock ? t("addToCart") : t("outOfStock")}
                </Button>

                <WishlistButton product={product} />

                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  aria-label="Share product"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">
                Details & Specifications
              </TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent
              value="description"
              className="p-6 bg-white rounded-lg shadow-sm mt-4"
            >
              <h2 className="text-xl font-semibold mb-4">
                Product Description
              </h2>
              <div itemScope itemProp="description">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-8">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <MemoizedProductImage
                    src="/placeholder.svg?height=600&width=800"
                    alt={`${product.name} lifestyle image - Premium quality ${product.category}`}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Why Choose {product.name}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                      <span>Premium quality from trusted producers</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                      <span>Authentic flavor profile and character</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                      <span>Perfect for special occasions or gifting</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                      <span>
                        Carefully stored and handled for optimal quality
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="details"
              className="p-6 bg-white rounded-lg shadow-sm mt-4"
            >
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>

              {product.details && (
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div
                      key={key}
                      className="border-b pb-3"
                      itemProp={key.toLowerCase()}
                    >
                      <span className="text-gray-500 capitalize block mb-1">
                        {key}
                      </span>
                      <span className="font-medium">{String(value)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">
                  Shipping & Returns
                </h3>
                <p className="text-gray-700 mb-4">
                  We ship to all major cities within 2-5 business days.
                  International shipping is available for select countries.
                  Returns are accepted within 30 days of purchase for unopened
                  items in original packaging.
                </p>

                <h3 className="text-lg font-semibold mb-3 mt-6">
                  Storage Recommendations
                </h3>
                <p className="text-gray-700">
                  For optimal quality, store in a cool, dark place away from
                  direct sunlight. Once opened, consume within the recommended
                  timeframe for the best experience.
                </p>
              </div>
            </TabsContent>

            <TabsContent
              value="reviews"
              className="p-6 bg-white rounded-lg shadow-sm mt-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Customer Reviews</h2>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  Write a Review
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="col-span-1 bg-amber-50 p-6 rounded-lg">
                  <div className="text-center mb-4">
                    <div className="text-5xl font-bold text-amber-600 mb-2">
                      {product.rating}
                    </div>
                    <div className="flex justify-center text-amber-500 mb-2">
                      <MemoizedStarRating rating={product.rating} />
                    </div>
                    <p className="text-gray-600">
                      Based on {product.reviews?.length || 0} reviews
                    </p>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count =
                        product.reviews?.filter(function(r: any) { return r.rating === star })
                          .length || 0;
                      const percentage = product.reviews?.length
                        ? (count / product.reviews.length) * 100
                        : 0;

                      return (
                        <div key={star} className="flex items-center">
                          <div className="flex items-center w-24">
                            <span className="text-sm mr-2">{star} stars</span>
                          </div>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-500 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm ml-2 w-12 text-right">
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="col-span-2">
                  {product.reviews && product.reviews.length > 0 ? (
                    <div className="space-y-6">
                      {product.reviews.map(function(review: any) {
                        return (
                          <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="border-b pb-6 last:border-b-0"
                            itemScope
                            itemType="https://schema.org/Review"
                          >
                            <div className="flex items-center mb-3">
                              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold mr-3">
                                {review.name.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-medium" itemProp="author">
                                  {review.name}
                                </h4>
                                <div className="flex items-center">
                                  <div
                                    className="flex text-amber-500 mr-2"
                                    itemProp="reviewRating"
                                    itemScope
                                    itemType="https://schema.org/Rating"
                                  >
                                    <span
                                      itemProp="ratingValue"
                                      content={review.rating.toString()}
                                    />
                                    <MemoizedStarRating rating={review.rating} />
                                  </div>
                                  <span
                                    className="text-gray-500 text-sm"
                                    itemProp="datePublished"
                                  >
                                    {review.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700" itemProp="reviewBody">
                              {review.comment}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        No reviews yet. Be the first to review this product!
                      </p>
                      <Button className="bg-amber-600 hover:bg-amber-700">
                        Write a Review
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(function(relatedProduct: any) {
                return (
                  <MemoizedRelatedProduct
                    key={relatedProduct.id}
                    product={relatedProduct}
                    t={t}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Export for static generation (add to your page.tsx file)
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Add metadata generation for better SEO caching
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = getCachedProduct(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Premium ${product.category} | Jong Market`,
    description: product.description,
    keywords: [
      product.name,
      product.category,
      'premium drinks',
      'buy online',
      'Cameroon'
    ].join(', '),
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}