import Link from "next/link";

import { Button } from "@/component/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/component/ui/table";

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

function ProductsTable() {
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

      <TableBody></TableBody>
    </Table>
  );
}
