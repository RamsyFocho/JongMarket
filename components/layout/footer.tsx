"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, AlertTriangle, Phone, Youtube } from "lucide-react";
import { useLanguage } from "@/context/language-context";

// Payment methods and delivery services


export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-200 text-black pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-2 text-amber-500">
              Jong Market (CMR) - Fast & Reliable Delivery
            </h3>
            <p className="text-black-300 mb-4">
              <b>Jong Market</b> is your trusted source for online alcohol
              delivery in Cameroon. Whether you're craving fine wines, premium
              spirits, or craft beers, we bring your favorite drinks right to
              your doorstep - quickly and reliably
            </p>
            <p className="text-black-300 mb-2">
              We're more than just an online liquor store. Jong Market is your
              partner in celebrating life's moments, big and small. From casual
              get-togethers to special occasions, we ensure you have the perfect
              drink at hand.
            </p>
            <p className="text-black-300 mb-4">
              Enjoy a wide selection, top-notch service, and the convenience of
              shopping from home across Cameroon. Experience the joy of
              hassle-free alcohol delivery with Jong Market.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-black-300 hover:text-amber-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-black-300 hover:text-amber-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-black-300 hover:text-amber-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-black">
              {t("categories")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/whiskey"
                  className="text-black-300 hover:text-amber-500 transition-colors"
                >
                  {t("whiskey")}
                </Link>
              </li>
              <li>
                <Link
                  href="/category/wine"
                  className="text-black-300 hover:text-amber-500 transition-colors"
                >
                  {t("wine")}
                </Link>
              </li>
              <li>
                <Link
                  href="/category/beer"
                  className="text-black-300 hover:text-amber-500 transition-colors"
                >
                  {t("beer")}
                </Link>
              </li>
              <li>
                <Link
                  href="/category/champagne"
                  className="text-black-300 hover:text-amber-500 transition-colors"
                >
                  {t("champagne")}
                </Link>
              </li>
              <li>
                <Link
                  href="/category/hot-drinks"
                  className="text-black-300 hover:text-amber-500 transition-colors"
                >
                  {t("hotDrinks")}
                </Link>
              </li>
              <li>
                <Link
                  href="/category/accessories"
                  className="text-black-300 hover:text-amber-500 transition-colors"
                >
                  {t("accessories")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-black">
              {t("customerService")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-black-300 hover:text-amber-500 transition-colors"
                >
                  {t("contactUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-black-300 hover:text-amber-500 transition-colors"
                >
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-black-300 hover:text-amber-500 transition-colors"
                >
                  {t("shippingReturns")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-black-300 hover:text-amber-500 transition-colors"
                >
                  {t("termsConditions")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-black-300 hover:text-amber-500 transition-colors"
                >
                  {t("privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-black">
              {t("contact")}
            </h4>
            <address className="not-italic text-black-300 space-y-2">
              <p>
                Avenue des Banques, Douala Cameroon Bonamoussadi Immeuble K
                Homes
              </p>
              <p>Email: sales@jongmarket.com</p>
              <p>Phone: (+237) 683 181 515</p>
            </address>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-black">
                {t("paymentMethods")}
              </h4>
              <div className="flex flex-wrap ">
                  <div className=" h-40  w-[382px] sm:w-[384px] relative">
                    <Image
                      src="/images/payment/footer_payment_methods.avif"
                      alt={"payment methods"}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className=" h-10 w-[50px] relative">
                    <Image
                      src="/images/payment/hand-handpay.avif"
                      alt={"payment methods"}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className=" h-10 w-[50px] relative mx-2">
                    <Image
                      src="/images/payment/mtn-mobile-money.avif"
                      alt={"payment methods"}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className=" h-10 w-[50px] relative mx-2">
                    <Image
                      src="/images/payment/orange-money.avif"
                      alt={"payment methods"}
                      fill
                      className="object-contain"
                    />
                  </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-black">
                {t("deliveryPatners")}
              </h4>
              {/* flex this container for multiple images */}
              <div className="relative">
                <div
                  className=" h-12 md:h-12 w-[330px] relative"
                >
                  <Image
                    src="/images/payment/shipping-services.png"
                    alt={"Shipping Services"}
                    fill
                    className="object-cover md:object-contain p-1 relative"
                  />
                </div>
              </div>
            </div>
            {/* Social Media and App Download Section */}
        {/* <div className="mt-12 pt-8 border-t border-gray-800"> */}
          <div className="bg-slate-800 rounded-lg p-6 border-l-4 border-amber-500">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              {/* Social Media Section */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">
                  SUIVEZ-NOUS AUSSI SUR :
                </h4>
                <div className="flex space-x-4">
                  <Link
                    href="#"
                    className="bg-amber-500 text-white p-2 rounded-full hover:bg-amber-600 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="bg-amber-500 text-white p-2 rounded-full hover:bg-amber-600 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="bg-amber-500 text-white p-2 rounded-full hover:bg-amber-600 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="bg-amber-500 text-white p-2 rounded-full hover:bg-amber-600 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="bg-amber-500 text-white p-2 rounded-full hover:bg-amber-600 transition-colors"
                  >
                    <Youtube className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* App Download Section */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">
                  TÉLÉCHARGEZ NOTRE APPLICATION SUR :
                </h4>
                <div className="space-y-3">
                  <Link
                    href="#"
                    className="w-full flex items-center justify-center bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <div className="mr-3">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs">Download on the</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </Link>
                  
                  <Link
                    href="#"
                    className="w-full flex items-center justify-center bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <div className="mr-3">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs">GET IT ON</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        {/* </div> */}
            
          </div>
        </div>

        

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-black-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Jong Market. All rights
              reserved.
            </p>
            <div className="flex items-center text-amber-500">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <p className="text-sm">{t("ageWarning")}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}