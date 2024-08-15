"use server";

import { userOrderExists } from "@/app/actions/orders";
import db from "@/db/db";
import {
  getDiscountedAmount,
  usableDiscountCodeWhere,
} from "@/lib/couponCodeHelper";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createPaymentIntent = async (
  email: string,
  productId: string,
  couponCodeId?: string
) => {
  const product = await db.product.findUnique({ where: { id: productId } });
  if (product == null) return { error: "Unexpected Error" };

  const couponCode =
    couponCodeId == null
      ? null
      : await db.couponCode.findUnique({
          where: { id: couponCodeId, ...usableDiscountCodeWhere(product.id) },
        });

  if (couponCode == null && couponCodeId != null) {
    return { error: "Coupon has expired" };
  }

  const existingOrder = await userOrderExists(email, productId);

  console.log("existingOrder", existingOrder);

  if (existingOrder != null) {
    return {
      error:
        "You have already purchased this product. Try downloading it from the My Orders page",
    };
  }

  const amount =
    couponCode == null
      ? product.priceInCents
      : getDiscountedAmount(couponCode, product.priceInCents);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "USD",
    metadata: {
      productId: product.id,
      couponCodeId: couponCode?.id || null,
    },
  });

  if (paymentIntent.client_secret == null) {
    return { error: "Unknown error from Payment Intent" };
  }

  return { clientSecret: paymentIntent.client_secret };
};
