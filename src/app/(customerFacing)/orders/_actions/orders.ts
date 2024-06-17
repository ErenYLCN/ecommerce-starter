"use server";

import prisma from "@/core/db/db";

export async function userOrderExists(email: string, productId: string) {
  const order = await prisma.order.findFirst({
    where: {
      user: { email },
      product: { id: productId },
    },
    select: { id: true }
  });

  return order != null;
}
