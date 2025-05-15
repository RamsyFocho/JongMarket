import type { Metadata } from "next"
import { categories } from "@/data/products"
import { notFound } from "next/navigation"
import CategoryClientPage from "./CategoryClientPage"
import CategorySchema from "@/components/seo/category-schema"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = categories[params.slug]

  if (!category) {
    return {
      title: "Category Not Found | Jong Market",
      description: "The requested category could not be found.",
    }
  }

  return {
    title: `${category.title} | Premium Drinks Collection | Jong Market`,
    description: category.description.substring(0, 160),
    keywords: `${category.title}, premium drinks, buy online, Cameroon, Jong Market, ${category.products
      .slice(0, 5)
      .map((p) => p.name)
      .join(", ")}`,
    openGraph: {
      title: `${category.title} | Jong Market`,
      description: category.description.substring(0, 160),
      images: [
        {
          url: `/images/categories/${params.slug}.jpg`,
          width: 800,
          height: 600,
          alt: category.title,
        },
      ],
      type: "website",
      locale: "en_US",
      siteName: "Jong Market",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.title} | Jong Market`,
      description: category.description.substring(0, 160),
      images: [`/images/categories/${params.slug}.jpg`],
    },
    alternates: {
      canonical: `https://jongmarket.com/category/${params.slug}`,
      languages: {
        "en-US": `https://jongmarket.com/category/${params.slug}`,
        "fr-FR": `https://jongmarket.com/fr/category/${params.slug}`,
      },
    },
  }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  // Normalize slug to match category keys (lowercase, hyphens)
  const normalizedSlug = params.slug.toLowerCase().replace(/\s+/g, "-")
  // Use type assertion to index categories
  const category = (categories as any)[normalizedSlug]

  if (!category) {
    notFound()
  }

  // Base URL for schema
  const baseUrl = "https://jongmarket.com"
  const fullUrl = `${baseUrl}/category/${normalizedSlug}`

  return (
    <>
      <CategorySchema slug={normalizedSlug} url={fullUrl} />
      <CategoryClientPage params={{ slug: normalizedSlug }} />
    </>
  )
}
