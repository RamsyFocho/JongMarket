"use client"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/data/products"
import { useLanguage } from "@/context/language-context"

// Same mock data as in /promotions/page.tsx
const promotions = [
  {
    id: 1,
    slug: "summer-wine",
    title: "Summer Wine Collection",
    description: "Get 20% off on our curated selection of summer wines",
    image: "/images/promotions/summer-wine.jpg",
    discount: "20%",
    originalPrice: 299.99,
    discountedPrice: 239.99,
    endsIn: "7 days",
    category: "wine",
  },
  {
    id: 2,
    slug: "whiskey-tasting",
    title: "Whiskey Tasting Set",
    description: "Premium whiskey tasting set with 5 different varieties",
    image: "/images/promotions/whiskey-tasting.jpg",
    discount: "15%",
    originalPrice: 149.99,
    discountedPrice: 127.49,
    endsIn: "3 days",
    category: "whiskey",
  },
  {
    id: 3,
    slug: "cocktail-accessories",
    title: "Cocktail Accessories Bundle",
    description: "Complete set of premium cocktail making tools and accessories",
    image: "/images/promotions/cocktail-accessories.jpg",
    discount: "25%",
    originalPrice: 89.99,
    discountedPrice: 67.49,
    endsIn: "5 days",
    category: "accessories",
  },
  {
    id: 4,
    slug: "craft-beer",
    title: "Craft Beer Selection",
    description: "Explore our handpicked selection of craft beers from around the world",
    image: "/images/promotions/craft-beer.jpg",
    discount: "10%",
    originalPrice: 79.99,
    discountedPrice: 71.99,
    endsIn: "10 days",
    category: "beer",
  },
  {
    id: 5,
    slug: "champagne-bundle",
    title: "Premium Champagne Bundle",
    description: "Celebrate in style with our premium champagne selection",
    image: "/images/promotions/champagne-bundle.jpg",
    discount: "15%",
    originalPrice: 399.99,
    discountedPrice: 339.99,
    endsIn: "4 days",
    category: "champagne",
  },
  {
    id: 6,
    slug: "coffee-package",
    title: "Coffee Lovers Package",
    description: "Premium coffee beans and accessories for the perfect brew",
    image: "/images/promotions/coffee-package.jpg",
    discount: "20%",
    originalPrice: 129.99,
    discountedPrice: 103.99,
    endsIn: "6 days",
    category: "hot-drinks",
  },
]

export default function PromotionDetailPage({ params }: { params: { slug: string } }) {
  const { t } = useLanguage()
  const promo = promotions.find((p) => p.slug === params.slug)
  if (!promo) return notFound()

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
          <Button className="bg-amber-600 hover:bg-amber-700 w-full md:w-auto">{t("shopNow") || "Shop Now"}</Button>
        </div>
      </div>
    </div>
  )
}
