import ShopPage from "@/components/modules/shop/shop-page";
import { getAllCategoriesAction } from "@/actions/category.actions";
import {
  getAllMedicinesAction,
  getMedicinesByCategoryAction,
} from "@/actions/medicine.actions";
import { userService } from "@/services/user.service";
import { Category, Medicine } from "@/types/api.type";

interface ShopProps {
  searchParams: {
    categoryId?: string;
  };
}

const Shop = async ({ searchParams }: ShopProps) => {
  const { data: session } = await userService.getSession();
  const token = session?.session?.token;

  const categoryId = searchParams.categoryId;

  // Get categories
  const categoryResponse = await getAllCategoriesAction();
  const categories: Category[] = categoryResponse.data?.data || [];

  // Get medicines
  let medicines: Medicine[] = [];
  if (categoryId && categoryId !== "All") {
    const res = await getMedicinesByCategoryAction(categoryId);
    medicines = res.data?.data || [];
  } else {
    const res = await getAllMedicinesAction();
    medicines = res.data?.data?.data || [];
  }

  return (
    <ShopPage
      medicines={medicines}
      categories={categories}
      categoryId={categoryId ?? "All"}
      token={token}
    />
  );
};

export default Shop;
