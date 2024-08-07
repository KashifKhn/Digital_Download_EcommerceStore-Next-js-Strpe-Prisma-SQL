import { TableCell, TableRow } from "@/components/ui/table";
import {
  formatDateTime,
  formatDiscountCode,
  formatNumber,
} from "@/lib/formatters";
import {
  CheckCircle2,
  Globe,
  Infinity,
  Minus,
  MoreVertical,
  XCircle,
} from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ToggleDropdownMenuItem from "./ToggleDropdownMenuItem";
import DeleteDropdownMenuItem from "./DeleteDropdownMenuItem";
import { Prisma } from "@prisma/client";

type Coupon = Prisma.CouponCodeGetPayload<{
  include: {
    products: { select: { name: true } };
    _count: { select: { orders: true } };
  };
}>;

type CouponRowProps = {
  coupon: Coupon;
  isInactive?: boolean;
  canDeactivate?: boolean;
};

const CouponRow = ({ coupon, isInactive, canDeactivate }: CouponRowProps) => {
  return (
    <TableRow key={coupon.id}>
      <TableCell>
        {coupon.isActive && !isInactive ? (
          <>
            <span className="sr-only">Active</span>
            <CheckCircle2 />
          </>
        ) : (
          <>
            <span className="sr-only">Inactive</span>
            <XCircle className="stroke-destructive" />
          </>
        )}
      </TableCell>
      <TableCell>{coupon.code}</TableCell>
      <TableCell>{formatDiscountCode(coupon)}</TableCell>
      <TableCell>
        {coupon.expiresAt == null ? (
          <Minus />
        ) : (
          formatDateTime(coupon.expiresAt)
        )}
      </TableCell>
      <TableCell>
        {coupon.limit == null ? (
          <Infinity />
        ) : (
          formatNumber(coupon.limit - coupon.uses)
        )}
      </TableCell>
      <TableCell>{formatNumber(coupon._count.orders)}</TableCell>
      <TableCell>
        {coupon.allProducts ? (
          <Globe />
        ) : (
          coupon.products.map((p: { name: any }) => p.name).join(", ")
        )}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical />
            <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {canDeactivate && (
              <>
                <ToggleDropdownMenuItem
                  id={coupon.id}
                  isActive={coupon.isActive}
                />
                <DropdownMenuSeparator />
              </>
            )}
            <DeleteDropdownMenuItem
              id={coupon.id}
              disabled={coupon._count.orders > 0}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default CouponRow;
