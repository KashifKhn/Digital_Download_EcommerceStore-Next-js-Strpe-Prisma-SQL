import {
  Table,
} from "@/components/ui/table";
import db from "@/db/db";
import React from "react";
import ProductTableList from "./ProductTableList";

const ProductsTable = async () => {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      _count: { select: { orders: true } },
    },
    orderBy: { name: "asc" },
  });

  console.log(products);
  
   

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
