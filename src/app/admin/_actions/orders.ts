"use server";

import db from "@/db/db";
import { notFound } from "next/navigation";

export const deleteOrder = async (id: string) => {
  const order = await db.order.delete({
    where: { id },
  });

  if (order == null) return notFound();

  return order;
};
