import Link from "next/link";

import { Button } from "@/component/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/component/ui/table";
import prisma from "@/core/db/db";

import { AdminPageHeader } from "../_components/AdminPageHeader";

export default function Products() {
  return (
    <>
      <div className={"flex justify-between items-center gap-4 mb-4"}>
        <AdminPageHeader>{"Products"}</AdminPageHeader>

        <Button asChild>
          <Link href={"/admin/products/new"}>{"Create Product"}</Link>
        </Button>
      </div>

      <ProductsTable />
    </>
  );
}

async function ProductsTable() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      _count: { select: { orders: true } },
    },
    orderBy: { name: "asc" },
  });
  
  if (products.length === 0) {
    return <p>{"No products found"}</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={"w-0"}>
            <span className={"sr-only"}>{"Available For Purchase"}</span>
          </TableHead>
          <TableHead>{"Name"}</TableHead>
          <TableHead>{"Price"}</TableHead>
          <TableHead>{"Orders"}</TableHead>
          <TableHead className={"w-0"}>
            <span className={"sr-only"}>{"Actions"}</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvailableForPurchase ? "✅" : "❌"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
