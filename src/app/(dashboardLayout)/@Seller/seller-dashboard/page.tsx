import { getSellerOrdersAction } from "@/actions/order.actions";
import { getAllMedicinesAction } from "@/actions/medicine.actions";
import StatsCard from "@/components/modules/seller-dashboard/StatsCard";
import OrdersTable from "@/components/modules/seller-dashboard/orders-table";
import MedicinesTable from "@/components/modules/seller-dashboard/medicines-table";

export default async function SellerDashboardPage() {
  const { data: orders }: any = await getSellerOrdersAction({
    cache: "no-store",
  });

  const { data: medicines }: any = await getAllMedicinesAction();

  const totalOrders = orders?.data.length ?? 0;
  const pendingOrders =
    orders?.data.filter((o: any) => o.status === "PLACED").length ?? 0;

  const totalRevenue = orders.data.reduce(
    (sum: number, order: any) => sum + order.totalAmount,
    0,
  );

  console.log(orders.data);

  const totalMedicines = medicines?.data?.data.length ?? 0;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Seller Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="Total Orders" value={totalOrders} />
        <StatsCard title="Pending Orders" value={pendingOrders} />
        <StatsCard title="Total Revenue" value={`$${totalRevenue}`} />
        <StatsCard title="Medicines Listed" value={totalMedicines} />
      </div>

      {/* Orders */}
      <OrdersTable orders={orders.data || []} />

      {/* Medicines */}
      <MedicinesTable medicines={medicines?.data.data || []} />
    </div>
  );
}
