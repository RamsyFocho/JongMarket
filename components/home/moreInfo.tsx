"use client";

import React from "react";
import { motion } from "framer-motion";

const moreInfo = () => {
  return (
    <div className="flex flex-col justify-center items-center p-2 border-2 border-yellow-500 bg-grey-300">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Online Liquor Store in Cameroon - Buy Drinks, Spirits, Gin and bear
        </h2>
        <p className="text-gray-600 mb-4">
          Jong Market is your go-to destination for the finest selection of
          wines, beers, spirits, and mixers—all available to order online and
          delivered right to your doorstep. With years of expertise in the
          beverage industry, we ensure a secure and seamless shopping
          experience.
        </p>
        <p className="text-gray-600 mb-4">
          Whether you're planning a party, hosting a dinner, or marking a
          special occasion, we offer a one-stop shop for all your drink needs.
          Our loyal customers count on us to be a part of their most cherished
          moments. Looking to buy spirits online? Look no further—we’ve got you
          covered.
        </p>
        <p className="text-gray-600">
          Raise a glass to a joyful holiday season and a romantic Valentine’s
          Day across the Cameroon Mainland! Discover our curated collection of
          gins, champagnes, wines, whiskies, liqueurs, and beers—alongside a
          refreshing variety of soft drinks. Don’t miss out on our exclusive
          holiday and Valentine’s deals, designed to add a touch of celebration
          to every moment.
        </p>
        <p className="text-gray-600 font-bold">
          Celebrate the New Year and the season of love with Jong Market—where every bottle tells a story.
        </p>
      </motion.div>
    </div>
  );
};

export default moreInfo;
