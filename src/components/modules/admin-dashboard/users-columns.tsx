"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import {
  adminUpdateUserStatusAction,
  deleteUserAction,
} from "@/actions/user.actions";
import { useRouter } from "next/navigation";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "ACTIVE" | "BANNED";
  createdAt: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <Badge variant="outline">{row.original.role}</Badge>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "ACTIVE" ? "default" : "destructive"}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      const router = useRouter();

      const handleStatusChange = async (status: "ACTIVE" | "BANNED") => {
        const toastId = toast.loading("Updating status...");
        const res = await adminUpdateUserStatusAction(user.id, { status });

        if (!res.success) {
          toast.error(String(res.error), { id: toastId });
          return;
        }

        toast.success("User status updated", { id: toastId });
        router.refresh(); 
      };

      const handleDelete = async () => {
        const confirmed = confirm(
          `Are you sure you want to delete ${user.email}?`,
        );
        if (!confirmed) return;

        const toastId = toast.loading("Deleting user...");
        const res = await deleteUserAction(user.id);

        if (!res.success) {
          toast.error(String(res.error), { id: toastId });
          return;
        }

        toast.success("User deleted", { id: toastId });
        router.refresh();
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {user.status === "ACTIVE" ? (
              <DropdownMenuItem onClick={() => handleStatusChange("BANNED")}>
                Ban User
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => handleStatusChange("ACTIVE")}>
                Activate User
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              className="text-destructive"
              onClick={handleDelete}
            >
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
