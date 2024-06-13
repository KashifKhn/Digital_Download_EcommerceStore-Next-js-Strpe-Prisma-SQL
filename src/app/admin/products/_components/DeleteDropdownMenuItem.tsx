import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React, { useTransition } from "react";
import { deleteProducts } from "../../_actions/products";

const DeleteDropdownMenuItem = ({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      disabled={isPending || disabled}
      onClick={() => {
        startTransition(async () => {
          await deleteProducts(id);
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteDropdownMenuItem;
