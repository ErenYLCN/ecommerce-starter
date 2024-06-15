"use client";

import { FormEvent, useState } from "react";

import { Product } from "@prisma/client";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";

import { Button } from "@/component/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import { formatCurrency } from "@/core/util/format/formatUtils";

export type CheckoutFormProps = {
  product: Product;
  clientSecret: string;
};

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export default function CheckoutForm({
  product,
  clientSecret,
}: CheckoutFormProps) {
  return (
    <div className={"max-w-5xl w-full mx-auto space-y-8"}>
      <div className={"flex items-center gap-4"}>
        <div className={"aspect-video flex-shrink-0 w-1/3 relative"}>
          <Image
            className={"object-cover"}
            src={product.imagePath}
            alt={"Product image"}
            fill
          />
        </div>
        <div>
          <div className={"text-lg"}>
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <h1 className={"text-2xl font-bold"}>{product.name}</h1>
          <div className={"line-clamp-3 text-muted-foreground"}>
            {product.description}
          </div>
        </div>
      </div>
      <Elements options={{ clientSecret }} stripe={stripe}>
        <Form priceInCents={product.priceInCents} />
      </Elements>
    </div>
  );
}

function Form({ priceInCents }: { priceInCents: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (stripe == null || elements == null) {
      return;
    }

    setIsLoading(true);

    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{"Checkout"}</CardTitle>
          <CardDescription className={"text-destructive"}>
            {"Error"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <PaymentElement />
        </CardContent>

        <CardFooter>
          <Button size={"lg"} disabled={stripe == null || elements == null}>
            {isLoading
              ? "Purchasing.."
              : `Purchase - ${formatCurrency(priceInCents / 100)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
