import React from "react";

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";

import { OrderInfo } from "@/component/order-info/OrderInfo";

type OrderHistoryEmailProps = {
  orders: {
    id: string;
    priceInCents: number;
    createdAt: Date;
    downloadVerificationId: string;
    product: {
      name: string;
      imagePath: string;
      description: string;
    };
  }[];
};

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      priceInCents: 10000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product name",
        description: "Some description",
        imagePath:
          "/products/09ad3200-ba1f-4aac-8144-717219a22cc8-WhatsApp Image 2024-05-20 at 1.59.42 PM.jpeg",
      },
    },
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      priceInCents: 2000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product name 2",
        description: "Some other desc",
        imagePath:
          "/products/39f9b7f9-0af2-4bc9-ae6d-d3e49a013bf8-19f4597f-6969-43ed-bb73-21438bf0bba6.png",
      },
    },
  ],
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>{"Order History & Downloads"}</Preview>
      <Tailwind>
        <Head />
        <Body className={"font-sans bg-white"}>
          <Container className={"max-w-xl"}>
            <Heading>{"Order History"}</Heading>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderInfo
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
