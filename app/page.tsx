import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { categories } from "@/data/products";

// const Hero = dynamic(() => import("@/components/home/hero"));
const HHero = dynamic(() => import("@/components/home/HHero"));
const Sidebar = dynamic(() => import("@/components/layout/sidebar"));
const TrendingDrinks = dynamic(
  () => import("@/components/home/trending-drinks")
);
const FeaturedDrinks = dynamic(
  () => import("@/components/home/featured-drinks")
);
const FeaturedWine = dynamic(() => import("@/components/home/featured-wine"));
const VodkaSection = dynamic(() => import("@/components/home/VodkaSection"));
const GinSection = dynamic(() => import("@/components/home/GinSection"));
const ChampagneSection = dynamic(() => import("@/components/home/ChampagneSection"));
const SpiritSection = dynamic(() => import("@/components/home/SpiritSection"));
const FeaturedCategories = dynamic(
  () => import("@/components/home/featured-categories")
);
const SpecialPromotions = dynamic(
  () => import("@/components/home/special-promotions")
);
const CategoryGallery = dynamic(
  () => import("@/components/home/category-gallery")
);
const AnimatedVideo = dynamic(() => import("@/components/home/animated-video"));
const MoreInfo = dynamic(() => import("@/components/home/moreInfo"));
const BeerShowOut = dynamic(() => import("@/components/home/beerShowOut"));
const DrinkAccessories = dynamic(
  () => import("@/components/home/drinkAccessories")
);
const BrandsSection = dynamic(() => import("@/components/home/brandsSection"));

export default function HomePage() {
  return (
    <div>
      <div className="w-full md:mx-auto md:px-4 py-4 ">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Responsive and Professional */}
          <aside className="hidden lg:block md:w-64 lg:w-72 xl:w-80 flex-shrink-0">
            <Suspense fallback={<div>Loading sidebar...</div>}>
              <Sidebar className="h-full" />
            </Suspense>
          </aside>
          {/* Main Content */}
          <main className="flex-1  min-w-0">
            {/* Mobile-only category navigation */}
            <div className="md:hidden overflow-x-auto pb-4  -mx-4 px-4 ">
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
            <Suspense fallback={<div>Loading hero...</div>}>
              <HHero />
            </Suspense>
            <Suspense fallback={<div>Loading trending drinks...</div>}>
              <TrendingDrinks />
            </Suspense>
            <Suspense fallback={<div>Loading featured drinks...</div>}>
              <FeaturedDrinks />
            </Suspense>
            <Suspense fallback={<div>Loading featured beers...</div>}>
              <BeerShowOut />
            </Suspense>
            <Suspense fallback={<div>Loading featured wine...</div>}>
              <FeaturedWine />
            </Suspense>
            <Suspense fallback={<div>Loading featured vodka...</div>}>
              <VodkaSection />
            </Suspense>
            <Suspense fallback={<div>Loading featured gin...</div>}>
              <GinSection />
            </Suspense>
            <Suspense fallback={<div>Loading featured Chmpagne...</div>}>
              <ChampagneSection />
            </Suspense>
            <Suspense fallback={<div>Loading featured Chmpagne...</div>}>
              <SpiritSection />
            </Suspense>
            <Suspense fallback={<div>Loading featured categories...</div>}>
              <FeaturedCategories />
            </Suspense>
            <Suspense fallback={<div>Loading special promotions...</div>}>
              <SpecialPromotions />
            </Suspense>

            <Suspense fallback={<div>Loading animated video...</div>}>
              <AnimatedVideo />
            </Suspense>
          </main>
        </div>
      </div>
      <Suspense fallback={<div>Loading category gallery...</div>}>
        <CategoryGallery />
      </Suspense>
      <Suspense fallback={null}>
        <MoreInfo />
        <DrinkAccessories />
        {/* <Newsletter /> */}
        <BrandsSection />
      </Suspense>
    </div>
  );
}
