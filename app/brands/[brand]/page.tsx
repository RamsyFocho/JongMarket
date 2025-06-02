import { brands } from '@/data/brands';
import { products } from '@/data/products';
import Link from 'next/link';
import { formatCurrency } from '@/lib/format-currency';

export default async function BrandPage({ params }: { params: { brand: string } }) {
  const brandName = decodeURIComponent(params.brand);
  const brand = brands.find(b => b.name.toLowerCase().replace(/\s+/g, '-') === brandName.toLowerCase());
  if (!brand) {
    return <div className="p-8 text-center text-xl">Brand not found.</div>;
  }
  // Get all products for this brand
  const brandProducts = products.filter(p => p.brand && p.brand.toLowerCase() === brand.name.toLowerCase());
  // Group products by category
  const productsByCategory: Record<string, typeof brandProducts> = {};
  brandProducts.forEach(product => {
    if (!productsByCategory[product.category]) {
      productsByCategory[product.category] = [];
    }
    productsByCategory[product.category].push(product);
  });
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex items-center gap-4 mb-8">
        <img src={brand.logo} alt={brand.name} className="w-20 h-20 object-contain rounded-lg border bg-white shadow" />
        <div>
          <h1 className="text-3xl font-bold mb-1 text-amber-900">{brand.name}</h1>
          <div className="text-gray-500 text-sm">Categories: {brand.categories.join(', ')}</div>
        </div>
      </div>
      {Object.entries(productsByCategory).map(([category, prods]) => (
        <div key={category} className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-amber-700 border-l-4 border-amber-400 pl-3">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {prods.map(product => (
              <Link key={product.id} href={`/product/${product.slug}`} className="group block bg-white rounded-xl border border-gray-100 shadow hover:shadow-lg transition overflow-hidden hover:-translate-y-1">
                <div className="relative w-full h-48 bg-gray-50 flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <div className="font-semibold text-gray-900 text-base group-hover:text-amber-700 line-clamp-2 min-h-[2.5rem]">{product.name}</div>
                  <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                  <div className="font-bold text-lg text-amber-700 mt-1">{formatCurrency(product.price, 'FCFA')}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
      {brandProducts.length === 0 && (
        <div className="text-center text-gray-500 py-16 text-lg">No products found for this brand.</div>
      )}
    </div>
  );
}
