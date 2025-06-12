"use client";
import { brands } from "@/data/brands";
import { products } from "@/data/products";
import Link from "next/link";
import ProductCard from "@/components/Card/ProductCard";
import { formatCurrency } from "@/lib/format-currency";

export default async function BrandPage({
  params,
}: {
  params: { brand: string };
}) {
  const brandName = decodeURIComponent(params.brand);
  const brand = brands.find(
    (b) => b.name.toLowerCase().replace(/\s+/g, "-") === brandName.toLowerCase()
  );
  if (!brand) {
    return <div className="p-8 text-center text-xl">Brand not found.</div>;
  }
  // Get all products for this brand
  const brandProducts = products.filter(
    (p) => p.brand && p.brand.toLowerCase() === brand.name.toLowerCase()
  );
  // Group products by category
  const productsByCategory: Record<string, typeof brandProducts> = {};
  brandProducts.forEach((product) => {
    if (!productsByCategory[product.category]) {
      productsByCategory[product.category] = [];
    }
    productsByCategory[product.category].push(product);
  });
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Breadcrumb navigation */}
      <nav className="text-sm mb-6" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex text-gray-500">
          <li className="flex items-center">
            <Link href="/" className="hover:text-amber-700">
              Home
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link href="/brands" className="hover:text-amber-700">
              Brands
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-amber-900 font-semibold" aria-current="page">
            {brand.name}
          </li>
        </ol>
      </nav>
      <div className="flex items-center gap-4 mb-8">
        <img
          src={brand.logo}
          alt={brand.name}
          className="w-20 h-20 object-contain rounded-lg border bg-white shadow"
        />
        <div>
          <h1 className="text-3xl font-bold mb-1 text-amber-900">
            {brand.name}
          </h1>
          <div className="text-gray-500 text-sm">
            Categories: {brand.categories.join(", ")}
          </div>
        </div>
      </div>
      {Object.entries(productsByCategory).map(([category, prods]) => (
        <div key={category} className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-amber-700 border-l-4 border-amber-400 pl-3">
            {category}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {prods.map((product) => (
              <ProductCard key={product.id} product={product} />

              
            ))}
          </div>
        </div>
      ))}
      {brandProducts.length === 0 && (
        <div className="text-center text-gray-500 py-16 text-lg">
          No products found for this brand.
        </div>
      )}
    </div>
  );
}
