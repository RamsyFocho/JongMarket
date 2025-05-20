"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const MoreInfo = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-amber-50/50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-amber-100/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="space-y-8">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Online Liquor Store in Cameroon
              <span className="block text-lg md:text-xl mt-2 text-gray-600 font-normal">
                Buy Premium Drinks, Spirits, Gin and Beer
              </span>
            </motion.h2>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-lg"
              >
                Jong Market is your go-to destination for the finest selection of
                wines, beers, spirits, and mixers—all available to order online and
                delivered right to your doorstep. With years of expertise in the
                beverage industry, we ensure a secure and seamless shopping
                experience.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-lg"
              >
                Whether you're planning a party, hosting a dinner, or marking a
                special occasion, we offer a one-stop shop for all your drink needs.
                Our loyal customers count on us to be a part of their most cherished
                moments.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-lg"
              >
                Raise a glass to a joyful holiday season across the Cameroon Mainland! 
                Discover our curated collection of gins, champagnes, wines, whiskies, 
                liqueurs, and beers—alongside a refreshing variety of soft drinks.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="pt-6"
              >
                <Link 
                  href="/products" 
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors font-semibold group"
                >
                  Explore our collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MoreInfo;
