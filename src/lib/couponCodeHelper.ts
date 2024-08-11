import db from "@/db/db";
import { DiscountCodeType, Prisma } from "@prisma/client";

export function usableDiscountCodeWhere(productId: string) {
  return {
    isActive: true,
    AND: [
      {
        OR: [{ allProducts: true }, { products: { some: { id: productId } } }],
      },
      { OR: [{ limit: null }, { limit: { gt: db.couponCode.fields.uses } }] },
      { OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }] },
    ],
  } satisfies Prisma.CouponCodeWhereInput;
}

export function getDiscountedAmount(
  couponCode: { discountAmount: number; discountType: DiscountCodeType },
  priceInCents: number
) {
  switch (couponCode.discountType) {
    case "PERCENTAGE":
      return Math.max(
        1,
        Math.ceil(
          priceInCents - (priceInCents * couponCode.discountAmount) / 100
        )
      );
    case "FIXED":
      return Math.max(
        1,
        Math.ceil(priceInCents - couponCode.discountAmount * 100)
      );
    default:
      throw new Error(
        `Invalid discount type ${couponCode.discountType satisfies never}`
      );
  }
}
