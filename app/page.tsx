"use client"

import { useEffect } from "react"
import Hero from "@/components/home/hero"
import CategoryGallery from "@/components/home/category-gallery"
import TrendingDrinks from "@/components/home/trending-drinks"
import FeaturedCategories from "@/components/home/featured-categories"
import SpecialPromotions from "@/components/home/special-promotions"
import Newsletter from "@/components/home/newsletter"
import { useLanguage } from "@/context/language-context"

export default function HomePage() {
  const { t } = useLanguage()


  return (
    <div>
      <Hero />
      <CategoryGallery />
      <TrendingDrinks />
      <FeaturedCategories />
      <SpecialPromotions />
      <Newsletter />
    </div>
  )
}
