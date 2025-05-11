import type { products } from "@/data/products"

interface ProductSchemaProps {
  product: (typeof products)[0]
  url: string
}

export default function ProductSchema({ product, url }: ProductSchemaProps) {
  // Create the structured data for the product
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    sku: `JM-${product.id}`,
    mpn: `JM-${product.id}`,
    brand: {
      "@type": "Brand",
      name: "Jong Market",
    },
    offers: {
      "@type": "Offer",
      url: url,
      priceCurrency: "XAF",
      price: product.price * 600, // Convert to FCFA
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
      itemCondition: "https://schema.org/NewCondition",
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews?.length || 1,
      bestRating: "5",
      worstRating: "1",
    },
  }

  // Add reviews if available
  if (product.reviews && product.reviews.length > 0) {
    productSchema["review"] = product.reviews.map((review) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Person",
        name: review.name,
      },
      datePublished: review.date,
      reviewBody: review.comment,
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(productSchema),
      }}
    />
  )
}
