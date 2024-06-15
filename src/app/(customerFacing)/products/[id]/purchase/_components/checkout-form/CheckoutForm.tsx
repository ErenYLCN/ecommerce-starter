import { Product } from "@prisma/client";

export type CheckoutFormProps = {
  product: Product;
  clientSecret: string;
};

export default function CheckoutForm({
  product,
  clientSecret,
}: CheckoutFormProps) {
  return <form>{"checkout form"}</form>;
}
