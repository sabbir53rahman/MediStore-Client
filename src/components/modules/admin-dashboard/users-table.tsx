"use client";

import { DataTable } from "@/components/table/data-table";
import { useRouter, useSearchParams } from "next/navigation";
import { columns, User } from "./users-columns";
import { Meta } from "@/components/table/data-table";

interface UsersTableProps {
  users: User[];
  meta: Meta;
}

export function UsersTable({ users, meta }: UsersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <DataTable
      title="Users"
      columns={columns}
      data={users}
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
    />
  );
}
