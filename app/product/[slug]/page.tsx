import type { Metadata } from "next"
import ProductClientPage from "./ProductClientPage"
import { products } from "@/data/products"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  alert("We're here");
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
    description: product.description.substring(0, 160),
    keywords: `${product.name}, ${product.category}, premium drinks, Jong Market, buy online, Cameroon`,
    openGraph: {
      title: `${product.name} | Jong Market`,
      description: product.description.substring(0, 160),
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: "product",
    },
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductClientPage params={params} />
}
