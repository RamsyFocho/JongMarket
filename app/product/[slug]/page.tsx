import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductDisplay from "@/components/product/product-display"
import { products } from "@/data/products"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    return {
      title: "Product Not Found | Jong Market",
      description: "The requested product could not be found.",
    }
  }

  // Generate SEO-friendly metadata
  return {
    title: `${product.name} | Premium ${product.category} | Jong Market`,
    description: product.description?.substring(0, 160) || `Buy ${product.name} online at Jong Market`,
    keywords: `${product.name}, ${product.category}, premium drinks, Jong Market, buy online, Cameroon, ${Object.values(product.details || {}).join(", ")}`,
    openGraph: {
      title: `${product.name} | Jong Market`,
      description: product.description?.substring(0, 160) || `Buy ${product.name} online at Jong Market`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: "product",
      locale: "en_US",
      siteName: "Jong Market",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Jong Market`,
      description: product.description?.substring(0, 160) || `Buy ${product.name} online at Jong Market`,
      images: [product.image],
    },
    alternates: {
      canonical: `https://jongmarket.com/product/${params.slug}`,
      languages: {
        "en-US": `https://jongmarket.com/product/${params.slug}`,
        "fr-FR": `https://jongmarket.com/fr/product/${params.slug}`,
      },
    },
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  return <ProductDisplay product={product} />
}
