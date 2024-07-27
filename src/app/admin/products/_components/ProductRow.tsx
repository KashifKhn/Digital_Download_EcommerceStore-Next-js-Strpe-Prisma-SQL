import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { CheckCircle2, XCircle } from "lucide-react";
import React from "react";
import ProductRowDropdownMenu from "./ProductRowDropdownMenu";

type ProductRowProps = { product: Product };

const ProductRow = ({ product }: ProductRowProps) => {
  console.log("ProductRow", product);
  
  return (
    <TableRow key={product.id}>
      <TableCell>
        {product.isAvailableForPurchase ? (
          <>
            {" "}
            <CheckCircle2 /> <span className="sr-only">Available</span>{" "}
          </>
        ) : (
          <>
            {" "}
            <XCircle className="stroke-destructive" />{" "}
            <span className="sr-only">Unavailable</span>
          </>
        )}
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
      <TableCell>{formatNumber(product._count.orders)}</TableCell>
      <TableCell>
        <ProductRowDropdownMenu product={product} />
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
