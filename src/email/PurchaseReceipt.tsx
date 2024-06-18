import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";

import { OrderInformation } from "@/component/order-info/OrderInfo";

type PurchaseReceiptEmailProps = {
  product: {
    name: string;
    imagePath: string;
    description: string;
  };
  order: { id: string; createdAt: Date; priceInCents: number };
  downloadVerificationId: string;
};

PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: "Product name",
    description: "Some description",
    imagePath:
      "/products/09ad3200-ba1f-4aac-8144-717219a22cc8-WhatsApp Image 2024-05-20 at 1.59.42 PM.jpeg",
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    priceInCents: 10000,
  },
  downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps;

export default function PurchaseReceiptEmail({
  product,
  order,
  downloadVerificationId,
}: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>
        {"Download "}
        {product.name}
        {" and view receipt"}
      </Preview>
      <Tailwind>
        <Head />
        <Body className={"font-sans bg-white"}>
          <Container className={"max-w-xl"}>
            <Heading>{"Purchase Receipt"}</Heading>
            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
