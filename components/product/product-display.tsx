"use client"

import type { products } from "@/data/products"
import ProductClientPage from "@/app/product/[slug]/ProductClientPage"
import { usePathname } from "next/navigation"
import BreadcrumbsSchema from "@/components/seo/breadcrumbs-schema"
import ProductSchema from "@/components/seo/product-schema"

interface ProductDisplayProps {
  product: (typeof products)[0] | undefined
}

export default function ProductDisplay({ product }: ProductDisplayProps) {
  const pathname = usePathname()
  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
  const fullUrl = `${baseUrl}${pathname}`

  if (!product) {
    return <div>Product not found</div>
  }

  // Generate breadcrumb data for schema
  const breadcrumbItems = [
    { name: "Home", url: `${baseUrl}/` },
    { name: product.category, url: `${baseUrl}/category/${product.category.toLowerCase().replace(/\s+/g, "-")}` },
    { name: product.name, url: fullUrl },
  ]

  return (
    <>
      {/* SEO Schemas */}
      <ProductSchema product={product} url={fullUrl} />
      <BreadcrumbsSchema items={breadcrumbItems} />

      {/* Product Display */}
      <ProductClientPage params={{ slug: product.slug }} />
    </>
  )
}
