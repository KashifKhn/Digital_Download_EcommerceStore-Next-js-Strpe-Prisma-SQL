import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { MoreVertical } from "lucide-react";
import DeleteDropdownMenuItem from "./DeleteDropdownMenuItem";

type UserRowProps = {
  id: string;
  email: string;
  orders: {
    pricePaidInCents: number;
  }[];
};

const UserRow = ({ user }: { user: UserRowProps }) => {
  return (
    <TableRow key={user.id}>
      <TableCell>{user.email}</TableCell>
      <TableCell>{formatNumber(user.orders.length)}</TableCell>
      <TableCell>
        {formatCurrency(
          user.orders.reduce((sum, o) => o.pricePaidInCents + sum, 0) / 100
        )}
      </TableCell>
      <TableCell className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical />
            <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DeleteDropdownMenuItem id={user.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
