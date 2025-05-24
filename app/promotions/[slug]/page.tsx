"use client"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/data/products"
import { useLanguage } from "@/context/language-context"
import React from "react"
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useToast } from "@/hooks/use-toast";
import { Heart, ShoppingCart } from "lucide-react";
import { promotions } from "@/data/products"

export default function PromotionDetailPage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  // Unwrap params if it's a Promise (Next.js 14+)
  let resolvedParams: { slug: string };
  if (typeof (params as any).then === "function") {
    resolvedParams = React.use(params as Promise<{ slug: string }>);
  } else {
    resolvedParams = params as { slug: string };
  }
  const promo = promotions.find((p) => p.slug === resolvedParams.slug);
  if (!promo) return notFound();

  // Add to cart handler
  const handleAddToCart = () => {
    addToCart({
      id: promo.id,
      name: promo.title,
      price: promo.discountedPrice,
      image: promo.image,
      quantity: 1,
    });
    toast({
      title: t("addedToCart") || "Added to cart",
      description: `${promo.title} ${t("hasBeenAddedToCart") || "has been added to your cart."}`,
    });
  };

  // Wishlist toggle handler
  const handleWishlist = () => {
    if (isInWishlist(promo.id)) {
      removeFromWishlist(promo.id);
      toast({
        title: t("removedFromWishlist") || "Removed from wishlist",
        description: `${promo.title} ${t("removedFromWishlistDesc") || "has been removed from your wishlist."}`,
      });
    } else {
      addToWishlist({
        id: promo.id,
        name: promo.title,
        price: promo.discountedPrice,
        image: promo.image,
        slug: promo.slug,
        category: promo.category,
      });
      toast({
        title: t("AddedToWishlist") || "Added to wishlist",
        description: `${promo.title} ${t("hasBeenAddedToWishlist") || "has been added to your wishlist."}`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-amber-600">{t("home") || "Home"}</Link>
        <span className="mx-2">/</span>
        <Link href="/promotions" className="hover:text-amber-600">{t("specialPromotions") || "Promotions"}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{promo.title}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] w-full max-w-lg mx-auto">
          <Image
            src={promo.image}
            alt={promo.title}
            fill
            className="object-contain rounded-lg shadow-lg bg-white"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{promo.title}</h1>
          <div className="mb-4 text-lg text-gray-700">{promo.description}</div>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">-{promo.discount}</span>
            <span className="text-gray-500 line-through text-lg">{formatCurrency(promo.originalPrice)}</span>
            <span className="font-bold text-2xl text-amber-600">{formatCurrency(promo.discountedPrice)}</span>
          </div>
          <div className="mb-6 text-gray-500">{t("endsIn") || "Ends in"} {promo.endsIn}</div>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              className="bg-amber-600 hover:bg-amber-700 flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {t("addToCart") || "Add to Cart"}
            </Button>
            <Button
              variant={isInWishlist(promo.id) ? "secondary" : "outline"}
              className={isInWishlist(promo.id) ? "text-red-600 border-red-200 flex-1" : "flex-1"}
              onClick={handleWishlist}
              title={isInWishlist(promo.id) ? t("removeFromWishlist") || "Remove from wishlist" : t("addToWishlist") || "Add to wishlist"}
            >
              <Heart className={`h-5 w-5 mr-2 ${isInWishlist(promo.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
              {isInWishlist(promo.id) ? t("inWishlist") || "In Wishlist" : t("addToWishlist") || "Add to Wishlist"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
