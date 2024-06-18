import { MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/component/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/component/ui/table";
import prisma from "@/core/db/db";
import { formatCurrency } from "@/core/util/format/formatUtils";

import { DeleteDropDownItem } from "./_component/order-actions/OrderActions";
import { AdminPageHeader } from "../_components/AdminPageHeader";

function getOrders() {
  return prisma.order.findMany({
    select: {
      id: true,
      priceInCents: true,
      product: { select: { name: true } },
      user: { select: { email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default function OrdersPage() {
  return (
    <>
      <AdminPageHeader>{"Sales"}</AdminPageHeader>
      <OrdersTable />
    </>
  );
}

async function OrdersTable() {
  const orders = await getOrders();

  if (orders.length === 0) return <p>{"No sales found"}</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{"Product"}</TableHead>
          <TableHead>{"Customer"}</TableHead>
          <TableHead>{"Price Paid"}</TableHead>
          <TableHead className={"w-0"}>
            <span className={"sr-only"}>{"Actions"}</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.product.name}</TableCell>
            <TableCell>{order.user.email}</TableCell>
            <TableCell>{formatCurrency(order.priceInCents / 100)}</TableCell>
            <TableCell className={"text-center"}>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className={"sr-only"}>{"Actions"}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropDownItem id={order.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
