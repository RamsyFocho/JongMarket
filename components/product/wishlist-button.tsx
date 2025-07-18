"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/wishlist-context";
import { toast } from "react-toastify";

interface WishlistButtonProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    slug: string;
    category?: string;
    rating?: number;
  };
  variant?: "icon" | "full";
}

export default function WishlistButton({
  product,
  variant = "full",
}: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  // const { toast } = useToast()
  const [isInWishlistState, setIsInWishlistState] = useState(
    isInWishlist(product.id)
  );

  const toggleWishlist = () => {
    if (isInWishlistState) {
      removeFromWishlist(product.id);
      setIsInWishlistState(false);
      toast(
        <div>
          <strong>Removed from wishlist</strong>
          <div>{product.name} has been removed from your wishlist.</div>
        </div>
      );
    } else {
      addToWishlist(product);
      setIsInWishlistState(true);
      toast(
        <div>
          <strong>Added to wishlist</strong>
          <div>{product.name} has been added to your wishlist.</div>
        </div>
      );
    }
  };

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        title="Add to Wishlist"
        size="icon"
        className={`h-9 w-9 rounded-full ${
          isInWishlistState ? "text-red-500" : "text-gray-500"
        }`}
        onClick={toggleWishlist}
      >
        <Heart
          className="h-5 w-5"
          fill={isInWishlistState ? "currentColor" : "none"}
        />
      </Button>
    );
  }

  return (
    <Button
      title="Add to wishlist"
      variant="outline"
      className={`flex-1 ${
        isInWishlistState
          ? "bg-red-50 text-red-600 border-red-200"
          : "text-gray-700"
      }`}
      onClick={toggleWishlist}
    >
      <Heart
        className={`h-5 w-5 mr-2 ${
          isInWishlistState ? "text-red-500" : "text-gray-500"
        }`}
        fill={isInWishlistState ? "currentColor" : "none"}
      />
      {isInWishlistState ? "In Wishlist" : "Add to Wishlist"}
    </Button>
  );
}
