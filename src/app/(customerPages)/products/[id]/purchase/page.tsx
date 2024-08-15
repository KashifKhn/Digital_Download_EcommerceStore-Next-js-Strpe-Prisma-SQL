import db from "@/db/db";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import CheckoutForm from "./_components/CheckoutForm";
import { usableDiscountCodeWhere } from "@/lib/couponCodeHelper";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const getDiscountCode = (coupon: string, productId: string) => {
  return db.couponCode.findUnique({
    select: { id: true, discountAmount: true, discountType: true },
    where: { ...usableDiscountCodeWhere, code: coupon },
  });
};

const ProductPurchasePage = async ({
  params: { id },
  searchParams: { coupon },
}: {
  params: { id: string };
  searchParams: { coupon?: string };
}) => {
  const product = await db.product.findUnique({ where: { id } });
  if (product == null) {
    return notFound();
  }


  const couponCode =
    coupon == null ? undefined : await getDiscountCode(coupon, product.id);

  return (
    <>
      <CheckoutForm
        product={product}
        couponCode={couponCode || undefined}
      />
    </>
  );
};

export default ProductPurchasePage;
