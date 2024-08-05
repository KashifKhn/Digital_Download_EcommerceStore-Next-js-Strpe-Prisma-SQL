import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

const CouponTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-0">
          <span className="sr-only">Is Active</span>
        </TableHead>
        <TableHead>Code</TableHead>
        <TableHead>Discount</TableHead>
        <TableHead>Expires</TableHead>
        <TableHead>Remaining Uses</TableHead>
        <TableHead>Orders</TableHead>
        <TableHead>Products</TableHead>
        <TableHead className="w-0">
          <span className="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default CouponTableHeader;
