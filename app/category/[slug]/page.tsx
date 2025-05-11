import type { Metadata } from "next"
import { categories } from "@/data/products"
import { notFound } from "next/navigation"
import CategoryClientPage from "./CategoryClientPage"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Ensure params is resolved before accessing
  const slug = params.slug
  const category = categories[slug]

  if (!category) {
    return {
      title: "Category Not Found | Jong Market",
      description: "The requested category could not be found.",
    }
  }

  return {
    title: `${category.title} | Premium Drinks Collection | Jong Market`,
    description: category.description.substring(0, 160),
    keywords: `${category.title}, premium drinks, buy online, Cameroon, Jong Market`,
    openGraph: {
      title: `${category.title} | Jong Market`,
      description: category.description.substring(0, 160),
      images: [
        {
          url: `/images/categories/${slug}.jpg`,
          width: 800,
          height: 600,
          alt: category.title,
        },
      ],
    },
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  // Make the component async and ensure params is resolved
  const slug = params.slug
  const category = categories[slug]

  if (!category) {
    notFound()
  }

  // Remove the alert as it won't work server-side
  return <CategoryClientPage params={{ slug }} />
}