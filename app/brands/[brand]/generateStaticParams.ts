import { brands } from '@/data/brands';

export async function generateStaticParams() {
  return brands.map(brand => ({ brand: brand.name.toLowerCase().replace(/\s+/g, '-') }));
}
