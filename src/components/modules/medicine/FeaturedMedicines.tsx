import { Medicine } from "@/types/api.type";
import { MedicineCard } from "./MedicineCard";

interface Props {
  medicines: Medicine[];
}

export const FeaturedMedicines = ({ medicines }: Props) => {
  const featuredMedicines = medicines.filter(
    (medicine) => medicine.isFeatured === true,
  );

  if (featuredMedicines.length === 0) return null;

  return (
    <section className="my-12 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Featured Medicines
        </h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Hand-picked medicines just for you
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {featuredMedicines.map((medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>
    </section>
  );
};
