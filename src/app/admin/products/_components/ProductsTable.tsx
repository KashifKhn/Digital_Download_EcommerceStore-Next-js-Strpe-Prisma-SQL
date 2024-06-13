import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import React from "react";
import ProductTableList from "./ProductTableList";

const ProductsTable = async () => {
  const products = await db.product.findMany({
    select: {
      name: true,
      id: true,
      isAvailableForPurchase: true,
      priceInCent: true,
      _count: { select: { Order: true } },
    },
    orderBy: { name: "asc" },
  });

  if (products.length === 0) {
    return <p className="text-center">No products found.</p>;
  }
  return (
    <Table>
      <ProductTableList products={products} />
    </Table>
  );
};

export default ProductsTable;
