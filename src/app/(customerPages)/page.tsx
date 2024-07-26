import db from "@/db/db";
import React from "react";
import ProductGridSection from "./_components/ProductGridSection";
import { cache } from "@/lib/cache";

const getNewestProduct = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  },
  ["/", "newest-products"],
  { revalidate: 60 * 60 * 24 }
);
const getMostPopularProduct = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { Order: { _count: "desc" } },
      take: 6,
    });
  },
  ["/", "most-popular-products"],
  { revalidate: 60 * 60 * 24 }
);

const page = () => {
  return (
    <main className="space-y-12">
      <ProductGridSection
        title="Most Popular"
        productsFetcher={getMostPopularProduct}
      />
      <ProductGridSection
        title="Newest"
        productsFetcher={getNewestProduct}
      />
    </main>
  );
};

export default page;
