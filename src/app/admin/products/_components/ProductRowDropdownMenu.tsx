import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import React from "react";
import ToggleDropdownMenuItem from "./ToggleDropdownMenuItem";
import DeleteDropdownMenuItem from "./DeleteDropdownMenuItem";

type ProductRowDropdownMenuProps = { product: Product };

const ProductRowDropdownMenu = ({ product }: ProductRowDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical />
        <span className="sr-only">Actions</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <a download href={`/admin/products/${product.id}/download`}>
            Download
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
        </DropdownMenuItem>
        <ToggleDropdownMenuItem
          id={product.id}
          isAvailableForPurchase={product.isAvailableForPurchase}
        />
        <DeleteDropdownMenuItem
          id={product.id}
          disabled={product._count.Order > 0}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductRowDropdownMenu;
