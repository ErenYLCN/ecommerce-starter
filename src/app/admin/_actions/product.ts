"use server";

import fs from "fs/promises";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
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
const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
})

export async function editProduct(id: string, _prevState: unknown, formData: FormData) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const resultData = result.data
  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (product === null) return notFound()

  let filePath = product.filePath
  let imagePath = product.imagePath

  if (resultData.file !== undefined && resultData.file.size > 0) {
    await fs.unlink(product.filePath)
    filePath = `products/${crypto.randomUUID()}-${resultData.file.name}`
    await fs.writeFile(filePath, Buffer.from(await resultData.file.arrayBuffer()))
  }

  if (resultData.image !== undefined && resultData.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`)
    imagePath = `/products/${crypto.randomUUID()}-${resultData.image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await resultData.image.arrayBuffer()))
  }

  const data = {
    isAvailableForPurchase: false,
    name: resultData.name,
    description: resultData.description,
    priceInCents: resultData.priceInCents,
    filePath,
    imagePath,
  }

  await prisma.product.update({
    where: { id },
    data,
  })

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/admin/products")
}

export async function addProduct(_prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const resultData = result.data

  await fs.mkdir("products", { recursive: true })
  const filePath = `products/${crypto.randomUUID()}-${resultData.file.name}`
  await fs.writeFile(filePath, Buffer.from(await resultData.file.arrayBuffer()))

  await fs.mkdir("public/products", { recursive: true })
  const imagePath = `/products/${crypto.randomUUID()}-${resultData.image.name}`
  await fs.writeFile(`public${imagePath}`, Buffer.from(await resultData.image.arrayBuffer()))

  const data = {
    isAvailableForPurchase: false,
    name: resultData.name,
    description: resultData.description,
    priceInCents: resultData.priceInCents,
    filePath,
    imagePath,
  }

  await prisma.product.create({
    data,
  })

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/admin/products")
}

export async function toggleProductAvailability(id: string, isAvailableForPurchase: boolean) {
  await prisma.product.update({
    where: { id },
    data: { isAvailableForPurchase },
  })

  revalidatePath("/")
  revalidatePath("/products")
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.delete({
    where: { id },
  })

  if (product === null) return notFound()

  await fs.unlink(product.filePath)
  await fs.unlink(`public${product.imagePath}`)

  revalidatePath("/")
  revalidatePath("/products")
}

