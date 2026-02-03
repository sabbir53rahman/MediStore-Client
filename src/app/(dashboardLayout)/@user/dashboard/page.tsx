import { getMyOrdersAction } from "@/actions/order.actions";
import { getMyCartAction } from "@/actions/cart.actions";
import StatsCard from "@/components/modules/seller-dashboard/StatsCard";
import OrdersTable from "@/components/modules/customer-dashboard/OrdersTable";
import { cartService } from "@/services/cart.service";

export default async function UserDashboardPage() {
  const { data: ordersData }: any = await getMyOrdersAction({
    cache: "no-store",
  });

  const totalOrders = ordersData?.data?.length ?? 0;
  const totalSpent =
    ordersData?.data?.reduce(
      (sum: number, order: any) => sum + order.totalAmount,
      0,
    ) ?? 0;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Orders" value={totalOrders} />
        <StatsCard title="Total Spent" value={`$${totalSpent}`} />
      </div>

      <OrdersTable orders={ordersData?.data || []} />
    </div>
  );
}
