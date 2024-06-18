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
import { formatCurrency, formatNumber } from "@/core/util/format/formatUtils";

import { DeleteDropDownItem } from "./_component/user-actions/UserActions";
import { AdminPageHeader } from "../_components/AdminPageHeader";

function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      orders: { select: { priceInCents: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default function UsersPage() {
  return (
    <>
      <AdminPageHeader>{"Customers"}</AdminPageHeader>
      <UsersTable />
    </>
  );
}

async function UsersTable() {
  const users = await getUsers();

  if (users.length === 0) return <p>{"No customers found"}</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{"Email"}</TableHead>
          <TableHead>{"Orders"}</TableHead>
          <TableHead>{"Value"}</TableHead>
          <TableHead className={"w-0"}>
            <span className={"sr-only"}>{"Actions"}</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{formatNumber(user.orders.length)}</TableCell>
            <TableCell>
              {formatCurrency(
                user.orders.reduce((sum, o) => o.priceInCents + sum, 0) / 100,
              )}
            </TableCell>
            <TableCell className={"text-center"}>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className={"sr-only"}>{"Actions"}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropDownItem id={user.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
