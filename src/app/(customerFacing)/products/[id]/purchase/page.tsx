import { notFound } from "next/navigation";
import Stripe from "stripe";

import prisma from "@/core/db/db";

import CheckoutForm from "./_components/checkout-form/CheckoutForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function ProductPurchasePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (product == null) return notFound();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "usd",
    metadata: {
      productId: product.id,
    },
  });

  if (paymentIntent.client_secret == null) {
    throw Error("Client secret is missing");
  }

  return (
    <CheckoutForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  );
}
