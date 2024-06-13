import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

const ProductTableHeader = () => {
  return (
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
  );
};

export default ProductTableHeader;
