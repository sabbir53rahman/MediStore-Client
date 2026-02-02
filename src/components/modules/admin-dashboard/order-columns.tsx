"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateOrderStatusAction } from "@/actions/order.actions";
import { useRouter } from "next/navigation";
import { OrderStatus } from "@/services/order.service";

export type Order = {
  id: string;
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
};

export type ValidOrderStatus =
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";
export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => `$${row.original.totalAmount.toFixed(2)}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const router = useRouter();
      const status = row.original.status as ValidOrderStatus;

      const handleStatusChange = async (newStatus: ValidOrderStatus) => {
        const toastId = toast.loading("Updating status...");
        const res = await updateOrderStatusAction(row.original.id, newStatus);

        if (!res.success) {
          toast.error(String(res.error), { id: toastId });
          return;
        }

        toast.success("Order status updated", { id: toastId });
        router.refresh();
      };

      return (
        <div className="flex items-center gap-2">
          <Badge
            variant={
              status === "PROCESSING"
                ? "secondary"
                : status === "SHIPPED"
                  ? "outline"
                  : status === "DELIVERED"
                    ? "default"
                    : "destructive"
            }
          >
            {status}
          </Badge>

          {status !== "DELIVERED" && status !== "CANCELLED" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                handleStatusChange(
                  status === "PROCESSING" ? "SHIPPED" : "DELIVERED",
                )
              }
            >
              Next Status
            </Button>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString() +
      " " +
      new Date(row.original.createdAt).toLocaleTimeString(),
  },
];
