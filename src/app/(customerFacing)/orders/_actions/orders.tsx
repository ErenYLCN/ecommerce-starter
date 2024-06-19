"use server";

import { Resend } from "resend";
import { z } from "zod";

import prisma from "@/core/db/db";
import OrderHistory from "@/email/OrderHistory";

const resend = new Resend(process.env.RESEND_API_KEY as string);

const emailSchema = z.string().email();

export async function userOrderExists(email: string, productId: string) {
  const order = await prisma.order.findFirst({
    where: {
      user: { email },
      product: { id: productId },
    },
    select: { id: true },
  });

  return order != null;
}

export async function emailOrderHistory(
  _prevState: unknown,
  formData: FormData,
): Promise<{ message?: string; error?: string }> {
  // This function is not implemented yet
  const result = emailSchema.safeParse(formData.get("email"));

  if (!result.success) {
    return { error: "Invalid email" };
  }

  const user = await prisma.user.findUnique({
    where: { email: result.data },
    select: {
      email: true,
      orders: {
        select: {
          priceInCents: true,
          id: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              imagePath: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (user == null) {
    return {
      message:
        "Check your email to view your order history and download your products",
    };
  }

  const orders = user.orders.map(async (order) => ({
    ...order,
    downloadVerificationId: (
      await prisma.downloadVerification.create({
        data: {
          expiresAt: new Date(Date.now() + 24 * 1000 * 60 * 60),
          productId: order.product.id,
        },
      })
    ).id,
  }));

  const data = await resend.emails.send({
    from: `Support <${process.env.SENDER_EMAIL as string}>`,
    to: user.email,
    subject: "Your order history",
    react: <OrderHistory orders={await Promise.all(orders)} />,
  });

  if (data.error) {
    return {
      error: "There was an error sending your email. Please try again.",
    };
  }

  return {
    message:
      "Check your email to view your order history and download your products.",
  };
}
