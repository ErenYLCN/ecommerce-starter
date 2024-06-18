"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { deleteUser } from "@/app/admin/_actions/user";
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
          await deleteUser(id);
          router.refresh();
        })
      }
    >
      {"Delete"}
    </DropdownMenuItem>
  );
}
