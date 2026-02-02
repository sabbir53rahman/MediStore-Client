"use client";

import { DataTable } from "@/components/table/data-table";
import { useRouter, useSearchParams } from "next/navigation";
import { Order, orderColumns } from "./order-columns";

interface OrdersTableProps {
  orders: Order[];
  meta: { page: number; limit: number; total: number };
}

export function OrdersTable({ orders, meta }: OrdersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <DataTable
      title="Orders"
      columns={orderColumns}
      data={orders}
      pagination
      paginationMeta={meta}
      onPaginationChange={({ pageIndex, pageSize }) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(pageIndex + 1));
        params.set("limit", String(pageSize));
        router.push(`?${params.toString()}`);
      }}
      onSearch={(value) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("search", value);
        params.set("page", "1");
        router.push(`?${params.toString()}`);
      }}
      onRowClick={(row) => {
        router.push(`/admin/orders/${row.id}`);
      }}
    />
  );
}
