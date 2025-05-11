"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronRight, CreditCard, Truck, ShoppingBag, Check, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { formatCurrency } from "@/data/products"

type CheckoutStep = "shipping" | "payment" | "confirmation"
type DeliveryMethod = "warehouse-pickup" | "home-delivery"

// Simplified Cameroon cities data
const cameroonCities = [
  { value: "yaounde", label: "Yaoundé" },
  { value: "douala", label: "Douala" },
  { value: "bamenda", label: "Bamenda" },
  { value: "bafoussam", label: "Bafoussam" },
  { value: "buea", label: "Buea" },
]

// Simplified quarters data
const quartersByCity = {
  yaounde: [
    { value: "bastos", label: "Bastos" },
    { value: "mvan", label: "Mvan" },
    { value: "mvog-mbi", label: "Mvog-Mbi" },
  ],
  douala: [
    { value: "akwa", label: "Akwa" },
    { value: "bonanjo", label: "Bonanjo" },
    { value: "bonapriso", label: "Bonapriso" },
  ],
  bamenda: [
    { value: "up-station", label: "Up Station" },
    { value: "down-town", label: "Down Town" },
  ],
  bafoussam: [
    { value: "banengo", label: "Banengo" },
    { value: "tamdja", label: "Tamdja" },
  ],
  buea: [
    { value: "molyko", label: "Molyko" },
    { value: "great-soppo", label: "Great Soppo" },
  ],
}

export default function CheckoutPage() {
  const [step, setStep] = useState<CheckoutStep>("shipping")
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("home-delivery")
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedQuarter, setSelectedQuarter] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const { cartItems, totalPrice, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const { t } = useLanguage()

  // Base shipping cost
  const baseShippingCost = 10

  // Calculate shipping cost based on delivery method
  const shippingCost = deliveryMethod === "warehouse-pickup" ? 0 : baseShippingCost

  const taxRate = 0.05
  const taxAmount = totalPrice * taxRate
  const orderTotal = totalPrice + shippingCost + taxAmount

  const handleDeliveryMethodChange = (value: string) => {
    setDeliveryMethod(value as DeliveryMethod)
  }

  const handleNextStep = () => {
    if (step === "shipping") {
      setStep("payment")
      window.scrollTo(0, 0)
    } else if (step === "payment") {
      setIsProcessing(true)
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false)
        setStep("confirmation")
        clearCart()
        window.scrollTo(0, 0)
      }, 2000)
    } else if (step === "confirmation") {
      router.push("/")
    }
  }

  if (cartItems.length === 0 && step !== "confirmation") {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">{t("emptyCart")}</h1>
          <p className="text-gray-600 mb-8">{t("emptyCartDesc")}</p>
          <Link href="/products">
            <Button className="bg-amber-600 hover:bg-amber-700">{t("exploreProducts")}</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-amber-600">
          {t("home")}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/cart" className="hover:text-amber-600">
          {t("cart")}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700 font-medium">Checkout</span>
      </div>

      {/* Checkout Steps */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center">
          <div className={`flex flex-col items-center ${step === "shipping" ? "text-amber-600" : "text-gray-500"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step === "shipping" ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              <Truck className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">{t("shippingInformation")}</span>
          </div>

          <div className="w-16 h-0.5 mx-2 bg-gray-200"></div>

          <div className={`flex flex-col items-center ${step === "payment" ? "text-amber-600" : "text-gray-500"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step === "payment" ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">{t("paymentMethod")}</span>
          </div>

          <div className="w-16 h-0.5 mx-2 bg-gray-200"></div>

          <div className={`flex flex-col items-center ${step === "confirmation" ? "text-amber-600" : "text-gray-500"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step === "confirmation" ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              <Check className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">Confirmation</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2">
          {step === "shipping" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-semibold mb-6">{t("shippingInformation")}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="first-name">{t("firstName")}</Label>
                  <Input id="first-name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="last-name">{t("lastName")}</Label>
                  <Input id="last-name" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">{t("address")}</Label>
                  <Input id="address" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="country">{t("country")}</Label>
                  <Input id="country" defaultValue="Cameroon" className="mt-1" readOnly />
                </div>
                <div>
                  <Label htmlFor="city">{t("city")}</Label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger id="city" className="mt-1">
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cameroonCities.map((city) => (
                        <SelectItem key={city.value} value={city.value}>
                          {city.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quarter">{t("quarter")}</Label>
                  <Select value={selectedQuarter} onValueChange={setSelectedQuarter} disabled={!selectedCity}>
                    <SelectTrigger id="quarter" className="mt-1">
                      <SelectValue placeholder={selectedCity ? "Select a quarter" : "Select a city first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCity &&
                        quartersByCity[selectedCity]?.map((quarter) => (
                          <SelectItem key={quarter.value} value={quarter.value}>
                            {quarter.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="zip">{t("zipCode")}</Label>
                  <Input id="zip" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+237" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" className="mt-1" />
                </div>
              </div>

              {/* Delivery Method */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Delivery Method</h3>
                <RadioGroup value={deliveryMethod} onValueChange={handleDeliveryMethodChange}>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="warehouse-pickup" id="warehouse-pickup" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="warehouse-pickup" className="flex items-center">
                          <Store className="h-5 w-5 mr-2 text-gray-600" />
                          <span>Warehouse Pickup (Free)</span>
                        </Label>
                        <p className="text-sm text-gray-500 mt-1">
                          Pick up your order from our warehouse in{" "}
                          {selectedCity
                            ? cameroonCities.find((city) => city.value === selectedCity)?.label
                            : "your city"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="home-delivery" id="home-delivery" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="home-delivery" className="flex items-center">
                          <Truck className="h-5 w-5 mr-2 text-gray-600" />
                          <span>Home Delivery ({formatCurrency(baseShippingCost)})</span>
                        </Label>
                        <p className="text-sm text-gray-500 mt-1">Delivery to your address within 2-3 business days</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="mt-8">
                <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={handleNextStep}>
                  Continue to Payment
                </Button>
              </div>
            </motion.div>
          )}

          {step === "payment" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold mb-6">{t("paymentMethod")}</h3>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-4">
                  {/* Credit Card */}
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="credit-card" className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-gray-600" />
                        <span>{t("creditCard")}</span>
                      </Label>

                      {paymentMethod === "credit-card" && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="1234 5678 9012 3456" className="mt-1" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry-date">Expiry Date</Label>
                              <Input id="expiry-date" placeholder="MM/YY" className="mt-1" />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" className="mt-1" />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="card-name">Name on Card</Label>
                            <Input id="card-name" placeholder="John Doe" className="mt-1" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* MTN Mobile Money */}
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="mtn-mobile-money" id="mtn-mobile-money" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="mtn-mobile-money" className="flex items-center">
                        <span>MTN Mobile Money</span>
                      </Label>

                      {paymentMethod === "mtn-mobile-money" && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <Label htmlFor="mtn-number">MTN Mobile Money Number</Label>
                            <Input id="mtn-number" placeholder="6XXXXXXXX" className="mt-1" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              You will receive a payment confirmation code on your phone. Enter the code to complete
                              your purchase.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Orange Money */}
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="orange-money" id="orange-money" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="orange-money" className="flex items-center">
                        <span>Orange Money</span>
                      </Label>

                      {paymentMethod === "orange-money" && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <Label htmlFor="orange-number">Orange Money Number</Label>
                            <Input id="orange-number" placeholder="6XXXXXXXX" className="mt-1" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              You will receive a payment confirmation code on your phone. Enter the code to complete
                              your purchase.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </RadioGroup>

              <div className="mt-8">
                <Button
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  onClick={handleNextStep}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t("processing")}
                    </span>
                  ) : (
                    t("completeOrder")
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {step === "confirmation" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your order. We've received your payment and will process your order shortly.
              </p>
              <p className="text-gray-600 mb-8">
                A confirmation email has been sent to your email address with all the details.
              </p>
              <Button className="bg-amber-600 hover:bg-amber-700" onClick={() => router.push("/")}>
                {t("continueShoppingBtn")}
              </Button>
            </motion.div>
          )}
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-lg font-semibold mb-4">{t("orderSummary")}</h3>

            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{item.name}</h4>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                      <span className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">{t("subtotal")}</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t("shipping")}</span>
                <span>{shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t("tax")} (5%)</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-bold">
              <span>{t("total")}</span>
              <span className="text-amber-600">{formatCurrency(orderTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
