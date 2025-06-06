"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function JongMarketLoader({ 
  isVisible = true, 
  minLoadTime = 1000,
  onLoadComplete,
  loadingText = "Loading premium experience...",
  showProgress = true
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [loadingPhase, setLoadingPhase] = useState("initializing")

  // Simulate realistic loading phases
  useEffect(() => {
    if (!isVisible) return

    const phases = [
      { phase: "initializing", duration: 300, progressEnd: 20 },
      { phase: "loading", duration: 800, progressEnd: 60 },
      { phase: "processing", duration: 500, progressEnd: 85 },
      { phase: "finalizing", duration: 400, progressEnd: 100 }
    ]

    let currentTime = 0
    let phaseIndex = 0

    const progressTimer = setInterval(() => {
      const currentPhase = phases[phaseIndex]
      if (!currentPhase) return

      currentTime += 50
      const phaseProgress = Math.min(currentTime / currentPhase.duration, 1)
      const startProgress = phaseIndex > 0 ? phases[phaseIndex - 1].progressEnd : 0
      const newProgress = startProgress + (currentPhase.progressEnd - startProgress) * phaseProgress

      setProgress(newProgress)
      setLoadingPhase(currentPhase.phase)

      if (phaseProgress >= 1) {
        phaseIndex++
        currentTime = 0
        
        if (phaseIndex >= phases.length) {
          clearInterval(progressTimer)
          
          // Ensure minimum load time for smooth UX
          setTimeout(() => {
            setIsLoading(false)
            onLoadComplete?.()
          }, Math.max(0, minLoadTime - Date.now()))
        }
      }
    }, 50)

    return () => clearInterval(progressTimer)
  }, [isVisible, minLoadTime, onLoadComplete])

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const bottleVariants = {
    initial: { opacity: 0, rotate: -10 },
    animate: { 
      opacity: 1, 
      rotate: 0,
      transition: { delay: 0.3, duration: 0.5 }
    },
    float: {
      y: [-2, 2, -2],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const getPhaseText = useCallback(() => {
    switch (loadingPhase) {
      case "initializing": return "Initializing JongMarket..."
      case "loading": return "Loading premium selection..."
      case "processing": return "Processing your request..."
      case "finalizing": return "Almost ready..."
      default: return loadingText
    }
  }, [loadingPhase, loadingText])

  return (
    <AnimatePresence>
      {isVisible && isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.4, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-gray-100 backdrop-blur-sm"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0,0,0)_1px,transparent_0)] bg-[length:24px_24px]" />
          </div>

          <div className="relative flex flex-col items-center justify-center text-center max-w-md mx-auto px-6">
            {/* Main logo container */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate={["animate", "pulse"]}
              className="relative mb-8"
            >
              {/* Logo background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-gray-700/20 rounded-2xl blur-xl scale-110"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Animated bottle icon */}
              <motion.div
                variants={bottleVariants}
                initial="initial"
                animate={["animate", "float"]}
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10"
              >
                <svg width="24" height="40" viewBox="0 0 24 40" className="text-gray-700">
                  <path
                    d="M8 0H16V4C16 4 18 5 18 7V9L20 12V36C20 37.1 19.1 38 18 38H6C4.9 38 4 37.1 4 36V12L6 9V7C6 5 8 4 8 4V0Z"
                    fill="currentColor"
                    opacity="0.8"
                  />
                  <motion.path
                    d="M6 14H18V36C18 37.1 17.1 38 16 38H8C6.9 38 6 37.1 6 36V14Z"
                    fill="#ef4444"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progress / 100 }}
                    transition={{ duration: 0.3 }}
                  />
                </svg>
              </motion.div>

              {/* Main logo */}
              <div className="relative bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
                <div className="text-4xl font-bold">
                  <span className="text-red-500">Jong</span>
                  <span className="text-gray-700">Market</span>
                </div>
                <div className="text-red-500 text-xs font-medium mt-1">.com</div>
              </div>

              {/* Animated rings */}
              {[1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 border-2 border-red-500/30 rounded-xl"
                  animate={{
                    scale: [1, 1.1 + index * 0.1, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Premium Drinks & Spirits
              </h3>
              <motion.p 
                key={loadingPhase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-600"
              >
                {getPhaseText()}
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            {showProgress && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ delay: 0.7 }}
                className="w-full max-w-xs"
              >
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>{Math.round(progress)}%</span>
                  <span className="capitalize">{loadingPhase}</span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            )}

            {/* Animated dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex space-x-1 mt-6"
            >
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-2 h-2 bg-red-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: dot * 0.15,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Corner branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-6 right-6 text-xs text-gray-400 font-medium"
          >
            Powered by JongMarket - Built by BitsValley
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Usage examples for different scenarios:
// Basic usage: <JongMarketLoader isVisible={isLoading} onLoadComplete={() => setIsLoading(false)} />
// Page transition: <JongMarketLoader isVisible={isPageLoading} minLoadTime={800} loadingText="Preparing..." onLoadComplete={() => router.push('/products')} />
// API request: <JongMarketLoader isVisible={isApiLoading} showProgress={false} loadingText="Fetching..." onLoadComplete={() => setApiLoading(false)} />