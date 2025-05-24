import Link from "next/link";
import Hero from "@/components/home/hero";
import Sidebar from "@/components/layout/sidebar";
import TrendingDrinks from "@/components/home/trending-drinks";
import FeaturedCategories from "@/components/home/featured-categories";
import SpecialPromotions from "@/components/home/special-promotions";
import BeerShowOut from "@/components/home/beerShowOut";
import CategoryGallery from "@/components/home/category-gallery";
import AnimatedVideo from "@/components/home/animated-video";
import MoreInfo from "@/components/home/moreInfo";
import DrinkAccessories from "@/components/home/drinkAccessories";
import { categories } from "@/data/products";
import FeaturedDrinks from "@/components/home/featured-drinks";


// Define menu categories for the header

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
            <FeaturedDrinks />
            <FeaturedCategories />
            {/* <OffersDrinks /> */}
            <SpecialPromotions />
            <CategoryGallery />
            {/* Animated Video Section */}
            <AnimatedVideo />
          </main>
        </div>
      </div>

      <MoreInfo />
      <BeerShowOut/>
      <DrinkAccessories/>
    </div>
  );
}
