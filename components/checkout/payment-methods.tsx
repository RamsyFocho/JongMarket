"use client"

import { useState } from "react"
import Image from "next/image"
import { CreditCard, Wallet } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/context/language-context"

type PaymentMethod = "credit-card" | "mtn-mobile-money" | "orange-money" | "paypal"

interface PaymentMethodsProps {
  onPaymentMethodChange: (method: PaymentMethod) => void
}

export default function PaymentMethods({ onPaymentMethodChange }: PaymentMethodsProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit-card")
  const { t } = useLanguage()

  const handlePaymentMethodChange = (value: string) => {
    const method = value as PaymentMethod
    setPaymentMethod(method)
    onPaymentMethodChange(method)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">{t("paymentMethod")}</h3>

      <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange}>
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
                <div className="h-5 w-5 mr-2 relative">
                  <Image
                    src="/images/payment/mtn-mobile-money.png"
                    alt="MTN Mobile Money"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
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
                      You will receive a payment confirmation code on your phone. Enter the code to complete your
                      purchase.
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
                <div className="h-5 w-5 mr-2 relative">
                  <Image
                    src="/images/payment/orange-money.png"
                    alt="Orange Money"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
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
                      You will receive a payment confirmation code on your phone. Enter the code to complete your
                      purchase.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PayPal */}
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="paypal" className="flex items-center">
                <Wallet className="h-5 w-5 mr-2 text-blue-500" />
                <span>PayPal</span>
              </Label>

              {paymentMethod === "paypal" && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    You will be redirected to PayPal to complete your purchase securely.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}
