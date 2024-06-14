"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React, { useTransition } from "react";
import { deleteProducts } from "../../_actions/products";
import { useRouter } from "next/navigation";

const DeleteDropdownMenuItem = ({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isPending || disabled}
      onClick={() => {
        startTransition(async () => {
          await deleteProducts(id);
          router.refresh();
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteDropdownMenuItem;
