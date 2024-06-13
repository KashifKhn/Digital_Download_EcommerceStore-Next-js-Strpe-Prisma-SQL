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
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available for Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <ProductTableList products={products} />
    </Table>
  );
};

export default ProductsTable;
