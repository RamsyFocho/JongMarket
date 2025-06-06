"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import Link from 'next/link';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const HHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const slides = [
    {
      id: 1,
      title: "Exceptional Whiskey Collection",
      subtitle:
        "Discover our premium selection of rare and aged whiskeys from around the world",
      cta: "Explore Whiskeys",
      url: "/category/whiskey",
      imageUrl:
        "https://readdy.ai/api/search-image?query=Premium%20aged%20whiskey%20bottles%20displayed%20elegantly%20on%20dark%20wooden%20shelf%20with%20soft%20golden%20lighting%2C%20crystal%20glasses%20with%20ice%2C%20luxury%20bar%20setting%20with%20blurred%20background%2C%20professional%20product%20photography%20with%20dramatic%20lighting&width=1920&height=1080&seq=1&orientation=landscape",
    },
    {
      id: 2,
      title: "Artisanal Craft Spirits",
      subtitle:
        "Handcrafted spirits made with passion and tradition by master distillers",
      cta: "Shop Craft Spirits",
      url: "/category/spirits",
      imageUrl:
        "https://readdy.ai/api/search-image?query=Artisanal%20craft%20gin%20and%20vodka%20bottles%20arranged%20on%20rustic%20wooden%20table%20with%20botanical%20ingredients%2C%20copper%20distilling%20equipment%20in%20background%2C%20soft%20moody%20lighting%20with%20golden%20accents%2C%20professional%20product%20photography%20with%20shallow%20depth%20of%20field&width=1920&height=1080&seq=2&orientation=landscape",
    },
    {
      id: 3,
      title: "Luxury Wine Collection",
      subtitle:
        "Exquisite wines from prestigious vineyards, perfect for connoisseurs and special occasions",
      cta: "View Wine Selection",
      url: "/category/wine",
      imageUrl:
        "https://readdy.ai/api/search-image?query=Luxury%20wine%20bottles%20and%20glasses%20in%20elegant%20cellar%20setting%2C%20vintage%20red%20wines%20displayed%20with%20soft%20dramatic%20lighting%2C%20wine%20barrels%20in%20background%2C%20professional%20product%20photography%20with%20rich%20colors%20and%20contrast%2C%20sophisticated%20atmosphere&width=1920&height=1080&seq=3&orientation=landscape",
    },
    {
      id: 4,
      title: "Exclusive Limited Editions",
      subtitle:
        "Rare and limited release spirits that define exceptional taste and craftsmanship",
      cta: "Discover Limited Editions",
      url: "/products",
      imageUrl:
        "https://readdy.ai/api/search-image?query=Exclusive%20limited%20edition%20liquor%20bottles%20with%20luxury%20packaging%20and%20gold%20details%2C%20displayed%20on%20black%20marble%20counter%20with%20subtle%20spotlighting%2C%20elegant%20environment%20with%20blurred%20bar%20background%2C%20professional%20product%20photography%20with%20dramatic%20lighting&width=1920&height=1080&seq=4&orientation=landscape",
    },
  ];

  return (
    <div className="bg-white">
      {/* <header className="absolute top-0 left-0 right-0 z-10 bg-transparent">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-white font-bold text-2xl">LUXE SPIRITS</div>
          <nav className="hidden md:flex space-x-8">
            {["Shop", "Collections", "About", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white hover:text-[#C4A484] transition-colors duration-300 cursor-pointer whitespace-nowrap"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-[#C4A484] transition-colors duration-300 cursor-pointer !rounded-button whitespace-nowrap">
              <i className="fas fa-search text-xl"></i>
            </button>
            <button className="text-white hover:text-[#C4A484] transition-colors duration-300 cursor-pointer !rounded-button whitespace-nowrap">
              <i className="fas fa-user text-xl"></i>
            </button>
            <button className="text-white hover:text-[#C4A484] transition-colors duration-300 cursor-pointer !rounded-button whitespace-nowrap">
              <i className="fas fa-shopping-cart text-xl"></i>
            </button>
            <button className="md:hidden text-white hover:text-[#C4A484] transition-colors duration-300 cursor-pointer !rounded-button whitespace-nowrap">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header> */}

      <section
        className={`hero-section relative h-[80vh] w-full overflow-hidden transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Swiper
          modules={[Pagination, Navigation, Autoplay, EffectFade]}
          effect="fade"
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="h-full w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="relative">
              <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.imageUrl})` }}
              ></div>
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="container mx-auto px-6 md:px-12">
                  <div className="md:max-w-[50%] text-center md:text-left">
                    <h1
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 opacity-0 animate-fadeIn"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        animation: "fadeIn 1s ease forwards 0.3s",
                      }}
                    >
                      {slide.title}
                    </h1>
                    <p
                      className="text-lg md:text-xl lg:text-2xl text-white mb-8 opacity-0 animate-fadeIn"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        animation: "fadeIn 1s ease forwards 0.6s",
                      }}
                    >
                      {slide.subtitle}
                    </p>
                    <Link href={slide.url}>
                    <button
                      className="px-8 py-3 bg-transparent hover:bg-[#C4A484] text-white border-2 border-[#C4A484] transition-all duration-300 text-base md:text-lg font-medium opacity-0 animate-fadeIn cursor-pointer !rounded-button whitespace-nowrap"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        animation: "fadeIn 1s ease forwards 0.9s",
                      }}
                    >
                      {slide.cta}
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Whiskey", "Vodka", "Gin", "Wine"].map((category) => (
              <div
                key={category}
                className="group relative overflow-hidden rounded-lg shadow-lg h-80 cursor-pointer"
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 z-10 group-hover:bg-opacity-50 transition-all duration-300"></div>
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage: `url(https://readdy.ai/api/search-image?query=Premium%20$%7Bcategory.toLowerCase%28%29%7D%20bottle%20with%20elegant%20packaging%20on%20dark%20background%20with%20soft%20lighting%2C%20luxury%20product%20photography%20with%20dramatic%20shadows%20and%20highlights%2C%20professional%20composition&width=600&height=800&seq=${category}&orientation=portrait)`,
                  }}
                ></div>
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="text-center">
                    <h3
                      className="text-2xl font-bold text-white mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {category}
                    </h3>
                    <button className="px-6 py-2 bg-transparent hover:bg-[#C4A484] text-white border border-[#C4A484] transition-all duration-300 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap");

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: #f59e42 !important; /* amber-500 */
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          opacity: 1;
        }

        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.7 !important;
        }

        .swiper-pagination-bullet-active {
          background: #f59e42 !important; /* amber-500 */
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default HHero;
