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
import { Badge } from "@/components/ui/badge"; // Optional: if you have a badge component
import { OrderStatus } from "@/services/order.service";

export interface Order {
  id: string;
  address: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
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

export function OrdersTable({
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
      const res: any = await updateOrderStatusAction(orderId, newStatus);
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
    {
      header: "Order ID",
      accessorKey: "id",
      cell: ({ getValue }) => (
        <span className="font-mono text-xs">
          {getValue<string>().slice(0, 8)}...
        </span>
      ),
    },
    {
      header: "Customer",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.user?.name}</span>
          <span className="text-xs text-gray-500">
            {row.original.user?.email}
          </span>
        </div>
      ),
    },
    {
      header: "Medicine",
      cell: ({ row }) => {
        const items = row.original.items || [];
        return (
          <div className="text-sm">
            {items.map((item, idx) => (
              <div key={idx}>
                {item.medicine.name}{" "}
                <span className="text-gray-400">x{item.quantity}</span>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      header: "Address",
      accessorKey: "address",
      cell: ({ getValue }) => (
        <span className="text-sm italic">{getValue<string>()}</span>
      ),
    },
    {
      header: "Total",
      accessorKey: "totalAmount",
      cell: ({ getValue }) => (
        <span className="font-bold">${getValue<number>()}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue<string>();
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              status === "PLACED"
                ? "bg-blue-100 text-blue-700"
                : status === "DELIVERED"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
            }`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
      </div>

      <DataTable
        columns={columns}
        data={orders}
        pagination
        paginationMeta={meta}
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
