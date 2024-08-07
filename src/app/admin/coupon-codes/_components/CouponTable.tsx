import { Table, TableBody } from "@/components/ui/table";
import React from "react";
import { getUnexpiredCouponCodes } from "../page";
import CouponTableHeader from "./CouponTableHeader";
import CouponRow from "./CouponRow";

type DiscountCodesTableProps = {
  coupons: Awaited<ReturnType<typeof getUnexpiredCouponCodes>>;
  isInactive?: boolean;
  canDeactivate?: boolean;
};

const CouponTable = async ({
  coupons,
  isInactive,
  canDeactivate,
}: DiscountCodesTableProps) => {
  return (
    <Table>
      <CouponTableHeader />
      <TableBody>
        {coupons.map((coupon) => (
          <CouponRow
            coupon={coupon}
            key={coupon.id}
            isInactive={isInactive}
            canDeactivate={canDeactivate}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default CouponTable;
