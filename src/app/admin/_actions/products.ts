"use server";

import db from "@/db/db";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const fileSchema = z.instanceof(File, { message: "File is required" });

const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
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
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return result.error?.formErrors.fieldErrors;
  }

  const data = result.data;
  await fs.mkdir("public/uploads/products/files", { recursive: true });
  const filePath = `/uploads/products/files/${crypto.randomUUID()}-${
    data.file.name
  }`;
  await fs.writeFile(
    `public${filePath}`,
    Buffer.from(await data.file.arrayBuffer())
  );

  await fs.mkdir("public/uploads/products/images", { recursive: true });
  const imagePath = `/uploads/products/images/${crypto.randomUUID()}-${
    data.image.name
  }`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath: filePath,
      imagePath: imagePath,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
};

const editProductSchema = addProductSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

export const updateProducts = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const result = editProductSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return result.error?.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await db.product.findUnique({ where: { id } });

  if (product == null) {
    return notFound();
  }

  let filePath = product.filePath;
  if (data.file != null && data.file.size > 0) {
    await fs.unlink(`public${product.filePath}`);
    filePath = `/uploads/products/files/${crypto.randomUUID()}-${
      data.file.name
    }`;
    await fs.writeFile(
      `public${filePath}`,
      Buffer.from(await data.file.arrayBuffer())
    );
  }

  let imagePath = product.imagePath;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`);
    imagePath = `/uploads/products/images/${crypto.randomUUID()}-${
      data.image.name
    }`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath: filePath,
      imagePath: imagePath,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
};

export const toggleIsAvailability = async (
  id: string,
  isAvailableForPurchase: boolean
) => {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } });

  revalidatePath("/");
  revalidatePath("/products");
};

export const deleteProducts = async (id: string) => {
  const product = await db.product.delete({ where: { id } });
  if (!product) {
    notFound();
  }
  await fs.unlink(`public${product.filePath}`);
  await fs.unlink(`public${product.imagePath}`);

  revalidatePath("/");
  revalidatePath("/products");
};
