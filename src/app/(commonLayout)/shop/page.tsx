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

export default function Shop() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId") ?? "All";

  const [categories, setCategories] = useState([]);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const categoryResponse: any = await getAllCategoriesAction();
      setCategories(categoryResponse?.data?.data || []);

      if (categoryId && categoryId !== "All") {
        const res: any = await getMedicinesByCategoryAction(categoryId);
        setMedicines(res?.data?.data || []);
      } else {
        const res: any = await getAllMedicinesAction();
        console.log(res);
        setMedicines(res?.data?.data?.data || []);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <ShopPage
      medicines={medicines}
      categories={categories}
      categoryId={categoryId}
    />
  );
}
