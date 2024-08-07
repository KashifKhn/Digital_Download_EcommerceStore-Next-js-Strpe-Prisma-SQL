import { Button } from "@/components/ui/button";
import PageHeader from "../_components/PageHeader";
import Link from "next/link";
import db from "@/db/db";
import { Prisma } from "@prisma/client";
import CouponTable from "./_components/CouponTable";

const WHERE_EXPIRED: Prisma.CouponCodeWhereInput = {
  OR: [
    { limit: { not: null, lte: db.couponCode.fields.uses } },
    { expiresAt: { not: null, lte: new Date() } },
  ],
};

const SELECT_FIELDS: Prisma.CouponCodeSelect = {
  id: true,
  allProducts: true,
  code: true,
  discountAmount: true,
  discountType: true,
  expiresAt: true,
  limit: true,
  uses: true,
  isActive: true,
  products: { select: { name: true } },
  _count: { select: { orders: true } },
};

const getExpiredCouponCodes = () => {
  return db.couponCode.findMany({
    select: SELECT_FIELDS,
    where: WHERE_EXPIRED,
    orderBy: { createdAt: "asc" },
  });
};

export const getUnexpiredCouponCodes = () => {
  return db.couponCode.findMany({
    select: SELECT_FIELDS,
    where: { NOT: WHERE_EXPIRED },
    orderBy: { createdAt: "asc" },
  });
};

const CouponPage = async () => {
  const [expiredCouponCodes, unexpiredCouponCodes] = await Promise.all([
    getExpiredCouponCodes(),
    getUnexpiredCouponCodes(),
  ]);

  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Coupons</PageHeader>
        <Button asChild>
          <Link href="/admin/coupon-codes/new">Add Coupon</Link>
        </Button>
      </div>
      <CouponTable
        coupons={unexpiredCouponCodes}
        canDeactivate
      />

      <div className="mt-8">
        <h2 className="text-xl font-bold">Expired Coupons</h2>
        <CouponTable
          coupons={expiredCouponCodes}
          isInactive
        />
      </div>
    </>
  );
};

export default CouponPage;
