import { TableBody } from "@/components/ui/table";
import React from "react";
import ProductRow from "./ProductRow";

const ProductTableList = ({ products }: { products: Product[] }) => {
  return (
    <TableBody>
      {products.map((product: Product) => (
        <ProductRow
          key={product.id}
          product={product}
        />
      ))}
    </TableBody>
  );
};

export default ProductTableList;
