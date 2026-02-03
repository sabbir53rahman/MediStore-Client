import { Footer } from "@/components/layout/footer";
import CategoriesSection from "@/components/modules/homepage/CategoriesSection";
import HomeBanner from "@/components/modules/homepage/HomeBanner";
import Promo from "@/components/modules/homepage/Promo";
import Promotions from "@/components/modules/homepage/Promotion";
import TestimonialsSection from "@/components/modules/homepage/TestimonialsSection";
import WhyChooseUs from "@/components/modules/homepage/WhyChooseUs";
import { FeaturedMedicines } from "@/components/modules/medicine/FeaturedMedicines";
import { categoryService } from "@/services/category.service";
import { medicineService } from "@/services/medicine.service";

export default async function Home() {
  const medicinesData = (await medicineService.getAllMedicines()) as {
    data?: {
      data?: {
        data?: any[];
      };
    };
  };
  const medicines = medicinesData.data?.data?.data || [];

  const categoryData = (await categoryService.getAllCategories()) as {
    data?: {
      data?: any[];
    };
  };
  const categories = categoryData.data?.data || [];
  // console.log(categories);
  return (
    <div className="container mx-auto">
      <HomeBanner />
      <CategoriesSection categories={categories} />
      <FeaturedMedicines medicines={medicines} />
      <TestimonialsSection />
      <Promotions />
      <Promo />
      <Footer />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"></div>
    </div>
  );
}
