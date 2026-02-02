"use client";

import { DataTable, Meta } from "@/components/table/data-table";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { deleteMedicineAction } from "@/actions/medicine.actions";

export interface Medicine {
  id: string;
  name: string;
  category: { name: string }; // updated type to match table accessor
  price: number;
  stock: number;
}

interface SellerMedicinesTableProps {
  medicines?: Medicine[];
  meta?: Meta;
}

export function SellerMedicinesTable({
  medicines = [],
  meta = { page: 1, limit: 10, total: 0 },
}: SellerMedicinesTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this medicine?")) return;

    try {
      const res = await deleteMedicineAction(id);
      if (!res.success) {
        toast.error(res.error || "Failed to delete medicine");
      } else {
        toast.success("Medicine deleted successfully!");
        // Refresh the page or table
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while deleting medicine");
    }
  };

  const columns: ColumnDef<Medicine>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Category", accessorKey: "category.name" },
    {
      header: "Price",
      accessorKey: "price",
      cell: ({ getValue }) => `$${getValue<number>()}`,
    },
    { header: "Stock", accessorKey: "stock" },
    {
      header: "Actions",
      cell: ({ row }) => {
        const medicine = row.original;
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                router.push(`/seller-dashboard/edit-product/${medicine.id}`)
              }
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(medicine.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
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
        data={medicines || []}
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
