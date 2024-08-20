"use server";

import db from "@/db/db";
import { Prisma } from "@prisma/client";

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

export const getExpiredCouponCodes = () => {
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
