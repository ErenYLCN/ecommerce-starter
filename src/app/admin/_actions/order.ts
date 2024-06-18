"use server"

import { notFound } from "next/navigation"

import prisma from "@/core/db/db"

export async function deleteOrder(id: string) {
  const order = await prisma.order.delete({
    where: { id },
  })

  if (order == null) return notFound()

  return order
}
