"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AgeVerification() {
  const [showVerification, setShowVerification] = useState(false)

  useEffect(() => {
    // Check if user has already verified age
    const isVerified = localStorage.getItem("ageVerified") === "true"
    if (!isVerified) {
      setShowVerification(true)
    }
  }, [])

  const handleVerify = () => {
    localStorage.setItem("ageVerified", "true")
    setShowVerification(false)
  }

  const handleDecline = () => {
    // Redirect to an age-appropriate site
    window.location.href = "https://www.google.com"
  }

  return (
    <AnimatePresence>
      {showVerification && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[101] flex items-center justify-center bg-black/80"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-8 max-w-md mx-4"
          >
            <div className="flex items-center justify-center mb-6 text-amber-600">
              <AlertTriangle className="h-12 w-12" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">Age Verification</h2>
            <p className="text-gray-600 text-center mb-6">
              This website contains alcoholic beverage content and is only suitable for those 18 years or older. Please
              confirm that you are of legal drinking age in your country or region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1 border-gray-300 text-gray-700" onClick={handleDecline}>
                I am under 18
              </Button>
              <Button className="flex-1 bg-amber-600 hover:bg-amber-700" onClick={handleVerify}>
                I am over 18
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
