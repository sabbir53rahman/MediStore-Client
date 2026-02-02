// /seller-dashboard/orders/page.tsx
import { getSellerOrdersAction } from "@/actions/order.actions";
import { SellerOrdersTable } from "@/components/modules/seller-dashboard/seller-orders-table";

interface PageProps {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}

export default async function SellerOrdersPage({ searchParams }: PageProps) {
  const page = Number(searchParams?.page ?? 1);
  const limit = Number(searchParams?.limit ?? 10);

  const { data, error }: any = await getSellerOrdersAction({
    cache: "no-store",
  });

  if (error || !data) {
    return <div className="text-red-500 p-6">Failed to load orders</div>;
  }

  return (
    <SellerOrdersTable
      orders={data?.data?.data}
      meta={{
        page: data?.data?.page ?? page,
        limit: data?.data?.limit ?? limit,
        total: data?.data?.total ?? 0,
      }}
    />
  );
}
