import Link from "next/link"
import Hero from "@/components/home/hero"
import Sidebar from "@/components/layout/sidebar"
import TrendingDrinks from "@/components/home/trending-drinks"
import FeaturedCategories from "@/components/home/featured-categories"
import SpecialPromotions from "@/components/home/special-promotions"
import Newsletter from "@/components/home/newsletter"
import CategoryGallery from "@/components/home/category-gallery"
import AnimatedVideo from "@/components/home/animated-video"
import MoreInfo from "@/components/home/moreInfo"
import { categories } from "@/data/products"

// Define menu categories for the header
const menuCategories = [
  {
    name: "Gin",
    slug: "gin",
    subcategories: [
      { name: "London Dry Gin", slug: "london-dry" },
      { name: "Plymouth Gin", slug: "plymouth" },
      { name: "Old Tom Gin", slug: "old-tom" },
      { name: "Navy Strength Gin", slug: "navy-strength" },
    ],
  },
  {
    name: "Whisky",
    slug: "whiskey",
    subcategories: [
      { name: "American (including Bourbon & Rye)", slug: "american" },
      { name: "Blended", slug: "blended" },
      { name: "Blended Malt", slug: "blended-malt" },
      { name: "Deluxe Premium", slug: "deluxe-premium" },
      { name: "Irish", slug: "irish" },
      { name: "Japanese", slug: "japanese" },
      { name: "Malts", slug: "malts" },
    ],
  },
  {
    name: "Vodka",
    slug: "vodka",
    subcategories: [
      { name: "Smirnoff", slug: "smirnoff" },
      { name: "Grey Goose", slug: "grey-goose" },
      { name: "Absolut", slug: "absolut" },
      { name: "Glen's", slug: "glens" },
      { name: "Ciroc", slug: "ciroc" },
      { name: "Russian Standard", slug: "russian-standard" },
    ],
  },
  {
    name: "Champagne & Sparkling",
    slug: "champagne",
    subcategories: [
      { name: "Champagne", slug: "champagne" },
      { name: "Prosecco", slug: "prosecco" },
      { name: "Cava", slug: "cava" },
      { name: "Sparkling Wine", slug: "sparkling-wine" },
    ],
  },
  {
    name: "Wines",
    slug: "wine",
    subcategories: [
      { name: "Red Wine", slug: "red" },
      { name: "White Wine", slug: "white" },
      { name: "Rosé Wine", slug: "rose" },
      { name: "Dessert Wine", slug: "dessert" },
    ],
  },
  {
    name: "Beers, Ales & Ciders",
    slug: "beer",
    subcategories: [
      { name: "Lager", slug: "lager" },
      { name: "Ale", slug: "ale" },
      { name: "Stout", slug: "stout" },
      { name: "IPA", slug: "ipa" },
      { name: "Cider", slug: "cider" },
    ],
  },
  {
    name: "Liqueurs",
    slug: "liqueurs",
    subcategories: [
      { name: "Cream Liqueurs", slug: "cream" },
      { name: "Fruit Liqueurs", slug: "fruit" },
      { name: "Coffee Liqueurs", slug: "coffee" },
      { name: "Herbal Liqueurs", slug: "herbal" },
    ],
  },
]

export default function HomePage() {
  return (
    <div>
       {/* <Hero />  */}

      <div className="w-full mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Responsive and Professional */}
          <aside className="hidden md:block md:w-64 lg:w-72 xl:w-80 flex-shrink-0">
            <Sidebar className="h-full" />
          </aside>

          {/* Main Content */}
          <main className="flex-1  min-w-0">
            {/* Mobile-only category navigation */}
            <div className="md:hidden overflow-x-auto pb-4 mb-6 -mx-4 px-4 ">
              <div className="flex space-x-3">
                {Object.entries(categories).map(([slug, data]) => (
                  <Link
                    key={slug}
                    href={`/category/${slug}`}
                    className="flex-shrink-0 bg-white shadow-sm border px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-50"
                  >
                    {data.title}
                  </Link>
                ))}
              </div>
            </div>
            <Hero /> 
            <TrendingDrinks />
            <FeaturedCategories />
            <SpecialPromotions />
            <CategoryGallery />
          </main>
        </div>
      </div>

      {/* Animated Video Section */}
      <AnimatedVideo />
      <MoreInfo/>
      <Newsletter />
    </div>
  )
}
