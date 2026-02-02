"use client";

import { DataTable, Meta } from "@/components/table/data-table";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

interface SellerMedicinesTableProps {
  medicines?: Medicine[]; // optional to prevent undefined
  meta?: Meta; // optional
}

export function SellerMedicinesTable({
  medicines = [], // default empty array
  meta = { page: 1, limit: 10, total: 0 }, // default meta
}: SellerMedicinesTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const columns: ColumnDef<Medicine>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Category", accessorKey: "category" },
    {
      header: "Price",
      accessorKey: "price",
      cell: ({ getValue }) => `$${getValue<number>()}`,
    },
    { header: "Stock", accessorKey: "stock" },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Medicines</h1>
        <Button onClick={() => router.push("/seller-dashboard/add-product")}>
          Add Medicine
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={medicines || []} // ensure array
        pagination
        paginationMeta={meta || { page: 1, limit: 10, total: 0 }}
        onPaginationChange={({ pageIndex, pageSize }) => {
          const params = new URLSearchParams(searchParams?.toString() || "");
          params.set("page", String(pageIndex + 1));
          params.set("limit", String(pageSize));
          router.push(`?${params.toString()}`);
        }}
        title="Medicines"
      />
    </div>
  );
}
