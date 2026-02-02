import { getAllOrdersAction } from "@/actions/order.actions";
import { OrdersTable } from "@/components/modules/admin-dashboard/orders-table";

interface PageProps {
  searchParams?: {
    page?: string;
    limit?: string;
    search?: string;
  };
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const page = Number(searchParams?.page ?? 1);
  const limit = Number(searchParams?.limit ?? 10);

  const { data, error } = await getAllOrdersAction({ page, limit });
  console.log(error);
  if (error || !data) {
    return <div className="text-red-500">Failed to load orders</div>;
  }

  return <OrdersTable orders={(data as any).data} meta={(data as any).meta} />;
}
