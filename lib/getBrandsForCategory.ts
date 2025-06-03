import { brands } from '@/data/brands';
import { products } from '@/data/products';

export function getBrandsForCategory(category: string) {
  // Return all brands that have products in this category
  const brandNames = new Set(
    products.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase())
      .map(p => p.brand)
  );
  return brands.filter(b => brandNames.has(b.name));
}
