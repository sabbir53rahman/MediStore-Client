import { getAllUsersAction } from "@/actions/user.actions";
import { getAllOrdersAction } from "@/actions/order.actions";
import { getAllMedicinesAction } from "@/actions/medicine.actions";
import StatsCard from "@/components/modules/seller-dashboard/StatsCard";
import UsersTable from "@/components/modules/admin-dashboard/dashboard/UsersTable";
import OrdersTable from "@/components/modules/admin-dashboard/dashboard/OrdersTable";
import MedicinesTable from "@/components/modules/admin-dashboard/dashboard/MedicinesTable";

export default async function AdminDashboardPage() {
  // Fetch all users
  const { data: users }: any = await getAllUsersAction({});

  // Fetch all orders
  const { data: orders }: any = await getAllOrdersAction();

  // Fetch all medicines
  const { data: medicines }: any = await getAllMedicinesAction();

  // Compute statistics
  const totalUsers = users?.data?.length ?? 0;
  const totalOrders = orders?.data?.length ?? 0;
  const pendingOrders =
    orders?.data.filter((o: any) => o.status === "PLACED").length ?? 0;
  const totalRevenue = orders?.data.reduce(
    (sum: number, order: any) => sum + order.totalAmount,
    0,
  );
  const totalMedicines = medicines?.data?.data?.length ?? 0;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="Total Users" value={totalUsers} />
        <StatsCard title="Total Orders" value={totalOrders} />
        <StatsCard title="Pending Orders" value={pendingOrders} />
        <StatsCard title="Total Revenue" value={`$${totalRevenue}`} />
        <StatsCard title="Medicines Listed" value={totalMedicines} />
      </div>

      {/* Users Table */}
      <UsersTable users={users?.data || []} />

      {/* Orders Table */}
      <OrdersTable orders={orders?.data || []} />

      {/* Medicines Table */}
      <MedicinesTable medicines={medicines?.data?.data || []} />
    </div>
  );
}
