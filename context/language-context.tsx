"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    home: "Home",
    shop: "Shop",
    blog: "Blog",
    about: "About",
    contact: "Contact",
    search: "Search",
    account: "Account",
    wishlist: "Wishlist",
    cart: "Cart",
    signIn: "Sign In",
    profile: "Profile",
    settings: "Settings",
    signOut: "Sign Out",
    callUs: "Call Us",
    email: "Email",
    location: "Location",
    openingHours: "Opening Hours",
    freeShipping: "Free Shipping on orders over 60,000 FCFA",

    // Product related
    addToCart: "Add to Cart",
    viewDetails: "View Details",
    outOfStock: "Out of Stock",
    inStock: "In Stock",
    available: "available",
    quantity: "Quantity",
    maximum: "Maximum",
    price: "Price",
    total: "Total",
    subtotal: "Subtotal",
    shipping: "Shipping",
    tax: "Tax",
    checkout: "Proceed to Checkout",

    // Categories
    categories: "Categories",
    whiskey: "Whiskey",
    wine: "Wine",
    beer: "Beer",
    champagne: "Champagne",
    spirits: "Spirits",
    hotDrinks: "Hot Drinks",
    accessories: "Accessories",

    // Home page sections
    trendingDrinks: "Trending Drinks",
    trendingDrinksDesc: "Our most popular drinks that customers are loving right now",
    specialPromotions: "Special Promotions",
    specialPromotionsDesc: "Limited time offers on premium drinks and accessories",
    viewAll: "View All",
    viewAllDeals: "View All Deals",

    // Footer
    customerService: "Customer Service",
    contactUs: "Contact Us",
    faq: "FAQ",
    shippingReturns: "Shipping & Returns",
    termsConditions: "Terms & Conditions",
    privacyPolicy: "Privacy Policy",
    paymentMethods: "Payment Methods",
    deliveryPatners: "Delivery Patners",
    ageWarning: "Warning: This website is only for individuals 18 years of age and older.",

    // Checkout
    shippingInformation: "Shipping Information",
    firstName: "First Name",
    lastName: "Last Name",
    address: "Address",
    country: "Country",
    city: "City",
    quarter: "Quarter/Neighborhood",
    zipCode: "Zip/Postal Code",
    paymentMethod: "Payment Method",
    creditCard: "Credit/Debit Card",
    mobileMoney: "Mobile Money",
    paypal: "PayPal",
    completeOrder: "Complete Order",
    processing: "Processing...",
    orderSummary: "Order Summary",

    // Misc
    limitedTimeOffer: "Limited time offer",
    endsIn: "Ends in",
    days: "days",
    viewDeal: "View Deal",
    continueShoppingBtn: "Continue Shopping",
    emptyCart: "Your Cart is Empty",
    emptyCartDesc: "Looks like you haven't added any items to your cart yet.",
    emptyWishlist: "Your Wishlist is Empty",
    emptyWishlistDesc: "Looks like you haven't added any items to your wishlist yet.",
    exploreProducts: "Explore Products",
  },
  fr: {
    // Navigation
    home: "Accueil",
    shop: "Boutique",
    blog: "Blog",
    about: "À propos",
    contact: "Contact",
    search: "Rechercher",
    account: "Compte",
    wishlist: "Favoris",
    cart: "Panier",
    signIn: "Se connecter",
    profile: "Profil",
    settings: "Paramètres",
    signOut: "Se déconnecter",
    callUs: "Appelez-nous",
    email: "Email",
    location: "Emplacement",
    openingHours: "Heures d'ouverture",
    freeShipping: "Livraison gratuite pour les commandes de plus de 60 000 FCFA",

    // Product related
    addToCart: "Ajouter au panier",
    viewDetails: "Voir détails",
    outOfStock: "Rupture de stock",
    inStock: "En stock",
    available: "disponible",
    quantity: "Quantité",
    maximum: "Maximum",
    price: "Prix",
    total: "Total",
    subtotal: "Sous-total",
    shipping: "Livraison",
    tax: "Taxe",
    checkout: "Passer à la caisse",

    // Categories
    categories: "Catégories",
    whiskey: "Whisky",
    wine: "Vin",
    beer: "Bière",
    champagne: "Champagne",
    spirits: "Spiritueux",
    hotDrinks: "Boissons chaudes",
    accessories: "Accessoires",

    // Home page sections
    trendingDrinks: "Boissons Tendance",
    trendingDrinksDesc: "Nos boissons les plus populaires que les clients adorent en ce moment",
    specialPromotions: "Promotions Spéciales",
    specialPromotionsDesc: "Offres à durée limitée sur les boissons et accessoires premium",
    viewAll: "Voir tout",
    viewAllDeals: "Voir toutes les offres",

    // Footer
    customerService: "Service Client",
    contactUs: "Nous contacter",
    faq: "FAQ",
    shippingReturns: "Livraison & Retours",
    termsConditions: "Conditions Générales",
    privacyPolicy: "Politique de Confidentialité",
    paymentMethods: "Méthodes de Paiement",
    deliveryPatners: "Partenaire de Livraison",
    ageWarning: "Attention: Ce site est réservé aux personnes de 18 ans et plus.",

    // Checkout
    shippingInformation: "Informations de Livraison",
    firstName: "Prénom",
    lastName: "Nom",
    address: "Adresse",
    country: "Pays",
    city: "Ville",
    quarter: "Quartier",
    zipCode: "Code Postal",
    paymentMethod: "Méthode de Paiement",
    creditCard: "Carte de Crédit/Débit",
    mobileMoney: "Mobile Money",
    paypal: "PayPal",
    completeOrder: "Finaliser la Commande",
    processing: "Traitement en cours...",
    orderSummary: "Résumé de la Commande",

    // Misc
    limitedTimeOffer: "Offre à durée limitée",
    endsIn: "Se termine dans",
    days: "jours",
    viewDeal: "Voir l'offre",
    continueShoppingBtn: "Continuer les achats",
    emptyCart: "Votre Panier est Vide",
    emptyCartDesc: "Il semble que vous n'ayez pas encore ajouté d'articles à votre panier.",
    emptyWishlist: "Votre Liste de Favoris est Vide",
    emptyWishlistDesc: "Il semble que vous n'ayez pas encore ajouté d'articles à votre liste de favoris.",
    exploreProducts: "Explorer les produits",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem("language", language)

    // Set html lang attribute
    document.documentElement.lang = language
  }, [language])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
