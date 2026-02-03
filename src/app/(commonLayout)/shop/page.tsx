"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ShopPage from "@/components/modules/shop/shop-page";
import { getAllCategoriesAction } from "@/actions/category.actions";
import { getAllMedicinesAction } from "@/actions/medicine.actions";

export default function Shop() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId") || "All";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const search = searchParams.get("search") || "";

  const [categories, setCategories] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  // Unified filter update to prevent multiple URL pushes
  const handleFilterChange = useCallback(
    (filters: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "All") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      params.delete("page");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoryResponse: any = await getAllCategoriesAction();
        setCategories(categoryResponse?.data?.data || []);

        const params: any = {
          search: search || undefined,
          // Convert to Number to ensure backend compatibility
          minPrice: minPrice ? Number(minPrice) : undefined,
          maxPrice: maxPrice ? Number(maxPrice) : undefined,
          categoryId: categoryId !== "All" ? categoryId : undefined,
        };

        const res: any = await getAllMedicinesAction(params);
        setMedicines(res?.data?.data?.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId, minPrice, maxPrice, search]);

  return (
    <ShopPage
      medicines={medicines}
      categories={categories}
      activeCategoryId={categoryId}
      minPrice={minPrice}
      maxPrice={maxPrice}
      searchTerm={search}
      // Note: passing the new object-based filter handler
      onFilterUpdate={handleFilterChange}
      isLoading={loading}
    />
  );
}
