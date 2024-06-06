import { AdminPageHeader } from "@/app/admin/_components/AdminPageHeader";
import prisma from "@/core/db/db";

import ProductForm from "../../_components/ProductForm";

export default async function EditProduct({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  return (
    <>
      <AdminPageHeader>{"Edit Product"}</AdminPageHeader>

      <ProductForm product={product} />
    </>
  );
}
