"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ChevronRight, CreditCard, Truck, ShoppingBag, Check, Store, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "react-toastify";

import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { formatCurrency } from "@/data/products"
import { fetchCities, fetchQuartersByCity } from "@/lib/api"
import type { City, Quarter } from "@/lib/api"

type CheckoutStep = "shipping" | "payment" | "confirmation"
type DeliveryMethod = "warehouse-pickup" | "home-delivery"

// Form validation schemas
const shippingFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(1, "Please select a city"),
  quarter: z.string().min(1, "Please select a quarter/neighborhood"),
  phone: z.string().regex(/^\+237[6-9]\d{8}$/, "Please enter a valid Cameroon phone number"),
  email: z.string().email("Please enter a valid email address"),
})

const paymentFormSchema = z.object({
  paymentMethod: z.enum(["credit-card", "mtn-mobile-money", "orange-money"]),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  cardName: z.string().optional(),
  mobileNumber: z.string().optional(),
}).refine((data) => {
  if (data.paymentMethod === "credit-card") {
    return data.cardNumber && data.expiryDate && data.cvv && data.cardName
  } else if (["mtn-mobile-money", "orange-money"].includes(data.paymentMethod)) {
    return data.mobileNumber
  }
  return false
}, "Please fill all required payment fields")

type ShippingFormData = z.infer<typeof shippingFormSchema>
type PaymentFormData = z.infer<typeof paymentFormSchema>


export default function CheckoutPage() {
  
  const [checkoutData, setCheckoutData] = useState<any[]>([]);

  const [shippingData, setShippingData] = useState<ShippingFormData[]>([]);
  const [paymentData, setPaymentData] = useState<PaymentFormData[]>([]);
  const [productsData, setProductsData] = useState<any[]>([]);



  const [step, setStep] = useState<CheckoutStep>("shipping")
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("home-delivery")
  const [isProcessing, setIsProcessing] = useState(false)
  const [cities, setCities] = useState<City[]>([])
  const [quarters, setQuarters] = useState<Quarter[]>([])
  const [selectedCity, setSelectedCity] = useState("")
  const { cartItems, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const { t } = useLanguage()

  // Calculate order total with delivery fee
  const deliveryFee = deliveryMethod === "home-delivery" ? 3.334 : 0
  const orderTotal = totalPrice + deliveryFee

  // React Hook Form for shipping form
  const {
    register: registerShipping,
    handleSubmit: handleShippingSubmit,
    formState: { errors: shippingErrors },
    watch: watchShipping,
    setValue: setShippingValue,
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      quarter: '',
      phone: '',
      email: '',
    }
  })

  // React Hook Form for payment form with proper typing
  const {
    register: registerPayment,
    handleSubmit: handlePaymentSubmit,
    formState: { errors: paymentErrors },
    watch: watchPayment,
    setValue: setPaymentValue,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentMethod: undefined,
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: '',
      mobileNumber: '',
    }
  })

  // Load cities on component mount
  useEffect(() => {
    async function loadCities() {
      try {
        const citiesData = await fetchCities()
        setCities(citiesData)
      } catch (error) {
        console.error('Failed to load cities:', error)
        // toast({
        //   title: "Error loading cities",
        //   description: "Please try again later",
        //   variant: "destructive",
        // })
        toast.error(
          <div>
            <strong> Error Loading Cities</strong>
            <div> Please, try again later</div>
          </div>
        )
      }
    }
    loadCities()
  }, [toast])
  
  // Load quarters when city changes
  useEffect(() => {
    async function loadQuarters() {
      if (!selectedCity) {
        setQuarters([])
        return
      }
      
      try {
        const quartersData = await fetchQuartersByCity(selectedCity)
        setQuarters(quartersData)
      } catch (error) {
        console.error('Failed to load quarters:', error)        
        toast.error(
          <div>
            <strong> Error Loading Quarters</strong>
            <div> Please, try again later</div>
          </div>
        )

      }
    }
    loadQuarters()
  }, [selectedCity, toast])

  // Handle city selection
  const handleCityChange = (value: string) => {
    setSelectedCity(value)
    setShippingValue('city', value)
    setShippingValue('quarter', '') // Reset quarter when city changes
  }
  // Handle quarter selection
  const handleQuarterChange = (value: string) => {
    setShippingValue('quarter', value)
  }

  // Calculate order total with delivery fee
  // const deliveryFee = deliveryMethod === "home-delivery" ? 2000 : 0
  // const orderTotal = totalPrice + deliveryFee

  // Handle shipping form submission
  const onShippingSubmit = (data: ShippingFormData) => {
    console.log('Shipping data:', data)
    if(!cartItems || cartItems == null || cartItems.length == 0){
      router.push("/products");
      return;
    }
    setProductsData(cartItems);
    setShippingData(data);
    setCheckoutData(prev => [...prev, [data], [cartItems]]);
    setStep('payment');
  }

  useEffect(() => {
    console.log("Checkout data after shipping submit:", checkoutData);
  }, [checkoutData]);

  // Handle payment form submission
  const onPaymentSubmit = async (data: PaymentFormData) => {
    console.log('Payment data:', data);
    setIsProcessing(true);
    setPaymentData(data);
    setCheckoutData(prev => [...prev, data]);
    try {
      // TODO 
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setStep('confirmation')
      clearCart()
    } catch (error) {
      console.error('Payment failed:', error)
      toast.error(
        <div>
          <strong>Payment failed</strong>
          <div>Please, try again or use a different payment method</div>  
        </div>      
      )
      
    } finally {
      setIsProcessing(false)
    }  
  }

  useEffect(() => {
    console.log("Checkout data after payment submit:", checkoutData);
  }, [checkoutData]);

  const StepIndicator = ({ icon, label, isActive }: { 
    icon: React.ReactNode; 
    label: string; 
    isActive: boolean 
  }) => {
    return (
      <div className={`flex items-center ${isActive ? 'text-amber-600' : 'text-gray-400'}`}>
        <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-current">
          {icon}
        </div>
        <span className="ml-2 font-medium hidden md:block ">{label}</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Step indicators */}
      <div className="mb-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center ">
          <StepIndicator
            icon={<Truck className="w-4 h-4" />}
            label={t('Shipping')}
            isActive={step === 'shipping'}
          />
          <div className={`flex-1 h-0.5 mx-4 ${step !== 'shipping' ? 'bg-amber-600' : 'bg-gray-300'}`} />
          <StepIndicator
            icon={<CreditCard className="w-4 h-4" />}
            label={t('Payment')}
            isActive={step === 'payment'}
          />
          <div className={`flex-1 h-0.5 mx-4 ${step === 'confirmation' ? 'bg-amber-600' : 'bg-gray-300'}`} />
          <StepIndicator
            icon={<Check className="w-4 h-4" />}
            label={t('Confirmation')}
            isActive={step === 'confirmation'}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {step === "shipping" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold mb-6">{t('Shipping Information')}</h2>
              
              <form onSubmit={handleShippingSubmit(onShippingSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">{t('First Name')}</Label>
                    <Input
                      id="firstName"
                      {...registerShipping('firstName')}
                      className={shippingErrors.firstName ? 'border-red-500' : ''}
                    />
                    {shippingErrors.firstName && (
                      <span className="text-sm text-red-500">{String(shippingErrors.firstName.message)}</span>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">{t('Last Name')}</Label>
                    <Input
                      id="lastName"
                      {...registerShipping('lastName')}
                      className={shippingErrors.lastName ? 'border-red-500' : ''}
                    />
                    {shippingErrors.lastName && (
                      <span className="text-sm text-red-500">{shippingErrors.lastName.message?.toString()}</span>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">{t('Address')}</Label>
                  <Input
                    id="address"
                    {...registerShipping('address')}
                    className={shippingErrors.address ? 'border-red-500' : ''}
                  />
                  {shippingErrors.address && (
                    <span className="text-sm text-red-500">{shippingErrors.address.message?.toString()}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">{t('City')}</Label>
                    <Select value={watchShipping("city")} onValueChange={handleCityChange}>
                      <SelectTrigger className={shippingErrors.city ? 'border-red-500' : ''}>
                        <SelectValue placeholder={t('Select a city')} />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.value} value={city.value}>
                            {city.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {shippingErrors.city && (
                      <span className="text-sm text-red-500">{shippingErrors.city.message?.toString()}</span>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="quarter">{t('Quarter')}</Label>
                    <Select value={watchShipping("quarter")} onValueChange={handleQuarterChange} disabled={!selectedCity}>
                      <SelectTrigger className={shippingErrors.quarter ? 'border-red-500' : ''}>
                        <SelectValue placeholder={t('Select a quarter')} />
                      </SelectTrigger>
                      <SelectContent>
                        {quarters.map((quarter) => (
                          <SelectItem key={quarter.value} value={quarter.value}>
                            {quarter.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {shippingErrors.quarter && (
                      <span className="text-sm text-red-500">{shippingErrors.quarter.message?.toString()}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">{t('Phone')}</Label>
                    <Input
                      id="phone"
                      {...registerShipping('phone')}
                      className={shippingErrors.phone ? 'border-red-500' : ''}
                      placeholder="+237xxxxxxxxx"
                    />
                    {shippingErrors.phone && (
                      <span className="text-sm text-red-500">{shippingErrors.phone.message?.toString()}</span>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">{t('Email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      {...registerShipping('email')}
                      className={shippingErrors.email ? 'border-red-500' : ''}
                    />
                    {shippingErrors.email && (
                      <span className="text-sm text-red-500">{shippingErrors.email.message?.toString()}</span>
                    )}
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <Label>{t('Delivery Method')}</Label>
                  <RadioGroup
                    value={deliveryMethod}
                    onValueChange={(value: DeliveryMethod) => setDeliveryMethod(value)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${
                      deliveryMethod === 'home-delivery' ? 'border-primary' : ''
                    }`}>
                      <RadioGroupItem value="home-delivery" id="home-delivery" />
                      <Label htmlFor="home-delivery" className="flex items-center space-x-2 cursor-pointer">
                        <Truck className="w-5 h-5" />
                        <div>
                          <div className="font-medium">{t('Home Delivery')}</div>
                          <div className="text-sm text-gray-500">{t('2-3 business days')}</div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${
                      deliveryMethod === 'warehouse-pickup' ? 'border-primary' : ''
                    }`}>
                      <RadioGroupItem value="warehouse-pickup" id="warehouse-pickup" />
                      <Label htmlFor="warehouse-pickup" className="flex items-center space-x-2 cursor-pointer">
                        <Store className="w-5 h-5" />
                        <div>
                          <div className="font-medium">{t('Warehouse Pickup')}</div>
                          <div className="text-sm text-gray-500">{t('Available today')}</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>                <div className="flex justify-between items-center flex-wrap gap-2 w-full md:w-[fit]">
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/cart')}
                    className="flex items-center w-full md:w-[fit]"
                  >
                    <ChevronRight className="mr-2 w-4 h-4 rotate-180" />
                    {t('Back to Cart')}
                  </Button>
                  <Button type="submit" className="w-full md:w-[fit]">
                    {t('Continue to Payment')} <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {step === "payment" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold mb-6">{t('Payment Information')}</h2>
              
              <form onSubmit={handlePaymentSubmit(onPaymentSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <Label>{t('Payment Method')}</Label>
                  <RadioGroup
                    value={watchPayment("paymentMethod") || ''}
                    onValueChange={value => setPaymentValue("paymentMethod", value as PaymentFormData['paymentMethod'])}
                    className="grid grid-cols-1 gap-4"
                  >                    <div className="rounded-lg border p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex items-center space-x-2 cursor-pointer">
                          <CreditCard className="w-5 h-5" />
                          <span className="font-medium">{t('Credit Card')}</span>
                        </Label>
                      </div>
                      
                      {watchPayment("paymentMethod") === "credit-card" && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <Label htmlFor="cardNumber">{t('Card Number')}</Label>
                            <Input
                              id="cardNumber"
                              {...registerPayment('cardNumber')}
                              className={paymentErrors.cardNumber ? 'border-red-500' : ''}
                            />
                            {paymentErrors.cardNumber && (
                              <span className="text-sm text-red-500">{paymentErrors.cardNumber.message?.toString()}</span>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryDate">{t('Expiry Date')}</Label>
                              <Input
                                id="expiryDate"
                                {...registerPayment('expiryDate')}
                                placeholder="MM/YY"
                                className={paymentErrors.expiryDate ? 'border-red-500' : ''}
                              />
                              {paymentErrors.expiryDate && (
                                <span className="text-sm text-red-500">{paymentErrors.expiryDate.message?.toString()}</span>
                              )}
                            </div>
                            
                            <div>
                              <Label htmlFor="cvv">{t('CVV')}</Label>
                              <Input
                                id="cvv"
                                {...registerPayment('cvv')}
                                type="password"
                                maxLength={4}
                                className={paymentErrors.cvv ? 'border-red-500' : ''}
                              />
                              {paymentErrors.cvv && (
                                <span className="text-sm text-red-500">{paymentErrors.cvv.message?.toString()}</span>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="cardName">{t('Name on Card')}</Label>
                            <Input
                              id="cardName"
                              {...registerPayment('cardName')}
                              className={paymentErrors.cardName ? 'border-red-500' : ''}
                            />
                            {paymentErrors.cardName && (
                              <span className="text-sm text-red-500">{paymentErrors.cardName.message?.toString()}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                      <div className="rounded-lg border p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="mtn-mobile-money" id="mtn-money" />
                        <Label htmlFor="mtn-money" className="font-medium cursor-pointer">{t('MTN Mobile Money')}</Label>
                      </div>{watchPayment("paymentMethod") === "mtn-mobile-money" && (
                        <div className="mt-4">
                          <Label htmlFor="mtnNumber">{t('MTN Mobile Money Number')}</Label>
                          <Input
                            id="mtnNumber"
                            {...registerPayment('mobileNumber')}
                            placeholder="+237xxxxxxxxx"
                            className={paymentErrors.mobileNumber ? 'border-red-500' : ''}
                          />
                          {paymentErrors.mobileNumber && (
                            <span className="text-sm text-red-500">{paymentErrors.mobileNumber.message?.toString()}</span>
                          )}
                        </div>
                      )}
                    </div>                      <div className="rounded-lg border p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="orange-money" id="orange-money" />
                        <Label htmlFor="orange-money" className="font-medium cursor-pointer">{t('Orange Money')}</Label>
                      </div>
                      
                      {watchPayment("paymentMethod") === "orange-money" && (
                        <div className="mt-4">
                          <Label htmlFor="orangeNumber">{t('Orange Money Number')}</Label>
                          <Input
                            id="orangeNumber"
                            {...registerPayment('mobileNumber')}
                            placeholder="+237xxxxxxxxx"
                            className={paymentErrors.mobileNumber ? 'border-red-500' : ''}
                          />
                          {paymentErrors.mobileNumber && (
                            <span className="text-sm text-red-500">
                              {paymentErrors.mobileNumber.message?.toString()}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('shipping')}
                  >
                    {t('Back to Shipping')}
                  </Button>
                  
                  <Button type="submit" disabled={isProcessing}>
                    {isProcessing ? (
                      <span className="flex items-center space-x-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent" />
                        <span>{t('Processing...')}</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        {t('Place Order')} <ChevronRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {step === "confirmation" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                
                <h2 className="text-2xl font-semibold">{t('Order Confirmed!')}</h2>
                <p className="text-gray-600">{t('Thank you for your order. We\'ll send you a confirmation email shortly.')}</p>
                
                <Button onClick={() => router.push('/products')} className="mt-6">
                  <ShoppingBag className="mr-2 w-4 h-4" />
                  {t('Continue Shopping')}
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h3 className="text-xl font-semibold mb-4">{t('Order Summary')}</h3>
          
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {t('Quantity')}: {item.quantity}
                  </p>
                </div>
                <div className="font-medium">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{t('Subtotal')}</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
              {deliveryMethod === "home-delivery" && (
              <div className="flex justify-between text-amber-700 font-bold">
                <span>{t('Delivery Fee')}</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
            )}
            
            <Separator className="my-2" />
            
            <div className="flex justify-between font-semibold">
              <span>{t('Total')}</span>
              <span>{formatCurrency(orderTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
