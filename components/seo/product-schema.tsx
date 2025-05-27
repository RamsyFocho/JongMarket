import type { products } from "@/data/products"

interface ProductSchemaProps {
  product: (typeof products)[0]
  url: string
}

// Use a hardcoded priceValidUntil date to avoid hydration mismatch
const priceValidUntil = "2026-01-01"

// Helper: stable stringify with sorted keys
function stableStringify(obj: any): string {
  if (Array.isArray(obj)) {
    return `[${obj.map(stableStringify).join(",")}]`
  } else if (obj && typeof obj === "object" && obj !== null) {
    const keys = Object.keys(obj).sort()
    return `{${keys.map(k => JSON.stringify(k) + ":" + stableStringify(obj[k])).join(",")}}`
  } else {
    return JSON.stringify(obj)
  }
}

export default function ProductSchema({ product, url }: ProductSchemaProps) {
  // Create the structured data for the product
  const reviewsArr = Array.isArray(product.reviews) && product.reviews.length > 0
    ? product.reviews.map((r) => ({
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: String(r.rating),
          bestRating: "5",
          worstRating: "1",
        },
        author: {
          "@type": "Person",
          name: r.name ?? "",
        },
        datePublished: r.date ?? "",
        reviewBody: r.comment ?? "",
      }))
    : []

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name ?? "",
    image: [product.image ?? ""],
    description: product.description ?? "",
    sku: `JM-${product.id}`,
    mpn: `JM-${product.id}`,
    brand: {
      "@type": "Brand",
      name: "Jong Market",
    },
    category: `Alcoholic Beverages > ${product.category ?? ""}`,
    offers: {
      "@type": "Offer",
      url: url,
      priceCurrency: "XAF",
      price: String(product.price * 600), // Convert to FCFA and stringify
      priceValidUntil,
      itemCondition: "https://schema.org/NewCondition",
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Jong Market",
      },
    },
    aggregateRating: product.rating != null
      ? {
          "@type": "AggregateRating",
          ratingValue: String(product.rating),
          reviewCount: String(product.reviews?.length || 1),
          bestRating: "5",
          worstRating: "1",
        }
      : null, // Always include the key
    review: reviewsArr, // Always include the key
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: stableStringify(productSchema),
      }}
    />
  )
}
