import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import React, { Suspense } from "react";
import ProductSuspense from "../_components/ProductSuspense";
import db from "@/db/db";
import { cache } from "@/lib/cache";

const getAllProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { name: "asc" },
    });
  },
  ["/", "all-products-customer"],
  { revalidate: 60 * 60 * 24 }
);
const ProductsPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }>
        <ProductSuspense productsFetcher={getAllProducts} />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
