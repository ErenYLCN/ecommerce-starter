"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { deleteOrder } from "@/app/admin/_actions/order";
import { DropdownMenuItem } from "@/component/ui/dropdown-menu";

export function DeleteDropDownItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      variant={"destructive"}
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteOrder(id);
          router.refresh();
        })
      }
    >
      {"Delete"}
    </DropdownMenuItem>
  );
}
