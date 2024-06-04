"use server";

import fs from "fs/promises";

import { redirect } from "next/navigation";
import { z } from "zod";

import prisma from "@/core/db/db";

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/")
)

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine(file => file.size > 0, "Required"),
  image: imageSchema.refine(file => file.size > 0, "Required"),
})

export async function addProduct(_prevState: unknown, formData: FormData) {
  // TODO: Something is wrong here, find it
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const resultData = result.data

  await fs.mkdir("products", { recursive: true })
  const filePath = `products/${crypto.randomUUID()}-${resultData.file.name}`
  await fs.writeFile(filePath, Buffer.from(await resultData.file.arrayBuffer()))

  await fs.mkdir("public/products", { recursive: true })
  const imagePath = `/products/${crypto.randomUUID()}-${resultData.file.name}`
  await fs.writeFile(`public${imagePath}`, Buffer.from(await resultData.image.arrayBuffer()))

  const data = {
    isAvailableForPurchase: false,
    name: resultData.name,
    description: resultData.description,
    priceInCents: resultData.priceInCents,
    filePath,
    imagePath,
  }

  console.log(data, resultData, result)

  prisma.product.create({
    data,
  })

  redirect("/admin/products")
}
