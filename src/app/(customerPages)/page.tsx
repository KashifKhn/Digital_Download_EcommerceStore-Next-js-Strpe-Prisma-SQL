import db from "@/db/db";
import React from "react";
import ProductGridSection from "./_components/ProductGridSection";

const getNewestProduct = () => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
};

const getMostPopularProduct = () => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { Order: { _count: "desc" } },
    take: 6,
  });
};

const page = () => {
  return (
    <main className="space-y-12">
      <ProductGridSection title="Most Popular" productsFetcher={getMostPopularProduct} />
      <ProductGridSection title="Newest" productsFetcher={getNewestProduct} />
    </main>
  );
};

export default page;
