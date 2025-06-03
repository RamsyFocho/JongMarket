import { brands } from '@/data/brands';

export default function BrandsListPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">All Brands</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map(brand => (
          <a key={brand.id} href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`} className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden text-center p-4">
            <img src={brand.logo} alt={brand.name} className="w-20 h-20 object-contain mx-auto mb-3 bg-gray-50 rounded-lg border" />
            <div className="font-semibold text-gray-900">{brand.name}</div>
            <div className="text-xs text-gray-500 mt-1">{brand.categories.join(', ')}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
