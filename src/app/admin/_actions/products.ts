"use server";

import db from "@/db/db";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const fileSchema = z.instanceof(File, { message: "File is required" });

const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/"),
);

const addProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine((file) => file.size > 0, "File is required"),
  image: imageSchema.refine((file) => file.size > 0, "File is required"),
});

export const addProducts = async (prevState: unknown, formData: FormData) => {
  const result = addProductSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (result.success === false) {
    return result.error?.formErrors.fieldErrors;
  }

  const data = result.data;
  await fs.mkdir("public/uploads/products", { recursive: true });
  const filePath = `/uploads/products/${crypto.randomUUID()}-${data.file.name}`;
  await fs.writeFile(
    `public${filePath}`,
    Buffer.from(await data.file.arrayBuffer()),
  );

  await fs.mkdir("public/uploads/products/images", { recursive: true });
  const imagePath = `/uploads/products/images${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer()),
  );

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCent: data.priceInCents,
      filePath: filePath,
      imagePath: imagePath,
    },
  });

  console.log("Product added successfully");
  redirect("/admin/products");
};

export const toggleIsAvailability = async (
  id: string,
  isAvailableForPurchase: boolean,
) => {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } });
};

export const deleteProducts = async (id: string) => {
  const product = await db.product.delete({ where: { id } });
  if (!product) {
    notFound();
  }
};
