"use client"

import { useState, useEffect } from "react"

type ScrollDirection = "up" | "down" | null

export function useScrollDirection(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null)
  const [prevScrollY, setPrevScrollY] = useState(0)
  const [scrolledToTop, setScrolledToTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if we're at the top of the page
      if (currentScrollY <= 0) {
        setScrolledToTop(true)
        setScrollDirection(null)
        setPrevScrollY(0)
        return
      }

      setScrolledToTop(false)

      // Calculate the difference between current and previous scroll position
      const diff = currentScrollY - prevScrollY

      // Only update direction if the difference exceeds the threshold
      if (Math.abs(diff) > threshold) {
        const newDirection = diff > 0 ? "down" : "up"
        setScrollDirection(newDirection)
        setPrevScrollY(currentScrollY)
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [prevScrollY, threshold])

  return { scrollDirection, scrolledToTop }
}
