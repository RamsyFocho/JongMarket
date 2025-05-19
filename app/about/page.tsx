"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Award, Users, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600&text=About+Jong+Market"
          alt="About Jong Market"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                About Us
              </h1>
              <p className="text-xl text-white/80">
                Premium drinks and accessories for the discerning connoisseur
                since 2010.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-amber-600">
            {t("home")}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-700 font-medium">{t("about")}</span>
        </div>
      </div>

      {/* About Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">About Us</h2>
              <p className="text-gray-600 mb-4">
                Discover Premium Wines, Beers, Spirits & Mixers at Jong market
                Proudly independent and based in the heart of Cameroon, Jong
                market is your go-to destination for the finest selection of
                alcoholic beverages. We are committed to providing exceptional
                service with quick order processing and delivery across Cameroon
                and to other African countries.
              </p>
              <p className="text-gray-600 mb-4">
                Our passion lies in sourcing unique, rare, and hard-to-find
                spirits. From exceptional single malt whiskies and premium gins
                to rare rums and cocktail essentials, our carefully curated
                catalog features one of the most extensive drink selections
                you’ll find anywhere in the world.
              </p>
              <p className="text-gray-600">
                Our online alcohol store is constantly growing, with new
                additions added regularly. If you're searching for a specific
                product and can’t find it on our website, just reach out—we’ll
                go the extra mile to help you locate it.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src="/placeholder.svg?height=800&width=800&text=Our+Story"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Jong Market was founded in 2010 with a simple mission: to
                provide premium quality drinks and accessories to enthusiasts
                and connoisseurs. What started as a small boutique store has
                grown into a trusted destination for those seeking exceptional
                beverages and related products.
              </p>
              <p className="text-gray-600 mb-4">
                Our founder, John Jong, a passionate beverage enthusiast,
                noticed a gap in the market for high-quality, curated drinks
                that came with expert knowledge and guidance. He assembled a
                team of like-minded individuals who shared his passion and
                expertise.
              </p>
              <p className="text-gray-600">
                Today, we pride ourselves on offering an extensive selection of
                premium whiskeys, wines, craft beers, champagnes, and
                accessories, all carefully selected by our team of experts. We
                continue to uphold our founding principles of quality,
                expertise, and exceptional customer service.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src="/placeholder.svg?height=800&width=800&text=Our+Story"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At Jong Market, we're guided by a set of core values that define
              who we are and how we operate.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality</h3>
              <p className="text-gray-600">
                We are committed to offering only the finest products, carefully
                selected and vetted by our team of experts. We never compromise
                on quality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We strive to
                provide exceptional service, expert advice, and a personalized
                shopping experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Integrity</h3>
              <p className="text-gray-600">
                We operate with honesty, transparency, and ethical practices. We
                believe in building trust through every interaction and
                transaction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of passionate experts is dedicated to bringing you the
              finest selection of premium drinks.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: "John Jong",
                role: "Founder & CEO",
                image: "/placeholder.svg?height=400&width=400&text=John+Jong",
              },
              {
                name: "Sarah Williams",
                role: "Head Sommelier",
                image:
                  "/placeholder.svg?height=400&width=400&text=Sarah+Williams",
              },
              {
                name: "Michael Chen",
                role: "Whiskey Specialist",
                image:
                  "/placeholder.svg?height=400&width=400&text=Michael+Chen",
              },
              {
                name: "Emma Rodriguez",
                role: "Customer Experience Manager",
                image:
                  "/placeholder.svg?height=400&width=400&text=Emma+Rodriguez",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Visit Our Store</h2>
              <p className="mb-6">
                We invite you to visit our flagship store to explore our
                extensive collection of premium drinks and accessories. Our
                knowledgeable staff is always ready to assist you and provide
                expert recommendations.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold">Address</h3>
                    <p>
                      Avenue des Banques, Douala Cameroon Bonamoussadi Immeuble
                      K Homes
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold">Opening Hours</h3>
                    <p>Monday - Friday: 9AM - 8PM</p>
                    <p>Saturday: 10AM - 6PM</p>
                    <p>Sunday: 12PM - 5PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/contact">
                  <Button className="bg-white text-amber-600 hover:bg-white/90">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=800&width=800&text=Our+Store"
                alt="Our Store"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
