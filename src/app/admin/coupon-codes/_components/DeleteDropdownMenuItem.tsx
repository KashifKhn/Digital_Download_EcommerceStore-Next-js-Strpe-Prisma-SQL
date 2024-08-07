"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteCouponCode } from "../../_actions/couponCode";

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
          await deleteCouponCode(id);
          router.refresh();
        });
      }}>
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteDropdownMenuItem;
