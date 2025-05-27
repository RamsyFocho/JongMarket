import ProductsPage from "@/components/sections/products/products-page";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsPage />
      </Suspense>
    </div>
  );
}
