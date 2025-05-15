"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight, Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/context/language-context"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden ">
        <Image
          src="/placeholder.svg?height=600&width=1600&text=Contact+Us"
          alt="Contact Us"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
              <p className="text-xl text-white/80">
                We'd love to hear from you. Reach out to us with any questions or inquiries.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-amber-600">
            {t("home")}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-700 font-medium">{t("contact")}</span>
        </div>
      </div>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="bg-amber-600 hover:bg-amber-700" disabled={isSubmitting}>
                  {isSubmitting ? (
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
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Our Location</h3>
                      <p className="text-gray-600">Avenue des Banques, Douala Cameroon</p>
                      <p className="text-gray-600">Bonamoussadi Immeuble K Homes</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Email Us</h3>
                      <p className="text-gray-600">sales@jongmarket.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Call Us</h3>
                      <p className="text-gray-600">(+237) 683 181 515</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Opening Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9AM - 8PM</p>
                      <p className="text-gray-600">Saturday: 10AM - 6PM</p>
                      <p className="text-gray-600">Sunday: 12PM - 5PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/placeholder.svg?height=600&width=800&text=Map"
                  alt="Location Map"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
