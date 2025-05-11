"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define the wishlist item type
export interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  slug: string
  category?: string
  rating?: number
}

// Define the wishlist context type
interface WishlistContextType {
  wishlistItems: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (itemId: number) => void
  isInWishlist: (itemId: number) => boolean
  clearWishlist: () => void
  totalItems: number
}

// Create the wishlist context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

// Create the wishlist provider component
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [totalItems, setTotalItems] = useState(0)

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist)
        setWishlistItems(parsedWishlist)
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
      }
    }
  }, [])

  // Update localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems))
    setTotalItems(wishlistItems.length)
  }, [wishlistItems])

  // Add item to wishlist
  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        return prevItems
      } else {
        return [...prevItems, item]
      }
    })
  }

  // Remove item from wishlist
  const removeFromWishlist = (itemId: number) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  // Check if item is in wishlist
  const isInWishlist = (itemId: number) => {
    return wishlistItems.some((item) => item.id === itemId)
  }

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([])
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        totalItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

// Custom hook to use the wishlist context
export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
