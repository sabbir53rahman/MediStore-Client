"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ShopPage from "@/components/modules/shop/shop-page";
import { getAllCategoriesAction } from "@/actions/category.actions";
import {
  getAllMedicinesAction,
  getMedicinesByCategoryAction,
} from "@/actions/medicine.actions";
import LoadingSpinner from "@/components/modules/medicine/LoadingSpinner";

export default function Shop() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId") ?? "All";

  const [categories, setCategories] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const [error, setError] = useState<string | null>(null); // ✅ Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // start loading
        setError(null); // reset previous errors

        // Fetch categories
        const categoryResponse: any = await getAllCategoriesAction();
        setCategories(categoryResponse?.data?.data || []);

        // Fetch medicines
        let res: any;
        if (categoryId && categoryId !== "All") {
          res = await getMedicinesByCategoryAction(categoryId);
        } else {
          res = await getAllMedicinesAction();
        }
        setMedicines(res?.data?.data?.data || []);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load data. Please try again."); // user-friendly error
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchData();
  }, [categoryId]);

  // Render loading, error, or main shop page
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-medium">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <ShopPage
      medicines={medicines}
      categories={categories}
      categoryId={categoryId}
    />
  );
}
