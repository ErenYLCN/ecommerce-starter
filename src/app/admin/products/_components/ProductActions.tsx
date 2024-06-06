"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { DropdownMenuItem } from "@/component/ui/dropdown-menu";

import {
  deleteProduct,
  toggleProductAvailability,
} from "../../_actions/product";

export function ActiveToggleDropdownItem({
  id,
  isAvailableForPurchase,
}: {
  id: string;
  isAvailableForPurchase: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForPurchase);
          router.refresh();
        });
      }}
    >
      {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
}

export function DeleteDropdownItem({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      variant={"destructive"}
      disabled={pending || disabled}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh();
        });
      }}
    >
      {"Delete"}
    </DropdownMenuItem>
  );
}
