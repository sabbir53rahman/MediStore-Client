import { getAllMedicinesAction } from "@/actions/medicine.actions";
import { SellerMedicinesTable } from "@/components/modules/seller-dashboard/seller-medicines-table";

interface PageProps {
  searchParams?: {
    page?: string;
    limit?: string;
    search?: string;
  };
}

export default async function SellerProductsPage({ searchParams }: PageProps) {
  const page = Number(searchParams?.page ?? 1);
  const limit = Number(searchParams?.limit ?? 10);

  const { data, error }: any = await getAllMedicinesAction({ page, limit });
  console.log(data);

  if (error || !data) {
    return <div className="text-red-500">Failed to load medicines</div>;
  }

  // Assuming API returns { items: Medicine[], page, limit, total }
  return (
    <SellerMedicinesTable
      medicines={data?.data?.data}
      meta={{
        page: data?.data?.page ?? page,
        limit: data?.data?.limit ?? limit,
        total: data?.data?.total ?? 0,
      }}
    />
  );
}
