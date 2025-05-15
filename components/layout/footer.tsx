"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, AlertTriangle } from "lucide-react"
import { useLanguage } from "@/context/language-context"

// Payment methods and delivery services
const paymentMethods = [
  { name: "Visa", image: "/images/payment/visa.png" },
  { name: "Mastercard", image: "/images/payment/mastercard.png" },
  { name: "PayPal", image: "/images/payment/paypal.png" },
  { name: "MTN Mobile Money", image: "/images/payment/mtn-mobile-money.png" },
  { name: "Orange Money", image: "/images/payment/orange-money.png" },
]

const deliveryServices = [
  { name: "DHL", image: "/images/delivery/dhl.png" },
  { name: "FedEx", image: "/images/delivery/fedex.png" },
  { name: "UPS", image: "/images/delivery/ups.png" },
  { name: "USPS", image: "/images/delivery/usps.png" },
]

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-500">Jong Market (CMR) - Fast & Reliable Delivery</h3>
            <p className="text-gray-300 mb-4">
              Jong Market is your trusted source for online alcohol delivery in Cameroon. Whether you're craving fine wines, premium spirits, or craft beers, we bring your favorite drinks right to your doorstep - quickly and reliably
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-amber-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-amber-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-amber-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{t("categories")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/whiskey" className="text-gray-300 hover:text-amber-500 transition-colors">
                  {t("whiskey")}
                </Link>
              </li>
              <li>
                <Link href="/category/wine" className="text-gray-300 hover:text-amber-500 transition-colors">
                  {t("wine")}
                </Link>
              </li>
              <li>
                <Link href="/category/beer" className="text-gray-300 hover:text-amber-500 transition-colors">
                  {t("beer")}
                </Link>
              </li>
              <li>
                <Link href="/category/champagne" className="text-gray-300 hover:text-amber-500 transition-colors">
                  {t("champagne")}
                </Link>
              </li>
              <li>
                <Link href="/category/hot-drinks" className="text-gray-300 hover:text-amber-500 transition-colors">
                  {t("hotDrinks")}
                </Link>
              </li>
              <li>
                <Link href="/category/accessories" className="text-gray-300 hover:text-amber-500 transition-colors">
                  {t("accessories")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{t("customerService")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-amber-500 transition-colors">
                  {t("contactUs")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-amber-500 transition-colors">
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-amber-500 transition-colors">
                  {t("shippingReturns")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-amber-500 transition-colors">
                  {t("termsConditions")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-amber-500 transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{t("contact")}</h4>
            <address className="not-italic text-gray-300 space-y-2">
              <p>123 Drink Avenue</p>
              <p>Yaoundé, Cameroon</p>
              <p>Email: info@jongmarket.com</p>
              <p>Phone: +237 677 889 900</p>
            </address>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">{t("paymentMethods")}</h4>
              <div className="flex flex-wrap gap-4">
                {paymentMethods.map((method) => (
                  <div key={method.name} className="bg-white rounded-md p-2 h-10 w-16 relative">
                    <Image
                      src={method.image || "/placeholder.svg"}
                      alt={method.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">{t("deliveryServices")}</h4>
              <div className="flex flex-wrap gap-4">
                {deliveryServices.map((service) => (
                  <div key={service.name} className="bg-white rounded-md p-2 h-10 w-16 relative">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Jong Market. All rights reserved.
            </p>
            <div className="flex items-center text-amber-500">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <p className="text-sm">{t("ageWarning")}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
