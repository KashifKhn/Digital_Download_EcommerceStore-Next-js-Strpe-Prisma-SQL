"use server";

import db from "@/db/db";
import { DiscountCodeType } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const addSchema = z
  .object({
    code: z.string().min(1),
    discountAmount: z.coerce.number().int().min(1),
    discountType: z.nativeEnum(DiscountCodeType),
    allProducts: z.coerce.boolean(),
    productIds: z.array(z.string()).optional(),
    expiresAt: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.coerce.date().min(new Date()).optional()
    ),
    limit: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.coerce.number().int().min(1).optional()
    ),
  })
  .refine(
    (data) =>
      data.discountAmount <= 100 ||
      data.discountType !== DiscountCodeType.PERCENTAGE,
    {
      message: "Percentage discount must be less than or equal to 100",
      path: ["discountAmount"],
    }
  )
  .refine((data) => !data.allProducts || data.productIds == null, {
    message: "Cannot select products when all products is selected",
    path: ["productIds"],
  })
  .refine((data) => data.allProducts || data.productIds != null, {
    message: "Must select products when all products is not selected",
    path: ["productIds"],
  });

export async function addCouponCode(prevState: unknown, formData: FormData) {
  const productIds = formData.getAll("productIds");
  const result = addSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
    productIds: productIds.length > 0 ? productIds : undefined,
  });

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const data = result.data;

  await db.couponCode.create({
    data: {
      code: data.code,
      discountAmount: data.discountAmount,
      discountType: data.discountType,
      allProducts: data.allProducts,
      products:
        data.productIds != null
          ? { connect: data.productIds.map((id) => ({ id })) }
          : undefined,
      expiresAt: data.expiresAt,
      limit: data.limit,
    },
  });

  redirect("/admin/coupon-codes");
  }

export async function toggleCouponCodeActive(id: string, isActive: boolean) {
  await db.couponCode.update({ where: { id }, data: { isActive } });
}

export async function deleteCouponCode(id: string) {
  const couponCode = await db.couponCode.delete({ where: { id } });

  if (couponCode == null) return notFound();

  return couponCode;
}
