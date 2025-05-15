"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Tag, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/data/products"
import { useLanguage } from "@/context/language-context"

// Mock promotions data
const promotions = [
  {
    id: 1,
    title: "Summer Wine Collection",
    description: "Get 20% off on our curated selection of summer wines",
    image: "/images/promotions/summer-wine.jpg",
    discount: "20%",
    originalPrice: 299.99,
    discountedPrice: 239.99,
    endsIn: "7 days",
    link: "/promotions/summer-wine",
  },
  {
    id: 2,
    title: "Whiskey Tasting Set",
    description: "Premium whiskey tasting set with 5 different varieties",
    image: "/images/promotions/whiskey-tasting.jpg",
    discount: "15%",
    originalPrice: 149.99,
    discountedPrice: 127.49,
    endsIn: "3 days",
    link: "/promotions/whiskey-tasting",
  },
  {
    id: 3,
    title: "Cocktail Accessories Bundle",
    description: "Complete set of premium cocktail making tools and accessories",
    image: "/images/promotions/cocktail-accessories.jpg",
    discount: "25%",
    originalPrice: 89.99,
    discountedPrice: 67.49,
    endsIn: "5 days",
    link: "/promotions/cocktail-accessories",
  },
]

export default function SpecialPromotions() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-16 bg-white">
      <div className="w-70% ml4 m4-4 px-4 ">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-2">
            <Tag className="h-5 w-5 text-amber-600 mr-2" />
            <h2 className="text-3xl font-bold">{t("specialPromotions")}</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("specialPromotionsDesc")}</p>
          <div className="mt-4">
            <Link href="/promotions">
              <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                {t("viewAllDeals")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {promotions.map((promo) => (
            <motion.div key={promo.id} variants={itemVariants} className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative">
                  <Link href={promo.link}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={promo.image || "/placeholder.svg?height=300&width=400"}
                        alt={promo.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    {t("limitedTimeOffer")}
                  </div>
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    -{promo.discount}
                  </div>
                </div>

                <div className="p-4">
                  <Link href={promo.link}>
                    <h3 className="font-semibold text-lg group-hover:text-amber-600 transition-colors">
                      {promo.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">{promo.description}</p>

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-gray-500 line-through text-sm">{formatCurrency(promo.originalPrice)}</span>
                      <span className="font-bold text-lg text-amber-600 ml-2">
                        {formatCurrency(promo.discountedPrice)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>
                        {t("endsIn")} {promo.endsIn}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link href={promo.link}>
                      <Button className="w-full bg-amber-600 hover:bg-amber-700">{t("viewDeal")}</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
