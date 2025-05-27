"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-amber-950 to-black"
        >
          <div className="text-center relative">
            {/* Bottle silhouette */}
            <motion.div
              className="relative mx-auto mb-6 w-24 h-48"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Bottle outline */}
              <svg
                viewBox="0 0 100 200"
                className="absolute inset-0 w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35 0H65V20C65 20 75 25 75 35V45L85 60V190C85 195.523 80.5228 200 75 200H25C19.4772 200 15 195.523 15 190V60L25 45V35C25 25 35 20 35 20V0Z"
                  stroke="#D4A547"
                  strokeWidth="2"
                />
                <path d="M35 20C35 20 40 25 40 30V40H60V30C60 25 65 20 65 20" stroke="#D4A547" strokeWidth="2" />
              </svg>

              {/* Liquid filling animation */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-600 to-amber-500 rounded-b-lg mx-2"
                initial={{ height: 0 }}
                animate={{ height: "85%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Bottle shine effect */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white/10 rounded-full blur-md"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              {/* Bubbles */}
              <motion.div
                className="absolute bottom-4 left-4 w-2 h-2 bg-white/30 rounded-full"
                animate={{ y: [-20, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.2 }}
              />
              <motion.div
                className="absolute bottom-8 right-6 w-1.5 h-1.5 bg-white/30 rounded-full"
                animate={{ y: [-15, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.5 }}
              />
              <motion.div
                className="absolute bottom-16 left-6 w-1 h-1 bg-white/30 rounded-full"
                animate={{ y: [-10, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.7 }}
              />
            </motion.div>

            {/* Logo and text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-amber-500 mb-1">
                Jong<span className="text-amber-400">Market</span>
              </h2>
              <p className="text-amber-300/80 text-sm">Premium Drinks & Spirits</p>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex space-x-2">
                {[0, 1, 2].map((dot) => (
                  <motion.div
                    key={dot}
                    className="w-2 h-2 bg-amber-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: dot * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
