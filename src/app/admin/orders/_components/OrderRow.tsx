import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/formatters";
import { MoreVertical } from "lucide-react";
import DeleteDropdownMenuItem from "./DeleteDropdownMenuItem";

type OrderRowProps = {
  id: string;
  pricePaidInCents: number;
  user: {
    email: string;
  };
  product: {
    name: string;
  };
};

const OrderRow = ({ order }: { order: OrderRowProps }) => {
  return (
    <TableRow key={order.id}>
      <TableCell>{order.product.name}</TableCell>
      <TableCell>{order.user.email}</TableCell>
      <TableCell>{formatCurrency(order.pricePaidInCents / 100)}</TableCell>
      <TableCell className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical />
            <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DeleteDropdownMenuItem id={order.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default OrderRow;
