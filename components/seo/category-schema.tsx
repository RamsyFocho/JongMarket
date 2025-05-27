import { categories } from "@/data/products"

interface CategorySchemaProps {
  slug: string
  url: string
}

export default function CategorySchema({ slug, url }: CategorySchemaProps) {
  const category = categories[slug]

  if (!category) return null

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.title,
    description: category.description,
    url: url,
    numberOfItems: category.products.length,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: category.products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          image: product.image,
          url: `${url.split("/category/")[0]}/product/${product.slug}`,
          offers: {
            "@type": "Offer",
            price: product.price * 600, // Convert to FCFA
            priceCurrency: "XAF",
            availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        },
      })),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(categorySchema),
      }}
    />
  )
}
