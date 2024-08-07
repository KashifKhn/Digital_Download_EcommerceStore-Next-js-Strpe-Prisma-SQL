"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleCouponCodeActive } from "../../_actions/couponCode";

const ToggleDropdownMenuItem = ({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleCouponCodeActive(id, !isActive);
          router.refresh();
        });
      }}>
      {isActive ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
};

export default ToggleDropdownMenuItem;
