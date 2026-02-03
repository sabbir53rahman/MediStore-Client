"use client";

import { DataTable, Meta } from "@/components/table/data-table";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { updateOrderStatusAction } from "@/actions/order.actions";

export interface Order {
  id: string;
  customerName: string;
  totalAmount: number;
  status: "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  items: {
    quantity: number;
    price: number;
    medicine: {
      name: string;
    };
  }[];
}

interface SellerOrdersTableProps {
  orders?: Order[];
  meta?: Meta;
}

export function SellerOrdersTable({
  orders = [],
  meta = { page: 1, limit: 10, total: 0 },
}: SellerOrdersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleStatusChange = async (
    orderId: string,
    newStatus: Order["status"],
  ) => {
    try {
      const res = await updateOrderStatusAction(orderId, newStatus);
      if (!res.success) {
        toast.error(res.error || "Failed to update status");
      } else {
        toast.success("Order status updated!");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const columns: ColumnDef<Order>[] = [
    { header: "Order ID", accessorKey: "id" },
    {
      header: "Medicine",
      cell: ({ row }) => {
        const order = row.original;

        return (
          <span className="text-sm">
            {order.items?.map((item) => item.medicine.name).join(", ")}
          </span>
        );
      },
    },

    {
      header: "Total Amount",
      accessorKey: "totalAmount",
      cell: ({ getValue }) => `$${getValue<number>()}`,
    },
    { header: "Status", accessorKey: "status" },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ getValue }) =>
        new Date(getValue<string>()).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }),
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="flex gap-2 items-center">
            <Select
              defaultValue={order.status}
              onValueChange={(val: any) =>
                handleStatusChange(order.id, val as Order["status"])
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PROCESSING">PROCESSING</SelectItem>
                <SelectItem value="SHIPPED">SHIPPED</SelectItem>
                <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                <SelectItem value="CANCELLED">CANCELLED</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Your Orders</h1>
      </div>

      <DataTable
        columns={columns}
        data={orders || []}
        pagination
        paginationMeta={meta || { page: 1, limit: 10, total: 0 }}
        onPaginationChange={({ pageIndex, pageSize }) => {
          const params = new URLSearchParams(searchParams?.toString() || "");
          params.set("page", String(pageIndex + 1));
          params.set("limit", String(pageSize));
          router.push(`?${params.toString()}`);
        }}
        title="Orders"
      />
    </div>
  );
}
