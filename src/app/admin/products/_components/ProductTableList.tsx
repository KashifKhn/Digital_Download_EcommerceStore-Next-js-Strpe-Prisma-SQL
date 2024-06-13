import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle } from "lucide-react";
import React from "react";
import ProductRow from "./ProductRow";

type ProductTableListProps = {
  products: Product[];
};

const ProductTableList = ({ products }: ProductTableListProps) => {
  return (
    <TableBody>
      {products.map((product: Product) => (
        <ProductRow key={product.id} product={product} />
      ))}
    </TableBody>
  );
};

export default ProductTableList;
