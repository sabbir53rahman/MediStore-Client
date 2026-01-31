import ShopPage from "@/components/modules/shop/shop-page";
import { categoryService } from "@/services/category.service";
import { medicineService } from "@/services/medicine.service";
import { userService } from "@/services/user.service";
import { Category, Medicine } from "@/types/api.type";

async function Shop() {
  const categoryData = await categoryService.getAllCategories();
  const category: Category[] = categoryData.data.data;
  const { data, error } = await medicineService.getAllMedicines();

  if (error || !data) {
    return <div>Failed to load medicines</div>;
  }

  const medicines: Medicine[] = data.data.data;

  console.log("Medicines (server) 👉", categoryData);

  return (
    <div>
      <ShopPage medicines={medicines} categories={category} />
    </div>
  );
}

export default Shop;
