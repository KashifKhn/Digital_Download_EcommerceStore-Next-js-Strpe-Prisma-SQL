import db from "@/db/db";
import PageHeader from "../../_components/PageHeader";
import CouponCodeForm from "../_components/CouponCodeForm";

const NewCouponCodePage = async () => {
  const products = await db.product.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <PageHeader>Add Coupon</PageHeader>
      <CouponCodeForm products={products} />
    </>
  );
};

export default NewCouponCodePage;
