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
  const category = categories[params.slug]

  if (!category) {
    notFound()
  }

  // Base URL for schema
  const baseUrl = "https://jongmarket.com"
  const fullUrl = `${baseUrl}/category/${params.slug}`

  return (
    <>
      <CategorySchema slug={params.slug} url={fullUrl} />
      <CategoryClientPage params={params} />
    </>
  )
}
