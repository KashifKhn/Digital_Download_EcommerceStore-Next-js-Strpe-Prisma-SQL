import { Button } from "@/components/ui/button";
import PageHeader from "../_components/PageHeader";
import Link from "next/link";
import CouponTable from "./_components/CouponTable";
import {
  getExpiredCouponCodes,
  getUnexpiredCouponCodes,
} from "@/services/coupon/couponService";

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
