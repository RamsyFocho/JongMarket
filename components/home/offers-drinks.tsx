"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/data/products";

// Helper to generate slug from name
const slugify = (str: string) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const offers = [
  {
    name: "Kopparberg Flavoured Vodka Trio 3 x 70cl",
    image: "/images/kopparberg-trio.jpg",
    price: 68.95,
    oldPrice: 74.95,
    sale: true,
    soldOut: false,
    reviews: null,
  },
  {
    name: "Dr Squid Gin 70cl",
    image: "/images/dr-squid-gin.jpg",
    price: 44.5,
    oldPrice: 49.95,
    sale: true,
    soldOut: false,
    reviews: { stars: 5, count: 1 },
  },
  {
    name: "Au Vodka Pineapple Crush 70cl",
    image: "/images/au-vodka-pineapple.jpg",
    price: 34.95,
    oldPrice: 39.95,
    sale: true,
    soldOut: false,
    reviews: { stars: 4, count: 3 },
  },
  // ... more offers
];

const OffersDrinks = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  // Tabination state
  const [currentTab, setCurrentTab] = useState(0);
  const [itemsPerTab, setItemsPerTab] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 1024) return 1;
      return 3;
    }
    return 3;
  });

  useEffect(() => {
    const updateItemsPerTab = () => {
      if (window.innerWidth < 1024) {
        setItemsPerTab(1);
      } else {
        setItemsPerTab(3);
      }
    };
    updateItemsPerTab();
    window.addEventListener('resize', updateItemsPerTab);
    return () => window.removeEventListener('resize', updateItemsPerTab);
  }, []);

  const totalTabs = Math.ceil(offers.length / itemsPerTab);
  const currentOffers = offers.slice(
    currentTab * itemsPerTab,
    (currentTab + 1) * itemsPerTab
  );

  // Wishlist toggle handler
  const handleWishlist = (offer: any) => {
    const id = slugify(offer.name);
    if (isInWishlist(id)) {
      removeFromWishlist(id);
      toast({
        title: "Removed from wishlist",
        description: `${offer.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist({ ...offer, id, slug: id });
      toast({
        title: "Added to wishlist",
        description: `${offer.name} has been added to your wishlist.`,
      });
    }
  };

  // Add to cart handler
  const handleAddToCart = (offer: any) => {
    const id = slugify(offer.name);
    addToCart({
      id,
      name: offer.name,
      price: offer.price,
      image: offer.image,
      quantity: 1,
    });
    toast({
      title: "Added to cart",
      description: `${offer.name} has been added to your cart.`,
    });
  };

  const goToPreviousTab = () => {
    setCurrentTab(prev => (prev > 0 ? prev - 1 : totalTabs - 1));
  };
  const goToNextTab = () => {
    setCurrentTab(prev => (prev < totalTabs - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with tab nav */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
            Special Offers
          </h2>
          {totalTabs > 1 && (
            <div className="flex gap-2">
              <button
                onClick={goToPreviousTab}
                className="p-2 rounded-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-600 transition-all duration-200"
                aria-label="Previous tab"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goToNextTab}
                className="p-2 rounded-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-600 transition-all duration-200"
                aria-label="Next tab"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        {/* Offers Grid */}
        <div className="relative">
          <div
            className="grid gap-8"
            style={{ gridTemplateColumns: `repeat(${currentOffers.length}, 1fr)` }}
          >
            {currentOffers.map((offer) => {
              const id = slugify(offer.name);
              const slug = id;
              return (
                <div
                  key={id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 relative flex flex-col"
                >
                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleWishlist(offer)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10"
                    title={isInWishlist(id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart
                      className={`h-5 w-5 ${isInWishlist(id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                    />
                  </button>
                  {/* Product Image */}
                  <div className="relative overflow-hidden rounded-t-lg h-48 bg-gray-100 flex items-center justify-center">
                    <Image
                      src={offer.image}
                      alt={offer.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 bg-white"
                    />
                    {/* Add to Cart & View More Buttons (on hover) */}
                    {!offer.soldOut && (
                      <div className="absolute bottom-2 left-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Button
                          onClick={() => handleAddToCart(offer)}
                          title="Add to cart"
                          className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium bg-amber-600 hover:bg-amber-700 rounded"
                        >
                          <ShoppingCart className="h-4 w-4" /> Add to Cart
                        </Button>
                        <Link href={`/product/${slug}`} className="flex-1">
                          <Button
                            variant="outline"
                            className="w-full flex items-center justify-center py-2 text-sm font-medium border-white hover:bg-white text-black rounded"
                            title="View details"
                          >
                            View More
                          </Button>
                        </Link>
                      </div>
                    )}
                    {offer.soldOut && (
                      <div className="absolute bottom-2 left-2 right-2 bg-gray-800 bg-opacity-80 text-white text-center py-2 rounded">
                        Sold Out
                      </div>
                    )}
                  </div>
                  {/* Product Info */}
                  <div className="p-4 text-center flex-1 flex flex-col justify-between">
                    <Link href={`/product/${slug}`}>
                      <div className="font-medium mb-2 hover:text-amber-600 transition-colors min-h-[2.5rem]">{offer.name}</div>
                    </Link>
                    {/* Reviews */}
                    {offer.reviews && (
                      <div className="flex items-center justify-center gap-1 text-yellow-400 text-sm my-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < offer.reviews.stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                          />
                        ))}
                        <span className="text-gray-500 ml-1">
                          {offer.reviews.count} review{offer.reviews.count > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                    {/* Price */}
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <span className="text-red-600 font-bold text-lg">
                        {formatCurrency(offer.price)}
                      </span>
                      <span className="text-gray-400 line-through">
                        {formatCurrency(offer.oldPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Tab Indicators */}
        {totalTabs > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalTabs }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTab(index)}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  index === currentTab
                    ? 'bg-gray-800 w-12'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to tab ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OffersDrinks;