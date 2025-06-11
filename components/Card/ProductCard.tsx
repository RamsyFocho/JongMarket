import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

import StarRating from "./StarRating";
import { formatCurrency } from "@/lib/format-currency";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { toast } from "react-toastify";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  rating: number;
  badges: string[];
  isInStock: boolean;
  category?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  React.useEffect(() => {
    setIsWishlisted(isInWishlist(product.id));
  }, [isInWishlist, product.id]);

  const getBadgeStyle = (badge: string) => {
    const styles: Record<string, string> = {
      featured: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white',
      new: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
      sale: 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
      'best seller': 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white',
      limited: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
      'sold-out': 'bg-gray-500 text-white',
      organic: 'bg-gradient-to-r from-green-600 to-lime-600 text-white',
      'hot deal': 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
    };
    return styles[badge.toLowerCase()] || 'bg-gray-500 text-white';
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      slug: product.slug,
    });
    toast(
      <div>
        <strong>Added to Cart</strong>
        <div>{product.name} has been added to your cart.</div>
      </div>
    );
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
      
      toast(
        <div>
          <strong>Removed from wishlist</strong>
          <div>{product.name} has been removed from your wishlist.</div>
        </div>
      );
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug,
        category: product.category,
        rating: product.rating,
      });      
      toast(
        <div>
          <strong>Added to wishlist</strong>
          <div>{product.name} has been added to your wishlist.</div>
        </div>
      );
    }
    setIsWishlisted(!isWishlisted);
  };

  // Defensive guard: do not render if product is missing or incomplete
  if (!product || !product.id || !product.name || !product.image || typeof product.price !== 'number') {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">
        Product data is missing or invalid.
      </div>
    );
  }

  return (
    <div className=" group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
    {/* // <div className=" group relative bg-white border-2 border-red-500 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"> */}
      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
        {product.badges.map((badge, index) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs font-bold rounded ${getBadgeStyle(
              badge
            )}`}
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Product Image & Info as Link */}
      <Link
        href={`/product/${product.slug}`}
        className="block group/product-link"
        title={product.name}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />

          {/* Hover overlay with buttons */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end justify-center opacity-0 group-hover:opacity-100">
            <div className="w-full p-4 flex gap-2">
              <button
                type="button"
                title="Add to cart"
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden md:block">Add to Cart</span>
              </button>
              <button
                type="button"
                title={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                onClick={toggleWishlist}
                className="p-2 bg-white rounded-sm shadow-md hover:bg-gray-50 transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 leading-tight hover:text-amber-600 hover:font-bold">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mb-3">
            <StarRating rating={product.rating} />
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-red-600">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
