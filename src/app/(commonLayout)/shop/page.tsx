export const dynamic = "force-dynamic";

import ShopPage from "@/components/modules/shop/shop-page";
import { categoryService } from "@/services/category.service";
import { medicineService } from "@/services/medicine.service";
import { Category, Medicine } from "@/types/api.type";

interface ShopProps {
  searchParams: {
    categoryId?: string;
  };
}

async function Shop(searchParams: ShopProps) {
  const params = await searchParams.searchParams;
  const categoryId = params.categoryId;
  console.log(params.categoryId);
  // Fetch categories (no cache)
  const categoryData = await categoryService.getAllCategories({
    cache: "no-store",
  });
  const categories: Category[] = categoryData.data.data;

  // Fetch medicines for selected category
  let medicines: Medicine[] = [];
  if (categoryId && categoryId !== "All") {
    const res = await medicineService.getMedicinesByCategory(
      categoryId,
      undefined,
      {
        cache: "no-store",
      },
    );
    medicines = res.data.data;
  } else {
    const res = await medicineService.getAllMedicines(undefined, {
      cache: "no-store",
    });
    medicines = res.data.data.data;
  }
console.log(medicines)

  return (
    <ShopPage
      medicines={medicines}
      categories={categories}
      categoryId={categoryId ?? "All"}
    />
  );
}

export default Shop;
